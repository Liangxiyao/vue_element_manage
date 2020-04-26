<template>
  <div class="users">
    <div class="btn-group">
      <el-button type="primary"
                 @click="$router.push('/useRecord')">查看操作记录</el-button>
      <el-button type="primary"
                 @click="handleAdd">添加人员</el-button>
    </div>
    <el-table :data="tableData"
              class="mytable"
              border
              style="width: 100%">
      <el-table-column label="编号"
                       width="80">
        <template v-slot="scope">
          <span>{{scope.$index+(pagination.pageNum - 1) * pagination.pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column prop="userName"
                       label="账号">
      </el-table-column>
      <el-table-column prop="nickName"
                       label="姓名">
      </el-table-column>
      <!-- <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="text" v-if="scope.row.userName == storage.get('username')"
                     @click="handleEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <my-pagination :pagination="pagination"
                   @changePage="changePage"></my-pagination>

    <!-- 添加人员弹窗 -->
    <el-dialog :visible.sync="addVisible"
               center
               title="添加人员"
               width="30%">
      <el-form ref="addform"
               :rules="addRules"
               label-width="60px"
               :model="addform">
        <el-form-item label="账号"
                      prop="userName">
          <el-input v-model="addform.userName"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="昵称"
                      prop="nickName">
          <el-input v-model="addform.nickName"
                    placeholder="1-4位中文，提交后不可修改"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="addform.password"
                    placeholder="6-16位数字和英文组成"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="saveAdd('addform')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import MyPagination from '@/components/common/Pagination';
import { apiUsers, apiAddUser } from '@/utils/api';

export default {
  components: {
    MyPagination,
  },
  data() {
    return {
      tableData: [{
        userId: '',
        userName: '',
        nickName: '',
      }],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      addVisible: false,
      editVisible: false,
      addform: {
        userName: '',
        nickName: '',
        password: ''
      },
      addRules: {
        userName: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const res = /^1[3456789]\d{9}$/;
              if (!res.test(value)) {
                callback(new Error('手机号输入有误'));
              } else {
                callback()
              }
            },
            trigger: 'blur'
          },
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 1, max: 4, message: '昵称1-4位中文', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: "密码长度为6-16个字符", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let reg = /^[a-zA-Z0-9]*(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+))[a-zA-Z0-9]*$/;
              if (!reg.test(value)) {
                callback(new Error('密码必须由数字和字母组成'));
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted() {
    this._getUerList()
  },
  methods: {
    //获取列表
    _getUerList() {
      apiUsers(this.pagination).then((result) => {
        if (result.code === 200) {
          let { total, rows } = result
          this.pagination.total = total
          this.tableData = rows
        } else {
          this.$message.error(result.msg);
        }
      }).catch((err) => {
        console.log(err.message)
      });
    },
    //添加成员
    handleAdd() {
      this.addVisible = true
    },
    saveAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.addform
          apiAddUser(data).then((result) => {
            if (result.code === 200) {
              this.$message.success("添加成功")
              this.tableData.push(data)
              this.addVisible = false
              this.addform = {}

            } else {
              this.$message.error(result.msg)
            }
          }).catch((err) => {
            console.log(err.message)
          });
        } else {
          return false;
        }
      });
    },
    changePage(val) {
      this.pagination.pageNum = val
      this._getUerList()
    }
  }
}
</script>

<style  scoped>
.btn-group {
  float: right;
  margin-bottom: 20px;
}
.btn-group .el-button {
  margin-left: 20px;
  line-height: 20px;
  width: 120px;
  font-size: 14px;
}
.el-pagination {
  margin-top: 5px;
  flex: 1;
}
.el-dialog__footer .el-button {
  line-height: 16px;
  font-size: 14px;
  width: 100px;
  position: relative;
  top: -20px;
}
</style>