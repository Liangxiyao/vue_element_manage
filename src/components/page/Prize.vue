<template>
  <div class="prize">
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
      <el-table-column prop="awardName"
                       label="奖项名称">
      </el-table-column>
      <el-table-column prop="awardAmount"
                       label="总金额">
      </el-table-column>
      <el-table-column prop="expectNumbers"
                       label="参与活动人力预计">
      </el-table-column>
      <el-table-column prop="totalAverage"
                       label="预计获得平均金额">
      </el-table-column>
      <el-table-column prop="weakenLine"
                       label="衰减阶段">
      </el-table-column>
      <el-table-column prop="date"
                       label="活动起止时间"
                       width="200">
        <template v-slot="scope">
          <span>{{scope.row.beginDate+ ' 至 ' +scope.row.endDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status"
                       label="活动状态"
                       width="100">
        <template v-slot="scope">
          <span>{{statusFormat(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="220">
        <template v-slot="scope">
          <!-- <el-button type="text"
                     v-if="scope.row.status==1"
                     @click="handleAddtime(scope.$index,scope.row)">延长时间</el-button>
          <el-button type="text"
                     v-if="scope.row.status==1"
                     @click="handleAdd(scope.$index)">追加</el-button> -->
          <el-button type="text"
                     v-if="scope.row.status == 1"
                     @click="handleStop(scope.$index,scope.row)">停止</el-button>
          <el-button type="text"
                     @click="handleLook(scope.row)">查看</el-button>
          <el-button type="text"
                     v-if="scope.row.status != 0"
                     @click="handleExport(scope.row)">导出数据</el-button>
          <el-button type="text"
                     v-if="scope.row.status == 0"
                     @click="handleDelete(scope.$index,scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bt">
      <el-button type="primary"
                 @click="toAdd">添加活动</el-button>
      <my-pagination :pagination="pagination"
                     @changePage="changePage"></my-pagination>
    </div>
    <!-- 追加弹出框 -->
    <el-dialog title="追加信息"
               class="addDialog"
               center
               :visible.sync="addVisible"
               width="460px">
      <el-form ref="form"
               :rules="addRules"
               :model="addForm"
               label-width="100px">
        <el-form-item label="追加金额"
                      prop="awardAmount">
          <el-input v-model="addForm.awardAmount"></el-input>
          <div class="tip flex-column">
            <div>当前剩余活动金额：50000</div>
            <div>追加后金额：50000</div>
          </div>
        </el-form-item>
        <el-form-item label="追加人数"
                      prop="expectNumbers">
          <el-input v-model="addForm.expectNumbers"></el-input>
          <div class="tip flex-column">
            <div>当前剩余参与人数：100</div>
            <div>追加后人数：500</div>
          </div>
        </el-form-item>
        <el-form-item label="红包金额比"
                      prop="envelopeProportion">
          <el-input v-model="addForm.envelopeProportion"></el-input>
          <div class="tip flex-column">
            <div>活力红包 ：达星红包</div>
            <div>当前金额比：0.5</div>
          </div>
        </el-form-item>
        <el-form-item label="开始衰减阶段"
                      prop="weakenLine">
          <el-input v-model="addForm.weakenLine"></el-input>
          <div class="tip flex-column">
            <div>当前衰减比例：90%</div>
          </div>
        </el-form-item>
        <el-form-item label="随机组成人员数"
                      prop="groupNumber">
          <el-input v-model="addForm.groupNumber"></el-input>
          <div class="tip flex-column">
            <div>当前衰减比例：90%</div>
          </div>
        </el-form-item>
        <el-form-item label="浮动金额比例"
                      prop="floatRange">
          <el-input v-model="addForm.floatRange"></el-input>
          <div class="tip flex-column">
            <div>当前衰减比例：90%</div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="saveAdd">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 延长时间 -->
    <el-dialog title="延长活动时间"
               center
               :visible.sync="addTimeVisible"
               width="400px">
      <el-form ref="form">
        <el-form-item class="oldtime-box"
                      label="当前时间"
                      label-width="70px">
          <el-date-picker v-model="oldDate"
                          disabled
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="newDate"
                      label="延长至"
                      label-width="70px">
          <el-date-picker v-model="newDate"
                          type="date"
                          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addTimeVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="saveTime">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 导出数据 -->
    <el-dialog title="选择需要导出的时间段"
               center
               :visible.sync="exportVisible"
               width="400px">
      <el-form ref="exportForm"
               :model="exportForm">
        <el-form-item prop="exportDate"
                      :rules="{ required: true, message: '请选择起止时间', trigger: 'blur' }">
          <el-date-picker v-model="exportForm.exportDate"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="exportPickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="exportVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="saveExport('exportForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import storage from '@/utils/storage.js';
import { apiAwardList, apiDeleteAward, apiStopAward, apiExportRecord } from '@/utils/api.js';
import MyPagination from '@/components/common/Pagination';
export default {
  components: {
    MyPagination,
  },
  data() {
    return {
      awardId: '', //当前活动id
      editVisible: false,
      addTimeVisible: false,
      addVisible: false,
      exportVisible: false,
      addForm: {},
      addRules: [],
      tableData: [],
      oldDate: [],
      newDate: [],
      exportDateRange: [],
      exportForm: {
        exportDate: []
      },
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      exportPickerOptions: {
        //导出数据日期范围
        disabledDate: (time) => {
          let date = time.getTime()
          let start = new Date(this.exportDateRange[0]).getTime()
          let end = new Date(this.exportDateRange[1]).getTime()
          return date < start || date > end
        }
      }
    }
  },
  created() {
    this._getAwardList()
  },
  methods: {
    //获取列表
    _getAwardList() {
      let { pageNum, pageSize } = this.pagination
      apiAwardList({
        pageNum,
        pageSize,
      }).then((result) => {
        if (result.code === 200) {
          let { total, rows } = result
          this.pagination.total = total
          this.tableData = rows
        } else {
          this.$message.error(result.msg);
        }
      }).catch((err) => {
        console.log(err.message);
      });
    },
    // 延长时间
    handleAddtime(index, row) {
      this.addTimeVisible = true
      console.log(row.date)
      this.oldDate.push('2012.12.01', '2012.12.20')
    },
    //确认延长
    saveTime() { },
    // 删除操作
    handleDelete(index, id) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        center: true,
        customClass: 'stopDialog'
      }).then(() => {
        apiDeleteAward({ "awardId": id }).then((result) => {
          if (result.code === 200) {
            this.tableData.splice(index, 1);
            this.$message.success('删除成功');
          } else {
            this.$message.error(result.msg);
          }
        }).catch((err) => {
          console.log(err.message);
        });
      })
    },
    //追加操作
    handleAdd() {
      this.addVisible = true
    },
    //追加完成
    saveAdd() {

    },
    // 停止操作
    handleStop(index, row) {
      // 二次确认删除
      this.$confirm('确定要停止该活动吗？', '', {
        center: true,
        customClass: 'stopDialog'
      }).then(() => {
        apiStopAward({ awardId: row.id }).then((result) => {
          if (result.code === 200) {
            this.$set(this.tableData[index], "status", "3")
            this.$message.success('活动已停止')
          } else {
            this.$message.error(result.msg)
          }
        }).catch((err) => {
          console.log(err.message)
        });
      })
    },
    //查看数据
    handleLook(row) {
      storage.set("disabled", true)
      storage.set("award", row)
      this.$router.push('/addprize')
    },
    //导出数据
    handleExport(row) {
      this.exportVisible = true
      this.awardId = row.awardId
      this.exportDateRange = [row.beginDate, row.endDate]
    },
    //确认导出
    saveExport(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let { beginDate, endDate } = this.exportForm.exportDate
          apiExportRecord({
            awardId: this.awardId,
            beginDate,
            endDate
          }).then((result) => {
            if (result.code === 200) {
              this.$message.success('导出成功')
              this.exportVisible = false
              window.location.href = result.msg
              this.$refs[formName].resetFields();
          
            } else {
              this.$message.error(result.msg)
            }
          }).catch((err) => {
            console.log(err.message)
          });
        } else {
          return false
        }
      })
    },
    changePage(val) {
      this.pagination.pageNum = val
      this._getAwardList()
    },
    //跳转添加
    toAdd() {
      storage.set("disabled", false)
      storage.remove("award")
      this.$router.push('/addprize')
    },
    //处理活动状态
    statusFormat(status) {
      switch (status) {
        case "0":
          return "未开始";
        case "1":
          return "进行中";
        case "2":
          return "已结束";
        case "3":
          return "已停止";
      }
    }
  }
}
</script>

<style scoped>
.bt {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
}
.bt .el-button {
  width: 160px;
  font-size: 14px;
  height: 46px;
  line-height: 20px;
}
.el-dialog__footer .el-button {
  position: relative;
  top: -20px;
}

.addDialog >>> .el-input {
  width: 120px;
  float: left;
  margin-right: 10px;
}
.addDialog .tip {
  font-size: 12px;
  color: #888;
  height: 32px;
  line-height: 1;
}
.el-pagination {
  margin-top: 5px;
}
</style>

<style >
.stopDialog {
  width: 360px;
}
.stopDialog .el-message-box__message {
  font-size: 16px;
}
.stopDialog .el-button {
  width: 100px;
  margin-top: 20px;
  font-size: 14px;
}
.el-date-editor.el-input__inner {
  width: auto;
}
</style>