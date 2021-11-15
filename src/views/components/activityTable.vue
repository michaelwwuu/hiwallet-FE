<template>
  <div>
    <el-table
      :data="memberDataList.in_progress_activities"
      border
    >
      <el-table-column
        align="center"
        prop="activeName"
        :label="$t('dashboard.event_name')"
      />
      <el-table-column
        align="center"
        prop="activeStartTime"
        :label="$t('dashboard.event_start_date')"
      />
      <el-table-column
        align="center"
        prop="activeEndTime"
        :label="$t('dashboard.event_end_date')"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    memberDataList: {
      type: Object,
    },
  },
};
</script>

