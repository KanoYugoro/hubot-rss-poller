# Hubot Rss Poller

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
    "url": "URL to the RSS feed",
    "room": "room to message out to when an update is found",
    "pingInterval": "100", // How many seconds to wait before polling for update
    "alertPrefix": "A prefix to the output message goes here.",
    "alertSuffix": "a suffix to an output message goes here.",
    "initialDelay": "3" // initial wait (in seconds) check to allow hubot to connect"
  }]
}
```
