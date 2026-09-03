const pool = require('./pool.js')

async function getSomething(param) {
    const { rows } = await pool.query(`SELECT * from inventory WHERE $1`, [param]);
    return rows
}

async function getAllWeapons() {
    const { rows } = await pool.query(`
    SELECT weapons.id, weapons.name, weapons.ammotype, series.name AS seriesName, owner.name AS ownerName FROM weapons 
        JOIN series ON weapons.seriesid = series.id 
        JOIN ownerhistory ON weapons.id = ownerhistory.weaponid 
        JOIN owner ON owner.id = ownerHistory.ownerid`);
    return rows;
}

async function postNew(wName, series, ammo, oNames) {
    let result = await pool.query('INSERT INTO series (name) VALUES ($1) RETURNING id', [series]);
    let id = result.rows[0].id;
    result = await pool.query('INSERT INTO weapons (name, seriesid, ammotype) VALUES ($1, $2, $3) RETURNING id', [wName, id, ammo]);
    id = result.rows[0].id;
    const ownerIds = []
    for (let name of oNames) {
        result = await pool.query('INSERT INTO owner (name) VALUES ($1) RETURNING id', [name]);
        ownerIds.push(result.rows[0].id);
    }
    for (let oid of ownerIds) {
        await pool.query('INSERT INTO ownerhistory (weaponid, ownerid) VALUES ($1, $2)', [id, oid]);
    }
}

module.exports = { getSomething, getAllWeapons, postNew }
