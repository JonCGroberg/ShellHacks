// import { isLoggedIn } from '../utils/userUtils.js';


export const onRequest = async ({ request, redirect, locals }, next) => {
  const url = new URL(request.url);
  const { pathname } = url;

  // List of routes that don't require authentication
  const publicRoutes = ['/login', '/favicon.ico', '/public'];

  // if (pathname == '/')
    // return redirect('/');

  // Allow public routes to be accessed without checking the login cookie
  if (publicRoutes.some(route => pathname == route))
    return next();

  const cookieHeader = request.headers.get('cookie');
  const cookies = new Map();

  if (cookieHeader) {
    cookieHeader.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      cookies.set(name, value);
    });
  }

  const loggedIn = (cookies.get('uid') || null);

  if (!loggedIn)
    return redirect('/login');

  // If there is an auth cookie, allow the request to proceed
  return next();
};