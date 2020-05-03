const express = require('express');
const parser = require('body-parser');
const passport = require("passport");
const helmet = require('helmet');
const cors = require('cors');
const cron = require('node-cron');

const app = express();

process.env.JWT_SECRET = '12345';

app.use(cors());
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(helmet());

app.use(passport.initialize());
require("./middlewares/jwt")(passport);
require('./routes')(app);

// habilita o cron que chama o chatbot, que chega mensagens de 5 em 5 segundos...
//const processCron = require('./chatbot/process');
//cron.schedule("5 * * * * *", processCron.awnsers);

app.listen(process.env.PORT, () => console.log(`App running in port ${process.env.PORT}`))