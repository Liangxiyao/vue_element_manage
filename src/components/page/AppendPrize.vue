<template>
  <!-- 追加弹出框 -->
  <el-dialog title="追加信息"
             class="appendDialog"
             center
             :visible.sync="appendVisible"
             width="520px"
             :before-close='cancel'>
    <el-form ref="appendForm"
             :rules="rules"
             :model="appendForm"
             label-width="125px">
      <el-form-item label="追加金额"
                    prop="addAwardAmount">
        <el-input v-model="appendForm.addAwardAmount"></el-input>
        <div class="tip flex-column">
          <div>当前剩余活动金额：{{row.usedAmount}}</div>
          <div v-if="appendForm.addAwardAmount">追加后金额：{{appendMoney}}</div>
        </div>
      </el-form-item>
      <el-form-item label="追加人数"
                    prop="addExpectNumbers">
        <el-input v-model="appendForm.addExpectNumbers"></el-input>
        <div class="tip flex-column">
          <div>当前剩余参与人数：{{row.leftNumberCount}}</div>
          <div v-if="appendForm.addExpectNumbers">追加后人数：{{appendNumbers}}</div>
          <div v-if="appendForm.addExpectNumbers">追加后剩余总次数：{{appendCount}}</div>
        </div>
      </el-form-item>
      <el-form-item label="红包金额比"
                    prop="addEnvelopeProportion">
        <el-input v-model="appendForm.addEnvelopeProportion"></el-input>
        <div class="tip flex-column">
          <div>活力红包 ：达星红包</div>
          <div>当前金额比：{{row.envelopeProportion}}</div>
        </div>
      </el-form-item>
      <el-form-item label="开始衰减阶段"
                    prop="addWeakenLine">
        <el-input v-model="appendForm.addWeakenLine"></el-input>
        <div class="tip flex-column">
          <div>当前衰减比例：{{row.weakenLine}}</div>
        </div>
      </el-form-item>
      <el-form-item label="随机组成人员数"
                    prop="addGroupNumber">
        <el-input v-model="appendForm.addGroupNumber"></el-input>
        <div class="tip flex-column">
          <div>当前随机人数：{{row.groupNumber}}</div>
        </div>
      </el-form-item>
      <el-form-item label="浮动金额比例"
                    prop="addFloatRange">
        <el-input v-model="appendForm.addFloatRange"></el-input>
        <div class="tip flex-column">
          <div>当前浮动比例：{{row.floatRange}}</div>
        </div>
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
import { apiAppendPrize } from '@/utils/api.js';
import bus from '../common/bus';

export default {
  props: ['row', 'appendVisible'],
  data() {
    return {
      appendForm: {
        addAwardAmount: 0,
        addExpectNumbers: 0,
        addEnvelopeProportion: 0,
        addWeakenLine: '',
        addGroupNumber: 0,
        addFloatRange: ''
      },
      rules: {
        addAwardAmount: [{
          required: true,
          validator: (rule, value, callback) => {
            const res = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
            if (value === '') {
              callback(new Error('此项为必填项'));
            } else if (!res.test(value)) {
              callback(new Error('金额输入有误'));
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        addExpectNumbers: [{
          required: true,
          validator: (rule, value, callback) => {
            let res = /^\+?[1-9][0-9]*$/
            if (value === '') {
              callback(new Error('此项为必填项'));
            } else if (!res.test(value)) {
              callback(new Error('人数输入有误'));
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        addEnvelopeProportion: [{
          required: true,
          validator: (rule, value, callback) => {
            let res = /(^[1-9](\d{0,2})?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
            if (value === '') {
              callback(new Error('此项为必填项'));
            } else if (!res.test(value)) {
              callback(new Error('比值输入有误!'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }],
        addWeakenLine: [{
          required: true,
          validator: (rule, value, callback) => {
            let res = /^(100|(([1-9]\d|\d)(\.\d{1,2})?))%$/
            if (value === '') {
              callback(new Error('此项为必填项'));
            } else if (!res.test(value)) {
              callback(new Error('百分比输入有误!'));
            }
            else {
              callback();
            }
          },
          trigger: 'blur'
        }],
        addGroupNumber: [{
          required: true,
          validator: (rule, value, callback) => {
            let res = /^\+?[1-9][0-9]*$/
            if (value === '') {
              callback(new Error('此项为必填项'));
            } else if (!res.test(value)) {
              callback(new Error('人数输入有误'));
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        addFloatRange: [{
          required: true,
          validator: (rule, value, callback) => {
            let res = /^(100|(([1-9]\d|\d)(\.\d{1,2})?))%$/
            if (value === '') {
              callback(new Error('此项为必填项'));
            } else if (!res.test(value)) {
              callback(new Error('百分比输入有误!'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }]
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
      return parseInt(leftNumberCount*1 + addExpectNumbers*1)
    },
    appendCount() {
      let { awardDays, beginDate, leftNumberCount } = this.row
      let nowTime = Date.parse(new Date());
      let beginTime = Date.parse(beginDate);
      let alreayDays = parseInt((nowTime - beginTime) / (1000 * 60 * 60 * 24));
      let restDays = parseInt(awardDays - alreayDays) //剩余天数
      let numbers = this.appendNumbers
      return parseInt(restDays * numbers + leftNumberCount*1)
    }
  },
  methods: {
    saveAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiAppendPrize({
            awardId:this.row.id,
            ...this.appendForm
          }).then((result) => {
            if (result.code === 200) {
              this.$emit('hideDialog')
              //刷新数据
              bus.$emit('isRefreshPrize', true)
            } else {
              console.log(result.msg)
            }
          }).catch((err) => {
            console.log(err.message)
          });
        } else {
          return false
        }
      })

    },
    cancel() {
      this.$emit('hideDialog')
      this.$refs['appendForm'].resetFields()
    }
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