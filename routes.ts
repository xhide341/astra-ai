/**
 * Routes that are accessible to everyone, including unauthenticated users.
 * @type {string[]}
**/  
export const publicRoutes = [
    "/",
    "/auth/new-verification",
];

/**
 * Routes that are only accessible to authenticated users.
 * @type {string[]}
**/  
export const protectedRoutes = [
    "/chat"
];

/**
 * Routes that are related to authentication.
 * @type {string[]}
**/  
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset-password",
    "/auth/new-password"
];

/**
 * The prefix for API routes that are related to authentication.
 * @type {string}
**/  
export const apiAuthPrefix = "/api/auth";

/**
 * The default login redirect route.
 * @type {string}
**/  
export const DEFAULT_LOGIN_REDIRECT = "/chat";