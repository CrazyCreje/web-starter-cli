// creates single-component vue application
import Message from "../components/Message.vue";
import Vue from "vue";

new Vue({
  render: (createElement) => {
    return createElement(Message);
  },
}).$mount("#app");
