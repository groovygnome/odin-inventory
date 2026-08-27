import pool from './pool.js'

async function getSomething(param) {
    const { rows } = await pool.query(`SELECT * from inventory WHERE $1`, [param]);
    return rows
}

export default { getSomething }
