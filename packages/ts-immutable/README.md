# ts-immutable
这是一个献给 immutable.Map 的type库
## 使用
```ts
import {IMapRecord, fromObject} from "@pk/ts-immutable"
import {fromJS} from "immutable"
const user = { _id: "name" }
const map1: IMapRecord<typeof user> = Map(user) as any;
const map1 = fromObject(user)
const map2: IMapRecord<{_id: string}> = fromJS({_id: "oyb"})
```
