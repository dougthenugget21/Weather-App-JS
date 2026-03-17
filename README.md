# Weather App - DataOps

## Description 
Have you ever wanted to know the weather of North Sentinel Island and it's neighboring islands? Well, look no further!
This app was built to give you that true Island Living feeling and make you feel like one of the North Sentinel people. Next step, book a trip.

## Installation

- Clone this Repo
- Open your terminal
    - `cd` to root folder
    - delete data folder
    - setup `.env` with:
        - `PORT` of your choosing
        - `City` of your choosing
        - `API_KEY` from openweather
    - `npm i` to install dependancies
    - `node fetchWeather.js` to create/update data folder
    - `node app.js` to start server
- Open Browser on `PORT` to see weather and graph

## Using Docker

- Open your Docker Desktop
- Make sure you are on the same path as Dockerfile
- On your Terminal run:
    - `docker build -t <app-name>:<tag> .` or `docker build -t weatherapp:1.0 .`
    - `docker run -p <local-port>:<container-port> <image-name>` or `docker run -p 3000:5000 weatherapp` - to run a contrainer based on an image

## Tests

There are a few tests to check if files inside the data folder are correct