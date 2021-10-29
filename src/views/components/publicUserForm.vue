<template>
  <div>
    <div>
      <div
        v-for="(item, index) in memberDataList"
        :key="index"
        class="form-table"
      >
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
          <span>{{ item.payObject }} 筆 / {{ item.bankCard }} 筆</span>
          <span>
            <el-button
              type="warning"
              size="small"
              @click="handleBankList('payObject')"
            >
              {{ $t("dashboard.check") }}
            </el-button>
          </span>
        </div>
        <div class="el-form">
          <span>{{ $t("dashboard.bankCard") }}</span>
          <span>{{ item.bankCard }} 張</span>
          <span>
            <el-button
              type="warning"
              size="small"
              @click="handleBankList('bankCard')"
            >
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
        <img :src="accountAvatarImage" alt="">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          @click="dialogMessageShow = true"
        >刪 除</el-button>
      </span>
    </el-dialog>

    <!-- 彈窗 -->
    <el-dialog
      :title="dialogMessageTitle"
      :visible.sync="dialogMessageShow"
      width="30%"
      center
    >
      <el-dialog
        title="通知訊息"
        :visible.sync="notificationMessageShow"
        width="30%"
        append-to-body
        center
      >
        <span class="dialog-content" v-html="innerMessageContent" />
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="
              dialogMessageShowSubmit(
                memberDataList,
                dialogMessageTitle,
                advancedModifyForm
              )
            "
          >确 定</el-button>
        </span>
      </el-dialog>
      <!-- 登入 交易 密碼 表格-->
      <span
        v-if="generalModifyShow"
        class="dialog-content"
        v-html="dialogMessageContent"
      />

      <!-- 暱稱表格 -->
      <el-form
        v-if="advancedModifyShow"
        ref="advancedModifyForm"
        :model="advancedModifyForm"
        :rules="advancedModifyRules"
        label-width="150px"
        class="advancedModify-style"
      >
        <el-form-item :label="$t('dashboard.currentNickname')">
          <span>{{ advancedModifyForm.oddNickName }}</span>
        </el-form-item>
        <el-form-item
          prop="newNickName"
          :label="$t('dashboard.changeNickname')"
        >
          <el-input
            v-model="advancedModifyForm.newNickName"
            type="text"
            :placeholder="$t('dashboard.please_enter_a_new_nickname')"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="
            submitVisible(
              advancedModifyShow ? 'advancedModifyForm' : advancedModifyShow
            )
          "
        >确 定</el-button>
        <el-button
          type="danger"
          @click="dialogMessageShow = false"
        >取 消</el-button>
      </span>
    </el-dialog>

    <!-- 銀行表格 常用對象 -->
    <el-dialog
      :title="dialogbankMessageTitle"
      :visible.sync="dialogbankMessageShow"
      :width="dialogbankMessageWidth"
      class="bank-message-style"
      center
    >
      <!-- 銀行表格 -->
      <el-table
        v-if="hiwalleDataShow"
        :data="hiwalleDatatList"
        height="500"
        style="width: 50%; margin: 0 5px"
      >
        <el-table-column
          :label="$t('dashboard.hiwalletAccount') + ` (${hiwalleDatatList.length}) 筆`"
          align="center"
        >
          <el-table-column
            prop="userName"
            :label="$t('login.username')"
            align="center"
          />
          <el-table-column
            prop="note"
            :label="$t('dashboard.nicknameRemark')"
            align="center"
          />
        </el-table-column>
      </el-table>
      <!-- 銀行表格 -->
      <el-table
        :data="bankDatatList"
        height="500"
        style="width: 50%; margin: 0 5px"
      >
        <el-table-column
          :label="$t('dashboard.bankCardAccountNumber') + ` (${bankDatatList.length}) 筆`"
          align="center"
        >
          <el-table-column
            prop="userName"
            :label="$t('login.username')"
            align="center"
          />
          <el-table-column
            prop="note"
            :label="$t('dashboard.nicknameRemark')"
            align="center"
          />
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'AdminPermission',
  props: {
    memberDataList: {
      type: Array
    }
  },
  data() {
    return {
      bankDatatList: [],
      hiwalleDatatList: [],
      advancedModifyForm: {
        oddNickName: '',
        newNickName: ''
      },
      advancedModifyRules: {
        newNickName: [
          {
            required: true,
            message: this.$t('dashboard.the_account_cannot_be_blank'),
            trigger: 'blur'
          }
        ]
      },
      dialogbankMessageTitle: '',
      dialogbankMessageWidth: '',
      accountAvatarImage: '',
      dialogMessageTitle: '',
      dialogMessageContent: '',
      innerMessageContent: '',
      hiwalleDataShow: false,
      searchListSubmit: false,
      dialogMessageShow: false,
      dialogtAvatarShow: false,
      generalModifyShow: false,
      advancedModifyShow: false,
      dialogbankMessageShow: false,
      notificationMessageShow: false
    }
  },
  created() {
    this.getMemberList()
    const routerParams = this.$route
    console.log(routerParams)
  },
  methods: {
    getMemberList() {
      this.hiwalleDatatList = this.memberDataList[0].hiwalletList
      this.bankDatatList = this.memberDataList[0].bankList
    },
    // 常用對象 綁定銀行
    handleBankList(key) {
      this.dialogbankMessageShow = true
      if (key === 'payObject') {
        this.dialogbankMessageTitle = this.$t(
          'dashboard.commonlyTradedCounterparties'
        )
        this.hiwalleDataShow = true
        this.dialogbankMessageWidth = '70%'
      } else {
        this.dialogbankMessageTitle = this.$t(
          'dashboard.bankCardAccountNumber'
        )
        this.hiwalleDataShow = false
        this.dialogbankMessageWidth = '50%'
      }
    },
    // 過濾表單
    submitVisible(formkey) {
      if (!formkey) {
        this.notificationMessageShow = true
      } else {
        this.$refs[formkey].validate((valid) => {
          if (!valid) return
          this.notificationMessageShow = true
        })
      }
    },

    // 切換解鎖按鈕
    handleModifyStatus(row, status) {
      this.dialogMessageShow = true
      this.generalModifyShow = false
      this.advancedModifyShow = false
      if (status === 'normal' || status === 'locking') {
        this.generalModifyShow = true
        this.dialogMessageTitle = this.$t('dashboard.accountLock')
        this.dialogMessageContent = `是否要${
          status === 'normal' ? '解鎖帳號' : '鎖定帳號'
        } ( <span style="color:red">${row.userName}</span> ) ?`
        this.innerMessageContent = `帳號已${
          status === 'normal' ? '解鎖' : '鎖定'
        }。`
        this.accountStatus = status
      } else if (status === 'loginPassword' || status === 'payPassword') {
        this.generalModifyShow = true
        this.dialogMessageTitle =
          status === 'loginPassword'
            ? this.$t('dashboard.recordLoginPassword')
            : this.$t('dashboard.recordPayPassword')
        this.dialogMessageContent = `是否要重置帳號 ( <span style="color:red">${
          row.userName
        }</span> ) 的${status === 'loginPassword' ? '登錄' : '交易'}密碼 ?`
        this.innerMessageContent = '密碼已重置'
      } else if (status === 'editPermission') {
        this.advancedModifyShow = true
        this.dialogMessageTitle = `${this.$t('dashboard.accountNickname')}`
        this.innerMessageContent = `${this.$t(
          'dashboard.accountNickname'
        )}變更成功`
        this.advancedModifyForm.oddNickName = row.nickName
        this.$nextTick(() => this.$refs.advancedModifyForm.resetFields())
      } else if (status === 'accountAvatar') {
        this.dialogtAvatarShow = true
        this.generalModifyShow = true
        this.dialogMessageShow = false
        this.dialogMessageTitle = `${this.$t('dashboard.accountAvatar')}`
        this.dialogMessageContent = `是否要刪除帳號 ( <span style="color:red">${row.userName}</span> ) 的頭像 ?`
        this.innerMessageContent = '帳號頭像刪除成功。'
        this.avatarStatus = 'noUpload'
        this.accountAvatarImage = row.avatar
      }
    },
    // 送出解鎖按鈕
    dialogMessageShowSubmit(data, key, modify) {
      this.dialogMessageShow = false
      this.dialogtAvatarShow = false
      this.notificationMessageShow = false
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      if (key === this.$t('dashboard.accountLock')) {
        data[0].status = this.accountStatus
      } else if (key === this.$t('dashboard.accountNickname')) {
        data[0].nickName = modify.newNickName
      } else if (key === this.$t('dashboard.accountAvatar')) {
        data[0].avatar = require('@/assets/no_data_images/no_data.png')
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
</style>
