<template>
  <div>
    <el-form
      :model="memberDataList.merchantData"
      label-width="150px"
      class="advancedModify-style"
    >
      <el-form-item prop="name" :label="$t('dashboard.merchant_name')">
        <span>{{ memberDataList.merchantData.name }}</span>
      </el-form-item>
      <el-form-item prop="groups" :label="$t('dashboard.affiliated_groups')">
        <span>{{ memberDataList.merchantData.groups }}</span>
      </el-form-item>
      <el-form-item
        prop="groupsChain"
        :label="$t('dashboard.affiliated_chains')"
      >
        <span>{{ memberDataList.merchantData.groupsChain }}</span>
      </el-form-item>
      <el-form-item
        prop="groupsBranches"
        :label="$t('dashboard.affiliated_stores')"
      >
        <span>{{ memberDataList.merchantData.groupsBranches }}</span>
      </el-form-item>
      <el-form-item
        prop="merchantCities"
        :label="$t('dashboard.affiliated_city')"
      >
        <span>{{ memberDataList.merchantData.merchantCities }}</span>
      </el-form-item>
    </el-form>
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
