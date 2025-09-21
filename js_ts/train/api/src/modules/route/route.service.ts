import { TypeOrmCrudService } from "@dataui/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RouteEntity } from "./route.entity";
import { Repository } from "typeorm";


@Injectable()
export class RouteService extends TypeOrmCrudService<RouteEntity> {
  constructor(
    @InjectRepository(RouteEntity)
    repo: Repository<RouteEntity>,
  ) {
    super(repo);
  }
}

