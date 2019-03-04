# bus-reservation

[![Build Status](https://travis-ci.org/rafasis1986/bus-reservation.svg?branch=master)


This is a REST application to manage the routes, drivers, and passangers in a bus agency [documentation](http://rafasis1986.github.io/bus-reservation/).

# Prerequisites

- [Docker](https://docs.docker.com/docker-for-mac/install/)  
- [Travis CLI](http://blog.travis-ci.com/2013-01-14-new-client/)

# Initialize the project

Start the dev server for local development:

```bash
docker-compose up -d
```

Create a superuser to login to the admin:

```bash
docker-compose run --rm web ./manage.py createsuperuser
```
