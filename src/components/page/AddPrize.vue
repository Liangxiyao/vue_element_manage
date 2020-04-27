<template>
  <div class="addprize">
    <el-form :model="formData"
             :rules="rules"
             ref="formData"
             label-width="170px"
             class="formData">
      <el-form-item class="block"
                    label="活动名称"
                    prop="awardName">
        <el-input v-model="formData.awardName"
                  :disabled="noEdit"
                  placeholder="请输入活动名称"
                  @blur="caculateHandle"></el-input>
      </el-form-item>
      <el-form-item class="block"
                    label="活动时间"
                    prop="date">
        <el-date-picker v-model="formData.date"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        :disabled="noEdit"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        @blur="caculateHandle">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="block"
                    label="活力红包与达星红包比"
                    prop="envelopeProportion">
        <el-input v-model="formData.envelopeProportion"
                  placeholder="如 活力1：达星3 = 0.33，请输入0.33"
                  :disabled="noEdit"
                  @blur="caculateHandle"></el-input>
      </el-form-item>
      <el-form-item label="预计参与抽奖人数"
                    prop="expectNumbers">
        <el-input v-model="formData.expectNumbers"
                  :disabled="noEdit"
                  placeholder="请输入预计参奖人数"
                  @blur="caculateHandle"></el-input>
      </el-form-item>
      <el-form-item label="预计成功领取人数"
                    prop="expectSuccessNumbers">
        <el-input v-model="formData.expectSuccessNumbers"
                  :disabled="noEdit"
                  placeholder="请输入预计成功领取人数"
                  @blur="caculateHandle"></el-input>
      </el-form-item>
      <el-form-item label="随机组成员数"
                    prop="groupNumber">
        <el-input v-model="formData.groupNumber"
                  :disabled="noEdit"
                  @blur="caculateHandle"
                  placeholder="请输入随机组成人员数"></el-input>
      </el-form-item>
      <el-form-item label="浮动金额比例"
                    prop="floatRange">
        <el-input v-model="formData.floatRange"
                  :disabled="noEdit"
                  @blur="caculateHandle"
                  placeholder="请输入浮动百分比，如10%"></el-input>
      </el-form-item>
      <el-form-item label="设置总金额"
                    prop="startAwardAmount">
        <el-input v-model="formData.startAwardAmount"
                  :disabled="noEdit"
                  placeholder="请输入设置总金额"
                  @blur="caculateHandle"></el-input>
      </el-form-item>

      <el-form-item label="开始衰减阶段"
                    prop="weakenLine">
        <el-input v-model="formData.weakenLine"
                  :disabled="noEdit"
                  @blur="caculateHandle"
                  placeholder="请输入开始衰减百分比，如80%"></el-input>
      </el-form-item>

      <el-form-item class="block"
                    label="预计总金额(含未领额度)"
                    prop="awardAmount">
        <el-input :value="formData.awardAmount"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item label="预计活力红包发送金额">
        <el-input :value="formData.vigourAmount"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item label="预计达星红包发送金额">
        <el-input :value="formData.standardAmount"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item label="预计活力红包获得区间">
        <el-input :value="formData.vigourRange"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item label="预计达星红包获得区间">
        <el-input :value="formData.standardRange"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item label="预计活力红包平均金额">
        <el-input :value="formData.vigourAverage"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item label="预计达星红包平均金额">
        <el-input :value="formData.standardAverage"
                  disabled
                  placeholder="提交人力预计后系统自动计算"></el-input>
      </el-form-item>
      <el-form-item v-if="noEdit && formData.status == 0"
                    class="button-wrap">
        <el-button type="primary"
                   @click="toEdit()">去修改</el-button>
        <el-button @click="$router.push('/prize')">取消</el-button>
      </el-form-item>
      <el-form-item v-if="!noEdit"
                    class="button-wrap">
        <el-button @click="$router.push('/prize')">取消</el-button>
        <el-button type="primary"
                   @click="onSubmit('formData')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import storage from '@/utils/storage.js';
import { apiAddAward, apiCaculate, apiAwardsTime } from '@/utils/api.js';
import bus from '../common/bus';
export default {
  name: 'addPrize',
  data() {
    return {
      formData: {
        awardName: '',
        startAwardAmount: '',
        beginDate: '',
        endDate: '',
        expectNumbers: '',
        expectSuccessNumbers: '',
        envelopeProportion: '',
        floatRange: '',
        groupNumber: '',
        weakenLine: '',
        date: []
      },
      havedDate: [], //已经存在的活动时间
      isCaculate: false, //是否已经计算
      rules: {
        awardName: [
          { required: true, message: '此项为必填项', trigger: 'blur' },
        ],
        startAwardAmount: [{
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
        date: [{
          required: true,
          validator: (rule, value, callback) => {
            if (value.length < 2) {
              callback(new Error('请选择起止时间'));
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        expectNumbers: [{
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
        expectSuccessNumbers: [{
          required: true,
          validator: (rule, value, callback) => {
            let res = /^\+?[1-9][0-9]*$/
            if (value === '') {
              callback(new Error('此项为必填项'));
            } else if (!res.test(value)) {
              callback(new Error('人数输入有误'));
            } else if (Number(value) > Number(this.formData.expectNumbers)) {
              callback(new Error('领取成功人数不得大于参奖人数'));
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
              callback(new Error('百分比输入有误'));
            }else {
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
      noEdit: storage.get('disabled'),
      pickerOptions: {
        //onPick: ({ minDate, maxDate }) => {
          //console.log(minDate, maxDate)
          // let timeDate = minDate.getTime()
          // this.havedDate.reduce((prev, cur, index) => {
          //   let prevBeginDate = new Date(prev.beginDate).getTime();
          //   let prevEndDate = new Date(prev.endDate).getTime();
          //   let curBeginDate = new Date(cur.beginDate).getTime();
          //   let curEndDate = new Date(cur.endDate).getTime();
          //   console.log(prevBeginDate, prevEndDate)
          //   console.log(curBeginDate, curEndDate)
          //   if (timeDate < beginDate) {
          //     console.log(1)
          //   }
          // })
       // },
        //导出数据日期范围
        disabledDate: (time) => {
          let nowDate = Date.now()
          let timeDate = time.getTime()
          if (timeDate < nowDate) {
            return true
          } else {
            this.havedDate.map(item => {

              let beginDate = new Date(item.beginDate).getTime();
              let endDate = new Date(item.endDate).getTime();
              // console.log(beginDate, endDate)
              if (beginDate <= timeDate && timeDate < endDate) {
                // console.log(1)
                return true
              }
            })
          }


        }
      }
    }
  },
  created() {
    //是否可编辑
    let row = storage.get('award')
    if (this.noEdit && row) {
      this.formData = row
      this.$set(this.formData, "date", [row.beginDate, row.endDate])
    }
  },
  mounted() {
    this._getAwardsTime();
  },
  methods: {
    _getAwardsTime() {
      apiAwardsTime().then((result) => {
        if (result.code === 200) {
          this.havedDate = result.data
          console.log(this.havedDate)
        } else {
          this.$message.error(result.msg)
        }
      }).catch((err) => {
        console.log(err.message);
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.isCaculate) {
          //处理数据
          let { date } = this.formData
          this.$set(this.formData, "beginDate", date[0])
          this.$set(this.formData, "endDate", date[1])

          apiAddAward({
            ...this.formData,
            ...this.caculate
          }).then((result) => {
            if (result.code === 200) {
              this.$message.success('添加成功');
              this.$refs[formName].resetFields();
              this.$router.push('/prize')
              bus.$emit('isRefreshPrize', true)
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
    caculateHandle() {
      let { awardName, startAwardAmount, date, expectNumbers, envelopeProportion, floatRange, groupNumber, weakenLine } = this.formData
      if (awardName && startAwardAmount && date.length && expectNumbers && envelopeProportion && floatRange && groupNumber && weakenLine) {
        this.formData.beginDate = this.formData.date[0]
        this.formData.endDate = this.formData.date[1]
        apiCaculate(this.formData).then((result) => {
          if (result.code === 200) {
            this.formData = { ...this.formData, ...result.data, }
            this.isCaculate = true
          } else {
            this.isCaculate = false
          }
        }).catch((err) => {
          console.log(err.message);
        });
      } else {
        return false;
      }
    }
  }
}
</script>
<style scoped>
.el-form-item {
  display: inline-block;
  width: 50%;
}
.el-form-item.block {
  display: block;
}
.el-form-item.button-wrap {
  display: block;
  width: 100%;
  text-align: center;
}
.formData {
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