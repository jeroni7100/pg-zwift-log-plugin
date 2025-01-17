# Pedal Games Zwift Log Plugin


This is a demonstration of the plugin features in [Pedal Games](https://pedalgames.online)

A plugin that monitors Zwift log files and sends game events to Pedal Games, including:

- Chat messages
- Ride-ons
- World changes 
- Sport type
- Steering mode
- Pace partner info
- Game version


## Installation and use

Copy the json files in the `plugins` to a location under %userprofile%\pedal-games\plugins`` so the app can find them at launch.

You can copy the plugin files manually or install them by running

```sh
node plugins/install.mjs
```

This will copy the plugin configuration to %userprofile%/pedal-games/plugins/zwiftlog/


## Use 
To start reading data from the Zwift log file `log.txt` you can either run the emitter from source or run a compiled version (`pg-zwift-log-plugin.exe`) [from the latest release](https://github.com/jeroni7100/pg-zwift-log-plugin/releases/latest) 

Pedal Games should be running at the same time, so it is possible for the emitter to connect to its HTTP server. The emitter will attempt to connect/reconnect a couple of times but will eventually exit if it cannot connect to your Pedal Games klient.

### From source

Run the emitter:
```
npm start
```

Add --catchup flag to process existing log entries on startup.

### Compiled version

If you run 

```
pg-zwift-log-plugin.exe --catchup
```

chat messages and other information already in log.txt will be parsed and sent to Pedal Games, too.

## Building

To build the Windows executable of the emitter:

```
npm run build
```

## License
MIT
