export { default } from 'next-auth/middleware';

export const config = { matcher: ['/map', '/profile/:path*', '/friends'] };
