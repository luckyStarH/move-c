<template>
  <div class="recharge-apply-wrap common">
    <div class="container">
      <div class="tab">
        <router-link class="tab-item selected" :to="{name:'rechargeApply'}">
          <div class="item-inner">
            {{$t('message.recharge_apply')}}
          </div>
        </router-link>
        <router-link class="tab-item" :to="{name:'withdrawApply'}">
          <div class="item-inner">{{$t('message.withdraw_apply')}}</div>
        </router-link>
      </div>
      <div class="card mt-30">
        <div class="card-title">
          {{$t('message.recharge_apply')}}
        </div>
        <div class="card-body padding-20">
          <div class="search-form">
            <label class="search-desc">{{$t('message.status')}}：</label>
            <select name="" id="" @change="handleSelectLottery($event)">
              <option :value="option.val" v-for="(option, o) in statusArr" :key="o">{{$t('message.'+option.title)}}</option>
            </select>
            <label class="search-desc">{{$t('message.time')}}：</label>
            <el-date-picker v-model="beginTime" type="datetime" format="dd-MM-yyyy HH:mm:ss" :placeholder="$t('message.qing_xuan_ze') + $t('message.begin_time')">
            </el-date-picker>
            <span>-</span>
            <el-date-picker v-model="endTime" type="datetime" format="dd-MM-yyyy HH:mm:ss" :placeholder="$t('message.qing_xuan_ze') + $t('message.end_time')">
            </el-date-picker>
            <button class="submit ml-20 search-btn" style="margin-top:10px;" @click="handleSearch">{{$t('message.search')}}</button>
          </div>
          <div class="table-container">
            <table class="record-table mt-60">
              <thead>
                <tr>
                  <th>
                    <div class="cell">{{$t('message.order_no')}}</div>
                  </th>
                  <th>
                    <div class="cell">{{$t('message.ti_jiao_ren')}}</div>
                  </th>
                  <th>
                    <div class="cell">{{$t('message.firstname')}}</div>
                  </th>
                  <!-- <th>{{$t('message.shang_ji_dai_li')}}</th> -->
                  <th>
                    <div class="cell">{{$t('message.chong_zhi_qu_dao')}}</div>
                  </th>
                  <th>
                    <div class="cell">{{$t('message.shen_qing_shi_jian')}}</div>
                  </th>
                  <th>
                    <div class="cell">{{$t('message.dao_zhang_shi_jian')}}</div>
                  </th>
                  <th>
                    <div class="cell">{{$t('message.shen_qing_jin_e')}}</div>
                  </th>
                  <th>
                    <div class="cell">{{$t('message.shi_ji_chong_zhi')}}</div>
                  </th>
                  <!-- <th>
                    <div class="cell">{{$t('message.shou_xu_fei')}}</div>
                  </th> -->
                  <th>
                    <div class="cell">{{$t('message.status')}}</div>
                  </th>
                  <th>
                    <div class="cell">{{$t('message.check')}}</div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="!noResult">
                <tr v-for="(item,index) in list" :key="index">
                  <td>
                    <div class="cell">{{item.order_no}}</div>
                  </td>
                  <td>
                    <div class="cell">{{item.loginid.loginname}}</div>
                  </td>
                  <td>
                    <div class="cell">{{item.loginid.firstname}}</div>
                  </td>
                  <!-- <td>{{item.shangjidali ? item.shangjidaili :'--'}}</td> -->
                  <td>
                    <div class="cell">{{item.chongzhiqudao ? item.chongzhiqudao :'--'}}</div>
                  </td>
                  <td>
                    <div class="cell">{{item.create_at | formatTime}}</div>
                  </td>
                  <td>
                    <div class="cell">{{item.recharge_at | formatTime}}</div>
                  </td>
                  <td>
                    <div class="cell">{{item.cash_apply | formatCash}}</div>
                  </td>
                  <td>
                    <div class="cell">{{item.cash_recharged | formatCash}}</div>
                  </td>
                  <!-- <td>
                    <div class="cell">{{item.cash_service_fee | formatCash}}</div>
                  </td> -->
                  <td>
                    <div class="cell">{{ formatStatus(item.status)}}</div>
                  </td>
                  <td>
                    <div class="cell">
                      <button class="detail cell-btn" v-if="item.status === 0 || item.status === 1" @click="handleOpen(item)">{{$t('message.chong_zhi_shen_he')}}</button>
                      <button class="detail cell-btn" v-if="item.status === 2 || item.status === 3" @click="handleOpen_(item)">{{$t('message.detail')}}</button>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-if="noResult">
                <tr class="no-result">
                  <td colspan="10">
                    <p>{{$t('message.no_result')}}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="record-pagination clearfix">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageIndex"
              :page-size="pageSize" layout="total, prev, pager, next" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" v-loading="dialogLoading"
      :close-on-click-modal="false" top="0" custom-class="common-dialog" center>
      <div slot="title" class="dialog-header">
        <img src="@/assets/img/confirm.png" class="icon" />
        <span class="title">{{$t('message.chong_zhi_shen_he')}}</span>
      </div>
      <div class="body">
        <table class="user-table">
          <tbody>
            <tr>
              <td class="left">
                <label>{{$t('message.shen_qing_ren')}}:</label>
              </td>
              <td class="right">
                <label class="imp">{{dialogItem.loginid&& dialogItem.loginid.loginname}}</label>
              </td>
            </tr>
            <tr>
              <td class="left">
                <label>{{$t('message.shen_qing_jin_e')}}:</label>
              </td>
              <td class="right">
                <label class="imp">{{dialogItem.cash_apply | formatCash}}</label>
              </td>
            </tr>
            <tr>
              <td class="left">
                <label>{{$t('message.shou_kuan_zhang_hu')}}:</label>
              </td>
              <td class="right">
                <label class="imp">{{dialogItem.receiver_accountid?
                  dialogItem.receiver_accountid.bank :""}}</label><br />
                <label class="imp">{{dialogItem.receiver_accountid ?
                  dialogItem.receiver_accountid.account_name
                  :""}}</label><br />
                <label class="imp">{{dialogItem.receiver_accountid?
                  dialogItem.receiver_accountid.card_no :""}}</label><br />
              </td>
            </tr>
            <tr>
              <td class="left">
                <label>{{$t('message.yong_hu_bei_zhu')}}:</label>
              </td>
              <td class="right">
                <label class="imp">{{dialogItem.message ? dialogItem.message : '--'}}</label>
              </td>
            </tr>
            <tr>
              <td class="left">
                <label>{{$t('message.ti_jiao_shi_jian')}}:</label>
              </td>
              <td class="right">
                <label class="imp">{{dialogItem.create_at | formatTime}}</label>
              </td>
            </tr>
            <!-- <tr>
              <td class="left">
                <label>{{$t('message.shou_xu_fei')}}:</label>
              </td>
              <td class="right">
                <label>
                  <input id="recharge_shen_he_input" class="c-input" :placeholder="$t('message.qing_shu_ru') + $t('message.jin_e')"
                    v-model.trim="servicefee" @keyup="cashExp('recharge_shen_he_input')" />
                </label>
              </td>
            </tr> -->
            <tr>
              <td class="left">
                <label>{{$t('message.shi_ji_dao_zhang')}}:</label>
              </td>
              <td class="right">
                <label class="imp">{{(Number(dialogItem.cash_apply)) |formatCash}}</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <button @click="handleCancel" class="btn-cancel">{{$t('message.ju_jue_chong_zhi')}}</button>
        <button @click="handleConfirm" class="btn-confirm">{{$t('message.que_ren_chong_zhi')}}</button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible_" :before-close="handleClose_" v-loading="dialogLoading_"
      :close-on-click-modal="false" top="0" custom-class="common-dialog" center>
      <div slot="title" class="dialog-header">
        <img src="@/assets/img/confirm.png" class="icon" />
        <span class="title">{{$t('message.chong_zhi_detail')}}</span>
      </div>
      <div class="body">
        <table class="user-table">
          <tbody>
            <tr>
              <td class="left">
                <label>{{$t('message.shen_qing_ren')}}:</label>
              </td>
              <td class="right">
                <label class="imp">{{dialogItem_.loginid&&dialogItem_.loginid.loginname}}</label>
              </td>
            </tr>
            <tr>
              <td class="left">
                <label>{{$t('message.shen_qing_jin_e')}}:</label>
              </td>
              <td class="right">
                <label class="imp">{{dialogItem_.cash_apply | formatCash}}</label>
              </td>
            </tr>
            <tr>
              <td class="left">
                <label>{{$t('message.shou_kuan_zhang_hu')}}:</label>
              </td>
              <td class="right">
                <label class="imp">{{dialogItem_.receiver_accountid?
                  dialogItem_.receiver_accountid.bank :""}}</label><br />
                <label class="imp">{{dialogItem_.receiver_accountid ?
                  dialogItem_.receiver_accountid.account_name
                  :""}}</label><br />
                <label class="imp">{{dialogItem_.receiver_accountid?
                  dialogItem_.receiver_accountid.card_no :""}}</label><br />
              </td>
            </tr>
            <tr>
              <td class="left">
                <label>{{$t('message.yong_hu_bei_zhu')}}:</label>
              </td>
              <td class="right">
                <label class="imp">{{dialogItem_.message ? dialogItem_.message : '--'}}</label>
              </td>
            </tr>
            <tr>
              <td class="left">
                <label>{{$t('message.ti_jiao_shi_jian')}}:</label>
              </td>
              <td class="right">
                <label class="imp">{{dialogItem_.create_at | formatTime}}</label>
              </td>
            </tr>
            <!-- <tr>
              <td class="left">
                <label>{{$t('message.shou_xu_fei')}}:</label>
              </td>
              <td class="right">
                <label>{{dialogItem_.cash_service_fee | formatCash}}</label>
              </td>
            </tr> -->
            <tr>
              <td class="left">
                <label>{{$t('message.shi_ji_dao_zhang')}}:</label>
              </td>
              <td class="right">
                <label class="imp">{{ dialogItem.status === 2 ?formatCash2(Number(dialogItem_.cash_apply)):'--' }}</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import moment from 'moment';
  import paramCryptFn from '@/assets/js/cryptData';

  export default {
    name: 'rechargeApply',
    components: {},
    props: {},
    data() {
      return {
        beginTime: '',
        endTime: '',
        list: [],
        noResult: true,
        totalPageNum: 0, //总页数
        total: 0, //总条数
        pageIndex: 1, //当前页
        pageSize: 20, //单页条数
        loading: false,
        dialogVisible: false,
        dialogLoading: false,
        dialogItem: {},
        // servicefee: 0,
        dialogItem_: {},
        dialogVisible_: false,
        dialogLoading_: false,
        status: '1',
        statusArr: [{
            title: 'shen_qing_chong_zhi',
            val: '1'
          },
          {
            title: 'chong_zhi_cheng_gong',
            val: '2'
          },
          {
            title: 'chong_zhi_shi_bai',
            val: '3'
          },
        ],
      }
    },
    beforeDestroy() {},
    destroyed() {},
    computed: {},
    created() {
      sessionStorage.setItem("th_tag_url", "rechargeApply");
    },
    mounted() {
      // this.setTimeToday();
      this.handleSearch();
      this.hasNewRecharge();
    },
    methods: {
      getProfile() {
        const vm = this;
        this.$http.get('/user/profile', {}).then(response => {
          // console.log('response', response);
          vm.loading = false;
          let status = response.body.returncode;
          if (status) {
            if (status == 103 || status == 106 || status == 101) {
              this.$store.state.reLogin(this);
            } else if (status == 200) {
              let data = response.body.data;
              localStorage.setItem('candy-cash', data.cash);
              localStorage.setItem("candy-birthday", data.birthday||'');
              this.$store.dispatch("setCash", data.cash);
              localStorage.setItem('candy-cash_credit', data.cash_credit);
              localStorage.setItem('candy-loginname', data.loginname);
              localStorage.setItem('candy-loginid', data._id);
              localStorage.setItem('candy-phone', data.phone);
              localStorage.setItem('candy-email', data.email);
              localStorage.setItem('candy-lineid', data.lineid);
              localStorage.setItem('candy-firstname', data.firstname);
              localStorage.setItem('candy-lastname', data.lastname);
              if (data.superiorid) {
                if (data.superiorid.phone) {
                  localStorage.setItem("candy-superiorphone", data.superiorid.phone);
                }
                if (data.superiorid.lineid) {
                  localStorage.setItem("candy-superiorlineid", data.superiorid.lineid);
                }
              }
              localStorage.setItem('candy-type', data.type);
              // vm.getMember();
            } else {
              vm.$store.state.message(vm.$t("message.server_cuo_wu"), 'error', 1500, vm);
            }
          }
        }, response => {
          // console.log('error', error);
          vm.loading = false;
        });
      },
      // input金额格式限制
      // 只允许小数点和数字，并且小数位最多2位
      cashExp(id) {
        let obj = document.getElementById(id);
        obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符  
        obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
        obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数  
        if (obj.value.indexOf(".") < 0 && obj.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
          obj.value = parseFloat(obj.value);
        }
      },
      handleClose() {
        this.dialogVisible = false;
      },
      handleClose_() {
        this.dialogVisible_ = false;
      },
      resetForm() {
        // this.servicefee = '';
        this.dialogItem = {};
      },
      resetForm() {
        this.dialogItem_ = {};
      },
      handleOpen(item) {
        this.dialogVisible = true;
        this.dialogItem = item;
        // this.servicefee = this.dialogItem.cash_service_fee;
      },
      handleOpen_(item) {
        this.dialogVisible_ = true;
        this.dialogItem_ = item;
      },
      handleSearch() {
        this.pageIndex = 1;
        this.getRechargeList();
      },
      handleConfirm() {
        this.onSubmit();
      },
      handleCancel() {
        this.refuse();
      },
      onSubmit() {
        const vm = this;
        vm
          .$confirm(vm.$t('message.que_ren_tong_guo_shen_he'), vm.$t('message.que_ren'), {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning"
          })
          .then(() => {
            vm.dialogLoading = true;
            let url = "/agency/recharge/update";
            vm.$http
              .post(url, {
                id: vm.dialogItem._id,
                status: "2",
                // cash_service_fee: vm.servicefee,
                cash_apply: vm.dialogItem.cash_apply,
                message: ''
              })
              .then(
                response => {
                  // console.log('response', response);
                  vm.dialogLoading = false;
                  let status = response.body.returncode;
                  if (status) {
                    if (status == 103 || status == 106 || status == 101) {
                      this.$store.state.reLogin(this);
                    } else if (status == 200) {
                      vm.dialogVisible = false;
                      vm.$store.state.message(vm.$t("message.commit_success"), 'success', 1500, vm);
                      vm.resetForm();
                      vm.getRechargeList();
                      vm.getProfile();
                      vm.hasNewRecharge();
                    } else if (status == 301) {
                      vm.$store.state.message(vm.$t("message.agency_cash_bu_zu"), 'error', 1500, vm);
                    } else {
                      vm.$store.state.message(vm.$t("message.chong_zhi_shi_bai") + ":" + status, 'error', 1500, vm);
                    }
                  }
                },
                error => {
                  console.log("error", error);
                  vm.dialogLoading = false;
                }
              );
          })
          .catch(() => {
            // vm.$message({
            //   type: "info",
            //   message: this.$t("message.kai_hu_yi_qu_xiao")
            // });
          });
      },
      refuse() {
        const vm = this;
        vm
          .$confirm(vm.$t('message.que_ren_ju_jue_chong_zhi_me'), vm.$t('message.que_ren'), {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning"
          })
          .then(() => {
            vm.dialogLoading = true;
            let url = "/agency/recharge/update";
            vm.$http
              .post(url, {
                id: vm.dialogItem._id,
                status: "3",
                // cash_service_fee: vm.dialogItem.cash_service_fee,
                cash_apply: vm.dialogItem.cash_apply,
                message: ''
              })
              .then(
                response => {
                  // console.log('response', response);
                  vm.dialogLoading = false;
                  let status = response.body.returncode;
                  if (status) {
                    if (status == 103 || status == 106 || status == 101) {
                      this.$store.state.reLogin(this);
                    } else if (status == 200) {
                      vm.dialogVisible = false;
                      vm.$store.state.message(vm.$t("message.commit_success"), 'success', 1500, vm);
                      vm.resetForm();
                      vm.getRechargeList();
                    } else {
                      vm.$store.state.message(vm.$t("message.ju_jue_chong_zhi") + this.$t("message.shi_bai") + ":" + status, 'error', 1500, vm);
                    }
                  }
                },
                error => {
                  console.log("error", error);
                  vm.dialogLoading = false;
                }
              );
          })
          .catch(() => {
            /* vm.$message({
              type: "info",
              message: this.$t("message.kai_hu_yi_qu_xiao")
            }); */
          });
      },
      handleSelectLottery(e) {
        this.status = e.target.value;
      },
      getRechargeList() {
        const vm = this;
        vm.loading = true;
        let beginTime = vm.beginTime ? new Date(vm.beginTime) : '';
        let endTime = vm.endTime ? new Date(vm.endTime) : '';
        let url = '/agency/team/recharge/list' + '?page_size=' + vm.pageSize + '&page_num=' + vm.pageIndex +
          '&begintime=' + beginTime + "&endtime=" + endTime + '&status=' + vm.status;
        vm.$http.get(url, {}).then(response => {
          // console.log('response', response);
          vm.loading = false;
          let status = response.body.returncode;
          if (status) {
            if (status == 103 || status == 106 || status == 101) {
              this.$store.state.reLogin(this);
            } else if (status == 200) {
              vm.total = response.body.data.total;
              if (vm.total) {
                vm.noResult = false;
                vm.totalPageNum = response.body.data.total_page_num;
                vm.list = response.body.data.data;
              } else {
                vm.noResult = true;
                vm.list = [];
              }
            } else {
              vm.noResult = true;
              vm.list = [];
            }
          }
        }, response => {
          // console.log('error', error);
          vm.loading = false;
          vm.noResult = true;
          vm.list = [];
        });
      },
      setTimeToday() {
        const end = new Date();
        const start = new Date(moment(new Date()).format('YYYY/MM/DD')).getTime();
        end.setTime(new Date(moment(new Date()).format('YYYY/MM/DD')).getTime() + 24 * 60 * 60 * 1000 - 1);
        this.beginTime = start;
        this.endTime = end;
      },
      handleSizeChange(val) {},
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getRechargeList();
      },
      formatStatus(v) {
        //状态 0: 生成订单号 1: 申请充值  2：充值成功 3：充值失败
        if (v) {
          switch (v) {
            case 0:
              return this.$t('message.sheng_cheng_ding_dan_hao');
            case 1:
              return this.$t('message.shen_qing_chong_zhi');
            case 2:
              return this.$t('message.chong_zhi_cheng_gong');
            case 3:
              return this.$t('message.chong_zhi_shi_bai');
            default:
              return v;
          }
        }
        return '--';
      },
      formatCash2(v) {
        if (v || v === 0) {
          let num = parseFloat(v).toFixed(2);
          //如果num是负数，则获取她的符号
          var sign = '';
          if (Number(num) < 0) {
            sign = '-';
          }
          // 绝对值
          var numAbs = Math.abs(num);
          var decimal = String(numAbs).split('.')[1] || ''; //小数部分
          var tempArr = [];
          var revNumArr = String(numAbs).split('.')[0].split("").reverse(); //倒序
          for (let i in revNumArr) {
            tempArr.push(revNumArr[i]);
            if ((i + 1) % 3 === 0 && i != revNumArr.length - 1) {
              tempArr.push(',');
            }
          }
          var zs = tempArr.reverse().join(''); //整数部分
          return decimal ? sign + zs + '.' + decimal : sign + zs;
        }
        return '0';
      },
      // 新充值消息提示
      hasNewRecharge() {
        const vm = this;
        vm.$http.get("/agency/team/recharge/notice", {}).then(
          response => {
            let status = response.body.returncode;
            if (status) {
              if (status == 103 || status == 106 || status == 101) {
                vm.$store.state.reLogin(vm);
              } else if (status == 200) {
                vm.$store.dispatch("setRechargeMsgHidden", false);
              } else if (status === 301) {
                vm.$store.dispatch("setRechargeMsgHidden", true);
              } else {
                vm.$store.dispatch("setRechargeMsgHidden", true);
              }
            }
          },
          response => {}
        );
      },
    },
    filters: {
      formatTime(v) {
        if (v) {
          return moment(v).format('DD-MM-YYYY HH:mm:ss')
        }
        return '--'
      },
      formatCash(v) {
        if (v || v === 0) {
          let num = parseFloat(v).toFixed(2);
          //如果num是负数，则获取她的符号
          var sign = '';
          if (Number(num) < 0) {
            sign = '-';
          }
          // 绝对值
          var numAbs = Math.abs(num);
          var decimal = String(numAbs).split('.')[1] || ''; //小数部分
          var tempArr = [];
          var revNumArr = String(numAbs).split('.')[0].split("").reverse(); //倒序
          for (let i in revNumArr) {
            tempArr.push(revNumArr[i]);
            if ((i + 1) % 3 === 0 && i != revNumArr.length - 1) {
              tempArr.push(',');
            }
          }
          var zs = tempArr.reverse().join(''); //整数部分
          return decimal ? sign + zs + '.' + decimal : sign + zs;
        }
        return '0';
      }
    }
  }

</script>

<style lang="scss" scoped>
  .recharge-apply-wrap {
    background: #efefef;
    padding: 60px 0;

    .search-form {
      margin-top: 50px;

      select {
        width: 236px;
        height: 32px;
        background-image: linear-gradient(-180deg, #EEEEEE 0%, #D8D8D8 100%);
        border: 1px solid #979797;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.20);
      }
    }

    .user-table {
      width: 100%;
      display: table;
      font-size: 16px;
      border-collapse: collapse;
      margin: 0 auto;

      tr {
        border-bottom: 1px solid #D0D0D0;

        td {
          padding: 10px 0;

          &.left {
            width: 46%;
            text-align: left;
          }

          &.right {
            text-align: right;
          }

          >label {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #191919;
            text-align: right;

            &.imp {
              color: #C59A37;
            }
          }
        }

        &:first-child {
          td {
            padding-top: 0;
          }
        }

        &.line-tip {
          td {
            padding-top: 10px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #777777;
          }
        }

        &.text-area {
          td.left {
            vertical-align: top;
          }
        }
      }
    }


    @media screen and (max-width: 760px) {
      .user-table {
        width: 80%;
      }
    }

    table.record-table {
      border-collapse: collapse;
      width: 100%;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #191919;
      text-align: center;

      thead {
        background: #ededed;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #191919;
        line-height: 40px;
        height: 40px;
        text-align: center;
      }

      tr {

        >td {
          padding: 15px 0;
        }

        &:last-child {
          >td {
            padding-bottom: 30px;
          }
        }
      }
    }

    .submit {
      background-image: linear-gradient(-180deg, #EB5228 0%, #C14726 100%);
      width: 100px;
      height: 34px;
      line-height: 34px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #FFFFFF;
      text-align: center;
      cursor: pointer;
    }

    .detail {
      background-image: linear-gradient(-180deg, #7C7C7C 0%, #464646 100%);
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #FFFFFF;
      text-align: center;
      width: 72px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
    }
  }

  .padding-20 {
    padding: 0 20px;
  }

</style>
