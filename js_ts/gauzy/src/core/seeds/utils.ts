import { ApplicationPluginConfig } from '../../../plugins/common/dist/index';
import { environment as env } from '../../../plugins/config/dist/index';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import rimraf from 'rimraf';

/**
 * Copy ever icons
 *
 * @param fileName
 * @param config
 * @returns
 */
export function copyAssets(filename: string, config: Partial<ApplicationPluginConfig>, destDir: string = 'ever-icons') {
	try {
		const dir = env.isElectron
			? path.join(env.gauzySeedPath, destDir)
			: path.join(config.assetOptions.assetPath, ...['seed', destDir]) ||
			path.resolve(__dirname, '../../../', ...['apps', 'api', 'src', 'assets', 'seed', destDir]);

		const baseDir = env.isElectron
			? path.resolve(env.gauzyUserPath, ...['public'])
			: config.assetOptions.assetPublicPath || path.resolve(__dirname, '../../../', ...['apps', 'api', 'public']);
		const filepath = filename.replace(/\\/g, '/');
		// create folders all the way down
		const folders = filepath.split('/').slice(0, -1); // remove last item, filename
		folders.reduce((acc, folder) => {
			const folderPath = path.join(acc, folder);
			if (!fs.existsSync(folderPath)) {
				fs.mkdirSync(folderPath, { recursive: true });
			}
			return folderPath;
		}, path.join(baseDir, destDir));

		// copy files from source to destination folder
		const destFilePath = path.join(destDir, filename);
		fs.copyFileSync(path.join(dir, filename), path.join(baseDir, destFilePath));
		return destFilePath;
	} catch (error) {
		console.log('Error while copy ever icons for seeder', error);
	}
}

/**
 * Clean old ever icons
 *
 * @param config
 * @param destDir
 */
export async function cleanAssets(config: Partial<ApplicationPluginConfig>, destDir: string) {
	console.log(chalk.green(`CLEANING UP SEED ASSETS FOR ${destDir}`));
  
	try {
	  const dir = env.isElectron
		? path.resolve(env.gauzyUserPath, ...['public', destDir])
		: path.join(config.assetOptions.assetPublicPath, destDir);
  
	  // delete old generated ever icons
	  await new Promise<void>((resolve, reject) => {
		// Update rimraf usage
		rimraf(dir, (err) => {
		  if (err) {
			console.error('Error while cleaning up ever icons', err);
			reject(err);
		  } else {
			console.log(chalk.green(`CLEANED UP SEED ASSETS`));
			resolve();
		  }
		});
	  });
	} catch (error) {
	  console.error('Error while cleaning up ever icons', error);
	}
}

/**
 * Takes an email string, converts it to lowercase, and appends a postfix "_ever_testing" before the "@" symbol.
 *
 * @param email The email address to modify.
 * @param postfix The postfix to append (default is "_ever_testing").
 * @returns The modified email address with the postfix appended before the "@" symbol.
 */
export function getEmailWithPostfix(email: string, postfix = '_ever_testing'): string {
	const atIndex = email.indexOf('@');
	if (atIndex === -1) {
		// If "@" symbol not found, return original email
		return email;
	}
	const localPart = email.slice(0, atIndex); // Extract local part before "@"
	const domainPart = email.slice(atIndex); // Extract domain part including "@"
	const lowercaseLocalPart = localPart.toLowerCase();
	return lowercaseLocalPart + postfix + domainPart;
}
