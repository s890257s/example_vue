import { defineStore } from "pinia";

export const useMemberStore = defineStore("memberStore", {
  state: () => ({
    memberId: "",
    memberName: "",
    memberPhoto: "",
    isLoggedIn: false,
  }),
  // 定义行为
  actions: {
    loginSuccess(memberInfo) {
      this.memberId = memberInfo.memberId;
      this.memberName = memberInfo.memberName;
      this.isLoggedIn = true;
      this.memberPhoto = memberInfo.memberPhoto;
    },
    logout() {
      this.memberId = "";
      this.membername = "";
      this.isLoggedIn = false;
      this.memberPhoto = "";
    },
  },
  getters: {},
});
