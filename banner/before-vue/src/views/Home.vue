<template>
  <div class="home">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="handeladd">添加</el-button>
    <!-- 表格 -->
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <!-- 序号 -->
      <el-table-column
        label="序号"
        prop="id">
      </el-table-column>
      <!-- 备注 -->
      <el-table-column
        label="备注"
        prop="beizhu">
      </el-table-column>
      <!-- 类型 -->
      <el-table-column
        label="类型"
        prop="types">
      </el-table-column>
      <!-- 排序 -->
      <el-table-column
        label="排序"
        prop="sorts">
      </el-table-column>
      <!-- 时间 -->
      <el-table-column
        label="时间"
        prop="time">
      </el-table-column>

      <el-table-column
        align="right">
      <!-- 模糊搜索 -->
        <template slot="header" slot-scope="">
          <span>操作</span>
          <!-- <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/> -->
        </template>
        <!-- 修改，删除 -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>

      </el-table-column>
    </el-table>
    <!-- 分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
    <!-- 对话框 -->
    <!-- Form -->
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!-- 备注 -->
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.beizhu" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.types" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 排序 -->
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.sorts" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 时间 -->
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-input v-model="form.time" autocomplete="off"></el-input>
        </el-form-item>

        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 确认框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>确认删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data(){
    return{
      tableData: [],
        //搜索
        search: '',
        //分页
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        //确认框
        dialogVisible: false,
        //对话框
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          beizhu:'',
          types:'',
          sorts:'22',
          time:''
        },
        formLabelWidth: '120px'
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
      //添加
      handeladd(){
        this.dialogFormVisible=true
        this.$http.post('/api/add',{ beizhu:this.form.beizhu, types:this.form.types, sorts:this.form.sorts, time:this.form.time}).then(res=>{
          this.tableData=res.data.data.msg
        })
        this.getlist()

      },
      //修改
      handleEdit(index, row) {
        // console.log(index, row);
        // this.$http.post('/api')
        this.dialogFormVisible=true
        this.$http.post('/api/edit',{beizhu:this.form.beizhu, types:this.form.types, sorts:this.form.sorts, time:this.form.time}).then(res=>{
          // console.log(res.data)
          this.tableData=res.data.data.data
          this.getlist()

        })
        //删除后剩余的数据
        this.getlist()
      },
      //删除
      handleDelete(index, row) {
        console.log(index, row);
        console.log(row.id)
        this.dialogVisible=true;
        this.$http.post('/api/delete',{id:row.id}).then(res=>{
          // console.log(res.data)
          this.getlist()

        })
        //删除后剩余的数据
        this.getlist()
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //确认框
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          this.getlist()

          })
          .catch(_ => {});
      },
      getlist(){
        this.$http.get('/api/list').then(res=>{
        if (res.data.code === 1) {
          // console.log(res.data.data.msg)
          // console.log(res.data.num)
          this.total=res.data.num
          this.tableData=res.data.data.msg
        }
    })
      }
  }
}
</script>
<style lang="scss" scoped>
  *{
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
}
html,body,#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
