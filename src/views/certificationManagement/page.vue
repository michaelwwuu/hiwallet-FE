<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'

export default {
  name: 'PagecertificationManagement',
  components: {
    SwitchRoles
  },
  methods: {
    handleRolesChange() {
      this.$router.push({ path: '/certificationManagement/index?' + +new Date() })
    }
  }
}
</script>
