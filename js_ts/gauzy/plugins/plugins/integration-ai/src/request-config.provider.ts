import { Inject, Injectable } from '@nestjs/common';
import * as configurationInterfaceJs from './configuration.interface.js';
import { GAUZY_AI_CONFIG_OPTIONS } from './constants.js';

@Injectable()
export class RequestConfigProvider {

    private defaultConfig: configurationInterfaceJs.IConfigurationOptions = new Object();
    private config: configurationInterfaceJs.IConfigurationOptions = new Object();

    constructor(
        @Inject(GAUZY_AI_CONFIG_OPTIONS)
        protected readonly options: configurationInterfaceJs.IConfigurationOptions
    ) {
        this.setDefaultConfig(options);
        this.resetConfig();
    }

    /**
     * Set the default configuration options.
     * @param defaultConfig - The default configuration options to set.
     */
    setDefaultConfig(defaultConfig: configurationInterfaceJs.IConfigurationOptions) {
        this.defaultConfig = defaultConfig;
    }

    /**
     * Reset the configuration options to the default values.
     */
    resetConfig() {
        this.config = { ...this.defaultConfig };
    }

    /**
     * Set the configuration options.
     * @param config - The configuration options to set.
     */
    setConfig(config: configurationInterfaceJs.IConfigurationOptions) {
        this.config = { ...this.defaultConfig, ...config };
    }

    /**
     * Get the current configuration options.
     * @returns The current configuration options.
     */
    getConfig(): configurationInterfaceJs.IConfigurationOptions {
        return this.config;
    }
}
