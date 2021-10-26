<template>
  <div class="app-container">
    <el-input v-model="listQuery.title" :placeholder="$t('table.title')" style="width: 400px;" @keyup.enter.native="handleFilter" />
    <el-button type="primary" icon="el-icon-search" style="margin-left:10px;" @click="handleFilter">
      {{ $t('table.search') }}
    </el-button>
    <el-table v-if="searchSubmit" :data="rolesList" style="width: 100%;border-top:0" border>
      <el-table-column align="center" :label="$t('dashboard.adminKey')" width="220">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('dashboard.userPassword')" width="220">
        <template slot-scope="scope">
          {{ scope.row.userPassword }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('dashboard.payPassword')" width="220">
        <template slot-scope="scope">
          {{ scope.row.payPassword }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('dashboard.bank')">
        <template slot-scope="scope">
          {{ scope.row.bank }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('dashboard.status')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('dashboard.operations')">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope,'edit')">
            {{ $t('dashboard.editPermission') }}
          </el-button>
          <el-button type="primary" size="mini" @click="handleEdit(scope,'bankEdit')">
            {{ $t('dashboard.bankEdit') }}
          </el-button>
          <el-button v-if="scope.row.status!='locking'" type="danger" size="mini" @click="handleModifyStatus(scope.row,'locking')">
            {{ $t('dashboard.locking') }}
          </el-button>
          <el-button v-if="scope.row.status!='normal'" type="success" size="mini" @click="handleModifyStatus(scope.row,'normal')">
            {{ $t('dashboard.normal') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-for="(item,index) in rolesList" :key="index" class="form-table">
      <div class="el-form">
        <span>{{ $t('dashboard.userName') }}</span>
        <span>{{ item.userName }}</span>
        <span>
          <el-button v-if="item.status!='locking'" type="danger" @click="handleModifyStatus(item,'locking')">
            {{ $t('dashboard.locking') }}
          </el-button>
          <el-button v-if="item.status!='normal'" type="success" @click="handleModifyStatus(item,'normal')">
            {{ $t('dashboard.normal') }}
          </el-button>
        </span>
      </div>
      <div class="el-form">
        <span>{{ $t('dashboard.hiwalletMoney') }}</span>
        <span>{{ item.hiwalletMoney }}</span>
        <span>
          <el-button type="success">
            {{ $t('dashboard.increase') }}
          </el-button>
          <el-button type="danger">
            {{ $t('dashboard.reduce') }}
          </el-button>
        </span>
      </div>

    </div>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType ==='edit' ? $t('dashboard.editPermission'): $t('dashboard.bankEdit')">
      <el-form v-if="dialogType ==='edit'" :model="role" label-width="80px" label-position="left">
        <el-form-item :label="$t('dashboard.adminKey')"><span>{{ role.key }}</span></el-form-item>
        <el-form-item :label="$t('dashboard.userPassword')">
          <el-input v-model="role.userPassword" placeholder="請輸入登入密碼" />
        </el-form-item>
        <el-form-item :label="$t('dashboard.payPassword')">
          <el-input v-model="role.payPassword" placeholder="請輸入交易密碼" />
        </el-form-item>
        <avatar-Img />
      </el-form>
      <el-form v-if="dialogType ==='bankEdit'" :model="role" label-width="80px" label-position="left" />
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">
          {{ $t('dashboard.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('dashboard.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, updateRole } from '@/api/role'
import i18n from '@/lang'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  name: 'AdminPermission',
  filters: {
    statusFilter(status) {
      const statusMap = {
        normal: 'success',
        locking: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      listQuery: {
        title: ''
      },
      searchSubmit: false
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    // 示意搜尋
    handleFilter() {
      this.searchSubmit = true
    },
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      const routes = this.generateRoutes(res.data)
      this.routes = this.i18n(routes)
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },
    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    handleEdit(scope, key) {
      this.dialogType = key
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      console.log(scope, key)
      this.$nextTick(() => {
        this.checkStrictly = false
      })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        await updateRole(this.role.key, this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        this.role.key = data.key
        this.rolesList.push(this.role)
      }

      const { key, userPassword, payPassword } = this.role
      this.dialogVisible = false
      this.$notify({
        title: '編輯成功',
        dangerouslyUseHTMLString: true,
        message: `
            <div>會員名稱: ${key}</div>
            <div>登入密碼: ${userPassword}</div>
            <div>交易密碼: ${payPassword}</div>
          `,
        type: 'success'
      })
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
.form-table{
  border:1px solid #666666;
  width: 80%;
  margin-top: 2em;
  border-radius: 10px;
  .el-form{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    margin:1em;
    padding: 1em 3em;
    background-color:#c1eafe ;
    span{
      width: 300px;
      text-align: center;
    }
  }
}
</style>
