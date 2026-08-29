const db = require('../storage/inventory.js');

async function getSomething(req, res) {
    const ans = await db.getSomething(req.params.something);
    res.json(ans);
}

module.exports = { getSomething };
