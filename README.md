# React Boilerplate

**React Boilerplate** is my template (aka, boilerplate) for building web applications with [React.js](https://github.com/facebook/react), using:
* [Router](https://github.com/ReactTraining/react-router)
* [Redux](https://github.com/reactjs/redux)
* [Webpack](https://github.com/webpack)
* [Babel](https://github.com/babel/babel)
* [Sass](https://github.com/sass/sass)
* [Express](https://github.com/expressjs/express)

Template is also ready for [Heroku](https://www.heroku.com/) deploy.

### Directory Layout

```bash
├── node_modules/                      # 3rd-party libraries and utilities
├── server/                        
│   ├── server.js/                     # Express server configuration
├── public/                            # Compiled output
├── src/                               # Application source code
│   ├── actions/                       # Redux actions
│   ├── components/                    # Shared React components
│   ├── reducers/                      # Redux reducers
│   ├── routers/                       # React routers
│   ├── store/                         # Redux store configuration
│   ├── styles/                        # Sass files with 7-1 pattern structure
│   ├── app.jsx                        # Main file
├── .babelrc                           # Babel configuration
└── package.json                       # The list of project dependencies + NPM scripts
└── webpack.config.js                  # Webpack configuration
```

### Prerequisites

* [Node.js](https://nodejs.org) 
* [NPM](https://github.com/npm/npm)
* [VS Code](https://github.com/Microsoft/vscode) editor (preferred)

### Getting Started

Clone the repo, run Webpack Dev Server, and start coding:

```bash
$ git clone https://github.com/appalaszynski/react-boilerplate.git MyApp
$ cd MyApp
$ npm install                          
$ npm run dev-server
```

Then open [http://localhost:8080/](http://localhost:8080/) to see your app.

### How to Deploy Locally

```bash
$ npm run build:prod                   # Build the app and deploy to production
```

### How to Deploy on Heroku

```bash
$ heroku login                         # Login to Your Heroku account
$ cd MyApp
$ git init                             # Initialize a git repository (ignore if already exists)
$ heroku git:remote -a decide-now-ap
$ git add .
$ git commit -m "Nice commit message"
$ git push heroku master
```
