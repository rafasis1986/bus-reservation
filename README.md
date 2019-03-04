# bus-reservation

This is a REST application to manage the routes, drivers, and passangers in a bus agency.

[![Build Status](https://travis-ci.org/rafasis1986/bus-reservation)

[documentation](http://rafasis1986.github.io/bus-reservation/).

# Prerequisites

- [Docker](https://docs.docker.com/docker-for-mac/install/)  
- [Travis CLI](http://blog.travis-ci.com/2013-01-14-new-client/)

# Local Development

Start the dev server for local development:
```bash
docker-compose up -d
```

Run a command inside the docker container:

```bash
docker-compose run --rm web [command]
```
