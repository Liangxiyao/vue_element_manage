<template>
  <!-- 追加弹出框 -->
  <el-dialog title="追加信息"
             class="appendDialog"
             center
             :visible.sync="appendVisible"
             width="520px"
             :before-close="cancel">
    <el-form ref="appendForm"
             :rules="rules"
             :model="appendForm"
             label-width="125px">
      <el-form-item label="追加金额"
                    prop="addAwardAmount">
        <el-input v-model="appendForm.addAwardAmount"></el-input>
        <div class="tip flex-column">
          <div>当前剩余活动金额：{{ row.usedAmount }}</div>
          <div v-if="appendForm.addAwardAmount">
            追加后金额：{{ appendMoney }}
          </div>
        </div>
      </el-form-item>
      <el-form-item label="追加次数"
                    prop="addExpectNumbers">
        <el-input v-model="appendForm.addExpectNumbers"></el-input>
        <div class="tip flex-column">
          <div>当前剩余次数：{{ row.leftNumberCount }}</div>
          <div v-if="appendForm.addExpectNumbers">
            追加后剩余总次数：{{ appendCount }}
          </div>
        </div>
      </el-form-item>
      <el-form-item label="红包金额比"
                    prop="addEnvelopeProportion">
        <el-input v-model="appendForm.addEnvelopeProportion"></el-input>
        <div class="tip flex-column">
          <div>活力红包 ：达星红包</div>
          <div>当前金额比：{{ row.envelopeProportion }}</div>
        </div>
      </el-form-item>
      <el-form-item label="开始衰减阶段"
                    prop="addWeakenLine">
        <el-input v-model="appendForm.addWeakenLine"></el-input>
        <div class="tip flex-column">
          <div>当前衰减比例：{{ row.weakenLine }}</div>
        </div>
      </el-form-item>
      <el-form-item label="随机组成人员数"
                    prop="addGroupNumber">
        <el-input v-model="appendForm.addGroupNumber"></el-input>
        <div class="tip flex-column">
          <div>当前随机人数：{{ row.groupNumber }}</div>
        </div>
      </el-form-item>
      <el-form-item label="浮动金额比例"
                    prop="addFloatRange">
        <el-input v-model="appendForm.addFloatRange"></el-input>
        <div class="tip flex-column">
          <div>当前浮动比例：{{ row.floatRange }}</div>
        </div>
      </el-form-item>
      <el-form-item label="0元红包显示方式">
        <el-select v-model="appendForm.zeroDisplay"
                   class="handle-select"
                   >
          <el-option label="很遗憾未抽中"
                     value="1"></el-option>
          <el-option label="直接显示0元"
                     value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary"
                 @click="saveAdd('appendForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiAppendPrize } from '@/utils/api.js'
import bus from '../common/bus'

export default {
  props: ['row', 'appendVisible'],
  data() {
    return {
      appendForm: {
        addAwardAmount: '',
        addExpectNumbers: '',
        addEnvelopeProportion: '',
        addWeakenLine: '',
        addGroupNumber: '',
        addFloatRange: '',
        zeroDisplay:'1'
      },
      rules: {
        addAwardAmount: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let res = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
              if (value === '') {
                callback(new Error('此项为必填项'))
              } else if (!res.test(value)) {
                callback(new Error('金额输入有误'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        addExpectNumbers: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let res = /^\d+$/
              if (value === '') {
                callback(new Error('此项为必填项'))
              } else if (!res.test(value)) {
                callback(new Error('人数输入有误'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        addEnvelopeProportion: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let res = /(^[1-9](\d{0,2})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/
              if (value === '') {
                callback(new Error('此项为必填项'))
              } else if (!res.test(value)) {
                callback(new Error('比值输入有误!'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        addWeakenLine: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let res = /^(100|(([1-9]\d|\d)(\.\d{1,2})?))%$/
              if (value === '') {
                callback(new Error('此项为必填项'))
              } else if (!res.test(value)) {
                callback(new Error('百分比输入有误!'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        addGroupNumber: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let res = /^\d+$/
              if (value === '') {
                callback(new Error('此项为必填项'))
              } else if (!res.test(value)) {
                callback(new Error('人数输入有误'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
        addFloatRange: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let res = /^(100|(([1-9]\d|\d)(\.\d{1,2})?))%$/
              if (value === '') {
                callback(new Error('此项为必填项'))
              } else if (!res.test(value)) {
                callback(new Error('百分比输入有误!'))
              } else {
                callback()
              }
            },
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    appendMoney() {
      let { usedAmount } = this.row
      let { addAwardAmount } = this.appendForm
      return parseFloat(usedAmount * 100 + addAwardAmount * 100) / 100
    },
    appendNumbers() {
      let { leftNumberCount } = this.row
      let { addExpectNumbers } = this.appendForm
      return parseInt(leftNumberCount * 1 + addExpectNumbers * 1)
    },
    appendCount() {
      let { leftNumberCount } = this.row
      let { addExpectNumbers } = this.appendForm
      return parseInt(addExpectNumbers * 1 + leftNumberCount * 1)
    },
  },
  //使用bus的组件中别忘了再beforDestroy函数中销毁bus，不销毁的话会一直叠加的调用这个方法
  beforeDestroy() {
    bus.$off('isRefreshPrize');
  },
  methods: {
    saveAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiAppendPrize({
            awardId: this.row.id,
            ...this.appendForm,
          }).then(() => {
            this.$message.success('追加成功')
            this.$emit('hideDialog')
            bus.$emit('isRefreshPrize', true) //刷新数据
            this.$refs[formName].resetFields()
          }).catch((err) => {
            console.log(err.message)
          })
        } else {
          return false
        }
      })
    },
    cancel() {
      this.$emit('hideDialog')
      this.$refs['appendForm'].resetFields()
    },
  },
}
</script>

<style scoped>
.appendDialog >>> .el-input {
  width: 160px;
  float: left;
  margin-right: 10px;
}
.appendDialog .tip {
  font-size: 12px;
  color: #888;
  height: 40px;
  line-height: 1;
}
</style>
