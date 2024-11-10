export function createBetterAuthService(options, callback) {
    import("better-auth").then((authInstance) => {
        const auth = authInstance.betterAuth({
            ...options,
        });
        callback(auth);
    });
}
export async function toNestJsController(authService, request, response) {
    const { toNodeHandler } = await import("better-auth/node");
    try {
        const authHandler = toNodeHandler(authService.auth);
        return authHandler(request, response);
    }
    catch (error) {
        console.log(error);
    }
}
//# sourceMappingURL=auth.js.map