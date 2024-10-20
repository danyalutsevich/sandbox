import { registerAs } from '@nestjs/config';
import { IJiraIntegrationConfig } from '../../../common/dist/index';

/**
 * Register Jira configuration using @nestjs/config
 */
export default registerAs(
	'jira',
	(): IJiraIntegrationConfig => ({
		appName: process.env.GAUZY_JIRA_APP_NAME,
		appDescription: process.env.GAUZY_JIRA_APP_DESCRIPTION,
		appKey: process.env.GAUZY_JIRA_APP_KEY,
		baseUrl: process.env.GAUZY_JIRA_APP_BASE_URL,
		vendorName: process.env.GAUZY_JIRA_APP_BASE_VENDOR_NAME,
		vendorUrl: process.env.GAUZY_JIRA_APP_BASE_VENDOR_URL
	})
);
