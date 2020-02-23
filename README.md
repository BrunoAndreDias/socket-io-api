# skeeled-challenge-api

This api need a ".env" file with:
```
PORT=4001
DARKSKY_API=https://api.darksky.net/forecast/API_KEY/
MONGODB_URI='mongodb://localhost:27017/namesomething'
```

## App description

I used the darksky api to get the weather from the location provided from the frontend. To use the darksky it is needed one API_KEY that provide us 1000 free request's to the darksky api.


I use socketIo to provide real-time data for the frontend with the data that i get from the darksky api. When i got the response from the api i send the data to be presented on the frontend.



I used something that i didn't use normally as an API, i used sockets to create/get/delete the todo's.



For some reason that i din't get it, at this moment the dockerfile from the api isn't working properly.


# More details:

- https://darksky.net/dev
