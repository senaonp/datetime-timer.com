# [datetime-timer.com](https://datetime-timer.com/) | an online tool for timing and calculating between start and end datetimes

<img src="./assets/datetime-timer-preview.png" width="100%" height="auto">

-----

## usage
applet can be run in a web browser by checking out the repo and opening `index.html` in a web browser

## running datetime-timer on NGINX web server with Docker
```
docker build --tag datetime-timer:dev .
docker run -p 8002:80 -d --name datetime-timer datetime-timer:dev
# with this config, datetime-timer runs on localhost:8002
```

-----

## features
- display days, hours, minutes, and seconds from current time to specified end date-time
- display time information between two specified datetimes
- generate URL for saving and/or sharing results
- save multiple timers to browser
- responsive styling for mobile
- datetime-timer language versions [ [EN](https://datetime-timer.com) | [CN](https://datetime-timer.com/zh/) | [JP](https://datetime-timer.com/jp/) ]

## feature wishlist
- (code) refactoring

## Multiple timers saved to browser
<img src="./assets/timers.jpg" height="auto">

## Generated URL with name preview:
- new year 2023 url: <a target='_blank' href='https://datetime-timer.com/?now-2023_01_01_00_00-new_year%27s_2023'>https://datetime-timer.com/?now-2023_01_01_00_00-new_year%27s_2023</a>

<img src="./assets/datetime-timer-url-name.png" height="auto">

## Custom datetime preview:
<img src="./assets/datetime-timer-custom-preview.png" height="auto">
