import { OnModuleInit } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
export declare class AppModule implements OnModuleInit {
    private readonly clsService;
    constructor(clsService: ClsService);
    onModuleInit(): void;
}
