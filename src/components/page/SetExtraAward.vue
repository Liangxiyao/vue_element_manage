<template>
  <div class="setExtraAward">
    <el-form :model="formData"
             :rules="rules"
             ref="formData"
             label-width="170px"
             class="formData">
      <el-form-item label="奖品类型"
                    prop="awardType">
        <el-select v-model="formData.awardType"
                   class="handle-select"
                   :disabled="noEdit">
          <el-option label="大额红包"
                     value="大额红包"></el-option>
          <el-option label="实物奖品"
                     value="实物奖品"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.awardType == '实物奖品'"
                    label="奖品名称"
                    prop="awardName">
        <el-input v-model="formData.awardName"
                  placeholder="请输入奖品名称"></el-input>
      </el-form-item>
      <el-form-item v-else
                    label="单个红包金额"
                    prop="awardAmount">
        <el-input v-model="formData.awardAmount"
                  placeholder="请输入单个红包金额"></el-input>
      </el-form-item>
      <el-form-item label="间隔次数"
                    prop="intervalCount">
        <el-input class="wd200"
                  v-model="formData.intervalCount"
                  placeholder="输入间隔次数"></el-input>
        <span class="tip">次后，即可判断是否获得该奖品</span>
      </el-form-item>
      <el-form-item label="发奖周期"
                    prop="cycle"
                    placeholder="设定该奖品的抽取周期">
        <el-input class="wd200"
                  placeholder="该奖品的抽取周期"
                  v-model="formData.cycle"></el-input>
        <span class="tip">天</span>
      </el-form-item>
      <el-form-item label="周期内可被抽中次数"
                    prop="cycleCount">
        <el-input v-model="formData.cycleCount"
                  placeholder="抽奖周期内可被抽取的次数"></el-input>
      </el-form-item>
      <el-form-item label="奖品库存数"
                    prop="initialCount">
        <el-input v-model="formData.initialCount"
                  placeholder="请输入奖品库存数"></el-input>
      </el-form-item>
      <el-form-item class="button-wrap">
        <el-button @click="$router.push('/extraAward')">取消</el-button>
        <el-button type="primary"
                   @click="onSubmit('formData')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import storage from '@/utils/storage.js';
import { apiEditExtraAward } from '@/utils/api.js';
import bus from '../common/bus';

export default {
  name: 'setExtraAward',
  data() {
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('此项为必填项'));
      } else if (!Number(value)) {
        console.log(Number(value))
        callback(new Error('输入格式有误'));
      } else {
        callback()
      }
    }
    return {
      formData: {
        awardType: '大额红包',
        awardName: '',
        awardAmount: '',
        intervalCount: '',
        cycle: '',
        cycleCount: '',
        initialCount: '',
      },
      rules: {
        awardType: [
          { required: true, message: '此项为必填项', trigger: 'change' }
        ],
        awardName: [
          { required: true, message: '此项为必填项', trigger: 'blur' },
        ],
        awardAmount: [
          {
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
        intervalCount: [
          { required: true, validator: checkNum, trigger: 'blur' }
        ],
        cycle: [
          { required: true, validator: checkNum, trigger: 'blur' }
        ],
        cycleCount: [
          { required: true, validator: checkNum, trigger: 'blur' }
        ],
        initialCount: [
          { required: true, validator: checkNum, trigger: 'blur' }
        ],
      },
      noEdit: storage.get('awardTypeDisabled'),
    };
  },
  created() {
    //是否可编辑
    let row = storage.get('extraAward')
    if (this.noEdit && row) {
      this.formData = row
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          apiEditExtraAward({
            ...this.formData,
          }).then((result) => {
            if (result.code === 200) {
              this.$message.success('操作成功');
              this.$refs[formName].resetFields();
              this.$router.push('/extraAward')
              bus.$emit('isRefreshExtraAward', true)
            } else {
              this.$message.error(result.msg);
            }
          }).catch((err) => {
            console.log(err.message);
          });
        } else {
          return false;
        }
      });
    },
    toEdit() {
      this.noEdit = false
      storage.set('disabled', this.noEdit)
    },
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