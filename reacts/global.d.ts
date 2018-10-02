declare var __PRO__: boolean
declare var __DEV__: boolean
interface NodeModule {
  hot?: {
    accept(paths: string[] | string, callback: () => void): void
    accept(callback: () => void): void
  }
}
