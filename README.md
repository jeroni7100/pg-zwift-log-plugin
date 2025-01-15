# pg-zwift-log-plugin

This is a demonstration of the plugin features in [Pedal Games](https://pedalgames.online)

## Installation and use

Copy the json files in the `plugins` to a location under %userprofile%\pedal-games\plugins`` so the app can find them at launch.

To start reading data from the Zwift log file `log.txt` you can either run the emitter from source or run a compiled version (`pg-zwift-log-plugin.exe`) [from the latest release](https://github.com/jeroni7100/pg-zwift-log-plugin/releases/latest) 

Pedal Games should be running at the same time, so it is possible for the emitter to connect to its HTTP server. The emitter will attempt to connect/reconnect a couple of times but will eventually exit if it cannot connect to your Pedal Games klient.

If you run 

```
pg-zwift-log-plugin.exe --catchup
```

chat messages and other information already in log.txt will be parsed and sent to Pedal Games, too.
