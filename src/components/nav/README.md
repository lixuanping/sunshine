## 介绍

navs是针对移动端写的选项卡切换(一般针对同一个页面)
区别是这个一般固定宽度 超出范围的可拖拽  tabs是全部在可视范围内切换
主要特性：
1. 样式统一
2. 功能复用
## 安装使用
```
import navs from '@/components/nav';
``` 
```
components: {
  navs,
},
```
```
<navs :data='data' v-model="value"></navs>
```
```
data: [
  '标题一','标题二','标题三',
],
value: 0, // 表示默认展示第几个选项卡
``` 
