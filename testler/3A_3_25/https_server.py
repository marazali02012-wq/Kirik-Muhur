import http.server,ssl,sys,functools
root,port,cert,key=sys.argv[1],int(sys.argv[2]),sys.argv[3],sys.argv[4]
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
httpd=http.server.ThreadingHTTPServer(('127.0.0.1',port),functools.partial(Q,directory=root))
ctx=ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER);ctx.load_cert_chain(cert,key)
httpd.socket=ctx.wrap_socket(httpd.socket,server_side=True)
httpd.serve_forever()
