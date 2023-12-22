import cron from 'node-cron';
import {UpdateHelper} from "../utils/UpdateHelper";

export class JobService {

    static async init() {
        cron.schedule('*/10 * * * *', async () => {
            await UpdateHelper.update();
        });
    }

}