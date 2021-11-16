<template>
  <div>
    <div class="form-table">
      <div class="el-form">
        <span>{{ $t("dashboard.userName") }}</span>
        <span>{{ memberDataList.userName }}</span>
        <span>
          <el-button
            :type="memberDataList.status === 'locking' ? 'danger' : 'success'"
            size="small"
            @click="handleModifyStatus(memberDataList, memberDataList.status)"
          >
            {{
              memberDataList.status === "locking"
                ? $t("dashboard.locking")
                : $t("dashboard.normal")
            }}
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
      <div v-if="routerKey === 'PagePermission'" class="el-form">
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
      <div v-if="routerKey === 'PageStoreManagement'" class="el-form">
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
          routerKey === "PagePermission"
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
          routerKey === "PagePermission"
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
      <div v-if="routerKey === 'PageStoreManagement'">
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
              @click="handleBankList('merchant')"
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

    <!-- 費率 / 暱稱或商家名稱 / 嗨錢包餘額 -->
    <el-dialog
      :title="dialogMessageTitle"
      :visible.sync="isMerchantShow"
      :width="dialogWidth"
      center
    >
      <!-- 暱稱或商家名稱 / 嗨錢包餘額 -->
      <template v-if="dialogMessageTitle === $t('dashboard.account_nickName')">
        <el-form
          ref="nameModifyForm"
          :model="nameModifyForm"
          :rules="nameModifyRules"
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
              v-model="nameModifyForm.newNickName"
              type="text"
              :placeholder="$t('dashboard.please_enter_a_new_nickname')"
              autocomplete="off"
            />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="visibleFormSubmit('nameModifyForm')"
            >确 定</el-button
          >
          <el-button type="danger" @click="isMerchantShow = false"
            >取 消</el-button
          >
        </span>
      </template>

      <!-- 當前費率 -->
      <template
        v-if="dialogMessageTitle === $t('dashboard.merchant_current_rates')"
      >
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
              :disabled="isMerchantDisabled"
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
              :disabled="isMerchantDisabled"
              style="margin-right: 18px; width: 180px !important"
            />
            <el-date-picker
              v-model="memberDataList.mechantModifyForm.nowCreatEndTime"
              type="date"
              placeholder="选择日期"
              :disabled="isMerchantDisabled"
              style="width: 180px !important"
            />
          </el-form-item>
          <el-form-item prop="nextRate" :label="$t('dashboard.next_rate')">
            <el-input
              v-model="memberDataList.mechantModifyForm.nextRate"
              type="text"
              :disabled="isMerchantDisabled"
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
              :disabled="isMerchantDisabled"
              style="margin-right: 18px; width: 180px !important"
            />
            <el-date-picker
              v-model="memberDataList.mechantModifyForm.nextCreatEndTime"
              type="date"
              placeholder="选择日期"
              :disabled="isMerchantDisabled"
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
            <el-button type="primary" @click="merchantSubmit('OK')"
              >確 定</el-button
            >
            <el-button type="danger" @click="merchantSubmit('Canel')"
              >取 消</el-button
            >
          </div>
        </span>
      </template>
    </el-dialog>

    <!-- 確認訊息 -->
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
              nameModifyForm
            )
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 登入 / 交易 / 密碼 / 頭像 -->
    <el-dialog
      :title="dialogMessageTitle"
      :visible.sync="isDialogMessageShow"
      width="30%"
      center
    >
      <!-- 登入 / 交易 / 密碼 -->
      <span
        v-if="dialogMessageTitle !== $t('dashboard.accountAvatar')"
        class="dialog-content"
        v-html="dialogMessageContent"
      />

      <!-- 頭像 -->
      <div
        v-if="dialogMessageTitle === $t('dashboard.accountAvatar')"
        class="avatar-box"
      >
        <img :src="memberDataList.avatar" />
      </div>

      <el-form
        v-if="dialogMessageTitle === $t('dashboard.merchant_current_rates')"
        ref="nameModifyForm"
        :model="nameModifyForm"
        :rules="nameModifyRules"
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
            v-model="nameModifyForm.newNickName"
            type="text"
            :placeholder="$t('dashboard.please_enter_a_new_nickname')"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>

      <!-- 底部確認按鈕-->
      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="dialogMessageTitle === $t('dashboard.accountAvatar')"
          type="danger"
          @click="notificationMessageShow = true"
          >刪 除</el-button
        >
        <el-button
          v-if="dialogMessageTitle !== $t('dashboard.accountAvatar')"
          type="primary"
          @click="dialogMessageTitle === $t('dashboard.merchant_current_rates') ? visibleFormSubmit('nameModifyForm') : notificationMessageShow = true"
          >确 定</el-button
        >
        <el-button
          v-if="dialogMessageTitle !== $t('dashboard.accountAvatar')"
          type="danger"
          @click="isDialogMessageShow = false"
          >取 消</el-button
        >
      </span>
    </el-dialog>

    <!-- 嗨錢包 / 銀行帳戶 / 常用對象 / 商家城市與分行 -->
    <el-dialog
      :title="dialogMessageTitle"
      :visible.sync="isDialogbankListShow"
      :width="dialogWidth"
      center
      class="bank-message-style"
    >
      <!-- 常用交易對象 -->
      <hiwallet-bank-table
        v-if="
          dialogMessageTitle === $t('dashboard.commonly_traded_counterparties')
        "
        :memberDataList="memberDataList.hiwalletList"
        :memberDataTitle="$t('dashboard.hiwallet_account')"
        style="width: 50%; margin: 0 5px"
      />

      <!-- 綁定銀行卡 -->
      <hiwallet-bank-table
        v-if="
          dialogMessageTitle === $t('dashboard.commonly_traded_counterparties') || dialogMessageTitle === $t('dashboard.bank_card_account_number')
        "
        :memberDataList="memberDataList.bankList"
        :memberDataTitle="$t('dashboard.bank_card_account_number')"
        :style="dialogMessageTitle === $t('dashboard.commonly_traded_counterparties') ? 'width: 50%; margin: 0 5px':'width: 100%'"
      />

      <!-- 商家管理 進行中活動 -->
      <activity-table
        v-if="dialogMessageTitle === $t('dashboard.list_of_in_progress_events')"
        :memberDataList="memberDataList"
        style="width: 100%"
      />

      <!-- 商家城市與分行 -->
      <city-bank-form
        v-if="
          dialogMessageTitle ===
          $t('dashboard.merchant_city_branch_information')
        "
        :memberDataList="memberDataList"
      />
    </el-dialog>
  </div>
</template>

<script>
import cityBankForm from "./cityBankForm.vue";
import activityTable from "./activityTable.vue";
import hiwalletBankTable from "./hiwalletBankTable.vue";

export default {
  name: "PublicUserForm",
  props: {
    memberDataList: {
      type: Object,
    },
  },
  components: {
    cityBankForm,
    activityTable,
    hiwalletBankTable,
  },
  data() {
    return {
      nameModifyForm: {
        newNickName: "",
      },
      nameModifyRules: {
        newNickName: [
          {
            required: true,
            message: this.$t("dashboard.the_account_cannot_be_blank"),
            trigger: "blur",
          },
        ],
      },
      routerKey: "",
      dialogWidth: "",
      dialogMessageTitle: "",
      innerMessageContent: "",
      dialogMessageContent: "",

      isMerchantShow: false,
      isMerchantModify: true,
      isMerchantSubmit: false,
      isMerchantDisabled: true,
      isDialogMessageShow: false,
      isDialogbankListShow: false,
      notificationMessageShow: false,
    };
  },
  created() {
    this.routerKey = this.$route.name;
  },
  methods: {
    // 商家當前費率
    merchantModify() {
      this.isMerchantSubmit = true;
      this.isMerchantModify = false;
      this.isMerchantDisabled = false;
    },
    // 商家當前費率
    merchantSubmit(key) {
      this.isMerchantModify = true;
      this.isMerchantSubmit = false;
      this.isMerchantDisabled = true;
      // 未來做區分
      if (key === "OK") this.$message({ message: "操作成功", type: "success" });
    },
    // 常用對象 綁定銀行
    handleBankList(key) {
      this.isDialogbankListShow = true;
      this.dialogWidth = "50%";
      switch (key) {
        case "payObject":
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
          this.dialogMessageTitle = this.$t(
            "dashboard.list_of_in_progress_events"
          );
          break;
        case "merchant":
          this.dialogWidth = "30%";
          this.dialogMessageTitle = this.$t(
            "dashboard.merchant_city_branch_information"
          );
          break;
      }
    },

    // 切換解鎖按鈕
    handleModifyStatus(row, status) {
      console.log(row, status);
      this.isDialogMessageShow = true;
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
          this.dialogMessageTitle = `${this.$t("dashboard.accountAvatar")}`;
          this.dialogMessageContent = `是否要刪除帳號 ( <span style="color:red">${row.userName}</span> ) 的頭像 ?`;
          this.innerMessageContent = "帳號頭像刪除成功。";
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
      this.dialogWidth = "30%";
      if (key === "editPermission") {
        this.dialogMessageTitle = this.$t("dashboard.account_nickName");
        this.$nextTick(() => this.$refs.nameModifyForm.resetFields());
      } else if (key === "currentRates") {
        this.dialogMessageTitle = this.$t("dashboard.merchant_current_rates");
        this.dialogWidth = "40%";
      }
    },

    // 更改狀態
    changeStatusSubmit(data, key, modify) {
      this.isMerchantShow = false;
      this.isDialogMessageShow = false;
      this.notificationMessageShow = false;
      if (key === this.$t("dashboard.accountLock")) {
        data.status = data.status === "locking" ? "normal" : "locking";
      } else if (key === this.$t("dashboard.accountAvatar")) {
        data.avatar = require("@/assets/no_data_images/no_data.png");
        data.avatarStatus = data.avatarStatus === "done" ? "noUpload" : "done";
      } else if (key === this.$t("dashboard.account_nickName")) {
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
