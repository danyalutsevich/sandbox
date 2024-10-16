import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { EICRUDModule } from '@eicrud/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Blog } from './blog.entity';
import { MyConfigService } from '../../eicrud.config.service';
import { CRUD_CONFIG_KEY } from '@eicrud/core/config';

describe('AppController', () => {
  let myService: BlogService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          entities: [Blog],
          driver: PostgreSqlDriver,
          dbName: 'test-blog',
        }),
        EICRUDModule.forRoot(),
      ],
      providers: [
        BlogService,
        {
          provide: CRUD_CONFIG_KEY,
          useClass: MyConfigService,
        },
      ],
    }).compile();

    myService = app.get<BlogService>(BlogService);
  });

  describe('root', () => {
    it('should be defined"', () => {
      expect(myService).toBeDefined();
    });
  });
});
