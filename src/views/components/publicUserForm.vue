<template>
  <div>
    <div class="form-table">
      <div class="el-form">
        <span>{{ $t("dashboard.userName") }}</span>
        <span>{{ memberDataList.userName }}</span>
        <span>
          <el-button
            v-if="memberDataList.status !== 'locking'"
            type="danger"
            size="small"
            @click="handleModifyStatus(memberDataList, 'locking')"
          >
            {{ $t("dashboard.locking") }}
          </el-button>
          <el-button
            v-if="memberDataList.status !== 'normal'"
            type="success"
            size="small"
            @click="handleModifyStatus(memberDataList, 'normal')"
          >
            {{ $t("dashboard.normal") }}
          </el-button>
        </span>
      </div>

      <div class="el-form">
        <span>{{ $t("dashboard.hiwalletMoney") }}</span>
        <span>{{ memberDataList.hiwalletMoney }}</span>
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
        <span>{{ memberDataList.loginPassword }}</span>
        <span>
          <el-button
            type="primary"
            size="small"
            @click="handleModifyStatus(memberDataList, 'loginPassword')"
          >
            {{ $t("dashboard.record") }}
          </el-button>
        </span>
      </div>

      <div class="el-form">
        <span>{{ $t("dashboard.payPassword") }}</span>
        <span>{{ memberDataList.payPassword }}</span>
        <span>
          <el-button
            type="primary"
            size="small"
            @click="handleModifyStatus(memberDataList, 'payPassword')"
          >
            {{ $t("dashboard.record") }}
          </el-button>
        </span>
      </div>

      <!-- 帳號管理 常用交易對象-->
      <div v-if="accountRouter" class="el-form">
        <span>{{ $t("dashboard.payObject") }}</span>
        <span
          >{{ memberDataList.payObject }} 筆 /
          {{ memberDataList.bankCard }} 筆</span
        >
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

      <!-- 商家管理 當前費率 -->
      <div v-if="storeRouter" class="el-form">
        <span>{{ $t("dashboard.current_rates") }}</span>
        <span>{{ memberDataList.currentRates }} %</span>
        <span>
          <el-button
            type="warning"
            size="small"
            @click="merchantCityBranches('currentRates')"
          >
            {{ $t("dashboard.check") }}
          </el-button>
        </span>
      </div>

      <div class="el-form">
        <span>{{ $t("dashboard.bankCard") }}</span>
        <span>{{ memberDataList.bankCard }} 張</span>
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

      <!-- 名稱 -->
      <div class="el-form">
        <span>{{
          accountRouter
            ? $t("dashboard.nickName")
            : $t("dashboard.merchant_name")
        }}</span>
        <span>{{ memberDataList.nickName }}</span>
        <span>
          <el-button
            type="primary"
            size="small"
            @click="merchantCityBranches('editPermission')"
          >
            {{ $t("dashboard.editPermission") }}
          </el-button>
        </span>
      </div>

      <!-- 頭像 -->
      <div class="el-form">
        <span>{{
          accountRouter
            ? $t("dashboard.avatar")
            : $t("dashboard.merchant_photos")
        }}</span>
        <span>{{
          memberDataList.avatarStatus === "done" ? "已上傳" : "未上傳"
        }}</span>
        <span>
          <el-button
            type="warning"
            size="small"
            @click="handleModifyStatus(memberDataList, 'accountAvatar')"
          >
            {{ $t("dashboard.check") }}
          </el-button>
        </span>
      </div>

      <!-- 商家管理 -->
      <div v-if="storeRouter">
        <!-- 商家成與分行 -->
        <div class="el-form">
          <span>{{ $t("dashboard.merchant_cities_and_branches") }}</span>
          <span
            >{{ memberDataList.merchantData.merchantCities }} /
            {{ memberDataList.merchantData.merchantBranches }}</span
          >
          <span>
            <el-button
              type="warning"
              size="small"
              @click="merchantCityBranches('merchant')"
            >
              {{ $t("dashboard.check") }}
            </el-button>
          </span>
        </div>

        <!-- 進行中活動 -->
        <div class="el-form">
          <span>{{ $t("dashboard.in_progress_activities") }}</span>
          <span>
            <span
              v-for="(item, index) in memberDataList.in_progress_activities"
              :key="index"
              >{{ item.activeName }},
            </span>
          </span>
          <span>
            <el-button
              type="warning"
              size="small"
              @click="handleBankList('activities')"
            >
              {{ $t("dashboard.check") }}
            </el-button>
          </span>
        </div>
      </div>
    </div>

    <!-- 商家城市與分行 // 費率-->
    <el-dialog
      :title="dialogMessageTitle"
      :visible.sync="isMerchantShow"
      :width="dialogWidth"
      center
    >
      <!-- 暱稱或商家名稱 -->
      <div v-show="isMerchantNickNameShow">
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
                changeStatusSubmit(
                  memberDataList,
                  dialogMessageTitle,
                  advancedModifyForm
                )
              "
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <el-form
          ref="advancedModifyForm"
          :model="advancedModifyForm"
          :rules="advancedModifyRules"
          label-width="150px"
          class="advancedModify-style"
        >
          <el-form-item :label="$t('dashboard.current_nickName')">
            <span>{{ memberDataList.nickName }}</span>
          </el-form-item>
          <el-form-item
            prop="newNickName"
            :label="$t('dashboard.change_nickName')"
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
          <el-button type="primary" @click="visibleFormSubmit('advancedModifyForm')"
            >确 定</el-button
          >
          <el-button type="danger" @click="isMerchantShow = false"
            >取 消</el-button
          >
        </span>
      </div>

      <!-- 當前費率 -->
      <div v-show="isMerchantCurrentRatesShow">
        <el-form
          ref="mechantModifyForm"
          :model="memberDataList.mechantModifyForm"
          label-width="150px"
          class="advancedModify-style"
        >
          <el-form-item prop="nowRate" :label="$t('dashboard.current_rates')">
            <el-input
              v-model="memberDataList.mechantModifyForm.nowRate"
              type="text"
              :disabled="isMerchantdisabled"
              :placeholder="$t('dashboard.please_enter_a_new_nickname')"
              autocomplete="off"
              style="width: 380px !important"
            />
          </el-form-item>
          <el-form-item prop="time" :label="$t('dashboard.expiration_date')">
            <el-date-picker
              v-model="memberDataList.mechantModifyForm.nowCreatStartTime"
              type="date"
              placeholder="选择日期"
              :disabled="isMerchantdisabled"
              style="margin-right: 18px; width: 180px !important"
            />
            <el-date-picker
              v-model="memberDataList.mechantModifyForm.nowCreatEndTime"
              type="date"
              placeholder="选择日期"
              :disabled="isMerchantdisabled"
              style="width: 180px !important"
            />
          </el-form-item>
          <el-form-item prop="nextRate" :label="$t('dashboard.next_rate')">
            <el-input
              v-model="memberDataList.mechantModifyForm.nextRate"
              type="text"
              :disabled="isMerchantdisabled"
              :placeholder="$t('dashboard.please_enter_a_new_nickname')"
              autocomplete="off"
              style="width: 380px !important"
            />
          </el-form-item>
          <el-form-item prop="time" :label="$t('dashboard.expiration_date')">
            <el-date-picker
              v-model="memberDataList.mechantModifyForm.nextCreatStartTime"
              type="date"
              placeholder="选择日期"
              :disabled="isMerchantdisabled"
              style="margin-right: 18px; width: 180px !important"
            />
            <el-date-picker
              v-model="memberDataList.mechantModifyForm.nextCreatEndTime"
              type="date"
              placeholder="选择日期"
              :disabled="isMerchantdisabled"
              style="width: 180px !important"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            v-if="isMerchantModify"
            type="danger"
            @click="merchantModify"
            >修 改</el-button
          >
          <div v-if="isMerchantSubmit">
            <el-button type="success" @click="merchantSubmit('OK')"
              >確 定</el-button
            >
            <el-button type="danger" @click="merchantSubmit('Canel')"
              >取 消</el-button
            >
          </div>
        </span>
      </div>

      <!-- 商家城市與分行 -->
      <div v-show="isMerchantCityBranchesShow">
        <el-form
          :model="memberDataList.merchantData"
          label-width="150px"
          class="advancedModify-style"
        >
          <el-form-item prop="name" :label="$t('dashboard.merchant_name')">
            <span>{{ memberDataList.merchantData.name }}</span>
          </el-form-item>
          <el-form-item
            prop="groups"
            :label="$t('dashboard.affiliated_groups')"
          >
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
    </el-dialog>

    <!-- 頭像 -->
    <el-dialog
      :title="$t('dashboard.accountAvatar')"
      :visible.sync="dialogAvatarShow"
      width="30%"
      center
    >
      <div class="avatar-box">
        <img :src="avatarMemberImage" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogMessageShow = true"
          >刪 除</el-button
        >
      </span>
    </el-dialog>

    <!-- 登入 交易 密碼 表格-->
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
            @click="changeStatusSubmit(memberDataList, dialogMessageTitle)"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <!-- 登入 交易 密碼 表格-->
      <span class="dialog-content" v-html="dialogMessageContent" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="notificationMessageShow = true"
          >确 定</el-button
        >
        <el-button type="danger" @click="dialogMessageShow = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>

    <!-- 嗨錢包 / 銀行帳戶 常用對象 -->
    <el-dialog
      :title="dialogMessageTitle"
      :visible.sync="dialogbankListShow"
      :width="dialogWidth"
      center
      class="bank-message-style"
    >
      <!-- 嗨錢包帳戶表格 -->
      <el-table
        v-show="isHiwalletDataShow"
        :data="memberDataList.hiwalletList"
        height="500"
        style="width: 50%; margin: 0 5px"
      >
        <el-table-column
          :label="
            $t('dashboard.hiwallet_account') +
            ` (${memberDataList.hiwalletList.length}) 筆`
          "
          align="center"
        >
          <el-table-column
            align="center"
            prop="userName"
            :label="$t('login.username')"
          />
          <el-table-column
            align="center"
            prop="note"
            :label="$t('dashboard.nickname_remark')"
          />
        </el-table-column>
      </el-table>

      <!-- 銀行帳戶表格 -->
      <el-table
        v-show="isBankDataShow"
        :data="memberDataList.bankList"
        height="500"
        style="width: 50%; margin: 0 5px"
      >
        <el-table-column
          align="center"
          :label="
            $t('dashboard.bank_card_account_number') +
            ` (${memberDataList.bankList.length}) 筆`
          "
        >
          <el-table-column
            align="center"
            prop="userName"
            :label="$t('login.username')"
          />
          <el-table-column
            align="center"
            prop="note"
            :label="$t('dashboard.nickname_remark')"
          />
        </el-table-column>
      </el-table>

      <!-- 商家管理 進行中活動 -->
      <el-table
        v-show="isActiveDataShow" 
        :data="memberDataList.in_progress_activities"
        border
        style="width: 100%;"
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

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PublicUserForm",
  props: {
    memberDataList: {
      type: Object,
    },
  },
  data() {
    return {
      advancedModifyForm: {
        newNickName: "",
      },
      advancedModifyRules: {
        newNickName: [
          {
            required: true,
            message: this.$t("dashboard.the_account_cannot_be_blank"),
            trigger: "blur",
          },
        ],
      },
      dialogWidth: "",
      avatarMemberImage: "",
      dialogMessageTitle: "",
      innerMessageContent: "",
      dialogMessageContent: "",
      
      storeRouter: false,
      accountRouter: false,

      dialogAvatarShow: false,
      dialogMessageShow: false,
      dialogbankListShow: false,
      notificationMessageShow: false,


      isBankDataShow: false,
      isActiveDataShow: false,
      isHiwalletDataShow: false,

      isMerchantShow: false,
      isMerchantModify: true,
      isMerchantSubmit: false,
      isMerchantdisabled: true,
      isMerchantNickNameShow: false,
      isMerchantCityBranchesShow: false,
      isMerchantCurrentRatesShow: false,
    };
  },
  created() {
    const routerKey = this.$route.name;
    if (routerKey === "PagePermission") {
      this.accountRouter = true;
    } else if (routerKey === "storeManagement") {
      this.storeRouter = true;
    }
  },
  methods: {
    // 商家當前費率
    merchantModify() {
      this.isMerchantSubmit = true;
      this.isMerchantModify = false;
      this.isMerchantdisabled = false;
    },
    // 商家當前費率
    merchantSubmit(key) {
      // 未來做區分
      this.isMerchantSubmit = false;
      this.isMerchantModify = true;
      this.isMerchantdisabled = true;
      if (key === "OK") this.$message({ message: "操作成功", type: "success" });
    },
    // 常用對象 綁定銀行
    handleBankList(key) {
      this.isBankDataShow = true;
      this.dialogbankListShow = true;
      this.isHiwalletDataShow = false;
      this.isActiveDataShow = false;
      this.dialogWidth = "50%";
      switch (key) {
        case "payObject":
          this.isHiwalletDataShow = true;
          this.dialogWidth = "70%";
          this.dialogMessageTitle = this.$t(
            "dashboard.commonly_traded_counterparties"
          );
          break;
        case "bankCard":
          this.dialogMessageTitle = this.$t(
            "dashboard.bank_card_account_number"
          );
          break;
        case "activities":
          this.isBankDataShow = false;
          this.isActiveDataShow = true;
          this.dialogMessageTitle = this.$t(
            "dashboard.list_of_in_progress_events"
          );
          break;
      }
    },

    // 切換解鎖按鈕
    handleModifyStatus(row, status) {
      this.dialogMessageShow = true;
      switch (status) {
        case "normal":
        case "locking":
          this.dialogMessageTitle = this.$t("dashboard.accountLock");
          this.dialogMessageContent = `是否要${
            status === "normal" ? "解鎖帳號" : "鎖定帳號"
          } ( <span style="color:red">${row.userName}</span> ) ?`;
          this.innerMessageContent = `帳號已${
            status === "normal" ? "解鎖" : "鎖定"
          }。`;
          this.accountStatus = status;
          break;
        case "loginPassword":
        case "payPassword":  
          this.dialogMessageTitle =
            status === "loginPassword"
              ? this.$t("dashboard.record_login_password")
              : this.$t("dashboard.record_pay_password");
          this.dialogMessageContent = `是否要重置帳號 ( <span style="color:red">${
            row.userName
          }</span> ) 的${status === "loginPassword" ? "登錄" : "交易"}密碼 ?`;
          this.innerMessageContent = "密碼已重置";
          break;
        case "accountAvatar":  
          this.dialogAvatarShow = true;
          this.dialogMessageShow = false;
          this.dialogMessageTitle = `${this.$t("dashboard.accountAvatar")}`;
          this.dialogMessageContent = `是否要刪除帳號 ( <span style="color:red">${row.userName}</span> ) 的頭像 ?`;
          this.innerMessageContent = "帳號頭像刪除成功。";
          this.avatarStatus = "noUpload";
          this.avatarMemberImage = row.avatar; 
          break;
      }
    },

    // 過濾表單
    visibleFormSubmit(formKey) {
      this.$refs[formKey].validate((valid) => {
        if (!valid) return;
        this.innerMessageContent = `${this.$t(
          "dashboard.account_nickName"
        )}變更成功`;
        this.notificationMessageShow = true;
      });
    },

    // 表格狀態
    merchantCityBranches(key) {
      this.isMerchantShow = true;
      this.isMerchantNickNameShow = false;
      this.isMerchantCurrentRatesShow = false;
      this.isMerchantCityBranchesShow = false;
      this.dialogWidth = "30%";
      switch (key) {
        case "editPermission":
          this.isMerchantNickNameShow = true;
          this.dialogMessageTitle = this.$t("dashboard.account_nickName");
          this.$nextTick(() => this.$refs.advancedModifyForm.resetFields());
          break;
        case "currentRates":
          this.isMerchantCurrentRatesShow = true;
          this.dialogMessageTitle = this.$t("dashboard.merchant_current_rates");
          this.dialogWidth = "40%";
          break;
        case "merchant":
          this.isMerchantCityBranchesShow = true;
          this.dialogMessageTitle = this.$t(
            "dashboard.merchant_city_branch_information"
          );
          break;
      }
    },

    // 更改狀態
    changeStatusSubmit(data, key, modify) {
      this.isMerchantShow = false;
      this.dialogMessageShow = false;
      this.dialogAvatarShow = false;
      this.notificationMessageShow = false;
      if (key === this.$t("dashboard.accountLock")) {
        data.status = this.accountStatus;
      } else if (key === this.$t("dashboard.accountAvatar")) {
        data.avatar = require("@/assets/no_data_images/no_data.png");
        data.avatarStatus = this.avatarStatus;
      } else if(key === this.$t("dashboard.account_nickName")){
        data.nickName = modify.newNickName;
      }
      this.$message({ message: "操作成功", type: "success" });
    },
  },
};
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
