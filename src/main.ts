import { environment } from './infrastructure/config/environment.js';
import { logger } from './infrastructure/logger/logger.js';

logger.info(`Gamelimits backend running in ${environment.NODE_ENV} mode`);
