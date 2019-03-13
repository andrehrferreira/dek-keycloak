# @dekproject/keycloak

Keycloak interface plugin for DEK

## What does this plugin do?

* Create a basic connection with Keycloak
* Use **express-session** to create session

## What is Keycloak?

For more information access: https://www.keycloak.org/about.html

## Instalation

To install the bootstrap we recommend using the CLI

```bash
$ npm i -g @dekproject/cli
$ dek install keycloak
```

## Config

* Access the administrative panel of Keycloak, create a new realm
* Already connected to the new realm, access the clients option and create a new client
* In the new client settings, look for the Calid Redirect URIs option, add '*', and save
* In the Installation tab, select the Keycloak format OIDC JSON
* create the **keycloak.json** file in the root directory of the application and paste the settings

sample
```
{
    "realm": "myrealm",
    "auth-server-url": "http://localhost:8080/auth",
    "ssl-required": "external",
    "resource": "test",
    "public-client": true,
    "confidential-port": 0
}
```

## Usage

Using direct

```bash
$ npm i @dekproject/scope
```

```js
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";

import { $, plugins, keycloak, memoryStore } from "@dekproject/scope";

(async () => {
    await plugins("");

    $.set("app", express());
    $.app.use(bodyParser.urlencoded({ extended: false }));
    $.app.use(bodyParser.json());

    const PORT = process.env.PORT || 5555;

    $.wait("keycloak").then(async () => {
        $.app.use(session({
            secret: 'secret',
            resave: false,
            saveUninitialized: true,
            store: memoryStore
        }));

        $.app.use( keycloak.middleware( { logout: '/logout' } ));

        $.app.get('/', (req, res) => { res.send("insecure content").end(); });

        $.app.get('/protect', keycloak.protect(), (req, res) => {
            res.send("protected content").end();
        });

        $.app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}!`);
        });
    });
})();
```

Using in the standard DEK skeleton
```js
import session from "express-session";
import { $, app, keycloak, memoryStore } from "@dekproject/scope";
import routes from "@dekproject/routes";

$.wait(["app", "keycloak"]).then(() => {
    $.app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        store: memoryStore
    }));

    $.app.use( keycloak.middleware( { logout: '/logout' } ));

    $.app.get('/', (req, res) => { res.send("insecure content").end(); });

    $.app.get('/protect', keycloak.protect(), (req, res) => {
        res.send("protected content").end();
    });

    $.app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}!`);
    });
});
```
