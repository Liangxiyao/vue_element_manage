<template>
  <div class="prize">
    <el-table :data="tableData"
              class="mytable"
              border>
      <el-table-column label="编号"
                       width="80">
        <template v-slot="scope">
          <span>{{scope.$index+(pagination.pageNum - 1) * pagination.pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column prop="awardStatus"
                       label="活动状态"
                       width="100">
        <template v-slot="scope">
          <span>{{scope.row.awardStatus=="0"?"启用":'停用'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="awardType"
                       label="奖品类型">
      </el-table-column>
      <el-table-column prop="awardName"
                       label="奖品内容">
        <template v-slot="scope">
          {{scope.row.awardType=="大额红包"?scope.row.awardAmount:scope.row.awardName}}
        </template>
      </el-table-column>
      <el-table-column prop="intervalCount"
                       label="间隔次数">
      </el-table-column>
      <el-table-column prop="cycle"
                       label="周期">
      </el-table-column>
      <el-table-column prop="cycleCount"
                       label="周期内可被抽中次数">
      </el-table-column>
      <el-table-column prop="initialAndLeft"
                       label="总库存/剩余库存">
      </el-table-column>
      <el-table-column prop="usedCount"
                       label="已被抽出数量">
      </el-table-column>
      <el-table-column label="操作"
                       width="220">
        <template v-slot="scope">
          <el-button type="text"
                     @click="$router.push({path:'/extraRecordList',query:{id:scope.row.id}})">中奖记录</el-button>
          <el-button type="text"
                     @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="text"
                     @click="handleStop(scope.$index,scope.row)">{{scope.row.awardStatus=="0"?"停用":'启用'}}</el-button>

        </template>
      </el-table-column>
    </el-table>
    <div class="bt">
      <el-button type="primary"
                 @click="toAdd">新建奖品</el-button>
      <my-pagination :pagination="pagination"
                     @changePage="changePage"></my-pagination>
    </div>
  </div>
</template>

<script>
import storage from '@/utils/storage.js';
import { apiExtraAward, apiSwitchExtra } from '@/utils/api.js';
import MyPagination from '@/components/common/Pagination';
import bus from '../common/bus';

export default {
  components: {
    MyPagination,
  },
  data() {
    return {
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  mounted() {
    this._getExtraAward()
  },
  activated() {
    //是否重新请求列表
    bus.$on('isRefreshExtraAward', (param) => {
      if (param) {
        this._getExtraAward()
      }
    })
  },
  methods: {
    //获取列表
    _getExtraAward() {
      let { pageNum, pageSize } = this.pagination
      apiExtraAward({
        pageNum,
        pageSize,
      }).then((result) => {
        let { total, rows } = result
        this.pagination.total = total
        this.tableData = rows
      }).catch((err) => {
        console.log(err.message);
      });
    },
    // 启动停止操作
    handleStop(index, row) {
      if (row.awardStatus == 0) {
        this.$confirm('确定要停用该活动吗', '', {
          center: true,
          customClass: 'stopDialog'
        }).then(() => {
          apiSwitchExtra({
            awardId: row.id
          }).then(() => {
            this.$set(this.tableData[index], "awardStatus", 1)
            this.$message.success('该活动已停止')
          }).catch((err) => {
            console.log(err.message)
          });
        })
      } else if (row.awardStatus == 1) {
        this.$confirm('确定要启用该活动吗', '', {
          center: true,
          customClass: 'stopDialog'
        }).then(() => {
          apiSwitchExtra({
            awardId: row.id
          }).then(() => {
            this.$set(this.tableData[index], "awardStatus", 0)
            this.$message.success('该活动已启用')
          }).catch((err) => {
            console.log(err.message)
          });
        })
      }

    },
    //修改
    handleEdit(row) {
      storage.set("awardTypeDisabled", true)
      storage.set("extraAward", row)
      this.$router.push('/setExtraAward')
    },
    changePage(val) {
      this.pagination.pageNum = val
      this._getAwardList()
    },
    //跳转添加
    toAdd() {
      storage.set("awardTypeDisabled", false)
      storage.remove("extraAward")
      this.$router.push('/setExtraAward')
    }
  }
}
</script>

<style scope>
@import url(~assets/css/table.css);

</style>