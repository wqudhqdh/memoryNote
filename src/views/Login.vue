<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { request } from "network/request.js";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      alert("1212");
      let s = await request({
        url: "/api/login",
        method: "post",
        data: {
          username: this.username,
          password: this.password,
        },
      });
      if (s.length === 0) {
        alert("用户名或密码错误");
      } else {
        window.sessionStorage.setItem("token", s.token);
  
        window.sessionStorage.setItem('user',     JSON.stringify(s.data[0]))
        let user = s.data[0];
        this.$store.commit({
          type: "saveinfo",
          user,
        });
        this.$emit("changeLoginState", s);
      }
    },
  },
};
</script>
<style lang="less" scoped>
</style>