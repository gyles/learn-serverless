import { ServerlessMysql } from "serverless-mysql";

const db: ServerlessMysql = require("../configuration/mysql.config");
const query_timeout : number = 2000;

export class SynchronousService implements LogService {

    async create(items: object[]): Promise<object> {
        const logSql = 'INSERT INTO log(created, user_id, `action`, url) VALUES (?, ?, ?, ?)';
        const payloadSql = 'INSERT INTO payload(log_id, item_id, amount) VALUES (?, ?, ?)';

        try {
            const transaction = db.transaction();
            items.forEach(item => {
                transaction
                    .query(logSql, [item["created"], item["userId"], item["action"], item["url"]])
                    .query(r => {
                        if (r.affectedRows > 0 && item["payload"]) {
                            return [payloadSql, [r.insertId, item["payload"].itemId, item["payload"].amount]];
                        }
                        return null;
                    })
                    .rollback(e => console.log(e))
            })

            return await transaction.commit();
        } finally {
            await db.quit(); // https://github.com/jeremydaly/serverless-mysql/issues/61
        }
    }

    async find(rsql: string): Promise<object> {
        const filter = this.parse(rsql);
        const sql = 'SELECT created, user_id as userId, action, url, item_id as itemId, amount ' +
            'FROM log l left join payload p on l.id = p.log_id' + filter;

        try {
            const results = await db.query<any>({
                sql: sql,
                timeout: query_timeout
            });

            return results.map(r => {
                let { itemId, amount, ...item } = r;
                let { created, userId, action, url, ...payload } = r;
                if (payload.itemId && payload.amount) {
                    item.payload = payload;
                }
                return item;
            });
        } finally {
            await db.quit(); // https://github.com/jeremydaly/serverless-mysql/issues/61
        }
    }

    /** To replace with proper RSQL parser */
    private parse(rsql: string) {
        let where: string = '';
        if (rsql) {
            const userId = /userId==["]*([\w-]+)["]*[&]*/.exec(rsql);
            if (userId && userId[1]) {
                where += ` WHERE user_id = \'${userId[1]}\'`;
            }
        }

        return where;
    }
}
