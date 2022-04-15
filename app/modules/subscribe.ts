import schedule from 'node-schedule';
import { redisNode } from '../../config/index'; // 引入配置文件
import fast from '../filter/fast';
(() => {
  schedule.scheduleJob(
    { dayOfWeek: 1, hour: 3, minute: 0, second: 0 },
    async () => {
      fast.clog('warn', ['定时任务']);
    }
  );
})();
