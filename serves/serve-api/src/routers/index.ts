import * as Router from "koa-router";
import signRouter from "./signRouter";
import stsRouter from "./stsRouter";
const router = new Router();
router.use("/api/sts", stsRouter.routes(), stsRouter.allowedMethods());
router.use("/api/sign", signRouter.routes(), signRouter.allowedMethods());

export default router;
