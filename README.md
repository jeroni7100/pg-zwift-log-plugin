# pg-zwift-log-plugin

This is a demonstration of the plugin features in [Pedal Games](https://pedalgames.online)

## Installation and use

Copy the json files in the `plugins` to a location under %userprofile%\pedal-games\plugins`` so the app can find them at launch.

Run the emitter (you can download a compiled `pg-zwift-log-plugin.exe from the latest Release)` to start reading data from the Zwift log file `log.txt`.

Pedal Games should be running at the same time, so it is possible for the emitter to connect to its HTTP server. The emitter will attempt to connect/reconnect a couple of times but will eventually exit if it cannot connect to your Pedal Games klient.

If you run 

```
pg-zwift-log-plugin.exe --catchup
```

chat messages and other information already in log.txt will be parsed and sent to Pedal Games, too.
