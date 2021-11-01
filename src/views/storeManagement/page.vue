<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'PageStoreManagement',
  components: {
    SwitchRoles
  },
  methods: {
    handleRolesChange() {
      this.$router.push({ path: '/storeManagement/index?' + +new Date() })
    }
  }
}
</script>
