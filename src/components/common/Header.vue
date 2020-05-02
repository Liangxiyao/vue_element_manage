<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../../assets/img/img.jpg" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="editPwd">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 修改弹出框 -->
    <el-dialog title="修改密码" :visible.sync="editVisible" center width="30%">
      <el-form ref="editform" :rules="editRules" :model="editform" label-width="70px">
        <el-form-item label="账号ID">
          <el-input v-model="editform.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="editform.nickName" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editform.password" placeholder="6-16位数字英文组成"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit('editform')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import storage from '@/utils/storage'
import bus from './bus'
import { apiExit, apiEditUser, apiUserInfo } from '@/utils/api'

export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
      editVisible: false,
      editform: {
        userName: '',
        nickName: '',
        password: ''
      },
      editRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度为6-16个字符', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              let reg = /^[a-zA-Z0-9]*(([a-zA-Z]+[0-9]+)|([0-9]+[a-zA-Z]+))[a-zA-Z0-9]*$/
              if (!reg.test(value)) {
                callback(new Error('密码必须由数字和字母组成'))
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
  computed: {
    username() {
      let users = storage.get('users')
      return users && users.username ? users.username : ''
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage()
    }
  },
  methods: {
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      //退出登陆
      if (command == 'loginout') {
        apiExit()
          .then(() => {
            storage.clear()
            this.$router.push('/login')
          })
          .catch(err => {
            this.$message.error(err.message)
          })
      } else if (command == 'editPwd') {
        apiUserInfo()
          .then(result => {
            this.editVisible = true
            let { userId, userName, nickName } = result.user
            this.editform = {
              userId,
              userName,
              nickName
            }
          })
          .catch(err => {
            console.log(err.message)
          })
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse
      bus.$emit('collapse', this.collapse)
    },
    //修改完成
    saveEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let { userId, password } = this.editform
          apiEditUser({
            userId,
            password
          })
            .then(() => {
              this.$message.success('密码修改成功')
              this.editVisible = false
              this.$refs[formName].resetFields()
            })
            .catch(err => {
              console.log(err.message)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
