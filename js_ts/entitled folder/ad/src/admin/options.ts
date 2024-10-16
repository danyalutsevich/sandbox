import AdminJS, { AdminJSOptions } from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';
import * as Entities from '../db/entities/index.js';

import componentLoader from './component-loader.js';

AdminJS.registerAdapter({ Database, Resource });

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: Object.values(Entities),
  databases: [],
};

export default options;
