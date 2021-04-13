const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');

// Create a new sequelize store using the express-session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create the express server
const app = express();
const PORT = process.env.PORT || 3001;

// Script to activate and link Cloudinary to cloudinary server files
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
  cloud_name: 'superman123', 
  api_key: '578184698914981', 
  api_secret: 'dmxZDvNfTwoH5GxYth4zrHfGloM' 
});

//Will integrate handlebars helpers
const hbs = exphbs.create({ helpers });

// Configure and link a session object with the sequelize store
const sess = {
  secret: 'secret for group 3',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

//Integrates Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Integrates the Express functionality
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//calls routes
app.use(routes);

//Runs the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on ', PORT));
});
