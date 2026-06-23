import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const cookieName = "ssh_admin_session";
const maxAge = 60 * 60 * 8;

type SessionPayload = {
  userId: string;
  email: string;
  name: string;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET ?? "dev-only-shree-shivaya-hospital-secret";
  return new TextEncoder().encode(secret);
}

export async function createSession(payload: SessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${maxAge}s`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge,
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;

  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, getSecret());
    return verified.payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}
