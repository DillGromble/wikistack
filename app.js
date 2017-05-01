const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const volleyball = require('volleyball');
const models = require('./models');
const routes = require('./routes');

app.use(volleyball);

app.use(express.static('public'));

app.use('/', routes);


models.db.sync({})
.then( _ => models.User.sync({}))
.then( _ => models.Page.sync({}))
.then( _ => {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000....');
    });
})
.catch(console.error);


app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views');
