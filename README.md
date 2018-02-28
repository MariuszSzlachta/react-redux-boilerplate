# React Boilerplate

**React Boilerplate** is my template (aka Boilerplate) for building web applications with [React.js](https://github.com/facebook/react), using:
* [Router](https://github.com/ReactTraining/react-router)
* [Redux](https://github.com/reactjs/redux)
* [Webpack](https://github.com/webpack)
* [Babel](https://github.com/babel/babel)
* [Sass](https://github.com/sass/sass)
* [Express](https://github.com/expressjs/express)

Template is also ready for [Heroku](https://www.heroku.com/) deploy.

Project includes 5 example routes (Home, About, Counter, List and 404 Not Found page). Two of them are simple apps using Redux store. In **Counter** You can simply increment, decrement or reset the counter, in **List** You can add or remove items.

<img src="https://user-images.githubusercontent.com/35331661/36776821-748e7088-1c67-11e8-89de-a4183fad39fc.png" alt="react boilerplate banner" align="center" />

### Directory Layout

```bash
├── node_modules/                      # 3rd-party libraries and utilities
├── server/                        
│   ├── server.js/                     # Express server configuration
├── public/                            # Compiled output
├── src/                               # Application source code
│   ├── actions/                       # Redux actions
│   ├── components/                    # React components
│   ├── reducers/                      # Redux reducers
│   ├── routers/                       # React routers
│   ├── store/                         # Redux store configuration
│   ├── styles/                        # Sass files using  the 7-1 architecture pattern
│   ├── templates/                     # HTML Webpack Plugin templates
│   ├── app.jsx                        # Main file
├── .babelrc                           # Babel configuration
└── package.json                       # The list of project dependencies + NPM scripts
└── webpack.config.js                  # Webpack configuration
```

### Prerequisites

* [Node.js](https://nodejs.org) 
* [NPM](https://github.com/npm/npm)

### Getting Started

Clone the repo, run Webpack Dev Server, and start coding!

```bash
$ git clone https://github.com/appalaszynski/react-boilerplate.git MyApp
$ cd MyApp
$ npm install                          
$ npm run dev-server
```

Then open [http://localhost:8080](http://localhost:8080) to see your app.

### How to Deploy Locally

```bash
$ npm run build:prod
```

### How to Deploy on Heroku

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
