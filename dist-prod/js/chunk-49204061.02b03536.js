(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-49204061"],{"2de2":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"users"},[t("div",{staticClass:"btn-group"},[t("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.$router.push("/useRecord")}}},[e._v("查看操作记录")]),t("el-button",{attrs:{type:"primary"},on:{click:e.handleAdd}},[e._v("添加人员")])],1),t("el-table",{staticClass:"mytable",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[t("el-table-column",{attrs:{label:"编号",width:"80"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",[e._v(e._s(a.$index+(e.pagination.pageNum-1)*e.pagination.pageSize+1)+" ")])]}}])}),t("el-table-column",{attrs:{prop:"userName",label:"账号"}}),t("el-table-column",{attrs:{prop:"nickName",label:"姓名"}})],1),t("my-pagination",{attrs:{pagination:e.pagination},on:{changePage:e.changePage}}),t("el-dialog",{attrs:{visible:e.addVisible,center:"",title:"添加人员",width:"30%"},on:{"update:visible":function(a){e.addVisible=a}}},[t("el-form",{ref:"addform",attrs:{rules:e.addRules,"label-width":"60px",model:e.addform}},[t("el-form-item",{attrs:{label:"账号",prop:"userName"}},[t("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:e.addform.userName,callback:function(a){e.$set(e.addform,"userName",a)},expression:"addform.userName"}})],1),t("el-form-item",{attrs:{label:"昵称",prop:"nickName"}},[t("el-input",{attrs:{placeholder:"1-4位中文，提交后不可修改"},model:{value:e.addform.nickName,callback:function(a){e.$set(e.addform,"nickName",a)},expression:"addform.nickName"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"password"}},[t("el-input",{attrs:{placeholder:"6-16位数字和英文组成"},model:{value:e.addform.password,callback:function(a){e.$set(e.addform,"password",a)},expression:"addform.password"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(a){e.addVisible=!1}}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(a){return e.saveAdd("addform")}}},[e._v("确 定")])],1)],1)],1)},r=[],i=t("d529"),o=t("7c15"),s={components:{MyPagination:i["a"]},data:function(){return{tableData:[{userId:"",userName:"",nickName:""}],pagination:{pageNum:1,pageSize:10,total:0},addVisible:!1,editVisible:!1,addform:{userName:"",nickName:"",password:""},addRules:{userName:[{required:!0,message:"请输入手机号",trigger:"blur"},{validator:function(e,a,t){var n=/^1[3456789]\d{9}$/;n.test(a)?t():t(new Error("手机号输入有误"))},trigger:"blur"}],nickName:[{required:!0,message:"请输入昵称",trigger:"blur"},{min:1,max:4,message:"昵称1-4位中文",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:16,message:"密码长度为6-16个字符",trigger:"blur"},{validator:function(e,a,t){var n=/^[a-zA-Z0-9]*(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+))[a-zA-Z0-9]*$/;n.test(a)?t():t(new Error("密码必须由数字和字母组成"))},trigger:"blur"}]}}},mounted:function(){this._getUerList()},methods:{_getUerList:function(){var e=this;Object(o["z"])(this.pagination).then((function(a){var t=a.total,n=a.rows;e.pagination.total=t,e.tableData=n})).catch((function(e){console.log(e.message)}))},handleAdd:function(){this.addVisible=!0},saveAdd:function(e){var a=this;this.$refs[e].validate((function(e){if(!e)return!1;var t=a.addform;Object(o["c"])(t).then((function(){a.$message.success("添加成功"),a.tableData.push(t),a.addVisible=!1,a.addform={}})).catch((function(e){console.log(e.message)}))}))},changePage:function(e){this.pagination.pageNum=e,this._getUerList()}}},l=s,u=(t("65a1"),t("2877")),d=Object(u["a"])(l,n,r,!1,null,"7cf75930",null);a["default"]=d.exports},"65a1":function(e,a,t){"use strict";var n=t("7fe3"),r=t.n(n);r.a},"7fe3":function(e,a,t){},d529:function(e,a,t){"use strict";var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("el-pagination",{staticClass:"pagination",attrs:{"current-page":e.pagination.pageNum,"page-size":e.pagination.pageSize,background:"",layout:"prev, pager, next, jumper",total:e.pagination.total},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(a){return e.$set(e.pagination,"pageNum",a)},"update:current-page":function(a){return e.$set(e.pagination,"pageNum",a)}}})},r=[],i={props:{pagination:{pageNum:1,pageSize:10,total:0}},methods:{handleCurrentChange:function(e){this.$emit("changePage",e)}}},o=i,s=t("2877"),l=Object(s["a"])(o,n,r,!1,null,"36ca7eef",null);a["a"]=l.exports}}]);
//# sourceMappingURL=chunk-49204061.02b03536.js.map