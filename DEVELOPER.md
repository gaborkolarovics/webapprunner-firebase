# Develop this app

They project use [poco](https://getpoco.io)

Manual deploy:

```bash

$ poco up gfunc

$ docker exec -it webapprunner-firebase_gfunc_1 /bin/bash

$ firebase login

$ cd functions

$ npm i

$ cd ..

$ firebase deploy

```

