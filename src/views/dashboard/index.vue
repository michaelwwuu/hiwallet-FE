<template>
  <div class="dashboard-editor-container">
    <transaction-table />
  </div>
</template>

<script>
import TransactionTable from './components/TransactionTable.vue'

export default {
  name: 'DashboardAdmin',
  components: {
    TransactionTable
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
