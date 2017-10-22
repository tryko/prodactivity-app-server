# prodactivity-app-server

configure development tools:

* nodemon
* morgan

more tools:

files             | packages
------------------|---------
.babelrc          | dev:[babel-core,babel-loader,babel-plugin-transform-object-rest-spread,babel-preset-env]
.editorconfing    | vscode extension
.elist            | dev: [ elist, eslint-config-airbnb ]
webpack.config.js | dev: [ webpack, webpack-node-externals]  

** 01 connect to mongo and do get request **
* mongo with mongoose connected.
* Added model schema.
* Added Body Parser, not being used yet.
* made a get request(no async )

*** Next: ***
* improve operations with async await
* add post 
* add put
* fix closing connections to mongodb
