# webapprunner-firebase

![CI](https://github.com/gaborkolarovics/webapprunner-firebase/workflows/Build%20and%20Deploy%20CI/badge.svg)

Firebase cloud message for Android [WebAppRunner](https://play.google.com/store/apps/details?id=hu.polidor.webapprunner) application

* Send notification vith curl:

```bash

$ curl -v -X POST -d '{"token":"YOUR_DEVICE_TOKEN","title":"Custom title","message":"Notification body", "link":"https://custom.webpage.link"}' -H "Content-Type: application/json" https://us-central1-webapprunner-1093.cloudfunctions.net/sendPushNotification

```

## License

This repository is licensed under the [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html).