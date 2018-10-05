export * from "./gql";
export const sleep = (ms: number = 0) => {
  if (ms) {
    return new Promise<void>((r) => setTimeout(r, ms));
  }
  return;
};
