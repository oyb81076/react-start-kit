import { UserRole } from "@pk/models";
import { ObjectId } from "bson";
import * as joi from "joi";
import * as Router from "koa-router";
import { sign } from "../auth";
import valid from "../tools/valid";

const router = new Router();

/**
 * 用户登录jwt
 */
router.post(
  "/in",
  valid({
    body: {
      username: joi.string().required(),
      password: joi.string().required(),
    },
  }),
  async (ctx) => {
    const { username, password } = ctx.request.body;
    if (username === "root" && password === "root") {
      const session = {
        id: new ObjectId().toHexString(),
        role: UserRole.ROOT,
      };
      ctx.body = { token: sign(session) };
    } else {
      ctx.throw();
    }
  },
);

export default router;
