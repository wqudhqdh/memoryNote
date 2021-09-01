<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      style="height: 60px"
      @click-left="back"
    >
      <div slot="title">详细信息</div>
    </van-nav-bar>
    <div>
      <span>类型：</span><span>{{ item.state }}</span>
    </div>
    <van-divider />
    <div>
      <span>金额：</span><span>{{ item.total }}</span>
    </div>
    <van-divider />
    <div>
      <span>日期：</span
      ><span
        >{{ this.$store.state.date.year }}年{{
          this.$store.state.date.month
        }}月{{ item.day }}日</span
      >
    </div>
    <van-divider />
    <div>
      <span>备注：</span>
      <span v-if="item.info != ''">{{ item.info }}</span>
      <span v-else> {{ item.name }}</span>
    </div>

    <van-divider />
    <div class="botton">
     <router-link :to="{path:'/add',query:{'id':item.id}}" style="width:50%"><van-button type="default" style="width:100%">修改</van-button></router-link>
      <van-button type="default" @click="deleteItem">删除</van-button>
    </div>
  </div>
</template>
<script>
import  {request} from 'network/request.js'
export default {
  name: "modify",
  data() {
    return {
      item: null,
    };
  },
  methods:
  {
   back(){
       this.$router.push('/')
   },
   deleteItem(){
      request({
          url:'/api/deleteitem',
          method:'delete',
          data:{
              userid:this.$store.state.user._id,
              itemid:this.item.id
          }
      }).then(res=>{
          if(res!='errod'){
        this.back()
      }
   })
  },
  },
  created() {
    this.item = this.$route.params.item;
    console.log(this.item)
  }
}
</script>
<style lang="less" scoped>
i {
  font-size: 1.675rem;
  border-radius: 50%;
  background-color: #ffda44;
}
nav-bar-height {
  height: 3.75rem;
}
.botton {
  position: fixed;
  bottom: 3.125rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  // bottom: 10px;
}
.botton button:nth-child(2) {
  width: 50%;
}
.button a{
    width: 50%;
}
.button a button:nth-child(1)
{
    width: 100%;
}

</style>