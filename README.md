Roamon-web is developed and maintained by JPNIC young dev team.

## Documentation

Web-based roamon-alert.

## Installation

To clone from repository
```bash
$ git clone https://github.com/taiji-k/roamon-web.git
```

### Run with yarn in local machine

``` bash
$ yarn dev
```

Access to `http://localhost:3000` !

### Note

Roamon-alert's database needs to be running.

To run roamon-alert database, use `feature-for_writin_DB` in it.
```bash
$ git clone https://github.com/taiji-k/roamon-alert.git --branch feature-for_writin_DB
$ cd roamon-alert/docker
$ docker-compose up
```

Then, run roamon-alert. A Database context will be created.
Initial running takes several minutes to download data.
```bash
$ docker exec -it roamon-alert /bin/bash
># cd roamon-alert
># python3 roamon_alert_controller.py daemon --start
```

## Usage

Three function can be used from the left bar.
* Show all contacts
* Show all ROV results
* Add contacts with watching prefix and AS numbers
  * Multiple prefixes and multiple AS numbers are specified with ',' separated.

![エビフライトライアングル](README-images/screenshot-show-all-contact-info.png "Image")

## Thanks

JPNIC roamon project is funded by Ministry of Internal Affairs and Communications, Japan (2019 Nov - 2020 Mar).
