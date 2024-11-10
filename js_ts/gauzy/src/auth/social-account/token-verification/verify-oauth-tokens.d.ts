import { HttpService } from '@nestjs/axios';
export declare function verifyGithubToken(httpService: HttpService, token: string): Promise<any>;
export declare function verifyGoogleToken(httpService: HttpService, token: string): Promise<any>;
export declare function verifyTwitterToken(httpService: HttpService, token: string): Promise<any>;
export declare function verifyFacebookToken(httpService: HttpService, token: string): Promise<any>;
