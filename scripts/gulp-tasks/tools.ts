import { join } from "path";
import { TaskFunction } from "undertaker";
export const resolvePath = (...paths: string[]) => join(__dirname, "../..", ...paths);
export const describe = (fn: TaskFunction, description: string) => {
    fn.description = description;
    return fn;
};
