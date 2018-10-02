// 放弃cookie, 使用 auth字段
import { secret } from "@pk/etc/src/jwt";
import { UserRole } from "@pk/models";
import { Omit } from "@pk/types";
import * as jwt from "jsonwebtoken";
import * as koa from "koa";
declare module "koa" {
  // tslint:disable-next-line:interface-name
  interface Context {
    session: {
      id: string,
      role: UserRole,
      iat: number,
      exp: number, // what fuck?
    };
  }
}

const assertSession = (ctx: koa.Context) => {
  if (!ctx.session) {
    const token = ctx.get("token");
    if (!token) {
      ctx.throw(401, "token is required");
    } else {
      ctx.session = jwt.verify(token, secret) as any;
    }
  }
};

const assertRoles = (ctx: koa.Context, roles: UserRole[]) => {
  const { role } = ctx.session;
  for (let i = 0, len = roles.length; i < len; i++) {
    if (roles[i] === role) { return; }
  }
  ctx.throw(403, "permission deny");
};
export const assertRole = (ctx: koa.Context, role: UserRole) => {
  if (ctx.session.role !== role) {
    ctx.throw(403, "permission deny");
  }
};

export const anyone: koa.Middleware = async (ctx, next) => {
  assertSession(ctx);
  await next();
};
export const oneOf = (...roles: UserRole[]): koa.Middleware => {
  switch (roles.length) {
    case 0: return async (ctx, next) => {
      assertSession(ctx);
      await next();
    };
    case 1: return async (ctx, next) => {
      assertSession(ctx);
      assertRole(ctx, roles[0]);
      await next();
    };
    default: return async (ctx, next) => {
      assertSession(ctx);
      assertRoles(ctx, roles);
      await next();
    };
  }
};
/**
 * 生成jwt签名
 * @param session
 */
export const sign = (session: Omit<koa.Context["session"], "exp" | "iat">): string => {
  return jwt.sign(session, secret, { noTimestamp: true, expiresIn: "30d" });
};

export const root: koa.Middleware = async (ctx, next) => {
  assertSession(ctx);
  assertRole(ctx, UserRole.ROOT);
  await next();
};
export const admin: koa.Middleware = async (ctx, next) => {
  assertSession(ctx);
  assertRole(ctx, UserRole.ADMIN);
  await next();
};
export const consumer: koa.Middleware = async (ctx, next) => {
  assertSession(ctx);
  assertRole(ctx, UserRole.CONSUMER);
  await next();
};
