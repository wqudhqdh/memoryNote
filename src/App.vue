<template>
<div>
<router-view></router-view>
<footer class="footer">
     <div >
        <ul>
           <router-link to="/">
          <li :class="currentIndex===1?'active':''" @click="changeIndex(1)">
            <i class="iconfont icon-zhangdan"></i>
            <span>明细</span>
          </li>
           </router-link>
          <li :class="currentIndex===2?'active':''"  @click="changeIndex(2)">
            <i class="iconfont icon-tubiao1"></i>
              <span>图表</span>
          </li>
           <router-link to="/add">
          <li :class="currentIndex===3?'active':''"  @click="changeIndex(3)">
            <i class="iconfont icon-icon-test1"></i>
              <span>记账</span>
          </li>
           </router-link>
         <li @click="changeIndex(4)" :class="currentIndex===4?'active':''">
            <i class="iconfont icon-shequ"></i>
              <span>社区</span>
          </li>
         <router-link to="/profile">
          <li @click="changeIndex(5)" :class="currentIndex===5?'active':''">
            <i class="iconfont icon-04"></i>
              <span>我的</span>
          </li>
         </router-link>
        </ul>
     </div>
</footer>
</div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      currentIndex:5
    }
  },
  methods:{
    changeIndex(index)
    {

      this.currentIndex=index
    }
  }
}
</script>

<style >
*{
  margin: 0;
  padding: 0;
}
a{
  color: black;
}
.active{
  
color: #ffda44 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
footer{

  position: fixed;
  width: 100%;
  /* height: 3.3rem; */
  box-sizing: border-box;
  padding: .3125rem;
  /* padding-left: .625rem;
  padding-right: 0.625rem; */
  bottom: 0;
  border-top: 1px solid #e8dede;
  background-color: white;

}
footer div{
  width: 100%;
  height: 100%;
}
footer ul{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
footer ul li{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.footer ul li i{
  font-size: 1.3rem;
}
footer ul li span{
  font-size: 13px;
  margin-top:.1875rem;
  color: #716d6d;
}
</style>
