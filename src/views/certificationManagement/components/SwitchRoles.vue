<template>
  <div class="app-container">
    <el-form ref="listSearchKey" :model="listSearchKey" @submit.native.prevent>
      <el-form-item
        :label="$t('certification.account_enquiry')"
        label-width="80px"
        prop="searchKey"
      >
        <el-input
          ref="searchKey"
          v-model="listSearchKey.searchKey"
          name="searchKey"
          type="text"
          style="width: 400px"
          @keyup.enter.native="handleFilter"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-left: 10px"
          @click="handleFilter"
        >
          {{ $t("certification.search") }}
        </el-button>
        <el-button
          v-show="isBackBtnShow"
          type="info"
          icon="el-icon-top-right"
          style="margin-left: 10px; float: right"
          @click="certificationData"
        >
          {{ $t("certification.back_to_list") }}
        </el-button>
      </el-form-item>
    </el-form>

    <certification-table
      v-show="isCertificationShow"
      :certificationDataList="certificationDataList"
      @isAduitShow="isAduitShow"
    />

    <member-table
      v-show="isMemberDataShow"
      :memberDataList="memberDataList"
      
    />

  </div>
</template>

<script>
import { getCertification, getCertificationMemberList } from "@/api/role";
import certificationTable from "./certificationTable.vue";
import memberTable from "./memberTable.vue";
export default {
  name: "certificationManagement",
  components: {
    certificationTable,
    memberTable,
  },
  data() {
    return {
      listSearchKey: {
        searchKey: "",
      },
      memberList: {
        name: "",
      },
      memberDataList: {},
      certificationDataList: [],
      isBackBtnShow: false,
      isMemberDataShow: false,
      isCertificationShow: true,
    };
  },
  created() {
    this.getCertificationDataList();
  },
  methods: {
    isAduitShow(data, status) {
      this.isBackBtnShow = status;
      this.isMemberDataShow = status;
      this.isCertificationShow = !status;
      this.getMemberDataList(data);
    },

    getMemberDataList(data) {
      this.memberList.name = data;
      getCertificationMemberList(this.memberList).then((res) => {
        this.memberDataList = res.data
      });
    },

    certificationData() {
      this.isBackBtnShow = false;
      this.isMemberDataShow = false;
      this.isCertificationShow = true;
    },
    // 獲取表格資料
    getCertificationDataList() {
      getCertification().then((res) => {
        if (res.code === 20000) this.certificationDataList = res.data;
      });
    },

    // 示意搜尋
    handleFilter() {
      if (this.listSearchKey.searchKey.trim() === "") return;
      this.isMemberDataShow = true;
      this.isCertificationShow = false;
      this.getMemberDataList(this.listSearchKey.searchKey);
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
  .el-form {
    .el-form-item {
      width: 70%;
    }
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
