import tornado
from tornado import websocket, web, ioloop, httpclient, autoreload
from tornado.web import asynchronous, gen
from django.contrib.auth.models import User
from api_v0.models import *
import json
import redis
import aioredis
import aioredis
import asyncio
from tornado.concurrent import Future
connections = []

class EchoWebSocket(tornado.websocket.WebSocketHandler):

    async def open(self):
        print("WebSocket opened")
        connections.append(self)
        self.connection = await aioredis.create_redis('redis://127.0.0.1')
        channel = await self.connection.subscribe('channel')
        print(channel)
        ch1 = channel[0]
        self.tsk = await asyncio.ensure_future(consumer(ch1))

    def check_origin(self, origin):
        return True

    def on_message(self, data):
        json_data = json.loads(data)
        print(data)
        print(connections)
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


    def on_close(self):
        self.connection.unsubscribe('channel')
        self.connection.close()
        print("WebSocket closed")
        connections.remove(self)


async def consumer(channel):
    print("now work here")
    print(connections)
    while (await channel.wait_message()):
        msg = await channel.get(encoding='utf-8')
        for connection in connections:
            print(msg)
            connection.write_message(msg)



application = tornado.web.Application([
    (r"/", EchoWebSocket),
])
application.autoreload = True
application.listen(8888, '127.0.0.1')
tornado.autoreload.start()
try:
    loop = tornado.ioloop.IOLoop.current()
    loop.start()
except KeyboardInterrupt:
    tornado.ioloop.IOLoop.current().stop()