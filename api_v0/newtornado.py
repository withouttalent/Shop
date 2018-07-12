import tornado
import asyncio
import redis
from tornado import web, websocket
import aioredis
import json

class WSHandler(tornado.websocket.WebSocketHandler):

    def open(self):
        print("websocket opened")

    async def on_message(self, evt):
        data = json.loads(evt)
        print(data)
        await self.setup(evt['id'])

    async def setup(self, id):
        self.conn = await aioredis.create_redis("redis://127.0.0.1")
        self.thread = "thread:{!s}".format(id)
        channel = await self.conn.psubscribe(self.thread)
        asyncio.ensure_future(self.send_message(channel, self))

    async def send_message(self, channel, obj):
        print("this")
        # redis = await aioredis.create_redis("redis://127.0.0.1")
        # channel_pattern = await redis.psubscribe("thread:*",)
        while channel[0].wait_message():
            msg = await channel.get(encoding="utf-8")
            print(msg)
            await obj.write_message(msg)





    async def on_close(self):
        print("WS close")
        await self.conn.unsubscribe("thread:{!s}".format(id))
        await self.conn.wait_closed()


