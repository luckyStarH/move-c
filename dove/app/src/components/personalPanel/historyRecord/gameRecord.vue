<template>
  <div class="gameRecord">
    <div class="mt-60 search-card" style="width:100%;padding:0 4vw;">
      <!-- <div class="title insert-to-bottom-line">{{$t('message.game_time')}}</div> -->
      <div class="row mt-30">
        <label class="lab-desc">{{$t("message.begin")}}</label>
        <el-date-picker v-model="beginTime" prefix-icon="" type="date" format="dd / MM / yyyy" :placeholder="$t('message.select_date')"
          class="user-date-picker">
        </el-date-picker>
      </div>
      <div class="row mt-30">
        <label class="lab-desc">{{$t("message.end")}}</label>
        <el-date-picker v-model="endTime" prefix-icon="" type="date" format="dd / MM / yyyy" :placeholder="$t('message.select_date')"
          class="user-date-picker">
        </el-date-picker>
      </div>
      <div class="row mt-30">
        <button class="user-btn" @click="search()">{{$t('message.search')}}</button>
      </div>
    </div>
    <div class="user-table mt-40" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.5)">
      <!-- <el-table
        :data="list"
        height="250"
        :empty-text="$t('message.no_data')"
        :header-cell-style="$store.state.tableRowStyle"
        :cell-style="$store.state.tableRowStyle"
        style="width: 100%">
        <el-table-column
          prop="day"
          :label="$t('message.game_time')">
          <template slot-scope="scope">
            {{scope.row.day | formatTimeDay}}
          </template>
        </el-table-column>
        <el-table-column
          prop="bet_amount"
          :label="$t('message.bet_total_amount')">
          <template slot-scope="scope">
            {{scope.row.bet_amount | filterCash}}
          </template>
        </el-table-column>
        <el-table-column
          prop="reward"
          :label="$t('message.win_total_amount')">
          <template slot-scope="scope">
            {{scope.row.reward | filterCash}}
          </template>
        </el-table-column>
        <el-table-column
          prop="profit"
          :label="$t('message.profit')">
          <template slot-scope="scope">
            {{scope.row.profit | filterCash}}
          </template>
        </el-table-column>
      </el-table> -->
      <div class="user-table-thead-div">
        <table>
          <thead>
            <tr>
              <th :style="{width: Math.floor(100/5)+'%'}">
                <div class="cell">{{$t("message.game_time")}}</div>
              </th>
              <th :style="{width: Math.floor(100/5)+'%'}">
                <div class="cell">{{$t("message.bet_total_amount")}}</div>
              </th>
              <th :style="{width: Math.floor(100/5)+'%'}">
                <div class="cell">{{$t("message.win_total_amount")}}</div>
              </th>
              <th :style="{width: Math.floor(100/5)+'%'}">
                <div class="cell">{{$t("message.rollback")}}</div>
              </th>
              <th :style="{width: Math.floor(100/5)+'%'}">
                <div class="cell">{{$t("message.profit")}}</div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="user-table-tbody-div">
        <table>
          <tbody v-if="!dataNull">
            <tr v-for="(item,index) in list" :key="index">
              <td :style="{width: Math.floor(100/5)+'%'}">
                <div class="cell">{{item.day | formatTimeDay}}</div>
              </td>
              <td :style="{width: Math.floor(100/5)+'%'}">
                <div class="cell">{{item.bet | filterCash}}</div>
              </td>
              <td :style="{width: Math.floor(100/5)+'%'}">
                <div class="cell">{{item.reward | filterCash}}</div>
              </td>
              <td :style="{width: Math.floor(100/5)+'%'}">
                <div class="cell">{{item.rollback | filterCash}}</div>
              </td>
              <td :style="{width: Math.floor(100/5)+'%'}">
                <div class="cell">{{(-item.bet_profit) | filterCash}}</div>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="dataNull" class="no-result">
            <tr>
              <td colspan="4">
                <p>{{$t("message.no_result")}}</p>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div class="record-pagination clearfix" v-if="!dataNull">
      <el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
        :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total">
        <!-- <span>Total <span class="num">{{this.totalPageNum}}</span> pages, current page <span class="num">{{this.pageIndex}}</span></span> -->
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import moment from 'moment';

  export default {
    name: 'gameRecord',
    data() {
      return {
        beginTime: '',
        endTime: '',
        pageIndex: 1,
        pageSize: 15,
        dataNull: false,
        total: 0,
        totalPageNum: 0,
        list: [],
        loading: false,
      };
    },
    methods: {
      search() {
        this.pageIndex = 1;
        this.onSubmit();
      },
      handleSizeChange(val) {},
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.onSubmit();
      },
      onSubmit() {
        const vm = this;
        let beginTime = vm.beginTime ? moment(new Date(vm.beginTime)).format('YYYY/MM/DD 00:00:00') : '';
        let endTime = vm.endTime ? moment(new Date(vm.endTime)).format('YYYY/MM/DD 23:59:59') : '';
        let url = '/record/game/list' + '?page_size=' + vm.pageSize + '&page_num=' + vm.pageIndex +
          '&beginTime=' + beginTime + "&endTime=" + endTime;
        vm.loading = true;
        vm.$http.get(url, {}).then(response => {
          vm.loading = false;
          let status = response.body.returncode;
          if (status) {
            if (status == 103 || status == 106 || status == 101) {
              this.$store.state.logout(this);
            } else if (status == 200) {
              vm.total = response.body.data.total;
              if (vm.total) {
                vm.dataNull = false;
                vm.totalPageNum = response.body.data.total_page_num;
                vm.list = response.body.data.data;
              } else {
                vm.dataNull = true;
                vm.list = [];
              }
            } else {
              vm.dataNull = true;
              vm.list = [];
            }
          }
        }, response => {
          // console.log('error', error);
          vm.loading = false;
          vm.dataNull = true;
          vm.list = [];
        });
      },
    },
    computed: {},
    beforeDestroy() {},
    destroyed() {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
      this.search();
    },
    watch: {},
  }

</script>
<style lang="scss" scoped>
  .gameRecord {
    // padding: 0 4vw;

    .row {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .user-btn{
      width:52.53vw;
    }
  }

</style>
