import { SuperClientConfig, ClientOptions, CrudClient } from "@eicrud/client";
import { ICrudOptions } from "@eicrud/shared/interfaces";
import { Email } from "./email.entity";


export class EmailClient extends CrudClient<Email> {
  constructor(config: SuperClientConfig) {
    super({...config, serviceName: 'email'});
  }
  // GENERATED START
}