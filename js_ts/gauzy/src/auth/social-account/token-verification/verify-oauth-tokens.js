"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyFacebookToken = exports.verifyTwitterToken = exports.verifyGoogleToken = exports.verifyGithubToken = void 0;
const index_1 = require("../../../../plugins/contracts/dist/index");
const rxjs_1 = require("rxjs");
async function verifyGithubToken(httpService, token) {
    const [userResponse, emailsresponse] = await Promise.all([
        (0, rxjs_1.firstValueFrom)(httpService.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${token}`
            }
        })),
        (0, rxjs_1.firstValueFrom)(httpService.get('https://api.github.com/user/emails', {
            headers: {
                Authorization: `token ${token}`
            }
        }))
    ]);
    const email = emailsresponse.data.find((email) => email.primary).email;
    return {
        ...userResponse.data,
        email,
        provider: index_1.ProviderEnum.GITHUB
    };
}
exports.verifyGithubToken = verifyGithubToken;
async function verifyGoogleToken(httpService, token) {
    const response = await (0, rxjs_1.firstValueFrom)(httpService.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`));
    return { ...response.data, provider: index_1.ProviderEnum.GOOGLE };
}
exports.verifyGoogleToken = verifyGoogleToken;
async function verifyTwitterToken(httpService, token) {
    const response = await (0, rxjs_1.firstValueFrom)(httpService.get('https://api.twitter.com/2/me', {
        headers: { Authorization: `Bearer ${token}` }
    }));
    return { ...response.data, provider: index_1.ProviderEnum.TWITTER };
}
exports.verifyTwitterToken = verifyTwitterToken;
async function verifyFacebookToken(httpService, token) {
    const response = await (0, rxjs_1.firstValueFrom)(httpService.get(`https://graph.facebook.com/me?access_token=${token}`));
    return { ...response.data, provider: index_1.ProviderEnum.FACEBOOK };
}
exports.verifyFacebookToken = verifyFacebookToken;
// Add other provider verification signatures
//# sourceMappingURL=verify-oauth-tokens.js.map