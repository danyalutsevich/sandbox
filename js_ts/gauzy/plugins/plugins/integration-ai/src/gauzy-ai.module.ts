import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { GauzyAIService } from './gauzy-ai.service.js';
import gauzyAI from './config/gauzy-ai.js';
import { IConfigurationOptions } from './configuration.interface.js';
import { RequestConfigProvider } from './request-config.provider.js';
import { GAUZY_AI_CONFIG_OPTIONS } from './constants.js';

@Module({
	imports: [
		HttpModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				baseURL: config.get<string>('guazyAI.gauzyAIRESTEndpoint'),
				timeout: config.get<number>('guazyAI.gauzyAIRequestTimeout'),
				maxRedirects: 5,
				headers: {
					'Content-Type': 'application/json',
					apiKey: config.get<string>('guazyAI.gauzyAiApiKey'),
					apiSecret: config.get<string>('guazyAI.gauzyAiApiSecret'),
				},
			}),
			inject: [ConfigService],
		}),
		ConfigModule.forFeature(gauzyAI), // Make sure to import ConfigModule here
	],
	controllers: [],
	providers: [
		GauzyAIService,
		RequestConfigProvider,
	],
	exports: [
		GauzyAIService,
		RequestConfigProvider,
	],
})
export class GauzyAIModule {
	/**
	 *
	 * @param options
	 * @returns
	 */
	static forRoot(options?: IConfigurationOptions): DynamicModule {
		return {
			module: GauzyAIModule,
			imports: [
				ConfigModule, // Make sure to import ConfigModule here
			],
			providers: [
				{
					provide: GAUZY_AI_CONFIG_OPTIONS,
					useFactory: (config: ConfigService): IConfigurationOptions => ({
						apiKey: config.get<string>('guazyAI.gauzyAiApiKey'),
						apiSecret: config.get<string>('guazyAI.gauzyAiApiSecret'),
						...options,
					}),
					inject: [ConfigService],
				},
			],
			exports: [
				GAUZY_AI_CONFIG_OPTIONS
			],
		};
	}
}
