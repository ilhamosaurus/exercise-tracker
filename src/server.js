const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const init = async () => {
  const listener = app.listen(process.env.PORT || 3400, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  })

  app.set("view engine", "ejs");

  app.use('/api', router);
}

init();