import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import * as Entities from '../db/entities/index.js';
import componentLoader from './component-loader.js';
AdminJS.registerAdapter({ Database, Resource });
const options = {
    componentLoader,
    rootPath: '/admin',
    resources: Object.values(Entities),
    databases: [],
};
export default options;
//# sourceMappingURL=options.js.map