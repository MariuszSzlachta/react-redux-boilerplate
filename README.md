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
    <a href="https://github.com/appalaszynski/react-redux-boilerplate/network/members">
      <img src="https://img.shields.io/github/forks/appalaszynski/react-redux-boilerplate.svg" /> 
    </a>
    <a href="https://github.com/appalaszynski/react-redux-boilerplate/commits/master">
      <img src="https://img.shields.io/github/last-commit/appalaszynski/react-redux-boilerplate.svg" />
    </a>
  </p>
  <br>
  <br>
</div>

This template is using, among others, [Autoprefixer](https://github.com/postcss/autoprefixer), [Jest](https://github.com/facebook/jest) with [Enzyme](https://github.com/airbnb/enzyme), [ESLint](https://github.com/eslint/eslint) with [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) and [BrowserSync](https://github.com/BrowserSync/browser-sync). You can find full dependences list in [package.json](https://github.com/appalaszynski/react-redux-boilerplate/blob/master/package.json) file. Project is also ready for [Heroku](https://www.heroku.com/) deploy.

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
├── server/                        
│   ├── server.js                      # Express server configuration
├── public/                            # Compiled output
├── src/                               # Source files
│   ├── assets/                        # Images, icons, sounds etc.
│   ├── axios/                         # Axios instances
│   ├── components/                    # React components
│   ├── containers/                    # React containers
│   ├── store/                         # Redux store files
│   │   ├── actions/                   # Redux actions
│   │   ├── reducers/                  # Redux reducers
│   │   ├── configureStore.jsx         # Redux store configuration file
│   ├── styles/                        # Sass files using the 7-1 architecture pattern
│   ├── templates/                     # HTML Webpack Plugin templates
│   ├── App.jsx                        # Root component
│   ├── index.jsx                      # Main/Webpack entry file
├── .babelrc                           # Babel configuration
└── .browserslistrc                    # Browserslist configuration
└── .eslintrc.json                     # ESLint configuration
└── jest.config.json                   # Jest configuration
└── package.json                       # List of project dependencies + NPM scripts
└── postcss.config.js                  # Post CSS configuration
└── tests.config.js                    # Enzyme configuration
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

### Running Development Server

```bash
$ npm run dev-server                     
```

Then open [http://localhost:3000](http://localhost:3000) to see your app.

### Testing

```bash
$ npm test
$ npm test -- --watch                  # Run Jest in watch mode
```

### Deploying Locally

```bash
$ npm run build:dev                    # Build in development mode
$ npm run build:prod                   # Build in production mode (minified files versions)
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
