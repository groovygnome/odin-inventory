const db = require('../storage/inventory.js');
const pass = process.env.DELETE_PASS;


async function postNew(req, res) {
    await db.postNew(req.body.wName, req.body.series, req.body.ammo, req.body.oName);
    res.redirect('/');
}

async function getWeapon(req, res) {
    const weapons = await db.getWeapon(req.params.weaponId);
    let weapon = {};
    for (let wp of weapons) {
        if (!weapon.id) weapon = { id: wp.id, name: wp.name, ammoType: wp.ammotype, series: wp.seriesname, owners: [wp.ownername] };
        else {
            weapon.owners.push(wp.ownername);
        }
    }
    console.log(weapon);
    res.render('detail', { weapon: weapon });
}

async function getSeries(req, res) {
    const series = await db.getSeries(req.params.seriesName);
    res.render('series', { series: series });
}

async function deleteWeapon(req, res) {
    let attempt = process.env.DELETE_PASS;
    if (attempt === pass) {
        await db.deleteWeapon(req.params.weaponId);
        res.redirect('/');
    } else {
        //alert('Incorrect password');
    }
}

module.exports = { postNew, getWeapon, deleteWeapon, getSeries };
