---
title: 玩具级实现
---

## 最简单的 Vue 实现版本

让我们将 Vue 的历史记录回退到`a5e27b11`这个提交，这个提交是 Vue 提交历史上的**第三个** commit，也是一个 Vue 最初的想法实现，作者将这次提交称之为`“naive implementation”`，通过这个很简单的实现，我们可以了解到 Vue 一个最初的想法。

## 最初的想法

Vue 最初始的 demo 如下：

```html
<div id="test" sd-on-click="changeMessage | .button">
    <p sd-text="msg | capitalize"></p>
    <p sd-show="something">YOYOYO</p>
    <p class="button" sd-text="msg"></p>
    <p sd-class-red="error" sd-text="hello"></p>
</div>
```

```javascript
var Seed = require("seed");
var app = Seed.create({
  id: "test",
  // template
  scope: {
    msg: "hello",
    hello: "WHWHWHW",
    changeMessage: function() {
      app.scope.msg = "hola";
    }
  }
});
```

可以看到，最初的想法很简单，只是希望通过一些定义的内置指令，如`sd-text`，`sd-show`，`sd-on`等，完成整个声明式渲染的过程，并期望通过数据的改变自动触发视图的更新。

::: tip
Vue 一开始取名为 Seed，到 0.6.0 这第一个 Release 发行版本时才正式更名为 Vue
:::

## 初步实现思路

对于这类指令驱动渲染的方式，基本实现思路如下：

1. 识别 id 域下所有绑定了指令的子元素
2. 对所有子元素做遍历
3. 针对每个子元素，解析它的指令属性
4. 解析完指令属性之后，将指令绑定到相应的 scope 数据上
5. 对 scope 数据进行 getter/setter 监听，修改时触发指令更新方法渲染视图

首先，我们注意到调用`Seed`方法时，传入了`id`参数，我们可以获得整个 Vue 的根作用节点：

```javascript
var root = (this.el = document.getElementById(opts.id));
```

同时，我们可以获取到所有支持的指令，作为属性选择器：

```javascript
var prefix = "sd";
var Directives = require("./directives");
var selector = Object.keys(Directives)
  .map(function(d) {
    return "[" + prefix + "-" + d + "]";
  })
  .join(); // 获取到所有的指令属性选择器，如[sd-text][sd-show]这样
```

对所有的指令元素做一次遍历，解析指令(指令是以 HTML 属性的情况存在的)：

```javascript
var els = root.querySelectorAll(selector); // 获取元素列表
els.forEach(function(el) {
  // 克隆HTML属性，防止对属性进行有损读写
  cloneAttributes(el.attributes).forEach(function(attr) {
    var directive = parseDirective(attr);
    // ...
  });
});
```

## 指令解析

Vue 最初的指令定义，想法如下：

```html
<tag [dirname]-[arg]="[key]|[filter1]|[filter2]|..." />
```
