<template>
    <div class="userMenuContainer" v-show="showUserMenu">
        <!-- 头像菜单 -->
        <div class="userMenu">
            <div class="menuHeader">
                <div class="img">
                    <img src="@/assets/images/user/userImg.png" alt="">
                </div>
                <div class="info">
                    <p class="name">用户名</p>
                    <p class="tel">15912343456</p>
                </div>
            </div>
            <div class="menuBody">
                <div class="menuGroup menuAboutUer">
                    <div class="menuItem">
                        <i class="el-icon-s-operation"></i>
                        我的个人主页
                    </div>
                    <div class="menuItem">
                        <i class="el-icon-s-operation"></i>
                        订单管理
                    </div>
                </div>
                <div class="menuGroup menuAboutMixPaper">
                    <div class="menuItem">
                        <i class="el-icon-s-operation"></i>
                        更新日志
                    </div>
                    <div class="menuItem">
                        <i class="el-icon-s-operation"></i>
                        官方网站
                    </div>
                    <div class="menuItem">
                        <i class="el-icon-s-operation"></i>
                        加入我们
                    </div>
                </div>
                <div class="menuGroup menuAboutSetting">
                    <div class="menuItem">
                        <i class="el-icon-s-operation"></i>
                        官方网站
                    </div>
                    <div class="menuItem">
                        <i class="el-icon-s-operation"></i>
                        加入我们
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";

export default {
    name: "UserMenu",
    props: {
        showUserMenu: {
            type: Boolean,
            default:false,
        },
    },
    data() {
        return {
            // 定义变量
        };
    },
    mounted() {
        // 页面初始化
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

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
* p {
    margin: 0px;
}
.userMenuContainer {
    font-size: 14px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid #e9ecf1;
    position: absolute;
    --box-width:280px;
    width: var(--box-width);
    right: 0;
    top:calc( #{$navBarHeight} - 10px);
}
.userMenu {
    box-shadow: 0px 6px 18px 0px rgba(29, 41, 57, 0.14);
    border-radius: 6px;
    position: relative;
    overflow: hidden;
}
.menuHeader {
    background-image: linear-gradient(90deg,#e3f0ff ,#effcff);
    padding: 20px;
    display: flex;
    align-items: center;
}
.menuHeader .img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    display: inline-block;
}
.menuHeader .img img {
    width: 100%;
    height: 100%;
} 
.menuHeader .info {
    display: inline-block;
    line-height: 1.5em
}
.menuHeader .info p.name {
    font-size:16px;
    line-height: 1.8em;
    color: #1f2a2e;
}
.menuHeader .info p.tel {
    color: #1f212680;
    font-size: 12px;
}
.menuBody {
    line-height: 3em;
    color: #2f2e3f;
}
.menuGroup {
    padding: 5px 20px;
    border-bottom: 1px solid #eeeff1;
}
.menuGroup:last-child {
    border: none;
}
</style>