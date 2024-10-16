import { ConfigService } from '../plugins/config';
import { ServeStaticModuleOptions } from '@nestjs/serve-static';
export declare function resolveServeStaticPath(configService: ConfigService): Promise<ServeStaticModuleOptions[]>;
