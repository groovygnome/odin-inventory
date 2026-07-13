let express = require('express');
let app = express();
let path = require('node:path');
const mainRoute = require('./routes/main');
const inventoryRoute = require('./routes/inventory');

app.use(express.urlencoded({ extended: true }));

const inventoryDB = require('./storage/inventory');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { inventory: inventory });
});
app.use('/', mainROute);
app.use('/inventory', inventoryRoute);

const PORT = 3000;
app.listen(PORT, (error) => {

    if (error) throw error;

    console.log(`Inventory app running on port ${PORT}`);
});

