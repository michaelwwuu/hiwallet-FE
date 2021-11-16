<template>
  <div class="form-table">
    <div class="el-form">
      <span>{{ $t("certification.audit_status") }}</span>
      <span>{{ memberDataList.userName }}</span>
      <span>
        <el-button
          :type="memberDataList.status === 'noReview'? 'danger' : 'success'"
          size="small"
          @click="handleModifyStatus(memberDataList, memberDataList.status)"
        >
          {{ memberDataList.status === 'noReview'? $t("certification.noReview") : $t("certification.reviewed")}}
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
          @click="handleModifyStatus(memberDataList, 'avatarImg')"
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
    <div class="el-form" style="border-bottom:0;">
      <span>{{ $t("certification.TINSSSGSIS") }}</span>
      <span>{{ memberDataList.TINSSSGSIS }}</span>
      <span></span>
    </div>
    
    <!-- 談窗 -->
    <el-dialog
      :title="dialogMessageTitle"
      :visible.sync="isDialogMessageShow"
      width="30%"
      center
    >
      <!-- 審查狀態-->
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
      <!-- 審查狀態-->
      <span v-if="!isDialogAvatarShow" class="dialog-content" v-html="dialogMessageContent" />
      <span v-if="!isDialogAvatarShow" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="notificationMessageShow = true"
          >确 定</el-button
        >
        <el-button type="danger" @click="isDialogMessageShow = false"
          >取 消</el-button
        >
      </span>

      <!-- 證件照片-->
      <div v-if="isDialogAvatarShow" class="avatar-box" >
        <img :src="memberDataList.avatar" />
      </div>

    </el-dialog>
    
  </div>
</template>

<script>
export default {
  name: "memberTable",
  props: {
    memberDataList:{
      type: Object,
    }
  },
  data() {
    return {
      dialogMessageTitle: "",
      dialogMessageContent: "",
      isDialogAvatarShow:false,
      isDialogMessageShow: false,
      notificationMessageShow: false,
    };
  },
  methods: {
    handleModifyStatus(row, status) {
      this.isDialogMessageShow = true;
      switch (status) {
        case 'noReview':
        case 'reviewed':
          this.isDialogAvatarShow = false;
          this.dialogMessageTitle = status === "noReview" ? this.$t("certification.change_to_audited_status") : this.$t("certification.changed_to_unaudited_status");
          this.dialogMessageContent = `是否要帳號 ( <span style="color:red">${row.userName}</span> ) 的審查狀態變更為"${
            status === "noReview" ? "已審查" : "未審查"
          }"?`;
          break
        case 'avatarImg':
          this.isDialogAvatarShow = true;
          this.dialogMessageTitle = this.$t('certification.proof_photos');
          break
      }
    },
    changeStatusSubmit(data) {
      this.isDialogMessageShow = false;
      this.notificationMessageShow = false;
      data.status = data.status === "noReview" ? "reviewed" : "noReview" ;
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
