const models = require('./models');
const routes = require('./routes');
const app = require('express')();






models.db.sync({})
.then( _ => models.User.sync({}))
.then( _ => models.Page.sync({}))
.then( _ => {
    app.listen(3000, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);
