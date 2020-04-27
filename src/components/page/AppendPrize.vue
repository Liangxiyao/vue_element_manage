<template>
  <!-- 追加弹出框 -->
  <el-dialog title="追加信息"
             class="appendDialog"
             center
             :visible.sync="appendVisible"
             width="500px" 
             :before-close='cancel'>
    <el-form ref="form"
             :rules="rules"
             :model="appendForm"
             label-width="125px">
      <el-form-item label="追加金额"
                    prop="awardAmount">
        <el-input v-model="appendForm.awardAmount"></el-input>
        <div class="tip flex-column">
          <div>当前剩余活动金额：50000</div>
          <div>追加后金额：{{appendForm.appendMoney}}</div>
        </div>
      </el-form-item>
      <el-form-item label="追加人数"
                    prop="appendNumbers">
        <el-input v-model="appendForm.appendNumbers"></el-input>
        <div class="tip flex-column">
          <div>当前剩余参与人数：100</div>
          <div v-if="appendForm.appendMoney">追加后人数：{{appendForm.appendMoney}}</div>
        </div>
      </el-form-item>
      <el-form-item label="红包金额比"
                    prop="envelopeProportion">
        <el-input v-model="appendForm.envelopeProportion"></el-input>
        <div class="tip flex-column">
          <div>活力红包 ：达星红包</div>
          <div>当前金额比：0.5</div>
        </div>
      </el-form-item>
      <el-form-item label="开始衰减阶段"
                    prop="weakenLine">
        <el-input v-model="appendForm.weakenLine"></el-input>
        <div class="tip flex-column">
          <div>当前衰减比例：90%</div>
        </div>
      </el-form-item>
      <el-form-item label="随机组成人员数"
                    prop="groupNumber">
        <el-input v-model="appendForm.groupNumber"></el-input>
        <div class="tip flex-column">
          <div>当前衰减比例：90%</div>
        </div>
      </el-form-item>
      <el-form-item label="浮动金额比例"
                    prop="floatRange">
        <el-input v-model="appendForm.floatRange"></el-input>
        <div class="tip flex-column">
          <div>当前衰减比例：90%</div>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary"
                 @click="saveAdd">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { apiAppendPrize } from '@/utils/api.js';
import bus from '../common/bus';

export default {
  props: ['awardId','appendVisible'],
  data() {
    return {
      appendForm: {},
      rules: {
        awardAmount: [{
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
        appendNumbers: [{
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
        envelopeProportion: [{
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
        weakenLine: [{
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
        groupNumber: [{
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
        floatRange: [{
          required: true,
          validator: (rule, value, callback) => {
            let res = /^(100|(([1-9]\d|\d)(\.\d{1,2})?))%$/
            if (value === '') {
              callback(new Error('请输入浮动范围'));
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
  methods: {
    saveAdd() {
      apiAppendPrize({
        awardId:this.awardId,
        ...this.appendForm
      }).then((result) => {
        if (result.code === 200) {
          this.$emit('hideDialog')
          //刷新数据
          bus.$emit('isRefreshPrize', true)
        }else{
          console.log(result.msg)
        }
      }).catch((err) => {
        console.log(err.message)
      });
    },
    cancel() {
      this.$emit('hideDialog')
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
  height: 32px;
  line-height: 1;
}
</style>