(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-df9666ee"],{"3ccd":function(e,t,a){},7159:function(e,t,a){e.exports=a.p+"img/img.146655c9.jpg"},"7ed4":function(e,t,a){"use strict";var s=a("2b0e"),i=new s["default"];t["a"]=i},"9f42":function(e,t,a){},a9d0:function(e,t,a){"use strict";var s=a("9f42"),i=a.n(s);i.a},abb3:function(e,t,a){"use strict";var s=a("c492"),i=a.n(s);i.a},bfe9:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrapper"},[a("v-head"),a("v-sidebar"),a("div",{staticClass:"content-box",class:{"content-collapse":e.collapse}},[a("page-header"),a("div",{staticClass:"content"},[a("transition",{attrs:{name:"move",mode:"out-in"}},[a("keep-alive",{attrs:{exclude:"addPrize,setExtraAward"}},[a("router-view")],1)],1),a("el-backtop",{attrs:{target:".content"}})],1)],1)],1)},i=[],o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"header"},[a("div",{staticClass:"collapse-btn",on:{click:e.collapseChage}},[e.collapse?a("i",{staticClass:"el-icon-s-unfold"}):a("i",{staticClass:"el-icon-s-fold"})]),a("div",{staticClass:"logo"},[e._v("后台管理系统")]),a("div",{staticClass:"header-right"},[a("div",{staticClass:"header-user-con"},[e._m(0),a("el-dropdown",{staticClass:"user-name",attrs:{trigger:"click"},on:{command:e.handleCommand}},[a("span",{staticClass:"el-dropdown-link"},[e._v(" "+e._s(e.username)+" "),a("i",{staticClass:"el-icon-caret-bottom"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"editPwd"}},[e._v("修改密码")]),a("el-dropdown-item",{attrs:{divided:"",command:"loginout"}},[e._v("退出登录")])],1)],1)],1)]),a("el-dialog",{attrs:{title:"修改密码",visible:e.editVisible,center:"",width:"30%"},on:{"update:visible":function(t){e.editVisible=t}}},[a("el-form",{ref:"editform",attrs:{rules:e.editRules,model:e.editform,"label-width":"70px"}},[a("el-form-item",{attrs:{label:"账号ID"}},[a("el-input",{attrs:{disabled:""},model:{value:e.editform.userName,callback:function(t){e.$set(e.editform,"userName",t)},expression:"editform.userName"}})],1),a("el-form-item",{attrs:{label:"昵称"}},[a("el-input",{attrs:{disabled:""},model:{value:e.editform.nickName,callback:function(t){e.$set(e.editform,"nickName",t)},expression:"editform.nickName"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{placeholder:"6-16位数字英文组成"},model:{value:e.editform.password,callback:function(t){e.$set(e.editform,"password",t)},expression:"editform.password"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveEdit("editform")}}},[e._v("确 定")])],1)],1)],1)},r=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"user-avator"},[s("img",{attrs:{src:a("7159")}})])}],n=a("5d2d"),c=a("7ed4"),l=a("7c15"),d={data:function(){return{collapse:!1,fullscreen:!1,editVisible:!1,editform:{userName:"",nickName:"",password:""},editRules:{password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:16,message:"密码长度为6-16个字符",trigger:"blur"},{validator:function(e,t,a){var s=/^[a-zA-Z0-9]*(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+))[a-zA-Z0-9]*$/;s.test(t)?a():a(new Error("密码必须由数字和字母组成"))},trigger:"blur"}]}}},computed:{username:function(){var e=n["a"].get("users");return e&&e.username?e.username:""}},mounted:function(){document.body.clientWidth<1500&&this.collapseChage()},methods:{handleCommand:function(e){var t=this;"loginout"==e?Object(l["m"])().then((function(){n["a"].clear(),t.$router.push("/login")})).catch((function(e){t.$message.error(e.message)})):"editPwd"==e&&Object(l["y"])().then((function(e){t.editVisible=!0;var a=e.user,s=a.userId,i=a.userName,o=a.nickName;t.editform={userId:s,userName:i,nickName:o}})).catch((function(e){console.log(e.message)}))},collapseChage:function(){this.collapse=!this.collapse,c["a"].$emit("collapse",this.collapse)},saveEdit:function(e){var t=this;this.$refs[e].validate((function(a){if(!a)return!1;var s=t.editform,i=s.userId,o=s.password;Object(l["l"])({userId:i,password:o}).then((function(){t.$message.success("密码修改成功"),t.editVisible=!1,t.$refs[e].resetFields()})).catch((function(e){console.log(e.message)}))}))}}},u=d,m=(a("abb3"),a("2877")),p=Object(m["a"])(u,o,r,!1,null,"61efbec0",null),f=p.exports,h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sidebar"},[a("el-menu",{staticClass:"sidebar-el-menu",attrs:{"default-active":e.onRoutes,collapse:e.collapse,"background-color":"#324157","text-color":"#bfcbd9","active-text-color":"#20a0ff","unique-opened":"",router:""}},[e._l(e.items,(function(t,s){return[a("el-menu-item",{key:s,attrs:{index:t.path}},[a("i",{class:t.icon}),a("span",[e._v(e._s(t.title))])])]}))],2)],1)},v=[],b=(a("ac1f"),a("5319"),{data:function(){return{collapse:!1,items:[{icon:"el-icon-s-home",path:"index",title:"系统首页"},{icon:"el-icon-s-tools",path:"prize",title:"活动列表"},{icon:"el-icon-s-ticket",path:"extraAward",title:"特殊奖项"},{icon:"el-icon-s-order",path:"rewardRecord",title:"抽奖记录"},{icon:"el-icon-s-custom",path:"users",title:"人员管理"}]}},computed:{onRoutes:function(){return"addprize"==this.$route.path.replace("/","")?"prize":"useRecord"==this.$route.path.replace("/","")?"users":"setExtraAward"==this.$route.path.replace("/","")||"extraRecordList"==this.$route.path.replace("/","")?"extraAward":this.$route.path.replace("/","")}},created:function(){var e=this;c["a"].$on("collapse",(function(t){e.collapse=t,c["a"].$emit("collapse-content",t)}))},methods:{}}),g=b,w=(a("ee60"),Object(m["a"])(g,h,v,!1,null,"05acfea4",null)),k=w.exports,$=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-header"},[a("div",{staticClass:"title"},[e._v(e._s(e.$route.meta.title))]),a("el-button",{directives:[{name:"show",rawName:"v-show",value:e.$route.meta.showBackBtn,expression:"$route.meta.showBackBtn"}],attrs:{type:"info",plain:""},on:{click:e.goBack}},[e._v("返回")])],1)},C=[],_={methods:{goBack:function(){this.$router.back(-1)}}},x=_,N=(a("a9d0"),Object(m["a"])(x,$,C,!1,null,"a73d63ce",null)),E=N.exports,j={data:function(){return{collapse:!1}},components:{vHead:f,vSidebar:k,pageHeader:E},created:function(){var e=this;c["a"].$on("collapse-content",(function(t){e.collapse=t}))}},z=j,A=Object(m["a"])(z,s,i,!1,null,null,null);t["default"]=A.exports},c492:function(e,t,a){},ee60:function(e,t,a){"use strict";var s=a("3ccd"),i=a.n(s);i.a}}]);
//# sourceMappingURL=chunk-df9666ee.d86f3dec.js.map