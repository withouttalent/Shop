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
from aioredis.abc import AbcChannel
from aioredis.pubsub import Receiver
from tornado import escape
import ast
import time
connections = []
r = redis.StrictRedis()
p = r.pubsub()
p.psubscribe("thread:*")



class WSHandler(tornado.websocket.WebSocketHandler):

    def __init__(self, *args, **kwargs):
        super(WSHandler, self).__init__(*args, **kwargs)
        self.message_iter = 20

    def open(self):
        print("websocket opened")

    def check_origin(self, origin):
        return True

    async def on_message(self, evt):
        data = json.loads(evt)
        if data['type'] == "SEND_MESSAGE":
            token = data['token']
            message = data['message']
            self.thread = data['thread']
            await self.post(message, self.thread, token)
        if data['type'] == "SUBSCRIBE_THREAD":
            print(data)
            asyncio.ensure_future(self.setup(data['id']))
        if data['type'] == "FETCH_MESSAGE":
            await self.fetch_message(data['id'], data['token'])

    async def fetch_message(self, thread_id, token):
        http_client = httpclient.AsyncHTTPClient()
        url = "http://127.0.0.1:8000/api/v0/thread/fetch-message/"
        headers = {'Authorization': 'JWT ' + token, "Content-Type": "application/json"}
        context = {'thread': thread_id, 'fetch':self.message_iter + 20, 'message_iter':self.message_iter}
        self.message_iter += 20
        body = json.dumps(context)
        request = await http_client.fetch(request=url, method="POST", headers=headers, body=body)
        http_client.close()
        data = {"events":"FETCH_MESSAGE", "payload":request.body.decode()}
        self.write_message(data)


    async def post(self, message, thread, token):
        http_client = httpclient.AsyncHTTPClient()
        url = "http://127.0.0.1:8000/api/v0/thread/add/"
        headers = {'Authorization': 'JWT ' + token, "Content-Type":"application/json"}
        context = {'thread':thread, 'message':message}
        body = json.dumps(context)
        request = await http_client.fetch(request=url, method="POST", headers=headers, body=body)
        http_client.close()

    async def setup(self, id):
        self.conn = await aioredis.create_redis("redis://127.0.0.1")
        self.thread = "thread:{!s}".format(id)
        channel = await self.conn.psubscribe(self.thread)
        await asyncio.ensure_future(send_message(channel, self))



    def on_close(self):
        print("WS close")
        self.conn.unsubscribe("thread:{!s}".format(str(self.thread)))
        self.conn.close()




async def send_message(channel, obj):
    print("this")
    # redis = await aioredis.create_redis("redis://127.0.0.1")
    # channel_pattern = await redis.psubscribe("thread:*",)
    while (await channel[0].wait_message()):
        msg = await channel[0].get(encoding="utf-8")
        print(msg)
        data = {"events":"NEW_MESSAGE", "payload":msg[1]}
        await obj.write_message(data)





application = tornado.web.Application([
    (r"/", WSHandler),
])
application.autoreload = True
application.listen(8888, '127.0.0.1')
tornado.autoreload.start()
try:
    print("""
    #########################################################
    """)
    loop = tornado.ioloop.IOLoop.current()
    loop.start()
except KeyboardInterrupt:
    tornado.ioloop.IOLoop.current().stop()