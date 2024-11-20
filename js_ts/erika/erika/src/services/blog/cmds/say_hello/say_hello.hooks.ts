import { CrudContext, CrudService, CmdHooks } from "@eicrud/core/crud";
import { say_hello } from "./say_hello.action";
import { SayHelloDto, SayHelloReturnDto } from "./say_hello.dto";

export class say_helloHooks extends CmdHooks<SayHelloDto, SayHelloReturnDto> {
    async beforeControllerHook(
        dto: SayHelloDto,
        ctx: CrudContext,
      ): Promise<SayHelloDto> {
        // before say_hello (entry controller)

        return dto;
      }
    
      async afterControllerHook(
        dto: SayHelloDto,
        result: SayHelloReturnDto,
        ctx: CrudContext,
      ): Promise<SayHelloReturnDto> {
        // after say_hello (entry controller)

        return result;
      }
    
      async errorControllerHook(
        dto: SayHelloDto,
        error: any,
        ctx: CrudContext,
      ): Promise<any> {
        // on say_hello error (entry controller)

        return Promise.resolve();
      }
};

export const hooks = new say_helloHooks();

