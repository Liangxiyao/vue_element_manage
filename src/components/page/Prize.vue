<template>
  <div class="prize">
    <el-table :data="tableData" class="mytable" border>
      <el-table-column label="编号" width="60">
        <template v-slot="scope">
          <span>{{
            scope.$index + (pagination.pageNum - 1) * pagination.pageSize + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="awardName" label="奖项名称"></el-table-column>
      <el-table-column
        prop="awardAmount"
        width="220"
        label="总金额/已抽出/余额"
      >
        <template v-slot="scope">
          <span>{{ awardResult(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="160"
        prop="expectNumbers"
        label="参与活动人力预计 / 参与总次数预计"
      >
        <template v-slot="scope">
          <span>{{
            scope.row.expectNumbers + ' / ' + scope.row.awardNumbers
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalAverage"
        label="预计获得平均金额"
      ></el-table-column>
      <el-table-column prop="weakenLine" label="衰减阶段"></el-table-column>
      <el-table-column prop="date" label="活动起止时间" width="180">
        <template v-slot="scope">
          <span>{{ scope.row.beginDate + ' 至 ' + scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="活动状态" width="100">
        <template v-slot="scope">
          <span>{{ statusFormat(scope.row.status) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template v-slot="scope">
          <template v-if="scope.row.status == 1">
            <el-button
              type="text"
              @click="handleAddtime(scope.$index, scope.row)"
              >延长时间</el-button
            >
            <el-button type="text" @click="handleAppend(scope.row)"
              >追加</el-button
            >
            <el-button
              type="text"
              @click="handleStop(scope.$index, scope.row.id)"
              >停止</el-button
            >
          </template>
          <el-button
            type="text"
            v-if="scope.row.status == 3"
            @click="handleOpen(scope.$index, scope.row.id)"
            >启动</el-button
          >
          <el-button type="text" @click="handleLook(scope.row)">查看</el-button>
          <el-button
            type="text"
            v-if="scope.row.status != 0"
            @click="handleExport(scope.row)"
            >导出数据</el-button
          >
          <el-button
            type="text"
            v-if="scope.row.status == 0 || scope.row.status == 3"
            @click="handleDelete(scope.$index, scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="bt">
      <el-button type="primary" @click="toAdd">添加活动</el-button>
      <my-pagination
        :pagination="pagination"
        @changePage="changePage"
      ></my-pagination>
    </div>
    <!-- 追加 -->
    <append-dialog
      :appendVisible="appendVisible"
      :row="currentRow"
      @hideDialog="hideDialog"
    ></append-dialog>

    <!-- 延长时间 -->
    <el-dialog
      title="延长活动时间"
      center
      :visible.sync="appendTimeVisible"
      width="400px"
    >
      <el-form ref="form">
        <el-form-item class="oldtime-box" label="当前时间" label-width="70px">
          <el-date-picker
            v-model="oldDate"
            disabled
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="newDate" label="延长至" label-width="70px">
          <el-date-picker
            v-model="newDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :default-value="oldDate[1]"
            :picker-options="appendTimePickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="appendTimeVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAppendTime">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 导出数据 -->
    <el-dialog
      title="选择需要导出的时间段"
      center
      :visible.sync="exportVisible"
      width="400px"
    >
      <el-form ref="exportForm" :model="exportForm">
        <el-form-item
          prop="exportDate"
          :rules="{
            required: true,
            message: '请选择起止时间',
            trigger: 'blur',
          }"
        >
          <el-date-picker
            v-model="exportForm.exportDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="exportPickerOptions"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveExport('exportForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import storage from '@/utils/storage.js'
import {
  apiAwardList,
  apiDeleteAward,
  apiStopAward,
  apiExportRecord,
  apiAppendTime,
} from '@/utils/api.js'
import MyPagination from '@/components/common/Pagination'
import AppendDialog from '@/components/page/AppendPrize'

import bus from '../common/bus'

export default {
  components: {
    MyPagination,
    AppendDialog,
  },
  data() {
    return {
      currentRow: {}, //当前活动
      editVisible: false,
      appendTimeVisible: false,
      appendVisible: false,
      exportVisible: false,
      tableData: [],
      oldDate: [],
      newDate: '',
      exportDateRange: [],
      exportForm: {
        exportDate: [],
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
        },
      },
      appendTimePickerOptions: {
        //延长日期范围
        disabledDate: (time) => {
          let date = time.getTime()
          let start = new Date(this.oldDate[1]).getTime()
          return date < start
        },
      },
    }
  },
  mounted() {
    this._getAwardList()
  },
  activated() {
    bus.$on('isRefreshPrize', (param) => {
      if (param) {
        this._getAwardList()
      }
    })
  },
  methods: {
    //获取列表
    _getAwardList() {
      let { pageNum, pageSize } = this.pagination
      apiAwardList({
        pageNum,
        pageSize,
      })
        .then((result) => {
          let { total, rows } = result
          this.pagination.total = total
          this.tableData = rows
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
    // 延长时间
    handleAddtime(index, row) {
      this.appendTimeVisible = true
      this.oldDate.push(row.beginDate, row.endDate)
      this.currentRow = row
    },
    //确认延长时间
    saveAppendTime() {
      apiAppendTime({
        id: this.currentRow.id,
        beginDate: this.oldDate[0],
        endDate: this.newDate + ' 23:59:59',
      })
        .then(() => {
          this.$message.success('操作成功')
          this.appendTimeVisible = false
          this._getAwardList()
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
    // 删除操作
    handleDelete(index, id) {
      this.$confirm('确定要删除吗？', '提示', {
        center: true,
        customClass: 'stopDialog',
      }).then(() => {
        apiDeleteAward({ awardId: id })
          .then(() => {
            this.tableData.splice(index, 1)
            this.$message.success('删除成功')
          })
          .catch((err) => {
            console.log(err.message)
          })
      })
    },
    //追加操作
    handleAppend(row) {
      this.currentRow = row
      this.appendVisible = true
    },
    //追加完成
    hideDialog() {
      this.appendVisible = false
    },
    // 停止操作
    handleStop(index, id) {
      this.$confirm('确定要停止该活动吗？', '', {
        center: true,
        customClass: 'stopDialog',
      }).then(() => {
        apiStopAward({ awardId: id })
          .then(() => {
            this.$set(this.tableData[index], 'status', '3')
            this.$message.success('活动已停止')
          })
          .catch((err) => {
            console.log(err.message)
          })
      })
    },
    // 启动操作
    handleOpen(index, id) {
      this.$confirm('确定要启动该活动吗？', '', {
        center: true,
        customClass: 'stopDialog',
      }).then(() => {
        apiStopAward({ awardId: id })
          .then(() => {
            this.$set(this.tableData[index], 'status', '1')
            this.$message.success('活动已启动')
          })
          .catch((err) => {
            console.log(err.message)
          })
      })
    },
    //查看数据
    handleLook(row) {
      storage.set('disabled', true)
      storage.set('award', row)
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
            endDate,
          })
            .then((result) => {
              this.$message.success('导出成功')
              this.exportVisible = false
              //window.location.href = result.msg
              this.$refs[formName].resetFields()
              window.open(result.msg)
            })
            .catch((err) => {
              console.log(err.message)
            })
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
      storage.set('disabled', false)
      storage.remove('award')
      this.$router.push('/addprize')
    },
    //格式化 总金额/已抽出/余额
    awardResult(row) {
      let { awardAmount, usedAmount } = row
      let money = parseFloat(awardAmount * 100 - usedAmount * 100) / 100
      return awardAmount + ' / ' + money + ' / ' + usedAmount
    },
    //处理活动状态
    statusFormat(status) {
      switch (status) {
        case '0':
          return '未开始'
        case '1':
          return '进行中'
        case '2':
          return '已结束'
        case '3':
          return '已停止'
      }
    },
  },
}
</script>

<style scoped>
@import url(~assets/css/table.css);
</style>
