(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{335:function(e,r,t){"use strict";t.r(r);var s=t(1),v=Object(s.a)({},(function(){var e=this,r=e._self._c;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"signalr底板"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#signalr底板"}},[e._v("#")]),e._v(" signalR底板")]),e._v(" "),r("p",[r("em",[e._v("在有时间的情况下还是考虑把WebSocket翻出来")])]),e._v(" "),r("p",[e._v("底板针对的也就是连接数量太多增加了集群负载均衡之后进行的多server同步发送，但似乎有点难以处理逻辑（指的是由自主控制的）")]),e._v(" "),r("p",[e._v("一种比较简单的做法是客户端直连数据中间件，比如MQ、Redis...")]),e._v(" "),r("p",[e._v("通常的demo中都是混合api和hub的，通信通过HubContext，这种方式似乎耦合性高而且也很难继续优化，提供的如redis底板方案最终的落地还是要考虑负载均衡")]),e._v(" "),r("p",[e._v("如果将hub-server从逻辑中拿走，可能效果更好，思路大概如下：")]),e._v(" "),r("ol",[r("li",[e._v("客户端http请求api-server，得到hub-server的url，通过某种算法持久")]),e._v(" "),r("li",[e._v("客户端连接hub-server，持久化连接")]),e._v(" "),r("li",[e._v("api-server通过httpClient请求hub-server，传输消息")]),e._v(" "),r("li",[e._v("hub-server向客户端输出")])])])}),[],!1,null,null,null);r.default=v.exports}}]);