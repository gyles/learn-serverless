import { LogService } from "../service/log-service";

export class LogController {
    private logService: LogService;
    constructor() {
        this.logService = new LogService();
    }

    async createLog(event: any) : Promise<object> {
        try {
            return await this.logService.create(event.body.audit);
        } catch (err) {
            console.error(err);

            throw err;
        }
    }
}
