const db = require('../storage/inventory.js');

async function postNew(req, res) {
    await db.postNew(req.body.wName, req.body.series, req.body.ammo, req.body.oName);
    res.redirect('/');
}

module.exports = { postNew };
