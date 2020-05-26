<template>
  <div class="setExtraAward">
    <el-form :model="formData" :rules="rules" ref="formData" label-width="170px" class="formData">
      <el-form-item label="奖品类型" prop="awardType">
        <el-select v-model="formData.awardType" class="handle-select" :disabled="noEdit">
          <el-option label="大额红包" value="1"></el-option>
          <el-option label="实物奖品" value="2"></el-option>
        </el-select>
      </el-form-item>
      <template v-if="formData.awardType == '1'">
        <el-form-item label="活力金额" prop="vigourAmount">
          <el-input v-model="formData.vigourAmount" placeholder="请输入红包金额"></el-input>
        </el-form-item>
        <el-form-item label="达星金额" prop="awardAmount">
          <el-input v-model="formData.awardAmount" placeholder="请输入红包金额"></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="活力奖品名称" prop="vigourName">
          <el-input v-model="formData.vigourName" placeholder="请输入奖品名称"></el-input>
        </el-form-item>
        <el-form-item label="达星奖品名称" prop="awardName">
          <el-input v-model="formData.awardName" placeholder="请输入奖品名称"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="间隔次数" prop="intervalCount">
        <el-input class="wd200" v-model="formData.intervalCount" placeholder="输入间隔次数"></el-input>
        <span class="tip">次后，即可判断是否获得该奖品</span>
      </el-form-item>
      <el-form-item label="发奖周期" prop="cycle" placeholder="设定该奖品的抽取周期">
        <el-input class="wd200" placeholder="该奖品的抽取周期" v-model="formData.cycle"></el-input>
        <span class="tip">天</span>
      </el-form-item>
      <el-form-item label="周期内可被抽中次数" prop="cycleCount">
        <el-input v-model="formData.cycleCount" placeholder="抽奖周期内可被抽取的次数"></el-input>
      </el-form-item>
      <el-form-item label="奖品库存数" prop="initialCount">
        <el-input v-model="formData.initialCount" placeholder="请输入奖品库存数"></el-input>
      </el-form-item>
      <el-form-item class="button-wrap">
        <el-button @click="$router.push('/extraAward')">取消</el-button>
        <el-button type="primary" @click="onSubmit('formData')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import storage from '@/utils/storage.js'
import { apiEditExtraAward, apiAddExtraAward } from '@/utils/api.js'
import bus from '../common/bus'

export default {
  name: 'setExtraAward',
  data() {
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项为必填项'))
      } else if (!Number(value)) {
        console.log(Number(value))
        callback(new Error('输入格式有误'))
      } else {
        callback()
      }
    }
    var checkAwardAmount = (rule, value, callback) => {
      const res = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
      if (value === '') {
        callback(new Error('此项为必填项'))
      } else if (!res.test(value)) {
        callback(new Error('金额输入有误'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        awardType: '1',
        awardName: '',
        vigourName: '',
        awardAmount: '',
        vigourAmount: '',
        intervalCount: '',
        cycle: '',
        cycleCount: '',
        initialCount: ''
      },
      rules: {
        awardType: [
          { required: true, message: '此项为必填项', trigger: 'change' }
        ],
        vigourName: [
          { required: true, message: '此项为必填项', trigger: 'blur' },
          { max: 8, message: '奖品最多设置8个汉字', trigger: 'blur' }
        ],
        awardName: [
          { required: true, message: '此项为必填项', trigger: 'blur' },
          { max: 8, message: '奖品最多设置8个汉字', trigger: 'blur' }
        ],
        vigourAmount: [
          { required: true, validator: checkAwardAmount, trigger: 'blur' }
        ],
        awardAmount: [
          { required: true, validator: checkAwardAmount, trigger: 'blur' }
        ],
        intervalCount: [
          { required: true, validator: checkNum, trigger: 'blur' }
        ],
        cycle: [{ required: true, validator: checkNum, trigger: 'blur' }],
        cycleCount: [{ required: true, validator: checkNum, trigger: 'blur' }],
        initialCount: [{ required: true, validator: checkNum, trigger: 'blur' }]
      },
      noEdit: storage.get('awardTypeDisabled')
    }
  },
  created() {
    //是否可编辑
    let row = storage.get('extraAward')
    if (this.noEdit && row) {
      let { awardType, vigourName, awardName } = row
      this.formData = row
      if (awardType == '1') {
        this.$set(this.formData, 'vigourAmount', vigourName)
        this.$set(this.formData, 'awardAmount', awardName)
      }
    }
  },
  beforeDestroy() {
    bus.$off('isRefreshExtraAward')
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let {
            awardType,
            awardName,
            awardAmount,
            vigourName,
            vigourAmount
          } = this.formData
          let resObj
          if (awardType == '1') {
            resObj = {
              awardName: awardAmount,
              vigourName: vigourAmount
            }
          } else {
            resObj = {
              awardName,
              vigourName
            }
          }
          let data = Object.assign(this.formData, resObj)
          delete data.awardAmount
          delete data.vigourAmount
          if (this.noEdit) {
            apiEditExtraAward(data)
              .then(() => {
                this.$message.success('操作成功')
                this.$refs[formName].resetFields()
                this.$router.push('/extraAward')
                bus.$emit('isRefreshExtraAward', true)
              })
              .catch(err => {
                console.log(err.message)
              })
          } else {
            apiAddExtraAward(data)
              .then(() => {
                this.$message.success('操作成功')
                this.$refs[formName].resetFields()
                this.$router.push('/extraAward')
                bus.$emit('isRefreshExtraAward', true)
              })
              .catch(err => {
                console.log(err.message)
              })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.setExtraAward {
  width: 520px;
}
.wd200 {
  display: inline-block;
  width: 150px;
  margin-right: 5px;
}
.el-form-item .tip {
  color: #666;
  font-size: 12px;
}

.el-form-item >>> .el-button {
  width: 150px;
  font-size: 16px;
  line-height: 20px;
  margin-right: 20px;
  margin-top: 30px;
}
</style>
