# Hubot RSS Poller

This is a simple polling script used to poll RSS feeds and ping rooms when an
update is found.  All it requires is a file specified to read.

## Configuration

All you need is a `.json` file with the following configurations set up.
This is loaded from the `hubotrssconfig.json` file in the top level of the hubot
install, or you can specify in an environment variable `HUBOT_RSS_CONFIG_FILE`.

```json
{
  "feeds": [{
    "name": "Name of the RSS feed goes here",
    "request": {
      "uri": "URI to the RSS feed goes here",
      "headers": {
        "Method": "GET"
      }
    },
    "room": "room to message out to when an update is found",
    "pingInterval": "100",
    "alertPrefix": "A prefix to the output message goes here.",
    "alertSuffix": "A suffix to the output message goes here.",
    "initialDelay": "3"
  }]
}
```

* `request` (object) - [request](https://github.com/request/request-promise) options
* `pingInterval` (integer) - interval between polls in seconds.
* `initialDelay` (integer) - delays RSS checks while hubot is starting.

## Basic Auth

You can specify `username` and `password` on an individual feed, or place them
in the HTTP Authorization header and they will work just fine.  But if you're
like me and don't like having usernames and passwords sitting around in something
that is probably source controlled, you can specify them via two environment
variables.  `HUBOT_RSS_FEED_USERNAME` and `HUBOT_RSS_FEED_PASSWORD` act as global
defaults to all feeds specified for this script.  If you specify them as well as
the `username` and `password` properties, the properties overwrite the environment
variables.
