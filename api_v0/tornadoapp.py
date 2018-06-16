import tornado
from tornado import websocket, web, ioloop, httpclient, autoreload
from tornado.web import asynchronous, gen
import pika
from django.contrib.auth.models import User
from api_v0.models import *
from django.http import QueryDict
import json

class EchoWebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print("WebSocket opened")

    def check_origin(self, origin):
        return True

    def on_message(self, data):
        json_data = json.loads(data)
        self.token = json_data['token']
        self.message = json_data['message']
        self.thread = json_data['thread']
        self.post()
    @asynchronous
    def post(self):
        http_client = httpclient.AsyncHTTPClient()
        url = "http://127.0.0.1:8000/api/v0/thread/add/"
        headers = {'Authorization': 'JWT ' + self.token, "Content-Type":"application/json"}
        context = {'thread':self.thread, 'message':self.message}
        body = json.dumps(context)
        print(body)
        request = http_client.fetch(request=url, method="POST", headers=headers, body=body)
        self.write_message("OK")
        http_client.close()
        print("Thing")
    def on_close(self):
        print("WebSocket closed")


# class ArticleHandler(tornado.web.RequestHandler):
#     @asynchronous
#     def get(self):
#         http = httpclient.AsyncHTTPClient()
#         response = http.fetch("http://127.0.0.1:8000/api/v0/articles/", self.parse)
#
#     def parse(self, response):
#         json_dec = self.decode_argument(response.body)
#         self.write(json_dec)
#         print(json_dec)
#         self.finish()



application = tornado.web.Application([
    (r"/", EchoWebSocket),
    # (r"/articles", ArticleHandler),
])
application.autoreload = True
application.listen(8888, '127.0.0.1')
tornado.autoreload.start()
try:
    tornado.ioloop.IOLoop.current().start()
except KeyboardInterrupt:
    tornado.ioloop.IOLoop.current().stop()