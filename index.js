let express = require('express');
let app = express();
let path = require('node:path');
const inventoryRoute = require('./routes/inventory.js');

app.use(express.urlencoded({ extended: true }));

const inventoryDB = require('./storage/inventory');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
    const invRes = await inventoryDB.getAllWeapons();
    let invMap = {};
    for (let weapon of invRes) {
        if (!invMap[weapon.id]) invMap[weapon.id] = { name: weapon.name, ammoType: weapon.ammotype, series: weapon.seriesname, owners: [weapon.ownername] };
        else {
            invMap[weapon.id].owners.push(weapon.ownername);
        }
    }
    let inv = Object.values(invMap);
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

