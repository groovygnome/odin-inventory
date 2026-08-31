let express = require('express');
let app = express();
let path = require('node:path');
const inventoryRoute = require('./routes/inventory.js');

app.use(express.urlencoded({ extended: true }));

const inventoryDB = require('./storage/inventory');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

console.log(inventoryDB);

app.get('/', async (req, res) => {
    const inv = await inventoryDB.getAllWeapons();
    console.log(inv);
    res.render('index', { inventory: inv });
});
app.get('/new', (req, res) => {
    res.render('new');
});
app.use('/inventory', inventoryRoute);

const PORT = 3000;
app.listen(PORT, (error) => {

    if (error) throw error;

    console.log(`Inventory app running on port ${PORT}`);
});

