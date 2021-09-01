<template>
  <div class="add">
    <van-tabs  @click="onClick">
      <van-tab title="支出">
        <ul>
          <li v-for="item in itemlist" :key="item.id">
            <i :class="item.iconimg" @click="itemClick(item)"></i
            ><span>{{ item.name }}</span>
          </li>
        </ul>
      </van-tab>
      <van-tab title="收入">
        <ul>
         <li v-for="item in itemlist2" :key="item._id">
            <i :class="item.iconimg" @click="itemClick(item)"></i
            ><span>{{ item.name }}</span>
          </li>
          </ul>
      </van-tab>
           <van-number-keyboard
          :show="show1"
          title=""
          extra-key="."
          theme="custom"
          close-button-text="完成"
          @blur="show = true"
          @input="onInput"
          @delete="onDelete"
          @close="closeItem"
          hide-on-click-outside="true"
        >
          <div
            slot="title-left"
            style="
              display: flex;
              justify-content: space-betweent;
              align-items: center;
            "
          >
            <div style="display: flex; align-items: center">
              备注:
              <input
                type="text"
                style="height: 40px; border: none"
                v-model="text"
              />
            </div>
            {{ total }}
          </div>
        </van-number-keyboard>
    </van-tabs>
  </div>
</template>
<script>
// import { Toast } from 'vant';
import { request } from "network/request.js";
export default {
  name: "Add",
  data() {
    return {
      show1: false,
      total: "",
      itemlist: [],
      itemlist2:[],
      text: "",
      item: null,
      name:"支出",
      modifyflag:false,
      itemid:""
    };
  },
  created() {
    request({
      url: "/api/getAllItem",
      method: "get",
    }).then((res) => {
      this.itemlist = res;
      request({
        url:'/api/getAllItemIn',
        method:'get'
      }).then(res=>{
        this.itemlist2=res
if(this.$route.query.id!=undefined)
{
  console.log(this.$route.query.id)
console.log(123233)
    this.modifyflag=true
    this.itemid=this.$route.query.id
}
        // console.log(this.$route.query)
      })
    });
  },
  methods: {
    itemClick(item) {
      this.item = item;
      this.show1 = true;
    },
    closeItem() {
      this.show1 = false;
      let notes = {};
      let note = this.$store.state.date;
      notes.id = this.$store.state.user._id;
      note.iconimg = this.item.iconimg;
      note.name = this.item.name;
      note.info = this.text;
      note.total = this.total;
      note.state=this.name
      notes.list=note
     console.log(notes)
     if(this.total!='')
     {
       if(this.modifyflag===false)
       {
      console.log('11111')
      request({
        url: "/api/additemlist",
        method: "put",
        data: {
          notes,
        },
      }).then((res) => {
        console.log(res);
      });
       }
       else{
           console.log('2222')
         let itemid=this.itemid
           request({
        url: "/api/modifyadditemlist",
        method: "put",
        data: {
          notes,
          itemid
        },
      }).then((res) => {
        console.log(res);
      });
       }
    }
    },
    onInput(e) {
      this.total += e;
    },
    onDelete() {
      alert(1);
      let len = this.total.length;

      this.total = this.total.slice(0, len - 1);
    },
    onClick(name, title) {
      this.name=title
      // Toast(title);
    },
  },
};
</script>
<style lang="less" scoped>
@import "~assets/css/add.less";
</style>