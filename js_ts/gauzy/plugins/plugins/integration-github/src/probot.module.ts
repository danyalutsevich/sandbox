import { DiscoveryModule } from '@nestjs/core';
import { DynamicModule, Module } from '@nestjs/common';
import {
	ProbotModuleOptions,
	ModuleProviders,
	ProbotModuleAsyncOptions,
} from './probot.types.js';
import { ProbotDiscovery } from './probot.discovery.js';
import { getControllerClass } from './hook.controller.js';
import { HookMetadataAccessor } from './hook-metadata.accessor.js';
import { OctokitService } from './octokit.service.js';

@Module({
	imports: [DiscoveryModule]
})
export class ProbotModule {
	/**
	 * Register the Probot module.
	 * @param options - Configuration options for the Probot module.
	 * @returns A dynamic module configuration.
	 */
	static forRoot(options: ProbotModuleOptions): DynamicModule {
		const HookController = getControllerClass({ path: options.path });
		return {
			global: options.isGlobal || true,
			module: ProbotModule,
			controllers: [HookController],
			providers: [
				{
					provide: ModuleProviders.ProbotConfig,
					useFactory: () => options.config,
				},
				HookMetadataAccessor,
				ProbotDiscovery,
				OctokitService,
			],
			exports: [OctokitService],
		};
	}

	/**
	 * Register the Probot module asynchronously.
	 * @param options - Configuration options for the Probot module.
	 * @returns A dynamic module configuration.
	 */
	static forRootAsync(options: ProbotModuleAsyncOptions): DynamicModule {
		const HookController = getControllerClass({ path: options.path });
		return {
			module: ProbotModule,
			global: options.isGlobal || true,
			controllers: [HookController],
			providers: [
				{
					provide: ModuleProviders.ProbotConfig,
					useFactory: options.useFactory,
					inject: options.inject || [],
				},
				HookMetadataAccessor,
				ProbotDiscovery,
				OctokitService,
			],
			exports: [OctokitService],
		};
	}
}
