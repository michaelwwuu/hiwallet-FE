<template>
  <div>
    <div class="total-style">共 {{certificationDataList.length}} 筆資料</div>
    <div class="form-table">
      <div class="el-form">
        <span>{{ $t("certification.account") }}</span>
        <span>{{ $t("certification.upload_date") }}</span>
        <span>{{ $t("certification.audit_status") }}</span>
      </div>
      <div
        class="el-form"
        v-for="(item, index) in certificationDataList"
        :key="index"
      >
        <span>{{ item.userName }}</span>
        <span>{{ item.creaTime }}</span>
        <span>
          <el-button
            :type="item.status === 'no' ? 'danger' : 'success'"
            size="small"
            @click="checkMemberList(item.userName)"
          >
            {{
              item.status === "no"
                ? $t("certification.noReview")
                : $t("certification.reviewed")
            }}
          </el-button>
        </span>
      </div> 
    </div>
    <!-- 分頁 -->
    <div class="pagination-block">
      <el-pagination
        background
        :page-size="certificationDataList.length"
        :pager-count="5"
        layout="sizes, prev, pager, next, jumper"
        :total="certificationDataList.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: "certificationManagement",
  props: {
    certificationDataList: {
      type: Array,
    },
  },
  methods: {
    checkMemberList(userName){
      if(userName !== ''){
        this.$emit('isAduitShow',userName,true)
      } 
    }
  },

};
</script>

<style lang="scss" scoped>
.total-style{
  width: 70%;
  color: #0062ff;
  font-size:14px;
  text-align: right;
  margin-bottom: -1.5em;
}
.form-table {
  border: 0.05em solid #b3b3b3;
  width: 70%;
  margin-top: 2em;
  border-radius: 10px;
  background-color: #faf1d338;
  line-height: 1.7em;
  .el-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.6em;
    padding: 0.7em 3em;
    border-bottom: 0.01em solid #b3b3b3;
    &:last-child {
      border-bottom: 0;
    }
    span {
      width: 300px;
      font-size: 14px;
      text-align: center;
      color: #666666;
    }
  }
}
::v-deep.pagination-block{
  width: 70%;
  text-align: center;
  margin: 15px 0;
  .el-pagination__sizes{
    float:left;
  }
  .el-pagination__jump{
    float:right;   
  }
}
</style>
