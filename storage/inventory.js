const pool = require('./pool.js')

async function getWeapon(weaponId) {
    const { rows } = await pool.query(`SELECT weapons.id, weapons.name, weapons.ammotype, series.name AS seriesName, owner.name AS ownerName FROM weapons 
        JOIN series ON weapons.seriesid = series.id 
        JOIN ownerhistory ON weapons.id = ownerhistory.weaponid 
        JOIN owner ON owner.id = ownerHistory.ownerid
    WHERE weapons.id = ($1)`, [weaponId]);
    return rows;
}

async function getSeries(seriesName) {
    const rows = await pool.query(`SELECT weapons.id, weapons.name, weapons.ammotype, series.name AS seriesName, owner.name AS ownerName FROM weapons 
        JOIN series ON weapons.seriesid = series.id 
        JOIN ownerhistory ON weapons.id = ownerhistory.weaponid 
        JOIN owner ON owner.id = ownerHistory.ownerid
    WHERE series.name = ($1)`, [seriesName]);
    return rows;

}

async function getWeapons(filter = '') {
    if (filter === '') {
        const { rows } = await pool.query(`
    SELECT weapons.id, weapons.name, weapons.ammotype, series.name AS seriesName, owner.name AS ownerName, series.id AS seriesId FROM weapons 
        JOIN series ON weapons.seriesid = series.id 
        JOIN ownerhistory ON weapons.id = ownerhistory.weaponid 
        JOIN owner ON owner.id = ownerHistory.ownerid`);
        return rows;
    } else {
        const { rows } = await pool.query(`
    SELECT weapons.id, weapons.name, weapons.ammotype, series.name AS seriesName, owner.name AS ownerName, series.id AS seriesId FROM weapons
        WHERE series.id = ($1)
        JOIN series ON weapons.seriesid = series.id 
        JOIN ownerhistory ON weapons.id = ownerhistory.weaponid 
        JOIN owner ON owner.id = ownerHistory.ownerid`, [filter]);
        return rows;
    }
}

async function postNew(wName, series, ammo, oNames) {
    if (!Array.isArray(oNames)) oNames = [oNames]
    let check = await pool.query('SELECT * FROM series WHERE name = ($1)', [series]);
    let id;
    let result;
    if (check.rows.length === 0) {
        let result = await pool.query('INSERT INTO series (name) VALUES ($1) RETURNING id', [series]);
        id = result.rows[0].id;
    } else {
        id = check.rows[0].id;
    }
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

async function deleteWeapon(wId) {
    let result = await pool.query('DELETE FROM ownerhistory WHERE weaponid = ($1) RETURNING ownerid', [wId]);

    const remoIds = result.rows.map(row => row.ownerid);
    result = await pool.query('SELECT ownerid FROM ownerhistory');
    const currIds = result.rows.map(row => row.ownerid);
    for (let remoid of remoIds) {
        if (!currIds.includes(remoid)) {
            await pool.query('DELETE FROM owner WHERE id = ($1)', [remoid]);
        }
    }

    result = await pool.query('DELETE FROM weapons WHERE id = ($1) RETURNING seriesid', [wId]);
    const seriesid = result.rows[0].seriesid;
    const seriesCheck = await pool.query('SELECT * FROM weapons WHERE seriesId = ($1)', [seriesId]);
    if (seriesCheck.rows.length === 0) {
        await pool.query('DELETE FROM series WHERE id = ($1)', [seriesid]);
    }
}

async function deleteSeries(sId) {
    let result = await pool.query('SELECT * FROM weapons WHERE seriesid = ($1)', [sId]);

    console.log(result.rows);
}

module.exports = { getWeapon, getSeries, getWeapons, postNew, deleteWeapon, deleteSeries }
