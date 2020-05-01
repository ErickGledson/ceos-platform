const express = require('express');
const parser = require('body-parser');
const passport = require("passport");
const helmet = require('helmet');
const cors = require('cors');

const app = express();

process.env.JWT_SECRET = '12345';

app.use(cors());
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(helmet());

app.use(passport.initialize());
require("./middlewares/jwt")(passport);
require('./routes')(app);

app.listen(process.env.PORT, () => console.log(`App running in port ${process.env.PORT}`))