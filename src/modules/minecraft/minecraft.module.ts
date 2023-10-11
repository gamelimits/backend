import { CronJob } from 'cron';
import { RegisterModule } from '../../common/types/register-module.js';
import { router } from './routes/router.js';
import { updatePlayersUseCase } from './use-cases/update-players.use-case.js';

export const registerMinecraftModule: RegisterModule = (app) => {
  app.http.route('/', router);

  // Crons
  new CronJob('0 * * * *', () => void updatePlayersUseCase(), null, true, 'Europe/Amsterdam', undefined, true);
};
