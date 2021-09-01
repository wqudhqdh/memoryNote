<template>
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
    <span>上传头像：</span>
    <label>
      <img :src="imgsrc" />
      <input
        @change="imgChoose($event)"
        class="none"
        type="file"
        accept="image/*"
      />
    </label>
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit">注册</van-button>
    </div>
  </van-form>
</template>
<script>
import { request } from "network/request.js";
export default {
  name: "Register",
  data() {
    return {
      password: "",
      username: "",
      imgsrc: require("assets/img/profile.jpg"),
    };
  },
  methods: {
    async onSubmit() {
      let s = await request({
        url: "/api/checkuser",
        method: "post",
        data: {
          username: this.username,
        },
      });
      if (s.length === 0) {
        let user = await request({
          url: "/api/saveuser",
          method: "post",
          data: {
            username: this.username,
            password: this.password,
            imgsrc: this.imgsrc,
          },
        });
        this.$emit('changeState',user);
      }
      else{
        alert("用户名已注册")
      }
    },
    // 更换头像
    imgChoose(event) {
      let url = event.target.files[0];
      console.log(url);
      console.log(JSON.stringify(url));
      if (url == undefined) {
        throw "url is not defined";
      }
      if ("FileReader" in window) {
        this.flag = true;
        let img = new FileReader();
        img.readAsDataURL(url);
        img.onload = ({ target }) => {
          this.imgsrc = target.result;
        };
      } else {
        throw "no FileReader in window";
      }
    },
  },
};
</script>
<style lang="less">
.none {
  display: none;
}
img {
  width: 6.25rem;
  vertical-align: middle;
  margin-left: 0.625rem;
  margin-top: 1.25rem;
}
</style>