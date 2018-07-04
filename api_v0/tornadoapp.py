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

    def check_origin(self, origin):
        return True

    async def on_message(self, data):
        print(data)
        json_data = json.loads(data)
        if json_data['type'] == "SEND_MESSAGE":
            token = json_data['token']
            message = json_data['message']
            thread = json_data['thread']
            type = json_data['type']
            await self.post(message, thread, token)
        if json_data['type'] == "SUBSCRIBE_THREAD":
            await self.setup_redis(json_data)


    async def setup_redis(self, data):
        self.connection = await aioredis.create_redis('redis://127.0.0.1')
        self.thread = "".join("thread_" + str(data['id']))
        channel = await self.connection.subscribe(self.thread)
        print(channel)
        ch1 = channel[0]
        await asyncio.ensure_future(consumer(ch1))

    async def post(self, message, thread, token):
        http_client = httpclient.AsyncHTTPClient()
        url = "http://127.0.0.1:8000/api/v0/thread/add/"
        headers = {'Authorization': 'JWT ' + token, "Content-Type":"application/json"}
        context = {'thread':thread, 'message':message}
        body = json.dumps(context)
        request = await http_client.fetch(request=url, method="POST", headers=headers, body=body)
        http_client.close()


    def on_close(self):
        self.connection.unsubscribe(self.thread)
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