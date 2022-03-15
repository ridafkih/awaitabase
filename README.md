# Awaitabase

A CLI tool that allows you to ensure a database is live before closing the process.

https://user-images.githubusercontent.com/9158485/158486267-4c935183-257f-451b-96d1-5f47659b58f4.mov

## Usage

### Command Structure
```sh
# If the optionalUrl is not defined, it will default to the DATABASE_URL environment variable.
npx awaitabase [driver] [optionalUrl]
```

### General CLI

```sh
npx awaitabase postgres postgres://user:password@localhost/database

# ⠼ Connecting to database... 0/30
# ⠼ Connecting to database... 1/30
# ✔ Database confirmed as active
```

### Inside NPM Project

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
