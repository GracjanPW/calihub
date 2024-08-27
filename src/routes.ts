
/**
 * Admin Routes
 * routes only accessible by admins
 */
export const ADMIN_ROUTES = [
    "/admin"
]

/**
 * Auth Routes
 * routes that are related to user authentication
 */
export const AUTH_ROUTES = [
    "/auth/login",
    "/auth/register",
    "/auth/verify-email",
    "/auth/reset-password",
    "/auth/new-password"
]

/**
 * Protected Routes
 * routes that require auth
 */
export const PROTECTED_ROUTES = [
    "/user"
]

/**
 * Auth Api Prefix
 * prefix for routes that are required for authentication
 */
export const AUTH_API_PREFIX = "/api/auth"

/**
 * Default Auth User Redirect
 * Default redirect when users is authenticated
 */
export const DEFAULT_AUTH_REDIRECT = "/user"