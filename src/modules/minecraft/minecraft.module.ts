import { RegisterModule } from '../../common/types/register-module.js';
import { router } from './routes/router.js';

export const registerMinecraftModule: RegisterModule = (app) => {
  app.http.route('/', router);
};
