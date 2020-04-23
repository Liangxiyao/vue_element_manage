<template>
  <div>
    <el-date-picker v-model="value2"
                    align="right"
                    type="daterange"
                    placeholder="选择日期"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    @focus="focus"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd">
    </el-date-picker>
  </div>
</template>
<script>
let _self
export default {
  data() {
    return {
      pickerOptions: {
        onPick({ minDate }) {
          console.log(_self)
          let list = _self.list
          let selectObj = {
            min: "",
            max: "",
            index: "",
          }
          if (minDate) {
            // 开始时间排序
            list.sort((a, b) => {
              return a.min.getTime() - b.min.getTime()
            });

            // 筛选区域可选区域
            list.reduce((prev, cur, index) => {
              let minClicktime = minDate.getTime()  //点击的开始时间
              if (minClicktime < list[0].min.getTime()) { //超出最小时间边界
                selectObj.index = -1
              } else if (minClicktime > list[list.length - 1].max.getTime()) { //超出最大时间边界
                selectObj.index = list.length
              } else if (prev.max.getTime() < minClicktime && cur.min.getTime() > minClicktime) {
                selectObj.index = index
              }
              if (selectObj.index !== '') {
                if (selectObj.index === -1) {
                  selectObj.max = list[0].min
                } else if (selectObj.index === list.length) {
                  selectObj.min = list[list.length - 1].max
                } else {
                  selectObj.min = prev.max
                  selectObj.max = cur.min
                }
              }
              return cur
            })
            _self.selectObj = selectObj
          }

          this.disabledDate = (time) => {
            let selectTime = false
            let selectObj = _self.selectObj || {}
            if (selectObj.min && selectObj.max) {
              if (!(time.getTime() <= selectObj.max.getTime() && time.getTime() >= selectObj.min.getTime())) {
                selectTime = true
              }
            } else if (selectObj.min) {
              if (time.getTime() < selectObj.min.getTime()) {
                selectTime = true
              }
            } else if (selectObj.max) {
              if (time.getTime() > selectObj.max.getTime()) {
                selectTime = true
              }
            } else {
              selectTime = _self.returnSelectTime(time);
            }
            return time.getTime() < Date.now() || selectTime;
          }
        },
        disabledDate(time) {
          return time.getTime() < Date.now() || _self.returnSelectTime(time);
        }
      },
      list: [],
      value2: '',
    };
  },
  computed: {
    name() {
      return this.data
    }
  },
  created() {
    this.list = [{
      min: new Date('2020-04-25'),
      max: new Date("2020-04-28")
    }, {
      min: new Date('2020-04-20'),
      max: new Date("2020-04-25")
    }, {
      min: new Date('2020-04-29'),
      max: new Date("2020-04-30")
    }]
    _self = this
    console.log(_self)
  },
  methods: {
    focus() {
      this.pickerOptions.disabledDate = (time) => {
        return time.getTime() < Date.now() || _self.returnSelectTime(time);
      }
    },
    returnSelectTime(time) {
      let selectTime = false
      _self.list.map(item => {
        if (item.min.getTime() <= time.getTime() && item.max.getTime() > time.getTime()) {
          selectTime = true
        }
      })
      return selectTime;
    }
  }

}

</script>


<style  scoped>
</style>
