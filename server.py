import http.server
import socketserver
import socket
import webbrowser
import os
import sys

PORT = 8080

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    Handler = http.server.SimpleHTTPRequestHandler
    Handler.extensions_map.update({
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.svg': 'image/svg+xml'
    })

    local_ip = get_local_ip()
    pc_url = f"http://localhost:{PORT}"
    mobile_url = f"http://{local_ip}:{PORT}"

    print("=" * 60)
    print(" 🌟 OPIc AI Master (스마트폰 오픽 학습 프로그램) 실행됨!")
    print("=" * 60)
    print(f" 💻 PC 브라우저 접속 주소  : {pc_url}")
    print(f" 📱 스마트폰 브라우저 접속 : {mobile_url}")
    print("    (스마트폰과 PC가 같은 Wi-Fi에 연결되어 있으면 바로 열립니다)")
    print("=" * 60)
    print(" 종료하려면 터미널에서 Ctrl + C 를 누르세요.\n")

    try:
        webbrowser.open(pc_url)
    except Exception:
        pass

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n서버를 종료합니다. 수고하셨습니다!")
            sys.exit(0)

if __name__ == "__main__":
    run_server()
