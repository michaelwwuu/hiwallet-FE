<template>
  <div class="form-table">
    <div class="el-form">
      <span>{{ $t("certification.audit_status") }}</span>
      <span>{{ memberDataList.userName }}</span>
      <span>
        <el-button
          :type="memberDataList.status === 'no' ? 'danger' : 'success'"
          size="small"
        >
          {{
            memberDataList.status === "no"
              ? $t("certification.noReview")
              : $t("certification.reviewed")
          }}
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
      <span>{{ $t("certification.realName") }}</span>
      <span>{{ memberDataList.realName }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.birth_date") }}</span>
      <span>{{ memberDataList.birthDays }}</span>
      <span></span>
    </div>
    <div class="el-form">
      <span>{{ $t("certification.birthplace") }}</span>
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
      <span>{{ $t("certification.specialFeatures") }}</span>
      <span>{{ memberDataList.specialFeatures === "done" ? "已上傳" : "未上傳" }}</span>
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
      <span>{{ $t("certification.salarySource") }}</span>
      <span>{{ memberDataList.salarySource }}</span>
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
      dialogAvatarShow:false,
    };
  },
  created() {},
  methods: {

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
