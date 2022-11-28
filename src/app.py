from flask import Flask, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import messaging, credentials

import json
app = Flask(__name__)

cred_data = 'admin private key'

cred = credentials.Certificate(cred_data)

firebase_admin.initialize_app(cred)

CORS(app)


@app.route("/")
def helloWorld():
    return 'Welcome Back !'


@app.route('/web-push', methods=["POST"])
def sendNotificationToClient():

    data = json.loads(request.data)
    token = data['token']
    # print('data =>',data)
    registration_toke = token
    # message = messaging.MulticastMessage(
    #     notification = messaging.Notification(
    #         title = 'Message From Flask',
    #         body = 'Hello World'
    #     ),
    #     data = {'name':'shahnawaz','role':'developer'},
    #     tokens = [registration_toke]
    # )
    message = messaging.Message(
        data={
            'title': 'hello world',
            'body': 'welcome'
        },
        webpush=messaging.WebpushConfig(
            notification=messaging.WebpushNotification(
                title='$GOOG up 1.43% on the day',
                body='$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
                icon='https://my-server/icon.png',
            ),
        ),
        # notification = messaging.Notification(
        #         title = 'Message From Flask',
        #         body = 'Hello World'
        #     ),
        token=registration_toke
    )

    # response = messaging.send_multicast(message)
    response = messaging.send(message)
    print('Successfully sent message:', response)
    return f"Success {response}"
