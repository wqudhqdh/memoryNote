<template>
  <div>
    <div v-if="flag && islogin === false">
      <login @changeLoginState="changeLogin"></login>
      <button @click="itemClick">没有账号？去注册</button>
    </div>
    <div v-if="!flag && islogin === false">
      <register @changeState="changeFlag"></register>
      <button @click="itemClick">去登录</button>
    </div>
    <div v-if="islogin" class="profile">
      <div class="bk"></div>
 
      <header>
        <img :src="this.$store.state.user.imgsrc" />
        <span>{{ this.$store.state.user.username }}</span>
      </header>
      <nav>
        <ul>
          <li>
            <span>4</span>
            <div>已连续打卡</div>
          </li>
          <li>
            <span>4</span>
            <div>记账总天数</div>
          </li>
          <li>
            <span>4</span>
            <div>记账总笔数</div>
          </li>
        </ul>
      </nav>
        
      <div class="nav">
        <div>
          <div class="left">
            <i class="iconfont icon-huangguan"></i>
            <span>升级为VIP</span>
          </div>
          <div class="right">
            <i class="iconfont icon-youce"></i>
          </div>
        </div>
      </div>

      <div class="show-container">
        <ul>
          <li>
            <i class="iconfont icon-xiaoxi"></i>
            <span>消息</span>
          </li>
          <li>
            <i class="iconfont icon-huizhang"></i>
            <span>我的徽章</span>
          </li>
          <li>
            <i class="iconfont icon-gifts"></i>
            <span>我的积分</span>
          </li>
          <li>
            <i class="iconfont icon-yaoqinghaoyou"></i>
            <span>邀请好友</span>
          </li>
          <li>
            <i class="iconfont icon-shezhi"></i>
            <span>设置</span>
          </li>
        </ul>
      </div>
      <div class="menu">
        <div class="header">
          <span>账单</span>
          <i class="iconfont icon-youce"></i>
        </div>
        <div class="bootom">
          <div class="left">
            <span>08</span>月
          </div>
          <div class="right">
            <ul>
              <li><span>收入</span><span> 0.00 </span></li>
              <li><span>支出</span><span>0.00</span></li>
              <li>
                <span> 结余 </span>
                <span>0.00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
               <div class="container">
      <div class="factory">
        <div class="top">
           <span>常用功能</span>
        </div>
        <div class="show-container">
             <ul>
               <li>
                 <div>
                   <i class="iconfont icon-zengzikuogu"></i>
                 </div>
                 <span>模拟炒股</span>
               </li>
               <li>
                   <div>
                   <i class="iconfont icon-zengzikuogu"></i>
                 </div>
                 <span>模拟炒股</span>
               </li>
               <li>
                   <div>
                   <i class="iconfont icon-zengzikuogu"></i>
                 </div>
                 <span>模拟炒股</span>
               </li>
               <li>
                   <div>
                   <i class="iconfont icon-zengzikuogu"></i>
                 </div>
                 <span>模拟炒股</span>
               </li>
               <li>
                   <div>
                   <i class="iconfont icon-zengzikuogu"></i>
                 </div>
                 <span>模拟炒股</span>
               </li>
               <li>
                   <div>
                   <i class="iconfont icon-zengzikuogu"></i>
                 </div>
                 <span>模拟炒股</span>
               </li>
               <li>
                   <div>
                   <i class="iconfont icon-zengzikuogu"></i>
                 </div>
                 <span>模拟炒股</span>
               </li>
             </ul>

        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import Register from "views/Register";
import Login from "views/Login";
export default {
  name: "profile",
  components: {
    Register,
    Login,
  },
  data() {
    return {
      flag: true,
      islogin: false,
      user: null,
    };
  },
  created() {
    // 获取token
    const tokenStr = window.sessionStorage.getItem("token");
    if (!tokenStr) {
       this.flag = false;
    } else {
        this.flag=false
       this.islogin=true
    }
  },
  methods: {
    changeFlag() {
      this.flag = true;
    },
    itemClick() {
      this.flag = !this.flag;
    },
    changeLogin(user) {
      this.user = user.data[0];
      this.islogin = true;
   
    },
  },
};
</script>
<style lang="less" scoped>
button {
  border: none;
  background-color: white;
  text-align: right;
  float: right;
  margin-right: 20px;
  right: 20px;
  font-size: 12px;
}
.profile {
  padding: 0.625rem;
  box-sizing: border-box;
  background-color: #ffda44;
  height: 9rem;
  // overflow: scroll;
  .container{
    overflow:scroll;
  }
  img {
    width: 2rem;
    height: 100%;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid white;
    margin: 0;
    margin-right: 0.625rem;
  }
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    // height: 2.5rem;
    li {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 2.5rem;
      margin-top: 1.25rem;
      span {
        color: #333;
      }
      div {
        font-size: 0.75rem;
        color: #615b5b;
      }
    }
  }
  .nav {
    margin-top: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid wheat;
    // height: 2.5rem;
    line-height: 2.5rem;
    padding:.3125rem;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        i {
          font-size: 30px;
          color: #ffda44;
          margin-right: 0.3125rem;
        }
        span {
          font-size: 0.875rem;
        }
      }
    }
  }
  .show-container {
    // border: 1px solid #e8dede;
    border-radius: 0.3125rem;
    margin-top: 0.625rem;
    height: 4rem;
    ul {
      height: 100%;
      display: flex;
      align-items: center;
      li {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0;
        span {
          font-size: 0.75rem;
          color: #8a8383;
          margin-top: 0.3125rem;
        }
        i {
          font-size: 1.875rem;
          color: #ffda44;
        }
      }
    }
  }
  .menu{
    display: flex;
    flex-direction: column;
        border: 1px solid #e8dede;
        margin-top: .625rem;
        border-radius: .3125rem;
 box-sizing: border-box;
 padding:.3125rem;
    .header{
      display: flex;
      justify-content: space-between;
    }
    .bootom{
      display: flex;
      align-items: center;
      justify-content: space-between;
      align-items: center;
      .left{
        width: 20%;
        border-right: 1px solid #e8dede;
        span{
          font-size:1.25rem;
        }
      }
      .right{
        width: 80%;
        ul{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      li{
        display: flex;
        flex-direction: column;

      }
      }
      }
      

    }
  }
  .factory{
    display: flex;
    flex-direction: column;
     .show-container{
       ul{
         display: flex;
         flex-wrap: wrap;
         justify-content:flex-start;
         li{
           width: 25%;
           display: flex; 
           flex-direction: column;
           align-items: center;

         }
       }
     }
  }
}
</style>