<template>
  <div class="setting" v-loading.fullscreen="loading">
    <div class="data-content box-shadow">
      <div class="input-data-wrap">
        <el-row :gutter="100">
          <el-col :span="12">
            <div class="item">
              <p class="title">系统名称</p>
              <div class="input"><el-input size="mini" v-model="companyInfo.message" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
          <!-- <el-col :span="8" style="float:right">
            <div class="item">
              <p class="title">应用版本</p>
              <div class="input"><el-input size="mini" v-model="value" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col> -->
        </el-row>
        <el-row :gutter="100">
          <el-col :span="8">
            <div class="item">
              <p class="title">建筑公司名称</p>
              <div class="input"><el-input size="mini" v-model="companyInfo.companyName" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <p class="title">办公地址</p>
              <div class="input"><el-input size="mini" v-model="companyInfo.officeAddress" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <p class="title">办公电话</p>
              <div class="input"><el-input size="mini" v-model="companyInfo.phone" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col :span="8">
            <div class="item">
              <!-- <p class="title">合作单位列表</p> -->
              <div class="input"><el-button size="small" @click="showCompanyList" type="primary">合作单位列表</el-button></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col :span="8">
            <div class="item">
              <p class="title">项目名称</p>
              <div class="input"><el-input size="mini" v-model="companyInfo.projectName" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <p class="title">施工许可证</p>
              <div class="input"><el-input size="mini" v-model="companyInfo.permitNo" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col :span="8">
            <div class="item">
              <p class="title">项目所在&nbsp;&nbsp;省</p>
              <div class="input"><el-input size="mini" v-model="companyInfo.province" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <p class="title">市</p>
              <div class="input"><el-input size="mini" v-model="companyInfo.city" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <p class="title">详细地址</p>
              <div class="input"><el-input size="mini" v-model="companyInfo.detailedAddress" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="item">
              <div class="input" style="text-align:right" v-if="!companyInfo.parentId"><el-button size="small" :disabled="isClick" @click="saveCompanyInfo1" type="primary">保存</el-button></div>
              <div class="input" style="text-align:right" v-if="companyInfo.parentId"><el-button size="small" :disabled="isClick" @click="saveCompanyInfo2" type="primary">保存</el-button></div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="input-data-wrap">
        <el-row :gutter="100">
          <el-col :span="12">
            <div class="item">
              <p class="title">上传授权账号</p>
              <div class="input"><el-input size="mini" v-model="platform.count" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col :span="12">
            <div class="item">
              <p class="title">上传授权秘钥</p>
              <div class="input"><el-input size="mini" v-model="platform.key" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col :span="12">
            <div class="item">
              <p class="title">单位类型</p>
              <div class="input"><el-input size="mini" v-model="platform.type" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col :span="12">
            <div class="item">
              <p class="title">远程平台地址</p>
              <div class="input"><el-input size="mini" v-model="platform.url" placeholder="请输入内容"></el-input></div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col :span="12">
            <div class="item">
              <div class="input" style="text-align:center;">
                <el-switch
                  v-model="platform.disabled"
                  active-text="开启"
                  inactive-text="关闭">
                </el-switch>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="单位资料" :visible.sync="dialogTableVisible">
      <div class="data-content">
        <div class="title-operate-btn">
          <el-button size="mini" @click="showCreate" type="primary">添加</el-button>
        </div>
        <div class="table-content">
          <el-table
            :data="tableData"
            border
            max-height="600"
            style="width: 100%">
            <el-table-column
              prop="companyType"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="leaderName"
              label="负责人">
            </el-table-column>
            <el-table-column
              prop="companyName"
              label="名称">
            </el-table-column>
            <el-table-column
              prop="creditCode"
              label="社会信用号">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系号码">
            </el-table-column>
            <el-table-column
              prop="officeAddress"
              label="地址">
            </el-table-column>
            <el-table-column
              prop="message"
              label="备注">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <div class="reperate-wrap">
                  <div><el-button type="primary" @click="showEdit(scope.row)" size="mini">修改</el-button></div>
                  <div><el-button type="primary" @click="handleDelete(scope.row)" size="mini">删除</el-button></div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table-pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            size="mini"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
    <el-dialog :title="formTitle" width="379px" @close="resetForm('dataForm')" :visible.sync="dialogFormVisible">
      <el-form :model="dataForm" :rules="rules" ref="dataForm" :label-width="formLabelWidth" size="mini">
        <el-form-item label="单位类型" prop="companyType">
          <div class="userManager-item">
            <!-- <el-select v-model="dataForm.company.val" size="mini" clearable placeholder="请选择单位类型">
              <el-option
                v-for="item in dataForm.company.data"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select> -->
            <el-input size="mini" clearable v-model="dataForm.companyType" placeholder="请输入单位类型"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="单位负责人" prop="leaderName">
          <div class="userManager-item">
            <div class="select-wrap">
              <el-input size="mini" clearable v-model="dataForm.leaderName" placeholder="请输入单位负责人"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="单位名称" prop="companyName">
          <div class="userManager-item">
            <div class="select-wrap">
              <el-input size="mini" clearable v-model="dataForm.companyName" placeholder="请输入单位名称"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="社会信用号" prop="creditCode">
          <div class="userManager-item">
            <div class="select-wrap">
              <el-input size="mini" clearable v-model="dataForm.creditCode" placeholder="请输入社会信用号"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="地址" prop="officeAddress">
          <div class="userManager-item">
            <div class="select-wrap">
              <el-input size="mini" clearable v-model="dataForm.officeAddress" placeholder="请输入地址"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <div class="userManager-item">
            <div class="select-wrap">
              <el-input size="mini" clearable v-model="dataForm.phone" placeholder="请输入联系电话"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="message">
          <div class="userManager-item">
            <div class="select-wrap">
              <el-input size="mini" clearable v-model="dataForm.message" placeholder="请输入备注"></el-input>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" center>
        <el-button size="mini" @click="resetForm('dataForm')">取 消</el-button>
        <el-button size="mini" :disabled="isClick" type="primary" @click="submitForm('dataForm')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/axios/axios";
export default {
  name: 'setting',
  data() {
    return {
      loading: false,
      isClick: false,
      companyInfo: {
        id: '',
        message: '', // 系统名称
        companyName: '', // 公司名称
        officeAddress: '', // 办公地点
        phone: '', // 办公电话
        projectName: '', // 项目名称
        permitNo: '', // 施工许可证
        province: '', // 项目所在省
        city: '', // 项目所在市
        detailedAddress: '', // 详细地址
      },
      platform: {
        count: '', // 授权账号
        key: '', // 授权秘钥
        type: '', // 单位类型
        url: '', // 平台地址
        disabled: false,
      },
      value: '',
      pageNum: 1,
      pageSize: 10,
      total: 1,
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '100px',
      dataForm: {},
      formTitle: '',
      createForm: {
        parentId: '',
        // company: {
        //   val: '',
        //   data: []
        // },
        companyType: '',
        leaderName: '',
        companyName: '',
        creditCode: '',
        officeAddress: '',
        phone: '',
        message: '',
      },
      updateForm: {
        parentId: '',
        id: '',
        // company: {
        //   val: '',
        //   data: []
        // },
        companyType: '',
        leaderName: '',
        companyName: '',
        creditCode: '',
        officeAddress: '',
        phone: '',
        message: '',
      },
      rules: {
        // "company.val": [
        //   { required: true, message: '请选择单位类型', trigger: 'change' }
        // ],
        companyType: [
          { required: true, message: '请输入单位类型', trigger: 'blur' }
        ],
        leaderName: [
          { required: true, message: '请输入单位负责人', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
        ],
        creditCode: [
          { required: true, message: '请输入社会信用号', trigger: 'blur' },
        ],
        officeAddress: [
          { required: true, message: '请输入地址', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
        ],
        message: [
          { required: true, message: '请输入备注', trigger: 'blur' },
        ],
      }
    }
  },
  created() {
    this.dataForm = this.createForm;
    this.getInfo();
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    // 获取树形 数据
    getTreeData() {
      const vm = this;
      request({
        url: '/companyGroupUser/structureList',
        param: {},
        method: 'get',
        onError: err => {
          // vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        console.log(res)
        let code = res.code;
        let data = [];
        if(code === 200) {
          data = res.data;
        }
        vm.$store.dispatch('setTreeData', data)
      });
    },
    showCompanyList() {
      this.getCompanyList();
      this.dialogTableVisible = true;
      this.createForm.parentId = this.companyInfo.id;
      this.updateForm.parentId = this.companyInfo.id;
    },
    handleSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.getCompanyList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getCompanyList();
      console.log(`当前页: ${val}`);
    },
    // 获取合作单位列表
    getCompanyList() {
      const vm = this;
      vm.loading = true;
      request({
        url: '/company/list',
        param: {
          parentId: vm.createForm.parentId,
          pageNum: vm.pageNum,
          pageSize: vm.pageSize
        },
        method: 'get',
        onError: err => {
          vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        console.log(res)
        vm.loading = false;
        let code = res.code;
        if(code === 200) {
          let data = res.data;
          vm.tableData = data.query;
          vm.total = data.total;
        }
      });
    },
    // 获取总包单位信息
    getInfo() {
      const vm = this;
      vm.loading = true;
      request({
        url: '/company/getRoot',
        param: {},
        method: 'get',
        onError: err => {
          vm.loading = false;
          // vm.isClick = false;
        },
        vm,
      }).then(res => {
        vm.loading = false;
        let code = res.code;
        if(code === 200) {
          vm.companyInfo = res.data;
        }
      });
    },
    // 保存信息
    saveCompanyInfo1() {
      const vm = this;
      vm.loading = true;
      vm.isClick = true;
      request({
        url: '/company/add',
        param: vm.companyInfo,
        method: 'post',
        onError: err => {
          vm.loading = false;
          vm.isClick = false;
        },
        vm,
      }).then(res => {
        let code = res.code;
        vm.loading = false;
        vm.isClick = false;
        if(code === 200) {
          vm.$message({
            message: '保存成功',
            type: 'success',
            duration: 1000
          })
        }
      });
    },
    // 保存信息
    saveCompanyInfo2() {
      const vm = this;
      vm.loading = true;
      vm.isClick = true;
      request({
        url: '/company/update',
        param: vm.companyInfo,
        method: 'post',
        onError: err => {
          vm.loading = false;
          vm.isClick = false;
        },
        vm,
      }).then(res => {
        let code = res.code;
        vm.loading = false;
        vm.isClick = false;
        if(code === 200) {
          vm.$message({
            message: '保存成功',
            type: 'success',
            duration: 1000
          })
        }
      });
    },
    showCreate() {
      this.dataForm = this.createForm;
      this.formTitle = '添加';
      this.dialogFormVisible = true
    },
    showEdit(row) {
      for(let i in this.updateForm){
        this.dataForm[i] = row[i];
      }
      this.formTitle = '修改';
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      const vm = this;
      let deleteCompany = () => {
        vm.loading = true;
        request({
          url: '/company/delete',
          param: {
            groupId: row.id
          },
          method: 'get',
          onError: err => {
            vm.loading = false;
          },
          vm,
        }).then(res => {
          let code = res.code;
          vm.loading = false;
          if(code === 200){
            vm.$message({
              message: '删除成功',
              type: 'success',
              duration: 1500,
            });
            vm.getCompanyList();
          }
        });
      }
      this.$alert('确定删除当前伙伴吗？', '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
          if(action === 'confirm'){
            // alert('已删除')
            deleteCompany();
          }
        }
      });
    },
    // 确认创建
    submitForm(formName) {
      const vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = '';
          if(vm.formTitle === '添加'){
            url = '/company/add'
          }else{
            url = '/company/update'
            // vm.updateUser();
          }
          vm.createCompany(url, vm.dataForm);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
    createCompany(url, data) {
      const vm = this;
      vm.loading = true;
      vm.isClick = true;
      request({
        url,
        param: data,
        method: 'post',
        onError: err => {
          vm.loading = false;
          vm.isClick = false;
        },
        vm,
      }).then(res => {
        let code = res.code;
        vm.loading = false;
        vm.isClick = false;
        if(code === 200){
          vm.resetForm("dataForm")
          vm.dialogFormVisible = false;
          vm.$message({
            message: '提交成功',
            type: 'success',
            duration: 1500
          });
          vm.getCompanyList();
          vm.getTreeData();
        }
      });
    }
  },
}
</script>
<style lang="scss" scoped>

</style>