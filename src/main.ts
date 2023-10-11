import { serve } from '@hono/node-server';
import { environment } from './infrastructure/config/environment.js';
import { logger } from './infrastructure/logger/logger.js';
import { http } from './infrastructure/http/http.js';
import { registerMinecraftModule } from './modules/minecraft/minecraft.module.js';
import { registerMaintenanceModule } from './modules/maintenance/maintenance.module.js';

registerMaintenanceModule({ http });
registerMinecraftModule({ http });

serve({ fetch: http.fetch, port: environment.HTTP_PORT }, (info) => {
  logger.info(`Listening on ${info.address}:${info.port}`);
});
