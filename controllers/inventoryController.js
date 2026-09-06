const db = require('../storage/inventory.js');
const pass = process.env.DELETE_PASS;


async function postNew(req, res) {
    await db.postNew(req.body.wName, req.body.series, req.body.ammo, req.body.oName);
    res.redirect('/');
}

async function getWeapon(req, res) {
    const weapon = await db.getWeapon(req.body.weaponId);
    res.redirect('detail', { weapon: weapon });
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

module.exports = { postNew, getWeapon, deleteWeapon };
