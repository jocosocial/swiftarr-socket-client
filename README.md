swiftarr-socket-client
======================

## Usage

```
Usage: swiftarr-socket-client [options] [command]

CLI for Swiftarr WebSocket events

Options:
  -V, --version              output the version number
  -s, --server-url <string>  Server base URL including scheme.
  -h, --help                 display help for command

Commands:
  listen [options]           Start listening to a socket.
  login [options]            Get a token from the Twitarr server.
  sched2twitarr [options]    Sync the Sched.com joined events with Twitarr favorited events.
  call [options]             Start a pretend KrakenTalk call.
  help [command]             display help for command

 ```

## Installation

You need global Typescript support for this.

```
npm install typescript ts-node -g
```

Then install the package

```
npm install jocosocial/swiftarr-socket-client
```

## Guides & References

https://nathanfriend.io/2018/06/17/shelling-with-typescript.html
https://exploringjs.com/nodejs-shell-scripting/ch_installing-packages.html
https://github.com/piuccio/cowsay/blob/master/package.json
https://stackoverflow.com/questions/39664068/import-assignment-cannot-be-used-when-targeting-ecmascript-2015-modules
https://stackoverflow.com/questions/71643703/typescript-can-only-be-default-imported-using-the-esmoduleinterop-flag
https://typescript-eslint.io/troubleshooting/#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file
