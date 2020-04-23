<template>
  <div class="addprize">
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             label-width="180px"
             class="ruleForm">
      <el-form-item label="活动名称"
                    prop="awardName">
        <el-input v-model="ruleForm.awardName"
                  :disabled="noEdit"></el-input>
      </el-form-item>
      <el-form-item label="启动金额"
                    prop="awardAmount">
        <el-input v-model="ruleForm.awardAmount"
                  :disabled="noEdit"></el-input>
      </el-form-item>
      <el-form-item label="活动时间"
                    prop="date">
        <el-date-picker v-model="ruleForm.date"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        :disabled="noEdit"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="参与活动人力预计"
                    prop="expectNumbers">
        <el-input v-model="ruleForm.expectNumbers"
                  :disabled="noEdit"></el-input>
      </el-form-item>
      <el-form-item label="活力红包与达星红包比"
                    prop="envelopeProportion">
        <el-input v-model="ruleForm.envelopeProportion"
                  placeholder=""
                  :disabled="noEdit"></el-input>
      </el-form-item>
      <el-form-item label="预计活力红包发送金额"
                    class="inline-block">
        <el-input :value="ruleForm.huo1"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item label="预计达星红包发送金额"
                    class="inline-block">
        <el-input :value="ruleForm.da1"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item label="预计活力红包获得区间"
                    class="inline-block">
        <el-input :value="ruleForm.huo2"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item label="预计达星红包获得区间"
                    class="inline-block">
        <el-input :value="ruleForm.da2"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item label="预计活力红包平均金额"
                    class="inline-block">
        <el-input :value="ruleForm.huo3"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item label="预计达星红包平均金额"
                    class="inline-block">
        <el-input :value="ruleForm.da3"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item label="开始衰减阶段"
                    prop="weakenLine">
        <el-input v-model="ruleForm.weakenLine"
                  :disabled="noEdit"
                  placeholder="请输入开始衰减百分比，如80%"></el-input>
      </el-form-item>
      <el-form-item label="随机组成员数"
                    prop="groupNumber">
        <el-input v-model="ruleForm.groupNumber"
                  :disabled="noEdit"
                  placeholder="请输入随机组成人员数"></el-input>
      </el-form-item>
      <el-form-item label="浮动金额比例"
                    prop="floatRange">
        <el-input v-model="ruleForm.floatRange"
                  :disabled="noEdit"
                  placeholder="请输入比例"></el-input>
      </el-form-item>
      <el-form-item v-if="noEdit && ruleForm.status == 0">
        <el-button type="primary"
                   @click="toEdit()">去修改</el-button>
        <el-button @click="$router.push('/prize')">取消</el-button>
      </el-form-item>
      <el-form-item v-if="!noEdit">
        <el-button @click="$router.push('/prize')">取消</el-button>
        <el-button type="primary"
                   @click="onSubmit('ruleForm')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import storage from '@/utils/storage.js';
import { apiAddAward } from '@/utils/api.js';
export default {
  data() {
    return {
      ruleForm: {
        status: 0,
        awardName: '',
        awardAmount: '',
        beginDate: '',
        endDate: '',
        expectNumbers: '',
        envelopeProportion: '',
        floatRange: '',
        groupNumber: '',
        weakenLine: '',
        date:[]
      },
      rules: {
        awardName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        awardAmount: [{
          required: true,
          validator: (rule, value, callback) => {
            const res = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
            if (value === '') {
              callback(new Error('请输入启动金额'));
            } else if (!res.test(value)) {
              callback(new Error('金额输入有误'));
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        date: [{
          required: true,
          validator: (rule, value, callback) => {
            if (value.length < 2) {
              callback(new Error('请选择起止时间'));
            } else {
              callback()
            }
          },
          trigger: 'change'
        }],
        expectNumbers: [{
          required: true,
          validator: (rule, value, callback) => {
            let res = /^\+?[1-9][0-9]*$/
            if (value === '') {
              callback(new Error('请输入预计参奖人数'));
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
            let res = /^((\d+\.\d*[1-9]\d{1})|(\d*[1-9]\d*\.\d{2}))$/
            if (value === '') {
              callback(new Error('请输入比值'));
            } else if (res.test(value)) {
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
            let res = /^((\d+\.\d*[1-9]\d{1})|(\d*[1-9]\d*\.\d{2}))$/
            if (value === '') {
              callback(new Error('请输入比值'));
            } else if (res.test(value)) {
              callback(new Error('比值输入有误!'));
            } else {
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
              callback(new Error('请输入预计参奖人数'));
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
            let res = /^((\d+\.\d*[1-9]\d{1})|(\d*[1-9]\d*\.\d{2}))$/
            if (value === '') {
              callback(new Error('请输入比值'));
            } else if (res.test(value)) {
              callback(new Error('比值输入有误!'));
            } else {
              callback();
            }
          },
          trigger: 'blur'
        }]
      },
      noEdit: storage.get('disabled'),
    };
  },
  created() {
    //是否可编辑
    let row = storage.get('award')
    if (this.noEdit && row) {
      this.ruleForm = row
      this.$set(this.ruleForm, "date", [row.beginDate, row.endDate])
    }
  },

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //处理数据
          let { date } = this.ruleForm
          this.$set(this.ruleForm, "beginDate", date[0])
          this.$set(this.ruleForm, "endDate", date[1])
          delete this.ruleForm.date;

          apiAddAward(this.ruleForm).then((result) => {
            if (result.code === 200) {
              this.$message.success('添加成功');
              this.$refs['ruleForm'].resetFields();
              this.$router.push('/prize')
            }else{
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
    }
  }
}
</script>
<style scoped>
.inline-block {
  display: inline-block;
  width: 50%;
}
.ruleForm {
  width: 880px;
}
.el-input--small >>> .el-input__inner,
.el-date-editor.el-input__inner {
  width: 260px;
  height: 40px;
  line-height: 32px;
}
.el-range-editor--small >>> .el-range-separator {
  line-height: 32px;
}
.addprize >>> .el-form-item__label {
  line-height: 40px;
}
.el-form-item >>> .el-button {
  width: 150px;
  font-size: 16px;
  line-height: 20px;
  margin-right: 20px;
  margin-top: 30px;
}
</style>