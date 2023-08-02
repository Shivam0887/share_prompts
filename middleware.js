import { NextResponse } from "next/server";

export const middleware = (request) => {
  if (request.cookies.get("next-auth.session-token") == undefined) {
    return NextResponse.redirect(new URL("/", request.url));
  }
};

export const config = {
  matcher: ["/profile", "/create-prompt", "/edit-prompt"],
};
