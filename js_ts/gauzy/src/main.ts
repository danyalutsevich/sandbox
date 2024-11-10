
console.log('API Core Starting...');

import path from 'path';
import dotenv from 'dotenv';

const backendDir = path.resolve(__dirname, '../');

const envPath = path.resolve(backendDir, '.env');
const envLocalPath = path.resolve(backendDir, '.env.local');

console.log(`Using .env Path: ${envPath} and .env.local Path: ${envLocalPath}`);

dotenv.config({ path: envPath });
dotenv.config({ path: envLocalPath, override: true });


import { bootstrap } from './bootstrap/index.js';
console.log('API Core Bootstrap loaded');

import { devConfig } from './dev-config.js';
console.log('API Core Dev Config loaded');

bootstrap(devConfig)
	.then(() => {
		console.log('API Core is running');
	})
	.catch(async (error) => {
		console.error(error);
		process.exit(1);
	});
