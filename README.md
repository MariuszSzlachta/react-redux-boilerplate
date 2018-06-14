<div align="center">
  <a href="https://github.com/appalaszynski/react-redux-boilerplate">
    <img src="https://user-images.githubusercontent.com/35331661/37395944-d3785364-2777-11e8-9c7b-da795e84a6a6.png" width="145px">
  </a>
  <br>
  <h1>React Redux Boilerplate</h1>
  <p>
    <em>Starter kit for creating apps using React and Redux</em>
  </p>
  <p>
    <a href="https://github.com/appalaszynski/react-redux-boilerplate/stargazers">
      <img src="https://img.shields.io/github/stars/appalaszynski/react-redux-boilerplate.svg" /> 
    </a>
    <a href="https://github.com/appalaszynski/react-redux-boilerplate/commits/master">
      <img src="https://img.shields.io/github/last-commit/appalaszynski/react-redux-boilerplate.svg" />
    </a>
  </p>
  <br>
  <br>
</div>

This is my React boilerplate which I use for building web applications. It was build by me from stratch - I didn't want to use [Create React App](https://github.com/facebook/create-react-app) because I wanted to learn how all this workflow works under the hood.

The boilerplate is based on Webpack. It is responsible for creating HTML document, transpiling ES6+, SASS code and generating SVG sprite.
Built application works as Progressive Web App thanks to [Workbox](https://developers.google.com/web/tools/workbox/) which creates Serveice Worker and [webpack-pwa-manifest](https://github.com/arthurbergmz/webpack-pwa-manifest) which creates `manifest.json` file and all neccessary icons for Android and iOS.

Webpack config is optimized for fast development rebuilds and minified production build.

Some of additional features are Jest + Enzyme, Autoprefixer, ESLint with Airbnb rules. You can find full dependences list in [package.json](https://github.com/appalaszynski/react-redux-boilerplate/blob/master/package.json) file.

The boilerplate is also ready for [Heroku](https://www.heroku.com/) deploy.

---

## Table of Contents

* [Directory Structure](#directory-structure)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Usage](#usage)

---

## Directory Structure

```bash
├── node_modules/                      # 3rd-party libraries and utilities
├── jest/                        
│   ├── cssTransform.js                # Transform stylesheets to empty objects
│   ├── FileTransform.js               # Transform files to its' name string
│   ├── setup.js                       # Enzyme configuration
├── server/                        
│   ├── server.js                      # Express server configuration
├── dist/                              # Compiled output
├── src/                               # Source files
│   ├── assets/                        # Images, icons, sounds etc.
│   ├── axios/                         # Axios instances
│   ├── components/                    # React components
│   ├── containers/                    # React containers
│   ├── store/                         # Redux configuration files
│   │   ├── actions/                   # Actions
│   │   ├── reducers/                  # Reducers
│   │   ├── configureStore.jsx         # Store configuration file
│   ├── styles/                        # Sass files using the 7-1 architecture pattern
│   ├── templates/                     # HTML Webpack Plugin templates
│   ├── App.jsx                        # Root component
│   ├── index.jsx                      # Webpack entry file
│   ├── registerServiceWorker.js       # Service Worker registration function
├── .babelrc                           # Babel configuration
└── .browserslistrc                    # Browserslist configuration
└── .eslintrc.json                     # ESLint configuration
└── jest.config.json                   # Jest configuration
└── package.json                       # List of project dependencies + NPM scripts
└── postcss.config.js                  # Post CSS configuration
└── webpack.config.js                  # Webpack configuration
```

---

## Prerequisites

* [Node.js](https://nodejs.org)
* [NPM](https://github.com/npm/npm)

---

## Installation

Clone the repo and install dependencies.

```bash
$ git clone https://github.com/appalaszynski/react-redux-boilerplate.git MyApp
$ cd MyApp
$ npm install                          
```
---

## Usage

### webpack.config.js

Webpack configuration file is full of comments so you shouldn't have problems with understanding what each of lines of code does.

### Running Development Server

```bash
$ npm run serve:dev                 
```

Then open [http://localhost:8080](http://localhost:8080) to see your app.

### Testing

```bash
$ npm test
$ npm test -- --watch                  # Run Jest in watch mode
```

### Deploying Locally

```bash
$ npm run build:dev                    # Build in development mode
$ npm run build:prod                   # Build in production mode (minified files versions, external stylesheets)
```

### Deploying on Heroku

First You should install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

```bash
$ heroku login                         # Login to Your Heroku account
$ cd MyApp
$ git init                             # Initialize a git repository (ignore if already exists)
$ heroku git:remote -a your-app-name
$ git add .
$ git commit -m "Nice commit message"
$ git push heroku master
```
