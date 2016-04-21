# ElectronTemplete

Electron template base of TypeScript.

## Prepare

### Install global package

```sh
npm -g install electron-prebuilt
npm -g install electron-packager
npm -g install asar
npm -g install typescript
npm -g install typings
```

### Install local package.

```sh
typings i
npm i
```

## Build & Run

### Build

Build app. Output `app/`.

```sh
npm run build
```

### Run

Run app.

```sh
npm run run
```

### Debug build

Build app(debug). Output `debug/`.

```sh
npm run debug
```

### Pack asar.

Build app(asar). Output `app.asar`.

```
npm run pack
```

### Release build

Build app(release). Output `release/`.

```sh
npm run release
```
