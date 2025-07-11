import { NextRequest, NextResponse } from 'next/server';
import { DEVICE_TYPE_COOKIE_NAME, getDeviceType } from './utils/deviceType';

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (!request.cookies.get(DEVICE_TYPE_COOKIE_NAME)) {
    response.cookies.set(DEVICE_TYPE_COOKIE_NAME, getDeviceType(request.headers.get('user-agent')));
  }

  return response;
}

export const config = {
  // Match all routes but exclude _next, static, and API routes
  matcher: ['/((?!_next|static|api|playground|favicon.ico|robots.txt|sitemap.xml).*)'],
};
