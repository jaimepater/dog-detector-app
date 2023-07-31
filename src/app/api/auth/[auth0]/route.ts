import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  onError(req: Request, error: Error) {
    console.error(error);
  },
  login: handleLogin({
    authorizationParams: {
      audience: process.env.AUTH0_AUDIENCE, // or AUTH0_AUDIENCE
      // Add the `offline_access` scope to also get a Refresh Token
      scope: 'openid profile email', // or AUTH0_SCOPE
    },
  }),
});
