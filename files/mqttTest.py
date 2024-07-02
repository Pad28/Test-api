from utime import sleep, ticks_ms
from umqtt.simple import MQTTClient
from machine import Pin
import network

SSID = ""
PASSWORD = ""

MQTT_BROKER = "192.168.1.76"
MQTT_PORT = 8086
MQTT_CLIEN_ID = "mqtt_" + str(ticks_ms())
estado = 0

topics = {
    "LED_SET": "LED_SET",
    "LED_GET": "LED_GET",
    "LED_SEND": "LED_SEND"
}

led = Pin(2, Pin.OUT, value=estado)

wf = network.WLAN(network.STA_IF)
wf.active(True)

def concectar_wifi(ssid, password):
    wf.connect(ssid, password)

    while not wf.isconnected():
        print("conectando...")
        sleep(2)

    print(wf.ifconfig())
    return True


client_mqtt = None

def sub_cb(topic, msg):
    global estado
    topic_str = topic.decode("utf-8")

    if topic_str == "LED_SET":
        if estado == 0:
            estado = 1
            led.value(estado)
        else:
            estado = 0
            led.value(estado)
        client_mqtt.publish("LED_SEND", str(estado))
    elif topic_str == "LED_GET":
        client_mqtt.publish("LED_SEND", str(estado))


def conectart_mqtt(clien_id, broker, port, callback):
    client = MQTTClient(clien_id, broker, port)
    client.set_callback(callback)
    client.connect()
    client.subscribe("LED_SET")
    client.subscribe("LED_GET")
    return client

if not concectar_wifi(SSID, PASSWORD):
    raise Exception("Error de conexión")

while True:
    if not wf.isconnected():
        concectar_wifi(SSID, PASSWORD)
        continue

    try:
        if client_mqtt is None:
            print("Conectando MQTT...")
            client_mqtt = conectart_mqtt(MQTT_CLIEN_ID, MQTT_BROKER, MQTT_PORT, sub_cb)
            print("Conexión MQTT establecida")
        client_mqtt.check_msg()
    except OSError:
        print("Error de conexión MQTT")
        client_mqtt = None
        sleep(5)