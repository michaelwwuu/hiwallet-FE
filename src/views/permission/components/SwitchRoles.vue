<template>
  <div class="app-container">
    <el-input v-model="listQuery.searchKey" :placeholder="$t('dashboard.searchKey')" style="width: 400px;" @keyup.enter.native="handleFilter(listQuery)" />
    <el-button type="primary" icon="el-icon-search" style="margin-left:10px;" @click="handleFilter(listQuery)">
      {{ $t('table.search') }}
    </el-button>
    <div v-if="searchSubmit">
      <div v-for="(item,index) in rolesList" :key="index" class="form-table">
        <div class="el-form">
          <span>{{ $t('dashboard.userName') }}</span>
          <span>{{ item.userName }}</span>
          <span>
            <el-button v-if="item.status!='locking'" type="danger" size="small" @click="handleModifyStatus(item,'locking')">
              {{ $t('dashboard.locking') }}
            </el-button>
            <el-button v-if="item.status!='normal'" type="success" size="small" @click="handleModifyStatus(item,'normal')">
              {{ $t('dashboard.normal') }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t('dashboard.hiwalletMoney') }}</span>
          <span>{{ item.hiwalletMoney }}</span>
          <span>
            <el-button type="success" size="small">
              {{ $t('dashboard.increase') }}
            </el-button>
            <el-button type="danger" size="small">
              {{ $t('dashboard.reduce') }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t('dashboard.loginPassword') }}</span>
          <span>{{ item.loginPassword }}</span>
          <span>
            <el-button type="primary" size="small">
              {{ $t('dashboard.record') }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t('dashboard.payPassword') }}</span>
          <span>{{ item.payPassword }}</span>
          <span>
            <el-button type="primary" size="small">
              {{ $t('dashboard.record') }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t('dashboard.payObject') }}</span>
          <span>{{ item.payObject }} 筆 / {{ item.payObject-1 }} 筆</span>
          <span>
            <el-button type="warning" size="small">
              {{ $t('dashboard.check') }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t('dashboard.bankCard') }}</span>
          <span>{{ item.bankCard }} 張</span>
          <span>
            <el-button type="warning" size="small">
              {{ $t('dashboard.check') }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t('dashboard.nickName') }}</span>
          <span>{{ item.nickName }}張</span>
          <span>
            <el-button type="primary" size="small">
              {{ $t('dashboard.editPermission') }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t('dashboard.avatar') }}</span>
          <span>{{ item.avatarStatus === "done" ? '已上傳':'未上傳' }}</span>
          <span>
            <el-button type="warning" size="small">
              {{ $t('dashboard.check') }}
            </el-button>
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getRoles } from '@/api/role'

export default {
  name: 'AdminPermission',
  data() {
    return {
      rolesList: [],
      listQuery: {
        searchKey: ''
      },
      searchSubmit: false
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    // 示意搜尋
    handleFilter(listQuery) {
      this.searchSubmit = true
      console.log(listQuery.searchKey)
    },
    // 獲取表格資料
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },
    // 切換姐所按鈕
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
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
  border:0.05em solid #b3b3b3;
  width: 70%;
  margin-top: 2em;
  border-radius: 10px;
  background-color:#faf1d338;
  .el-form{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.6em;
    padding: 0.7em 3em;
    border-bottom: 0.01em solid #b3b3b3;
    &:last-child{
      border-bottom: 0;
    }
    span{
      width: 300px;
      font-size:14px;
      text-align: center;
      color: #666666;
    }
  }
}
</style>
