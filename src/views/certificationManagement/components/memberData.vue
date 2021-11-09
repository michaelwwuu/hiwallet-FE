<template>
  <div class="form-table">
    <div class="el-form">
      <span>{{ $t("certification.audit_status") }}</span>
      <span>{{ memberDataList.userName }}</span>
      <span>
        <el-button
            v-if="memberDataList.status !== 'noReview'"
            type="danger"
            size="small"
            @click="handleModifyStatus(memberDataList, 'noReview')"
          >
            {{ $t("certification.noReview") }}
          </el-button>
          <el-button
            v-if="memberDataList.status !== 'reviewed'"
            type="success"
            size="small"
            @click="handleModifyStatus(memberDataList, 'reviewed')"
          >
            {{ $t("certification.reviewed") }}
          </el-button>
      </span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.proof_photos") }}</span>
      <span>{{ memberDataList.avatarStatus === "done" ? "已上傳" : "未上傳" }}</span>
      <span>
        <el-button
          type="warning"
          size="small"
          @click="dialogAvatarShow = true"
        >
          {{ $t("dashboard.check") }}
        </el-button>
      </span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.real_name") }}</span>
      <span>{{ memberDataList.real_name }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.birth_date") }}</span>
      <span>{{ memberDataList.birthDays }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.birth_place") }}</span>
      <span>{{ memberDataList.pleace }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.nationality") }}</span>
      <span>{{ memberDataList.country }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.correspondence_address") }}</span>
      <span>{{ memberDataList.address }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.address") }}</span>
      <span>{{ memberDataList.permanentAddress }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.phoneNumber") }}</span>
      <span>{{ memberDataList.phoneNumber }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.special_features") }}</span>
      <span>{{ memberDataList.special_features === "done" ? "已上傳" : "未上傳" }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.jobType") }}</span>
      <span>{{ memberDataList.jobType }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.company") }}</span>
      <span>{{ memberDataList.company }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.salary_source") }}</span>
      <span>{{ memberDataList.salary_source }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.TINSSSGSIS") }}</span>
      <span>{{ memberDataList.TINSSSGSIS }}</span>
      <span></span>
    </div>

    <!-- 頭像 -->
    <el-dialog
      :title="$t('certification.proof_photos')"
      :visible.sync="dialogAvatarShow"
      width="30%"
      center
    >
      <div class="avatar-box">
        <img :src="memberDataList.avatar" />
      </div>
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
        <span class="dialog-content">帳號認證狀態已變更</span>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="changeStatusSubmit(memberDataList)"
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
  </div>
</template>

<script>
export default {
  name: "memberData",
  props: {
    memberDataList:{
      type: Object,
    }
  },
  data() {
    return {
      dialogMessageTitle: "",
      dialogMessageContent: "",

      dialogAvatarShow:false,
      dialogMessageShow: false,
      notificationMessageShow: false,
    };
  },
  methods: {
    handleModifyStatus(row, status) {
      this.dialogMessageShow = true;
      this.dialogMessageTitle = status === "noReview" ? this.$t("certification.change_to_audited_status") : this.$t("certification.changed_to_unaudited_status");
      this.dialogMessageContent = `是否要帳號 ( <span style="color:red">${row.userName}</span> ) 的審查狀態變更為"${
        status === "noReview" ? "已審查" : "未審查"
      }"?`;
      this.accountStatus = status;
    },
    changeStatusSubmit(data) {
      this.dialogMessageShow = false;
      this.notificationMessageShow = false;
      data.status = this.accountStatus;
      this.$message({ message: "操作成功", type: "success" });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-table {
  border: 0.05em solid #b3b3b3;
  width: 70%;
  margin-top: 2em;
  border-radius: 10px;
  background-color: #faf1d338;
  line-height: 1.7em;
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
</style>
