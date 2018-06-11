import time

import pika

connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue="hello")

print("Wait or press CTRL+C")


def callback(ch, method, properties, body):
    print("Received" + str(body))
    time.sleep(int(body.count(b'.')))
    print("Done")


channel.basic_consume(callback, queue='hello', no_ack=True)

channel.start_consuming()
