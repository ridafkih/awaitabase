# Awaitabase

A CLI tool that allows you to ensure a database is live before closing the process.

## Usage

### General CLI

```sh
npx awaitabase postgres postgres://user:password@localhost/database

# ⠼ Connecting to database... 0/30
# ⠼ Connecting to database... 1/30
# ✔ Database confirmed as active
```

### Inside NPM Project...

```sh
npm i -D awaitabase
```

```js
// package.json
{
  // ...
  "scripts": {
    "database:wait": "awaitabase postgres postgres://user:password@localhost/database",
    "start": "database:wait && node ."
  }
  // ...
}
```
