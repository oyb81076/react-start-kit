import { AnySchema } from "joi";
import { Middleware } from "koa";
// tslint:disable-next-line:no-var-requires
const validation = require("koa2-validation");
const valid: (schema: {
  params?: Record<string, AnySchema>,
  query?: Record<string, AnySchema>,
  body?: Record<string, AnySchema>,
}) => Middleware = validation;
export default valid;
