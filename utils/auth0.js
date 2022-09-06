import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  baseURL: process.env.AUTH0_BASE_URL,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,

  //   scope: "openid profile",
  authorizationParams: {
    scope: "openid profile",
  },

  //   redirectUri: "http://localhost:3000/api/callback",
  //   postLogoutRedirectUri: "http://localhost:3000/",
  routes: {
    callback: "/api/auth/callback",
    postLogoutRedirect: "/",
  },

  // The secret used to encrypt the cookie.
  secret: process.env.AUTH0_SECRET,
});
