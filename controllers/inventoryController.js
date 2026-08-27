import db from '../storage/inventory';

async function getSomething(req, res) {
    const ans = await db.getSomething(req.params.something);
    res.json(ans);
}

export default { getSomething };
