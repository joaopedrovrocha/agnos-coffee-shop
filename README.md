# agnos-coffee-shop

## run the app

* `cp .env.example .env`
* `yarn` OR `npm install`
* `docker-compose up`
* the server will run on port 3000

## seeds

* `docker exec $(docker ps -aqf "name=coffee-shop-web") npm run seed`

## insomnia

There is a insomnia file (`./insommia.json`) that contains the api calls <br />
**Pay atention with the items ids**

## data

The seed will add to the database 3 items and 1 combo <br />
Use the order api to request the order total price
