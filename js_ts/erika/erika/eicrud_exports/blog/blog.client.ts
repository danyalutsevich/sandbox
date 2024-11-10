import { SuperClientConfig, ClientOptions, CrudClient } from "@eicrud/client";
import { ICrudOptions } from "@eicrud/shared/interfaces";
import { Blog } from "./blog.entity";


export class BlogClient extends CrudClient<Blog> {
  constructor(config: SuperClientConfig) {
    super({...config, serviceName: 'blog'});
  }
  // GENERATED START
}