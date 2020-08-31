<h1 align="center">
    <img alt="Spotifood" src="https://raw.githubusercontent.com/giulianopiovezan/ifood-frontend-test/7f4c33511f4b845ae88de5da0e25fee201a4db37/src/assets/spotifood.svg" width="250px" />
</h1>

<p align="center">
  Platform used to reconcile two things that combine very well, food and music, listen to the most popular playlists and combine with a snack lol.
  It is also possible to filter by location and country, in addition to being able to page the results.
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000">
</p>


## 🚀 Tecnologies

In this project was used follow tecnologies:

- [**React**](https://reactjs.org/)
- [**Styled Components**](https://styled-components.com/docs)
- [**Material UI**](https://material-ui.com/)
- [**Typescript**](https://www.typescriptlang.org/)

## ⚡️ Getting started

To run the app, you will need to create .env file in the root of project, like .env.example, that is used as example to fill environment variables.
The app needs three variables that are:

- **REACT_APP_AUTHORIZATION_URL**: Authorization server url, the endpoint of spotify's api
- **REACT_APP_AUTHORIZATION_USERNAME**: Authorization client ID, that can be get into [**Spotify Developer Center**](https://developer.spotify.com/dashboard/applications), where you need create an app, after that you will see and Client ID, that is the field we need.
- **REACT_APP_AUTHORIZATION_PASSWORD**: Authorization client secret, that can be get into [**Spotify Developer Center**](https://developer.spotify.com/dashboard/applications) too, where you need follow above steps and after that you will see a button called **SHOW CLIENT SECRET**, that is the field we need.

After you followed the steps above you will be able to run the app, running the commands bellow:

Installing dependencies first:

```bash
$ yarn

# or

$ npm install
```

Running app:

```bash
$ yarn start

# or

$ npm start
```

**Observation**

The method that i'm using in the app to authorize with spotify's api is for local test only, when deploy this app into production we must be change to user authenticate using credentials to get an access to app.

## Tests

To running tests are available two commands:

- **With coverage**: run all tests with coverage code.

```bash
$ yarn test:coverage

# or

$ npm run test:coverage
```

- **Normal**: run all tests without coverage code in watch mode.

```bash
$ yarn test

# or

$ npm run test
```

## :memo: License

This project is under the MIT license. See the [LICENSE] file (LICENSE.md) for more details.

