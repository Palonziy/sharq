#!/usr/bin/env python3
"""
Sharq - Zero-dependency Local Development Server
Includes full HTTP 206 Partial Content (Range Requests) support
for flawless MP4 video streaming and seeking across all browsers.

Usage:
    python serve.py [port]
    Default port: 8080
"""

import http.server
import os
import re
import socketserver
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


class RangeHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable Range requests and CORS for local testing
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) or os.path.isdir(path):
            return super().send_head()

        range_header = self.headers.get('Range')
        if not range_header:
            return super().send_head()

        size = os.path.getsize(path)
        match = re.match(r'bytes=(\d+)-(\d*)', range_header)
        if not match:
            return super().send_head()

        start = int(match.group(1))
        end = int(match.group(2)) if match.group(2) else size - 1

        if start >= size:
            self.send_error(416, 'Requested Range Not Satisfiable')
            return None

        if end >= size:
            end = size - 1

        self.send_response(206)
        ctype = self.guess_type(path)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(end - start + 1))
        self.send_header('Last-Modified', self.date_time_string(os.path.getmtime(path)))
        self.end_headers()

        f = open(path, 'rb')
        f.seek(start)

        class SlicedFile:
            def __init__(self, fp, length):
                self.fp = fp
                self.remaining = length

            def read(self, read_size=-1):
                if self.remaining <= 0:
                    return b''
                if read_size < 0 or read_size > self.remaining:
                    read_size = self.remaining
                data = self.fp.read(read_size)
                self.remaining -= len(data)
                return data

            def close(self):
                self.fp.close()

        return SlicedFile(f, end - start + 1)


def main():
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('127.0.0.1', PORT), RangeHTTPRequestHandler) as httpd:
        print(f"[Sharq Server] Ishga tushdi: http://localhost:{PORT}/")
        print(f"[Sharq Server] Papka: {DIRECTORY}")
        print("[Sharq Server] HTTP 206 Range requests (video streaming) yoqilgan.")
        print("To'xtatish uchun: Ctrl + C")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer to'xtatildi.")


if __name__ == '__main__':
    main()
