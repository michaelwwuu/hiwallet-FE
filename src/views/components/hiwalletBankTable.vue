<template>
  <div>
    <el-table
      :data="memberDataList"
      height="500"
    >
      <el-table-column
        :label="
          memberDataTitle +
          ` (${memberDataList.length}) 筆`
        "
        align="center"
      >
        <el-table-column
          align="center"
          prop="userName"
          :label="$t('login.username')"
        />
        <el-table-column
          align="center"
          prop="note"
          :label="$t('dashboard.nickname_remark')"
        />
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    memberDataList: {
      type: Array,
    },
    memberDataTitle:{
      type: String,
    }
  },
};
</script>
