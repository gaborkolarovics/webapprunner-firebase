# webapprunner-firebase

Firebase cloud message for Android [WebAppRunner](https://play.google.com/store/apps/details?id=hu.polidor.webapprunner) application

* Send notification vith curl:

```bash

$ curl -v -X POST -d '{"token":"YOUR_DEVICE_TOKEN","title":"Custom title","message":"Notification body", "link":"https://custom.webpage.link"}' -H "Content-Type: application/json" https://us-central1-webapprunner-1093.cloudfunctions.net/sendPushNotification

```

