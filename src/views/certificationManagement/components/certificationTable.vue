<template>
  <div class="form-table">
    <div class="el-form" >
      <span>{{ $t('certification.account') }}</span>
      <span>{{ $t('certification.upload_date') }}</span>
      <span>{{ $t('certification.audit_status') }}</span>
    </div>
    <div class="el-form" v-for="(item,index) in certificationDataList" :key="index">
      <span>{{ item.userName }}</span>
      <span>{{ item.creaTime }}</span>
      <span>
        <el-button
          :type=" item.status === 'no'?'danger':'success'"
          size="small"
        >
        {{ item.status === 'no'? $t("certification.noReview") : $t("certification.reviewed" )  }}
        </el-button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'certificationManagement',
  props:{
    certificationDataList:{
      type: Array,
    }
  },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.form-table {
  border: 0.05em solid #b3b3b3;
  width: 70%;
  margin-top: 2em;
  border-radius: 10px;
  background-color: #faf1d338;
  line-height:1.7em;
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
</style>
