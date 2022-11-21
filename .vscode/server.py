import socket
import os

host = socket.gethostname()
port1 = 8000
port2 = 8001
buffer_size = 1024

md = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
md.bind((host, port1))

md.listen(5)

data = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
data.bind((host, port2))
data.listen()

def get(name):
    e_data, addr = data.accept()
    file = open(f"./{name}", "r")
    s = file.readline()
    while s:
        e_data.send(s.encode())
        s = file.readline()

def list_dir(name):
    e_data, addr = data.accept()
    for path, subdir, files in os.walk(name):
        e_data.send(f"Path: {path}\nSubdir: {subdir}\nFiles: {files}\n".encode())

print("Server is listening...")

while True:
    e, a = md.accept()
    print(f"Received from {a}")
    req = e.recv(buffer_size).decode()
    d, name = req.split()
    name = "server/" + name
    if d == "GET":
        if os.path.exists(f"./{name}"):
            e.send(b"OK\n")
            get(name)
        else:
            e.send(b"ERROR\n")
    elif d == "DELETE":
        if os.path.exists(f"./{name}"):
            e.send(b"OK\n")
            os.remove(name)
        else:
            e.send(b"ERROR\n")
    elif d == "LIST":
        if os.path.exists(name):
            e.send(b"OK\n")
            list_dir(name)
        else:
            e.send(b"ERROR\n")
