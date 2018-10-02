/**
 * 对已经登录的用户发放sts临时凭证
 * 凭证的有效使用地址为 <bucket>/<dir>/<accountId>/
 */
import { bucket, dir, endpoint } from "@pk/etc/src/oss";
import { accessKeyId, accessKeySecret, arn } from "@pk/etc/src/oss-sts";
import { ClientOpts, STS } from "ali-oss";
import * as Router from "koa-router";
import * as path from "path";
import * as auth from "../auth";
const router = new Router();
const cli = new STS({ accessKeyId, accessKeySecret });
router.get("/", auth.anyone, async (ctx) => {
  const namespace = ctx.session.id;
  const expiresIn = 3600;
  const { credentials: { AccessKeyId, AccessKeySecret, SecurityToken } } = await cli.assumeRole(arn, {
    Statement: [
      {
        Effect: "Allow",
        Resource: path.join(`acs:oss:*:*:${bucket}`, dir, namespace, "*"),
        Action: "oss:PutObject",
      },
    ],
    Version: "1",
  }, expiresIn, "client");
  const opts: ClientOpts = {
    accessKeyId: AccessKeyId,
    accessKeySecret: AccessKeySecret,
    stsToken: SecurityToken,
    endpoint,
    bucket,
  };
  ctx.body = { opts, expiresIn, dir, namespace };
});

export default router;
