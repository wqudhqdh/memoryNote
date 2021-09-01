<template>
  <div class="home">
    <header>
      <h1>鲨鱼记账</h1>
      <div class="show-total">
        <div class="left">
          <h3>{{ this.dates.year }}</h3>
          <div>
            <van-cell
              :title="this.dates.month"
              :value="date"
              @click="show = true"
              class="month"
            />
            <van-calendar v-model="show" @confirm="onConfirm" />
          </div>
        </div>

        <div class="right">
          <div class="in">
            <h3>收入</h3>
            <span>{{ totalIn }}</span>
          </div>
          <div class="out">
            <h3>支出</h3>
            <span>{{ totalOut }}</span>
          </div>
        </div>
      </div>
    </header>

    <div class="nav-icon">
      <div>
        <ul>
          <li>
            <i class="iconfont icon-zhangdan"></i>
            <span>账单</span>
          </li>
          <li>
            <i class="iconfont icon-yusuanguanli"></i>
            <span>预算</span>
          </li>
          <li>
            <i class="iconfont icon-zichanguanjia"></i>
            <span>资产管家</span>
          </li>
          <li>
            <i class="iconfont icon-licai"></i>
            <span>理财知识</span>
          </li>
          <li>
            <i class="iconfont icon-gouwu"></i>
            <span>购物返现</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="container">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        class="container"
      >
        <div v-for="(item, index) in map.keys()" :key="index" class="show">
          <div class="title">
            <div class="left">
              <span>{{ dates.month }}月</span>
              <span>{{ item }}日</span>
            </div>
            <div class="right">
              <span>收入：</span>
              <span>{{getMonthTotal(map.get(item)) }}</span>
            </div>
          </div>
          <van-divider />
          <div v-for="(element, ind) in map.get(item)" :key="ind">
            <div class="item" @click="itemClick(element)">
              <div class="left">
                <i :class="element.iconimg"></i>
                <span v-if="element.info == ''">{{ element.name }}</span>
                <span v-else>{{ element.info }}</span>
              </div>
              <div class="right" v-if="element.state === '支出'">
                -{{ element.total }}
              </div>
              <div class="right" v-else>{{ element.total }}</div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import { Toast } from "vant";
import { request } from "network/request.js";
export default {
  name: "Home",
  data() {
    return {
      date: "",
      show: false,
      count: 0,
      isLoading: false,
      dates: {
        year: "",
        month: "",
        day: "",
      },
      totalIn: 0,
      totalOut: 0,
      notelist: [],
      map: new Map(),
      outOrIn:""
    };
  },
  created() {
    let now = new Date();
    this.dates.year = now.getFullYear();
    this.dates.month = now.getMonth() + 1;
    this.dates.day = now.getDate();
    let dates = this.dates;
    this.$store.commit({
      type: "savedate",
      dates,
    });
    let userid=this.$store.state.user._id
    request({
      url: "/api/allNote",
      method: "get",
      params:{
          userid
      }
    }).then((res) => {
      if(res.length>=1)
      {
      console.log(res);
      this.notelist = res[0].notelist;
      this.getNoteByMonth();
      }
    });
  },
  computed: {
    // 获取每天的总额
    getMonthTotal() {
      return (itemlist) => {
        let sum = 0;
        itemlist.forEach((item) => {
          let money;
          if (item.state === "支出") {
            money = 0 - parseFloat(item.total);
          } else {
            money = parseFloat(item.total);
          }
          sum += money;
        });
        if(sum<0)
        {
          this.outOrIn="支出："
        }
        else{
          this.outOrIn="收入："
        }
        return sum;
      };
    },
  },
  methods: {
    // 获取每个月的记录
    getNoteByMonth() {
      console.log("1212");
      console.log(this.notelist);
      this.notelist.forEach((element) => {
        if (
          element.year == this.dates.year &&
          element.month == this.dates.month
        ) {
          if (element.state === "收入") {
            this.totalIn += parseFloat(element.total);
          } else if (element.state === "支出") {
            this.totalOut -= parseFloat(element.total);
          }
          if (this.map.has(element.day)) {
            this.map.get(element.day).push({
              iconimg: element.iconimg,
              name: element.name,
              state: element.state,
              total: element.total,
              info: element.info,
              id: element._id,
              day: element.day,
            });
          } else {
            let list = [];
            list.push({
              iconimg: element.iconimg,
              name: element.name,
              state: element.state,
              total: element.total,
              info: element.info,
              id: element._id,
              day: element.day,
            });
            this.map.set(element.day, list);
          }
        }
      });
    },
    // 修改每个条目
    itemClick(item) {
      this.$router.push({
        name: "modify",
        params: {
          item,
        },
      });
    },
    onConfirm(date) {
       this.totalIn=0;
       this.totalOut=0;
      this.map.clear();
      console.log(this.map)
      this.show = false;
      this.dates.year = date.getFullYear();
      this.dates.month = date.getMonth() + 1;
      this.dates.day = date.getDate();
      let dates = this.dates;
      this.$store.commit({
        type: "savedate",
        dates,
      });
      // this.getMonthTotal();
            this.getNoteByMonth();
    },

    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    },
  },
};
</script>
<style lang='less'>
@import "~assets/css/home.less";
.container {
  overflow: scroll;
  padding: 0.625rem;
  title {
    margin: 0;
  }
  .van-divider {
    margin: 0;
  }
  div {
    margin-bottom: 0.3125rem;
  }
  .show {
    margin-bottom: 1.25rem;
  }
  .title,
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    i {
      border-radius: 50%;
      background-color: #ffda44;
      // opacity: 0.4;
      font-size: 30px;
      margin-right: 0.625rem;
    }
    span {
      color: #6b6a6a;
    }
  }
}
</style>