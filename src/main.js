import { createApp } from "vue";
import { createPinia } from "pinia";
import { API_URL } from "./config";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import { useMemberStore } from './stores/memberStore';

const app = createApp(App);

// 使用pinia與router
app.use(createPinia());
app.use(router);

// 設定全域API_URL
app.config.globalProperties.API_URL = API_URL;

// 設定全域axios可於跨域請求時帶上cookie
axios.defaults.withCredentials = true;

// 當頁面刷新時還原sessionStorage中的登入狀態
axios(`${API_URL}/check`).then((rs) => {
  if (rs.data) {
    const loggedInMember = JSON.parse(sessionStorage.getItem("loggedInMember"));
    const memberStore = useMemberStore();
    memberStore.loginSuccess(loggedInMember)
  }
});

app.mount("#app");
