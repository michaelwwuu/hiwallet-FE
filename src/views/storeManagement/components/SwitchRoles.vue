<template>
  <div class="app-container">
    <el-form
      ref="listSearchKey"
      :model="listSearchKey"
      :rules="listSearchKeyRules"
      @submit.native.prevent
    >
      <el-form-item
        :label="$t('dashboard.storeEnquiry')"
        label-width="80px"
        prop="searchKey"
      >
        <el-input
          ref="searchKey"
          v-model="listSearchKey.searchKey"
          :placeholder="$t('dashboard.Please_enter_the_merchant_account_number_you_want_to_check')"
          name="searchKey"
          type="text"
          style="width: 400px"
          @keyup.enter.native="handleFilter('listSearchKey')"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-left: 10px"
          @click="handleFilter('listSearchKey')"
        >
          {{ $t("dashboard.search") }}
        </el-button>
      </el-form-item>
    </el-form>
    <publicUser-Form
      v-if="serachDataListShow"
      :member-data-list="memberDataList"
    />
  </div>
</template>

<script>
import { getRoles } from '@/api/role'
import PublicUserForm from '@/views/components/publicUserForm.vue'


export default {
  name: 'StoreManagement',
  components: {
    PublicUserForm
  },
  data() {
    return {
      memberDataList: {},
      listSearchKey: {
        searchKey: ''
      },
      listSearchKeyRules: {
        searchKey: [
          {
            required: true,
            message: this.$t('dashboard.Please_enter_the_merchant_account_number_you_want_to_check'),
            trigger: 'blur'
          }
        ]
      },
      serachDataListShow: false
    }
  },
  methods: {
    // 獲取表格資料
    getMemberList() {
      getRoles().then(res => {
        if (res.code === 20000) {
          this.memberDataList = res.data
          this.serachDataListShow = this.memberDataList !=={}
        }
      })
    },
    // 示意搜尋
    handleFilter(rules) {
      if (this.listSearchKey.searchKey.trim() === '') this.listSearchKey.searchKey = ''
      this.$refs[rules].validate(valid => {
        if (!valid) return
        this.getMemberList()
      })
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
  .form-table {
    border: 0.05em solid #b3b3b3;
    width: 70%;
    margin-top: 2em;
    border-radius: 10px;
    background-color: #faf1d338;
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
  .el-dialog__wrapper {
    ::v-deep.el-dialog {
      border-radius: 10px;
      .el-dialog__header {
        width: 95%;
        margin: 0 auto;
        border-bottom: 0.05em solid #b3b3b3;
      }
      .el-dialog__body {
        text-align: center;
        .dialog-content {
          font-size: 15px;
        }
        .avatar-box {
          margin: 0 auto;
          img {
            width: 200px;
            border: 0.5px solid #b3b3b3;
            border-radius: 10px;
            background-repeat: no-repeat;
            background-size: cover;
          }
        }
        .advancedModify-style {
          .el-form-item__content {
            text-align: left;
          }
        }
      }
    }
  }
  .bank-message-style {
    ::v-deep.el-dialog {
      .el-dialog__body {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
