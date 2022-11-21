import socket


host = socket.gethostname()
port = 8000
buffer_size = 1024



while True:
    i = input("Nhap vao lenh: ") + "\n"
    md = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    md.connect((host, port))

    md.send(i.encode())

    e, file_name = i.split()


    r = md.recv(buffer_size).decode()

    if r == "OK\n":
        print("OK...")
        if e == "GET":
            data = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            data.connect((host, 8001))
            file = open("client/" + file_name, "w")
            b = data.recv(buffer_size)
            while b:
                file.write(b.decode())
                b = data.recv(buffer_size)
            print("Ghi thanh cong")
            file.close()
            data.close()
        elif e == "DELETE":
            print("Xoa thanh cong!")
        elif e == "LIST":
            data = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            data.connect((host, 8001))
            b = data.recv(buffer_size)
            while b:
                print(b.decode())
                b = data.recv(buffer_size)
            data.close()
    else:
        print(f"{r} ERROR...")
    #md.close()
    if e == "\n":
        break
