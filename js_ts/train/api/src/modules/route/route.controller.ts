import { Crud, CrudController } from "@dataui/crud";
import { RouteEntity } from "./route.entity";
import { RouteService } from "./route.service";
import { Controller } from "@nestjs/common";

@Crud({
  model: {
    type: RouteEntity,
  },
  query: {
    softDelete: true,
  },
})
@Controller('route')
export class RouteController implements CrudController<RouteEntity> {
  constructor(public service: RouteService) { }
}
