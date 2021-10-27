<template>
  <div class="app-container">
    <el-form
      ref="listQuery"
      :model="listQuery"
      :rules="listQueryRules"
      @submit.native.prevent
    >
      <el-form-item prop="searchKey">
        <el-input
          ref="searchKey"
          v-model="listQuery.searchKey"
          :placeholder="$t('dashboard.searchKey')"
          name="searchKey"
          type="text"
          style="width: 400px"
          @keyup.enter.native="handleFilter('listQuery')"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-left: 10px"
          @click="handleFilter('listQuery')"
        >
          {{ $t("dashboard.search") }}
        </el-button>
      </el-form-item>
    </el-form>
    <div v-if="searchSubmit">
      <div v-for="(item, index) in rolesList" :key="index" class="form-table">
        <div class="el-form">
          <span>{{ $t("dashboard.userName") }}</span>
          <span>{{ item.userName }}</span>
          <span>
            <el-button
              v-if="item.status != 'locking'"
              type="danger"
              size="small"
              @click="handleModifyStatus(item, 'locking')"
            >
              {{ $t("dashboard.locking") }}
            </el-button>
            <el-button
              v-if="item.status != 'normal'"
              type="success"
              size="small"
              @click="handleModifyStatus(item, 'normal')"
            >
              {{ $t("dashboard.normal") }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t("dashboard.hiwalletMoney") }}</span>
          <span>{{ item.hiwalletMoney }}</span>
          <span>
            <el-button type="success" size="small">
              {{ $t("dashboard.increase") }}
            </el-button>
            <el-button type="danger" size="small">
              {{ $t("dashboard.reduce") }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t("dashboard.loginPassword") }}</span>
          <span>{{ item.loginPassword }}</span>
          <span>
            <el-button
              type="primary"
              size="small"
              @click="handleModifyStatus(item, 'loginPassword')"
            >
              {{ $t("dashboard.record") }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t("dashboard.payPassword") }}</span>
          <span>{{ item.payPassword }}</span>
          <span>
            <el-button
              type="primary"
              size="small"
              @click="handleModifyStatus(item, 'payPassword')"
            >
              {{ $t("dashboard.record") }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t("dashboard.payObject") }}</span>
          <span>{{ item.payObject }} 筆 / {{ item.payObject - 1 }} 筆</span>
          <span>
            <el-button type="warning" size="small">
              {{ $t("dashboard.check") }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t("dashboard.bankCard") }}</span>
          <span>{{ item.bankCard }} 張</span>
          <span>
            <el-button type="warning" size="small">
              {{ $t("dashboard.check") }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t("dashboard.nickName") }}</span>
          <span>{{ item.nickName }}</span>
          <span>
            <el-button
              type="primary"
              size="small"
              @click="handleModifyStatus(item, 'editPermission')"
            >
              {{ $t("dashboard.editPermission") }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t("dashboard.avatar") }}</span>
          <span>{{ item.avatarStatus === "done" ? "已上傳" : "未上傳" }}</span>
          <span>
            <el-button
              type="warning"
              size="small"
              @click="handleModifyStatus(item, 'accountAvatar')"
            >
              {{ $t("dashboard.check") }}
            </el-button>
          </span>
        </div>
      </div>
    </div>
    <el-dialog
      :title="$t('dashboard.accountAvatar')"
      :visible.sync="dialogtAvatarShow"
      width="30%"
      center
    >
      <div class="avatar-box">
        <img :src="avatarImg" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = true">刪 除</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="dialogVisibleTitle"
      :visible.sync="dialogVisible"
      width="30%"
      center
    >
      <el-dialog
        title="通知訊息"
        :visible.sync="dialogVisibleSend"
        width="30%"
        append-to-body
        center
      >
        <span class="dialog-content" v-html="innerVisibleContent" />
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="
              dialogVisibleSubmit(
                rolesList,
                dialogVisibleTitle,
                advancedModifyList
              )
            "
          >确 定</el-button>
        </span>
      </el-dialog>
      <span
        v-if="generalModifyShow"
        class="dialog-content"
        v-html="dialogVisibleContent"
      />

      <el-form
        v-if="advancedModifyShow"
        :model="advancedModifyList"
        :rules="advancedModifyRules"
        class="advanced-style"
      >
        <el-form-item
          :label="$t('dashboard.currentNickname')"
          :label-width="advancedModifyLabelWidth"
        >
          <span>{{ advancedModifyList.oddNickName }}</span>
        </el-form-item>
        <el-form-item
          prop="newNickName"
          :label="$t('dashboard.changeNickname')"
          :label-width="advancedModifyLabelWidth"
        >
          <el-input
            v-model="advancedModifyList.newNickName"
            type="text"
            placeholder="請輸入新暱稱"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogVisibleSend = advancedModifyList.newNickName !=='' || generalModifyShow"
        >确 定</el-button>
        <el-button
          type="danger"
          @click="dialogVisible = false"
        >取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles } from '@/api/role'

export default {
  name: 'AdminPermission',
  data() {
    return {
      advancedModifyLabelWidth: '160',
      rolesList: [],
      listQuery: {
        searchKey: ''
      },
      listQueryRules: {
        searchKey: [
          { required: true, message: '请输入完整帳號', trigger: 'blur' }
        ]
      },
      advancedModifyList: {
        oddNickName: '',
        newNickName: ''
      },
      advancedModifyRules: {
        newNickName: [
          { required: true, message: '帳號不可空白', trigger: 'blur' }
        ]
      },
      avatarImg: '',
      dialogVisibleTitle: '',
      dialogVisibleContent: '',
      innerVisibleContent: '',
      searchSubmit: false,
      dialogVisible: false,
      dialogVisibleSend: false,
      dialogtAvatarShow: false,
      generalModifyShow: false,
      advancedModifyShow: false
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    // 示意搜尋
    handleFilter(rules) {
      console.log(rules)
      if (this.listQuery.searchKey.trim() === '') this.listQuery.searchKey = ''
      this.$refs[rules].validate((valid) => {
        if (!valid) return
        this.searchSubmit = true
      })
    },
    submitVisible(key) {

    },
    // 獲取表格資料
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },
    // 切換解鎖按鈕
    handleModifyStatus(row, status) {
      this.dialogVisible = true
      this.generalModifyShow = false
      this.advancedModifyShow = false
      if (status === 'normal' || status === 'locking') {
        this.generalModifyShow = true
        this.dialogVisibleTitle = this.$t('dashboard.accountLock')
        this.dialogVisibleContent = `是否要${
          status === 'normal' ? '解鎖帳號' : '鎖定帳號'
        } ( <span style="color:red">${row.userName}</span> ) ?`
        this.innerVisibleContent = `帳號已${
          status === 'normal' ? '解鎖' : '鎖定'
        }。`
        this.status = status
      } else if (status === 'loginPassword' || status === 'payPassword') {
        this.generalModifyShow = true
        this.dialogVisibleTitle =
          status === 'loginPassword'
            ? this.$t('dashboard.recordLoginPassword')
            : this.$t('dashboard.recordPayPassword')
        this.dialogVisibleContent = `是否要重置帳號 ( <span style="color:red">${
          row.userName
        }</span> ) 的${status === 'loginPassword' ? '登錄' : '交易'}密碼 ?`
        this.innerVisibleContent = '密碼已重置'
      } else if (status === 'editPermission') {
        this.advancedModifyShow = true
        this.dialogVisibleTitle = `${this.$t('dashboard.accountNickname')}`
        this.advancedModifyList.oddNickName = row.nickName
        this.innerVisibleContent = `${this.$t(
          'dashboard.accountNickname'
        )}變更成功`
      } else if (status === 'accountAvatar') {
        this.dialogVisible = false
        this.dialogtAvatarShow = true
        this.generalModifyShow = true
        this.avatarImg = row.avatar
        this.dialogVisibleTitle = `${this.$t('dashboard.accountAvatar')}`
        this.dialogVisibleContent = `是否要刪除帳號 ( <span style="color:red">${row.userName}</span> ) 的頭像 ?`
        this.innerVisibleContent = '帳號頭像刪除成功。'
        this.avatarStatus = 'noUpload'
      }
    },
    // 送出姐所按鈕
    dialogVisibleSubmit(data, key, modify) {
      console.log(data, key, modify)
      this.dialogVisible = false
      this.dialogVisibleSend = false
      this.dialogtAvatarShow = false
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      if (key === this.$t('dashboard.accountLock')) {
        data[0].status = this.status
      } else if (key === this.$t('dashboard.accountNickname')) {
        data[0].nickName = modify.newNickName
      } else if (key === this.$t('dashboard.accountAvatar')) {
        data[0].avatarStatus = this.avatarStatus
      }
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
      .el-input {
        width: 60%;
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
      .advanced-style {
        .el-form-item {
          text-align: left;
          .el-form-item__content{
            .el-form-item__error{
              padding-top: 9px;
              left: 16%;
            }
          }
        }
      }
    }
  }
}
</style>
