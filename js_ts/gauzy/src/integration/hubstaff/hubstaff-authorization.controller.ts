import { Controller, Get, HttpException, HttpStatus, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ConfigService } from '../../../plugins/config/dist/index';
import { IHubstaffConfig, Public } from '../../../plugins/common/dist/index';
import { IntegrationEnum } from '../../../plugins/contracts';

@ApiTags('Hubstaff Integrations')
@Public()
@Controller()
export class HubstaffAuthorizationController {
    constructor(
        private readonly _config: ConfigService
    ) { }

    /**
    * Handle the callback from the Hubstaff integration.
    *
    * @param {any} query - The query parameters from the callback.
    * @param {Response} response - Express Response object.
    */
    @Get('callback')
    async hubstaffIntegrationCallback(
        @Query() query: any,
        @Res() response: Response
    ) {
        try {
            // Validate the input data (You can use class-validator for validation)
            if (!query || !query.code || !query.state) {
                throw new HttpException('Invalid query parameters', HttpStatus.BAD_REQUEST);
            }

            /** Hubstaff Config Options */
            const hubstaff = this._config.get<IHubstaffConfig>('hubstaff') as IHubstaffConfig;

            /** Construct the redirect URL with query parameters */
            const urlParams = new URLSearchParams();
            urlParams.append('code', query.code);
            urlParams.append('state', query.state);

            /** Redirect to the URL */
            return response.redirect(`${hubstaff.postInstallUrl}?${urlParams.toString()}`);
        } catch (error) {
            // Handle errors and return an appropriate error response
            throw new HttpException(`Failed to add ${IntegrationEnum.HUBSTAFF} integration: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
