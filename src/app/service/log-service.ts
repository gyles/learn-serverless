const db = require("./mysql");

export class LogService {

    async create(log: object): Promise<object> {
        try {
            let results = await db.query({sql: 'SELECT * FROM logs', timeout:2000});
            await db.quit();

            return results;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

}
