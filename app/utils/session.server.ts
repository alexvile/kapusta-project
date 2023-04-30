import bcrypt from "bcryptjs";
import { db } from "./db.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

type LoginForm = {
  email: string;
  password: string;
};

export async function register({  email, password,
  }: LoginForm) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: { email, passwordHash },
    });
    return { id: user.id, email };
  }

export async function login({ email, password}: LoginForm) {
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user) return null;

  const isCorrectPassword = await bcrypt.compare(
    password,
    user.passwordHash
  );
  if (!isCorrectPassword) return null;

  return { id: user.id, email };
}

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
    cookie: {
      name: "kapusta_session",
      // normally you want this to be `secure: true`
      // but that doesn't work on localhost for Safari
      // https://web.dev/when-to-use-local-https/
      secure: process.env.NODE_ENV === "production",
      secrets: [sessionSecret],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    },
  });

  export async function getUser(request: Request) {
    const userId = await getUserId(request);
    if (typeof userId !== "string") {
      return null;
    }
  
    try {
      const user = await db.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true },
      });
      return user;
    } catch {
      throw logout(request);
    }
  }
  
  export async function logout(request: Request) {
    const session = await getUserSession(request);
    return redirect("/login", {
      headers: {
        "Set-Cookie": await storage.destroySession(session),
      },
    });
  }

  export async function createUserSession(
    userId: string,
    redirectTo: string
  ) {
    const session = await storage.getSession();
    session.set("userId", userId);
    return redirect(redirectTo, {
      headers: {
        "Set-Cookie": await storage.commitSession(session),
      },
    });
  }

  function getUserSession(request: Request) {
    return storage.getSession(request.headers.get("Cookie"));
  }
  
  export async function getUserId(request: Request) {
    const session = await getUserSession(request);
    const userId = session.get("userId");
    if (!userId || typeof userId !== "string") return null;
    return userId;
  }
  
  export async function requireUserId(
    request: Request,
    redirectTo: string = new URL(request.url).pathname
  ) {
    const session = await getUserSession(request);
    const userId = session.get("userId");
    if (!userId || typeof userId !== "string") {
      const searchParams = new URLSearchParams([
        ["redirectTo", redirectTo],
      ]);
      throw redirect(`/login?${searchParams}`);
    }
    return userId;
  }