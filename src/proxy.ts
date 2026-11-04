import { NextRequest, NextResponse } from "next/server";

// Only enforce basic auth when deployed (production builds).
// `next dev` runs with NODE_ENV=development, so local work is unaffected.
const isDeployed = process.env.NODE_ENV === "production";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area", charset="UTF-8"',
    },
  });
}

export function proxy(request: NextRequest) {
  if (!isDeployed) return NextResponse.next();

  const username = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;

  // Fail closed: if credentials aren't configured on a deployed site,
  // don't leave it open by accident.
  if (!username || !password) {
    console.log(`Site deployed with no basic auth`);
    return;
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) return unauthorized();

  let decoded: string;
  try {
    decoded = atob(authHeader.slice("Basic ".length));
  } catch {
    return unauthorized();
  }

  // Split on the first colon only, so passwords may contain ":"
  const separator = decoded.indexOf(":");
  if (separator === -1) return unauthorized();

  const providedUser = decoded.slice(0, separator);
  const providedPass = decoded.slice(separator + 1);

  if (providedUser !== username || providedPass !== password) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next.js internals and static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};