<template>
  <div>
    <el-divider>优惠卷</el-divider>
    <el-tabs type="border-card">
      <el-tab-pane label="未使用">
        <div v-if="unused_coupons.length > 0" class="flexBox">
          <div class="coupon" v-for="item in unused_coupons" :key="item.id">
            <div class="content">
              <div class="title">学位论文抵扣券</div>
              <div class="validity">
                过期时间: {{ item.expire_time | dateFormatter }}
              </div>
              <div class="restriction">仅限制使用，不可使用</div>
            </div>
            <div class="right">
              <div class="discount">{{ item.discount_rate * 10 }}折</div>
              <button class="use-button">去使用</button>
            </div>
          </div>
        </div>
        <div v-else>
          <el-empty description="暂无数据"></el-empty>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已使用">
        <div v-if="expired_coupons.length > 0" class="flexBox">
          <div
            class="coupon couponUse"
            v-for="item in expired_coupons"
            :key="item.id"
          >
            <div class="content">
              <div class="title">学位论文抵扣券</div>
              <div class="validity">
                过期时间: {{ item.expire_time | dateFormatter }}
              </div>
              <div class="restriction">仅限制使用，不可使用</div>
            </div>
            <div class="right">
              <div class="discount">{{ item.discount_rate * 10 }}折</div>
            </div>
          </div>
        </div>
        <div v-else>
          <el-empty description="暂无数据"></el-empty>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已失效">
        <div v-if="used_coupons.length > 0" class="flexBox">
          <div
            class="coupon couponUse"
            v-for="item in used_coupons"
            :key="item.id"
          >
            <div class="content">
              <div class="title">学位论文抵扣券</div>
              <div class="validity">
                过期时间: {{ item.expire_time | dateFormatter }}
              </div>
              <div class="restriction">仅限制使用，不可使用</div>
            </div>
            <div class="right">
              <div class="discount">{{ item.discount_rate * 10 }}折</div>
            </div>
          </div>
        </div>
        <div v-else>
          <el-empty description="暂无数据"></el-empty>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { find_user_coupons } from "@/api/wallet";
export default {
  name: "vouchers",
  data() {
    return {
      isInputFocused: false,
      expired_coupons: null, // 已失效的优惠券
      unused_coupons: [
        // 未使用的优惠券
        {
          id: 899,
          type: 1, // 1-折扣券，目前都是折扣券
          rule_id: -1,
          create_user_id: 22,
          exchange_user_id: 6893,
          coupon_code: "other_cc535d11-491d-4daf-b3b2-b95a01304691",
          discount_rate: 0.9, // 9这
          create_time: "2025-01-20T20:16:32+08:00",
          used_time: null,
          // 过期时间，前端格式化为yyyy-MM-dd hh:mm:ss格式
          expire_time: "2025-01-21T00:00:00+08:00",
          channel: "other",
          status: 1,
          order_id: -1,
        },
      ],
      used_coupons: null, // 已使用的优惠券
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      find_user_coupons().then((res) => {
        console.log("res", res);
        this.used_coupons = res.result.used_coupons
          ? res.result.used_coupons
          : [];
        this.unused_coupons = res.result.unused_coupons
          ? res.result.unused_coupons
          : [];
        this.expired_coupons = res.result.expired_coupons
          ? res.result.expired_coupons
          : [];
      });
    },
    exchangeCodeRequest() {
      // 模拟请求接口
      // 这里可以使用 axios 或者 fetch 来请求接口
    },
  },
};
</script>

<style lang="scss" scoped>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.coupon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 20px;
  background: url("../../assets/images/wallets/write_blue.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  width: 300px;
  height: 150px;
  border-radius: 10px;
  padding: 20px;
  position: relative;
}
.couponUse {
  width: 350px;

  background: url("../../assets/images/wallets/used.png");
}
.couponUse {
  background: url("../../assets/images/wallets/used.png");
}
.content {
  color: #fff;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.validity {
  font-size: 14px;
  margin-bottom: 10px;
}

.restriction {
  font-size: 12px;
}

.right {
  display: flex;
  height: 90%;

  flex-direction: column;
  justify-content: space-between;
  color: #fff;
}

.discount {
  font-size: 16px;
  background: rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
}

.use-button {
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.use-button:hover {
  background: #00aaff;
  color: #fff;
}
.flexBox {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
</style>
