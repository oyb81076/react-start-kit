# 关于graphql
使用graphql的时候用 apollo codegen 自动生成代码的时候,
需要全局安装 apollo, npm i -g apollo
因为apollo的graphql版本和本地的graphql版本有冲突, 所以使用全局安装
自动生成代码的命令看 packages/gql/package.json/scripts/gen
# /packages -- @pk
通用模块ts模块
# /reacts -- @rt
react模块
## 开发react模块
为了尽可能独立的开发模块, 采用如下的方式设置
```
/reacts/react-ui            - 通用ui模块
/reacts/react-sign          - 登录模块
/reacts/react-admin         - 后台模块
                              启动loading, routes, 以及code split, 不包含业务代码
/reacts/react-admin-user    - 后台用户管理模块
/reacts/react-admin-product - 商品模块
/reacts/react-www           - 前台页面, 考虑是否要ssr
...
```
开发的时候在模块所在目录内执行 ``yarn start`` 进行开发  
该命令会启动一个webpack-dev-server 来运行 example/index.ts 中的例子
### code split
[react-router官方文档](https://reacttraining.com/react-router/web/guides/code-splitting)
```tsx
import Loadable from 'react-loadable';
import Loading from './Loading';
const User = Loadable({
  loader: ()=> import("@rt/react-admin-user"),
  loading: Loading,
})
const Home = Loadable({
  loader: ()=> import("@rt/react-admin-home"),
  loading: Loading,
})
export const Main = ()=>(
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/user" component={User} />
  </Switch>
)
```
### 目录说明
```
/reacts/{name}/example - 例子
/reacts/{name}/config  - 编译配置
/reacts/{name}/src     - 源代码
/reacts/{name}/test    - 测试
```
# /serves -- @sv
服务器模块
# /scripts
开发脚本
