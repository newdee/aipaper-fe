<template>
  <div class="side-menu">
    <!-- <div class="logo">
      <img src="logo.png" alt="logo" />
      <span>亲亲虫</span>
    </div> -->
    <ul>
      <li
        v-for="item in menuItems"
        :key="item.name"
        :class="{ active: selectedMenu === item.name }"
        @click="selectMenu(item.name)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
  props: {
    value: {
      type: String,
      default: "Recharge",
    },
  },
  computed: {
    selectedMenu: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  data() {
    return {
      menuItems: [
        { name: "Recharge", label: "账号充值", icon: "el-icon-house" },
        { name: "redemption", label: "兑换码", icon: "el-icon-edit" },
        { name: "mydetails", label: "钱包明细", icon: "el-icon-magic-stick" },
        { name: "vouchers", label: "我的卡卷", icon: "el-icon-document" },
        {
          name: "history",
          label: "购买记录",
          icon: "el-icon-data-analysis",
        },
      ],
    };
  },
  methods: {
    selectMenu(name) {
      this.selectedMenu = name;
      // 这里可以添加菜单切换后的逻辑处理，比如路由导航
    },
  },
};
</script>

<style lang="scss" scoped>
.side-menu {
  position: fixed;
  left: 0;
  top: 70px;
  width: 100px;
  height: calc(100vh - 100px);
  background-color: #f9f9f9;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    img {
      width: 50px;
      height: 50px;
      margin-bottom: 5px;
    }
    span {
      font-size: 18px;
      font-weight: bold;
    }
  }
  ul {
    list-style-type: none;
    padding: 0;
    width: 100%;
    li {
      width: 100%;
      padding: 15px 0;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: background-color 0.3s;
      i {
        font-size: 20px;
        margin-bottom: 5px;
      }
      span {
        font-size: 14px;
      }
      &:hover {
        background-color: #e6f7ff;
      }
      &.active {
        background-color: #e6f7ff;
        border-left: 4px solid #409eff;
        i {
          color: #409eff;
        }
        span {
          color: #409eff;
        }
      }
    }
  }
}
</style>
