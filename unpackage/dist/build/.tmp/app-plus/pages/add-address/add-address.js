(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/add-address/add-address"],{"00ce":function(e,t,a){},"141c":function(e,t,a){"use strict";var i=a("00ce"),s=a.n(i);s.a},"743b":function(e,t,a){"use strict";(function(e,i){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=function(){return Promise.all([a.e("common/vendor"),a.e("components/semp-city/semp-city")]).then(a.bind(null,"3f9f"))},n={components:{sempCity:s},data:function(){return{showbox:!1,type:"bottom",provinceName:"",cityName:"",countyName:"",townName:"",concactAddress:"",name:"",mobile:"",detailaddress:"",isDefault:!1,id:"",formpage:""}},onLoad:function(t){e("log",t.formpage," at pages\\add-address\\add-address.vue:96"),null!=t.formpage&&(this.formpage=t.formpage),null!=t.id&&(this.id=t.id)},onShow:function(){null==this.id&&""==this.id||this.getDetail()},methods:{showcity:function(){this.showbox=!0},close:function(){this.showbox=!1},onCityClick:function(e){this.provinceName=e.province.label,this.cityName=e.city.label,this.countyName=e.county.label,this.townName=e.town.label,this.concactAddress=this.provinceName+this.cityName+this.countyName+this.townName,this.togglePopup()},togglePopup:function(){this.close()},setDefault:function(t){e("log","e==="+JSON.stringify(t.detail.value)," at pages\\add-address\\add-address.vue:131"),this.isDefault=t.detail.value},getDetail:function(){var t=this;this.$api.addressDetail({id:this.id}).then(function(a){e("log",JSON.stringify(a)," at pages\\add-address\\add-address.vue:138"),"0000"==a.code&&(t.provinceName=a.receiver.provinceName,t.cityName=a.receiver.cityName,t.countyName=a.receiver.areaName,t.name=a.receiver.name,t.mobile=a.receiver.mobile,t.detailaddress=a.receiver.address,t.concactAddress=t.provinceName+t.cityName+t.countyName)})},toSaveAddress:function(){var t=this;if(null!=this.name&&""!=this.name)if(null!=this.mobile&&""!=this.mobile)if(""!=this.provinceName&&""!=this.cityName&&""!=this.countyName)if(null!=this.concactAddress&&""!=this.concactAddress)if(null!=this.detailaddress&&""!=this.detailaddress){var a={provinceName:this.provinceName,cityName:this.cityName,areaName:this.countyName,village:this.townName,mobile:this.mobile,phone:this.mobile,name:this.name,address:this.detailaddress,isDefault:this.isDefault,id:this.id};e("log","data==="+JSON.stringify(a)," at pages\\add-address\\add-address.vue:196");JSON.stringify(a);this.$api.saveAddress(a).then(function(a){e("log",JSON.stringify(a)," at pages\\add-address\\add-address.vue:200"),"0000"==a.code?(i.showToast({title:"保存成功"}),"formpreorder"==t.formpage&&i.navigateBack({delta:2}),"myaddresslist"==t.formpage&&i.navigateBack({delta:1})):i.showToast({title:"保存失败"})})}else i.showToast({title:"请输入详细地址"});else i.showToast({title:"请现在区域"});else i.showToast({title:"请选择省/市/区县"});else i.showToast({title:"联系电话"});else i.showToast({title:"请输入用户名"})},toAddAddress:function(){i.navigateTo({url:"/pages/add-address/add-address"})}}};t.default=n}).call(this,a("0de9")["default"],a("6e42")["default"])},7551:function(e,t,a){"use strict";var i={"semp-city":()=>Promise.all([a.e("common/vendor"),a.e("components/semp-city/semp-city")]).then(a.bind(null,"3f9f"))},s=function(){var e=this,t=e.$createElement;e._self._c},n=[];a.d(t,"b",function(){return s}),a.d(t,"c",function(){return n}),a.d(t,"a",function(){return i})},"895d":function(e,t,a){"use strict";a.r(t);var i=a("7551"),s=a("bc76");for(var n in s)"default"!==n&&function(e){a.d(t,e,function(){return s[e]})}(n);a("141c");var o,d=a("f0c5"),c=Object(d["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);t["default"]=c.exports},b423:function(e,t,a){"use strict";(function(e){a("7656"),a("921b");i(a("66fd"));var t=i(a("895d"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("6e42")["createPage"])},bc76:function(e,t,a){"use strict";a.r(t);var i=a("743b"),s=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,function(){return i[e]})}(n);t["default"]=s.a}},[["b423","common/runtime","common/vendor"]]]);