<template>
  <div>
    <!-- 推广活动宣传页 -->
    <!-- banner -->
    <div class="sec sec1">
      <div class="swiper">
        <div class="bannerBox">
          <div class="banner">
            <!-- <img src="" alt=""> -->
          </div>
          <img src="" class="imgRight" alt="" />
        </div>
        <div class="txtBox">
          <h1>万象写作推广大使邀新奖励</h1>
          <h2 class="gray">
            推荐好友XXXX现金，推广大使仅限个人实名认证用户参与
          </h2>
          <el-button type="primary" class="btn">我要推广</el-button>
        </div>
      </div>
    </div>
    <!-- 推荐福利 -->
    <div class="sec sec2">
      <div class="swiper">
        <div class="header">
          <p class="title1">推荐福利</p>
          <p class="txt">
            邀请新用户首次使用，每单返现XXXX！最高月佣金可达X万！<span
              class="txt-link"
              >推广规则详情 ></span
            >
          </p>
        </div>
        <div class="content">
          <div class="card">
            <div class="title2"><strong>邀新</strong> - 每笔最高获XX返佣</div>
            <p class="txt">邀请新客户首单每笔20%-35%</p>
            <p class="txt txt-link">详情规则</p>
            <div class="footer txt-link">立即邀请</div>
          </div>
          <div class="card">
            <div class="title2"><strong>返现</strong> - 月佣金最高可达X万</div>
            <p class="txt">佣金最快次月一次性到账</p>
            <p class="txt txt-link">详情规则</p>
            <div class="footer txt-link">立即邀请</div>
          </div>
          <div class="card">
            <div class="title2"><strong>奖金</strong> - 每笔佣金最高¥XXXX</div>
            <p class="txt">佣金最快次月一次性到账</p>
            <p class="txt txt-link">详情规则</p>
            <div class="footer txt-link">立即邀请</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 佣金加码 -->
    <div class="sec sec3">
      <div class="swiper">
        <div class="header">
          <p class="title1">十万佣金加码送</p>
          <p class="txt">
            双11推广佣金限时大膨胀！推荐个人新客户首次上云拿梯度奖励最高¥388+排行榜奖励最高¥8888！<span
              class="txt-link"
              >活动规则详情 ></span
            >
          </p>
        </div>
        <div class="content">
          <div class="left">
            <p class="title2">
              推荐个人新客户首上云，赢额外最高
              <span class="text-highlight">388元现金</span>
            </p>
            <div class="txt">
              <p>活动参与条件</p>
              <p>1、<span class="text-highlight">需主动领取活动任务</span></p>
              <p>2、订单时间为11月1日- 11月30日</p>
              <p>3、推广客户为个人认证</p>
              <p>4、推广订单类型为客户首购</p>
            </div>
          </div>
          <div class="top">
            <p class="detail">
              已推广
              <span class="txt-link"> 活动规则详情 </span>
            </p>
            <div class="awards">
              <div
                class="award"
                v-for="(awardStage, i) in awards"
                :key="'stage' + i"
              >
                <p>推广目标{{ awardStage.target }}达成</p>
                <div class="awardCard">
                  <span>额外奖金</span>
                  <div>
                    <i
                      ><span>{{ awardStage.amount }}</span></i
                    >元
                  </div>
                </div>
              </div>
            </div>
            <div class="btnBox">
              <div class="btn">领取活动任务(距结束剩4天2时11分)</div>
            </div>
          </div>
          <div class="bottom">
            <div class="rankingLeft">
              <p>
                推广业绩≥¥80000计入业绩排行，前20名可获第二重叠加最高
                <strong>¥8888奖金</strong>
              </p>
              <p class="txt-link">邀请排行榜</p>
            </div>
            <div class="rankingRight">
              <div
                class="ranking"
                v-for="(ranking, j) in rankings"
                :key="'ranking' + j"
              >
                <p>第{{ ranking }}名</p>
                <div class="awardForRanking">
                  <!-- <p>现金奖励</p>
                  <p><span></span></p> -->
                  <img :src="rankingImgs[j]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推广英雄榜 -->
    <div class="sec sec4">
      <div class="swiper">
        <div class="header">
          <p class="title1">推广英雄榜</p>
          <p class="txt">
            新手必看！快速掌握腾讯云推广大使满分经验 》》<span class="txt-link"
              >立即成为推广大使 ></span
            >
          </p>
        </div>
        <div class="content">
          <div class="promoters">
            <div
              class="promoter"
              v-for="(promoter, k) in promoters"
              :key="'promoter' + k"
            >
              <div class="topWrap">
                <img :src="promoter.img" alt="" />
                <div class="info">
                  <p class="name">{{ promoter.name }}</p>
                  <p>
                    月奖励:<i
                      ><span class="strongTxt"> ¥ {{ promoter.award }}</span></i
                    >
                  </p>
                  <p class="post">职业:{{ promoter.post }}</p>
                </div>
              </div>
              <div class="desc">
                <p>
                  {{ promoter.desc }}
                  <span class="txt-link">了解详情 ></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推广流程 -->
    <div class="sec sec5">
      <div class="swiper">
        <div class="header">
          <p class="title1">推广流程</p>
          <p class="txt">
            客户通过推广链接注册/登录与推广者建立关联，关联有效期内首次购买指定返佣产品可获20%-35%现金奖励<span
              class="txt-link"
              >推广新手指南 ></span
            >
          </p>
        </div>
        <div class="content">
          <ul>
            <li class="list-item" v-for="(step, l) in steps" :key="'step' + l">
              <div class="item">
                <span class="item-index">{{ l + 1 }}</span>
                <div class="item-cnt">
                  <div class="item-title">{{ step.title }}</div>
                  <div class="item-desc">{{ step.desc }}</div>
                  <div class="item-links">
                    <button
                      class="uno-button uno-button-middle uno-button-outlined uno-button-weak"
                      type="button"
                    >
                      <span class="uno-button-inner-wrap">{{
                        step.btnDesc
                      }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";
// import eventBus from "@/utils/eventBus";

export default {
  name: "promotion",
  data() {
    return {
      // 定义变量
      // 阶段奖励
      awards: [
        { target: 1, amount: 38 },
        { target: 2, amount: 66 },
        { target: 3, amount: 88 },
        { target: 4, amount: 128 },
        { target: 5, amount: 200 },
        { target: 6, amount: 388 },
      ],
      rankings: ["1", "2-5", "6-10", "11-20"],
      rankingImgs: [
        require("@/assets/images/promotion/ranking1.png"),
        require("@/assets/images/promotion/ranking2.png"),
        require("@/assets/images/promotion/ranking3.png"),
        require("@/assets/images/promotion/ranking4.png"),
      ],
      promoters: [
        {
          img: require("@/assets/images/promotion/promoter1.png"),
          name: "聂先生",
          award: "10万封顶",
          post: "前端工程师",
          desc: "所有的事情都是有一个循序渐进的过程，我从每个月2千多的佣金，到2万再到5万，其实也用了几近一年的时间",
        },
        {
          img: require("@/assets/images/promotion/promoter2.png"),
          name: "刘先生",
          award: "2万",
          post: "在校大学生",
          desc: "某大学的游戏开发方向学生，第一次接触腾讯云服务器是在今年1月，从第一次使用服务器到推广腾讯云共收入2万元一共只有两个月",
        },
        {
          img: require("@/assets/images/promotion/promoter3.png"),
          name: "江先生",
          award: "1万",
          post: "互联网运营",
          desc: "互联网推广就是一个不断增量的过程，我从最早一个月收入几百元，到现在月入过万仅花费了一年时间推广运营",
        },
      ],
      steps: [
        {
          title: "申请参与推广活动",
          desc: "注册腾讯云账号并完成个人实名认证",
          btnDesc: "申请参与推广",
        },
        {
          title: "获取推广链接",
          desc: "复制推广链接，发送/投放给客户",
          btnDesc: "管理推广素材",
        },
        {
          title: "建立客户关联",
          desc: "通过推广链接注册/登录建立关联",
          btnDesc: "管理客户关联",
        },
        {
          title: "推广有效订单",
          desc: "30天关联有效期内，下单购买返佣",
          btnDesc: "查看月结收入",
        },
      ],
    };
  },
  components: {
    // webinfo,
  },
  mounted() {
    // eventBus.emit("sendOutline", 5); // 发布事件
    // 页面初始化
  },
  created() {
    // eventBus.on("sendOutline", this.addE); // 订阅事件
  },
  beforeDestroy() {
    // eventBus.off("sendOutline", this.addE); // 移除事件监听
  },
  computed: {
    // 计算属性
  },
  methods: {
    // 定义方法
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
@import "@/styles/variables.scss";
@import "@/styles/mediaMain.scss";
@import "@/styles/index.scss";

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
// @media only screen and (max-width: 768px) {
// }
.sec {
}
.swiper {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  border-top: 1px solid transparent; // 防止margin塌陷
}
.title1 {
  font-size: 28px;
  color: #181818;
}
.title2 {
  font-size: 18px;
  color: #000;
}
.title3 {
  font-size: 16px;
  color: #000;
}
.txt {
  font-size: 14px;
  color: #495770;
}
.txt-link {
  color: #0052d9;
  cursor: pointer;
}
strong {
  color: #ff5400;
}
// 媒体查询
@media only screen and (max-width: 769px) {
  sec1 {
    width: 100%;
    height: 400px;
    background-image: linear-gradient(-45deg, #3967ff, #b500fe);
  }
  .txtBox {
    width: 100%;
    padding: 260px 20px 0;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    padding-top: 216px;
    h1 {
      font-size: 24px;
      margin-bottom: 0.5em;
    }
    h2 {
      font-size: 14px;
    }
  }
}
@media screen and (min-width: 769px) {
  .sec1 {
    width: 100%;
    height: 500px;
    background-image: linear-gradient(-45deg, #3967ff, #b500fe);
  }
  .txtBox {
    width: 1180px;
    height: 100%;
    margin: 0 auto;
    padding-top: 158px;
    position: relative;
    z-index: 30;
    h1 {
      font-size: 42px;
      margin-bottom: 1em;
    }
    h2 {
      font-size: 16px;
    }
  }
  .bannerBox {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.txtBox {
  .btn {
    padding: 10px 20px;
    font-size: 16px;
    width: 136px;
    height: 44px;
    margin-top: 100px;
  }
}
.sec2 {
  padding: 60px 0;
}
.header {
  padding-bottom: 30px;
}
.header .txt {
  margin-top: 12px;
}
.sec2 .content {
  display: flex;
  column-gap: 15px;
  .card {
    background: linear-gradient(0deg, #fff, #f3f5f8);
    box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, 0.1);
    border-radius: 4px;
    padding: 20px;
    position: relative;
    font-size: 0;
    box-sizing: border-box;
    flex-grow: 0.3;
    transition: 0.3s;
    &:hover {
      transform: scale(1.03);
    }
    .txt {
      margin: 5px 0;
    }
    .footer {
      display: inline-block;
      font-size: 14px;
      color: #0052d9;
      border: 1px solid #0052d9;
      padding: 5px 15px;
      background-color: #fff;
      margin-top: 10px;
    }
  }
}
.sec3 {
  background-color: #f5f7fa;
  padding: 60px 0;
  .content {
    position: relative;
    .left {
      position: absolute;
      top: -10px;
      left: 0;
      width: 315px;
      height: 298px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-image: url("../../assets/images/promotion/award.png");
      background-size: 100% 100%;
      .title2 {
        color: #fff;
        line-height: 1.5em;
        .text-highlight {
          font-size: 20px;
          color: #ffe3c9;
          font-weight: 500;
        }
      }
      .txt {
        color: #fff;
        line-height: 1.8em;
        .text-highlight {
          color: #ffe3c9;
        }
      }
    }
    .top {
      padding-left: 328px;
      // background: #fff;
      background-image: linear-gradient(0deg, #f8fbff, #eef5ff);
      border: 2px solid #fff;
      box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, 0.1),
        inset 0 4px 20px 0 hsla(0, 0%, 100%, 0.5);
      border-radius: 4px;
      .detail {
        padding: 10px 0;
        margin-left: -45px;
        padding-left: 45px;
        background-image: linear-gradient(90deg, #fafcff 25%, #f5f9ff 97%);
      }
      .awards {
        display: flex;
        padding-right: 15px;
        column-gap: 15px;
        row-gap: 1px;
        justify-content: space-around;
        .award {
          flex-grow: 1;
          min-width: 100px;
          & > p {
            text-align: center;
            line-height: 5em;
            color: #495770;
          }
          .awardCard {
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            overflow: hidden;
            & > span {
              display: inline-block;
              width: 100%;
              text-align: center;
              font-size: 14px;
              color: #6d422d;
              letter-spacing: 0;
              line-height: 32px;
              height: 32px;
              text-align: center;
              background-image: linear-gradient(90deg, #ffe5d4, #ffd3a4 98%);
            }
            & > div {
              background-image: linear-gradient(180deg, #fff 28%, #f5f9ff);
              border: 2px solid #fff;
              border-top: none;
              box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, 0.1),
                inset 0 4px 20px 0 hsla(0, 0%, 100%, 0.5);
              height: 68px;
              padding-top: 20px;
              box-sizing: border-box;
              text-align: center;
              span {
                font-size: 28px;
                color: #495770;
                line-height: 36px;
                font-weight: 600;
              }
            }
          }
        }
      }
      .btnBox {
        text-align: center;
        padding-bottom: 24px;
      }
      .btn {
        display: inline-block;
        background: #ff7200;
        color: #fff;
        box-shadow: 8px 8px 20px rgba(55, 99, 170, 0.1);
        padding: 10px 27px;
        margin-top: 24px;
        min-width: 240px;
      }
    }
    .bottom {
      background: linear-gradient(180deg, #d1e1ff 16.67%, #fdfdff 125.49%);
      .rankingLeft {
        font-size: 16px;
        line-height: 24px;
        color: #0e2860;
        padding: 35px 25px;
        padding-right: 0px;
        display: inline-block;
        width: 345px;
        .txt-link {
          font-size: 14px;
        }
      }
      .rankingRight {
        display: inline-block;
      }
      .ranking {
        display: inline-block;
        width: 188px;
        // background-image: url("../../assets/images/promotion/foot-item-bg.png");
        background-size: 100% 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        transform: translateY(-2px);
        position: relative;
        &::before {
          content: "";
          display: inline-block;
          width: 2px;
          height: 123px;
          background: #fff;
          position: absolute;
          left: 0;
          top: -4px;
          transform: rotate(14deg) translateX(18px);
        }
        p {
          font-size: 16px;
          padding-left: 40px;
          padding-top: 15px;
        }
        .awardForRanking {
          text-align: right;
        }
        img {
          width: 155px;
          height: auto;
          margin-right: 14px;
        }
      }
    }
  }
}
.sec4 {
  padding: 60px 0;
  .promoters {
    display: flex;
    justify-content: space-between;
    column-gap: 30px;
    .promoter {
      flex: 1;
      min-width: 346px;
      background-image: linear-gradient(0deg, #fff, #f3f6fc);
      border: 2px solid #fff;
      box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, 0.1), -8px -8px 20px 0 #fff;
      border-radius: 8px;
      box-sizing: border-box;
      .topWrap {
        width: 100%;
        min-height: 115px;
        background-image: url("../../assets/images/promotion//card-bg.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        position: relative;
        padding-left: 148px;
        img {
          width: 148px;
          height: 148px;
          display: inline-block;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        .info {
          color: #fff;
          padding-left: 15px;
          .name {
            font-size: 18px;
            line-height: 3em;
          }
          .strongTxt {
            font-size: 24px;
            line-height: 24px;
            font-weight: 600;
            background-image: linear-gradient(90deg, #ffcf9b, #ffebd5);
            color: transparent;
            background-clip: text;
            -webkit-background-clip: text;
            padding-right: 10px;
          }
          .post {
            line-height: 3em;
          }
        }
      }
      .desc {
        border-top: none;
        border-radius: 0 0 8px 8px;
        height: calc(100% - 115px);
        padding: 16px 20px;
        font-size: 14px;
        color: #495770;
        letter-spacing: 0;
        line-height: 26px;
      }
    }
  }
}
.sec5 {
  padding: 60px 0;
  background: #f5f7fa;
  ul {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 0;
    &::after {
      position: absolute;
      left: 124px;
      right: 124px;
      content: "";
      height: 1px;
      top: 30px;
      z-index: -1;
      background-image: url("../../assets/images/promotion/step-line.png");
      background-repeat: repeat-x;
      background-size: auto 1px;
    }
    li {
      .item {
        text-align: center;
        width: 188px;
        .item-index {
          width: 60px;
          height: 60px;
          background: linear-gradient(0deg, #fff, #f3f5f8);
          border: 2px solid #fff;
          box-shadow: 8px 8px 20px 0 rgba(55, 99, 170, 0.1),
            -8px -8px 20px 0 #fff;
          text-align: center;
          border-radius: 50%;
          line-height: 56px;
          display: inline-block;
          margin-bottom: 24px;
          font-size: 24px;
          color: #4b5b76;
        }
        .item-cnt {
          overflow: hidden;
          .item-title {
            font-size: 16px;
            color: #181818;
            line-height: 24px;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .item-desc {
            font-size: 14px;
            color: #4b5b76;
            line-height: 22px;
            margin-top: 4px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            color: #4b5b76;
            margin-top: 8px;
          }
          .item-links {
            margin-top: 8px;
            button {
              background: #fff;
              border: 1px solid #0052d9;
              color: #0052d9;
              box-shadow: 8px 8px 20px rgba(55, 99, 170, 0.1);
              line-height: 34px;
              width: 120px;
            }
          }
        }
      }
    }
  }
}
</style>
