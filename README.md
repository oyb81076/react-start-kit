# /packages -- @pk
通用模块ts模块
# /reacts -- @rt
react模块
## 开发react模块
为了尽可能独立的开发模块, 采用如下的方式设置
```
/reacts/react-ui            - 通用ui模块
/reacts/react-sign          - 登录模块
/reacts/react-admin         - 后台入口, 融合react-sign,react-admin-user,react-admin-product,本身并不拥有太多逻辑
/reacts/react-admin-user    - 后台用户管理模块
/reacts/react-admin-product - 商品模块
/reacts/react-www           - 前台页面
...
```
开发的时候在模块所在目录内执行 ``yarn start`` 进行开发
该命令会启动一个webpack-dev-server 来运行 example/index.ts 中的例子
### code split
[官方文档](https://reacttraining.com/react-router/web/guides/code-splitting)
```tsx
import Loadable from 'react-loadable';
import Loading from './Loading';
const User = Loadable({
  loader: ()=> import("@rt/react-admin-user")
  loading: Loading,
})
const Home = Loadable({
  loader: ()=> import("@rt/react-admin-home")
  loading: Loading,
})
export const Main = ()=>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/user" component={User} />
  </Switch>
```
### 目录说明
```
/reacts/{name}/example - 例子
/reacts/{name}/config  - 编译配置
/reacts/{name}/src     - 源代码
/reacts/{name}/test    - 测试
```
### react开发相关的配置
```json
// package.json
{
  "name": "@rt/<name>",
  // ...
  "scripts": {
    "start": "webpack-dev-server --config=config/webpack.dev.config.ts"
  }
}
```
```ts
// config/webpack.dev.config.ts
import { createDevConfig } from "@pk/webpack-packager";
import * as path from "path";
process.env.NODE_ENV = "development";
export = createDevConfig({
  entries: [
    path.join(__dirname, "../example/index.ts"),
  ],
  port: 3000,
  title: require("../package.json").name
});
```
# /serves -- @sv
服务器模块
# /scripts
开发脚本
