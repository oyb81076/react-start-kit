import * as OSS from "ali-oss";
import { createContext } from "react";
export interface IContextProps {
  client: OSS;
  upload: (opts: {
    filename?: string,
    files: HTMLInputElement["files"],
    process?: string,
    progress?: (percent: number) => void,
  }) => Promise<{
    // <namespace>/<filename>[.<ext>]
    path: string,
    // <schema>://<host>/<dir>/<namespace>/<filename>[.ext]
    url: string,
  }>;
}
export const { Provider, Consumer } = createContext<IContextProps>({
  client: null as any,
  async upload() { return { path: "", url: "" }; },
});
