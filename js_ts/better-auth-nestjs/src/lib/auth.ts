import { BetterAuthService } from "../better-auth.service.js";
import { BetterAuthOptions } from "better-auth";

export function createBetterAuthService(
  options: BetterAuthOptions,
  callback: (auth: any) => void
) {
  import("better-auth").then((authInstance) => {
    const auth = authInstance.betterAuth({
      ...options,
    });
    callback(auth);
  });
}

// export async function createBetterAuthServiceAsync(options: BetterAuthOptions) {
//   const authInstance = await import("better-auth");
//   const auth = authInstance.betterAuth({
//     ...options,
//   });
//   return auth;
// }

export async function toNestJsController(
  authService: BetterAuthService,
  request: Request,
  response: Response
) {
  const { toNodeHandler } = await import("better-auth/node");

  try {
    const authHandler = toNodeHandler(authService.auth);
    return authHandler(request as any, response as any);
  } catch (error) {
    console.log(error);
  }
}
