(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderlist/orderlist"],{"48f6":function(t,e,a){"use strict";a.r(e);var o=a("4b3d"),r=a("8e08");for(var n in r)"default"!==n&&function(t){a.d(e,t,function(){return r[t]})}(n);a("4fb1");var i,s=a("f0c5"),u=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);e["default"]=u.exports},"4b3d":function(t,e,a){"use strict";var o,r=function(){var t=this,e=t.$createElement;t._self._c},n=[];a.d(e,"b",function(){return r}),a.d(e,"c",function(){return n}),a.d(e,"a",function(){return o})},"4fb1":function(t,e,a){"use strict";var o=a("7ea6"),r=a.n(o);r.a},"59f1":function(t,e,a){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n(a("a34a"));function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e,a,o,r,n,i){try{var s=t[n](i),u=s.value}catch(l){return void a(l)}s.done?e(u):Promise.resolve(u).then(o,r)}function s(t){return function(){var e=this,a=arguments;return new Promise(function(o,r){var n=t.apply(e,a);function s(t){i(n,o,r,s,u,"next",t)}function u(t){i(n,o,r,s,u,"throw",t)}s(void 0)})}}var u=function(){return a.e("components/back-top/back-top").then(a.bind(null,"c33e"))},l={components:{backTop:u},data:function(){return{backTop:{src:"../../static/back-top/top.png",scrollTop:0},scrollTop:0,currentPage:"mycenter",status:"UNCOMPLETED",orderlist:[{id:0,supplierName:"旗舰店",goodimg:"../../static/logo.png",totalProductQuantity:2,totalAmount:.56,tradeStatus:"overTime",paymentStatus:"unpaid",shippingStatus:"unshipped",tradeStatusName:"支付超时,订单已取消",createDate:"2019-08-12 00:10:25"},{id:1,supplierName:"旗舰店",goodimg:"../../static/logo.png",totalProductQuantity:2,totalAmount:.56,tradeStatus:"unprocessed",paymentStatus:"unpaid",shippingStatus:"unshipped",tradeStatusName:"未支付",createDate:"2019-08-12 00:09:25"},{id:2,supplierName:"家政服务",goodimg:"../../static/logo.png",totalProductQuantity:3,totalAmount:.56,tradeStatus:"completed",paymentStatus:"paid",shippingStatus:"unshipped",tradeStatusName:"未发货",createDate:"2019-08-13 00:10:25"},{id:3,supplierName:"家政服务",goodimg:"../../static/logo.png",totalProductQuantity:3,totalAmount:.56,tradeStatus:"completed",paymentStatus:"paid",shippingStatus:"shipping",tradeStatusName:"已完成",createDate:"2019-05-12 00:10:25"}],queryData:{pageNo:1,totalPage:0,parameters:"UNCOMPLETED"}}},onLoad:function(e){t("log","status===="+e.status," at pages\\orderlist\\orderlist.vue:164"),this.status=e.status},onShow:function(){this.getOderList(this.status)},filters:{nullImgFilter:function(t){if(null==t||"null"==t)return"../../static/image/logo_loading_bg.png"}},methods:{getOderList:function(t){this.queryData.parameters=t,this.queryData.pageNo=1,this.queryData.totalPage=0,this.toGetOderList(this.queryData,!0),this.status=t},toGetOderList:function(){var e=s(r.default.mark(function e(a,o){var n,i,s=this;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.orderlist(a);case 2:if(n=e.sent,t("log",JSON.stringify(n)," at pages\\orderlist\\orderlist.vue:192"),"0000"==n.code){e.next=6;break}return e.abrupt("return");case 6:this.queryData.totalPage=n.total,i=n.list,i.forEach(function(t){t.goodsImageVos.forEach(function(t){t.goodsImage=s.$config.imghosturl+t.goodsImage})}),this.orderlist=o?n.list:this.orderlist.concat(n.list);case 10:case"end":return e.stop()}},e,this)}));function a(t,a){return e.apply(this,arguments)}return a}(),toOrderitem:function(t){o.navigateTo({url:"/pages/orderdetail/orderdetail?id="+t})},go2pay:function(t){o.navigateTo({url:"/pages/pay/pay?tid="+t+"@@@&formorderlist=formorderlist"})},firstPage:function(){o.redirectTo({url:"/pages/index/index"})},shoplist:function(){o.redirectTo({url:"/pages/shoplist/shoplist"})},toCart:function(){o.redirectTo({url:"/pages/carts/carts"})},toMyCenter:function(){o.redirectTo({url:"/pages/mycenter/mycenter"})},onPageScroll:function(t){this.backTop.scrollTop=t.scrollTop},onPullDownRefresh:function(){this.queryData.pageNo=1,this.queryData.totalPage=0,this.toGetOderList(this.queryData,!1),o.stopPullDownRefresh()},onReachBottom:function(){return!(this.queryData.pageNo>this.queryData.totalPage)&&(this.queryData.pageNo=this.queryData.pageNo+1,t("log","pageNo==="+this.queryData.pageNo," at pages\\orderlist\\orderlist.vue:261"),t("log","totalPage==="+this.queryData.totalPage," at pages\\orderlist\\orderlist.vue:262"),!(this.queryData.pageNo>this.queryData.totalPage)&&void this.toGetOderList(this.queryData,!1))}}};e.default=l}).call(this,a("0de9")["default"],a("6e42")["default"])},"7ea6":function(t,e,a){},"8e08":function(t,e,a){"use strict";a.r(e);var o=a("59f1"),r=a.n(o);for(var n in o)"default"!==n&&function(t){a.d(e,t,function(){return o[t]})}(n);e["default"]=r.a},"9ed7":function(t,e,a){"use strict";(function(t){a("7656"),a("921b");o(a("66fd"));var e=o(a("48f6"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("6e42")["createPage"])}},[["9ed7","common/runtime","common/vendor"]]]);