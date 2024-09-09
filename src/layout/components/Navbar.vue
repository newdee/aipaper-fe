<template>
    <div class="navbar">
        <el-row :gutter="10">
            <el-col :xs="21" :sm="12">
                <div @click="jumpDetail('/')" class="grid-content nav_left flex items-center">
                    <div class="logo-box">
                        <img :src="logo" alt="" title="logo" />
                    </div>
                    <div>
                        <span class="web_title">
                            AIPaperPass
                            <span>.com</span>
                        </span>
                        <span>AI写作指导平台</span>
                    </div>
                </div>
            </el-col>

            <el-col :xs="3" :sm="12">
                <div class="grid-content flex items-center operations items-align-right">
                    <div class="text-main items-center hidden-xs-only" @click="jumpDetail('/paper/reduceRepetiton')">
                        降重/降AIGC率
                    </div>
                    <div class="text-main items-center hidden-xs-only" @click="jumpDetail('/paper/reduceRepetiton')">
                        我的订单
                    </div>
                    <div class="text-main items-center hidden-xs-only" @click="jumpDetail('/paper/preview')">
                        范文样例
                    </div>
                    <templta>
                        <div v-if="!hasLogin" @click="pushLogin" class="login_box hidden-xs-only">
                            <div class="img">登录</div>
                        </div>
                        <div v-else @click="showUserMenu = !showUserMenu" class="login_box hidden-xs-only">
                            <div class="img">
                                <img src="@/assets/images/user/userImg.png" alt="">
                            </div>
                            <!-- 已登录状态下拉菜单栏 -->
                            <UserMenu :showUserMenu="showUserMenu"></UserMenu>
                        </div>
                    </templta>
                    <div class="hidden-sm-and-up operation_box bg-purple-light" @click="showDraw">
                        <i class="el-icon-s-operation"></i>
                    </div>
                </div>
            </el-col>
        </el-row>

        <!-- 菜单栏 -->
        <el-drawer size="40%" :visible.sync="drawer" :direction="direction" :before-close="handleClose"
            :show-close="false" append-to-body>
            <template slot="title">
                <div>我的菜单</div>
            </template>
            <div class="flex flex-star">
                <div class="text-main items-center siderbar-item" @click="jumpDetail('/paper/reduceRepetiton')">
                    降重/降AIGC率
                </div>
                <div class="text-main items-center siderbar-item" @click="jumpDetail('/paper/reduceRepetiton')">
                    我的订单
                </div>
                <div class="text-main items-center siderbar-item" @click="jumpDetail('/paper/preview')">
                    范文样例
                </div>
                <div class="text-main items-center siderbar-item" @click="pushLogin">
                    登录
                </div>
            </div>
        </el-drawer>
        
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import UserMenu from "./UserMenu.vue";

export default {
    components: {
        Breadcrumb,
        Hamburger,
        UserMenu,
    },
    data() {
        return {
            logo: require("@/assets/images/logo_paper.png"),
            drawer: false,
            direction: "rtl", //抽屉方向
            hasLogin: true,
            showUserMenu: true,
        };
    },
    computed: {
        ...mapGetters(["sidebar", "avatar"]),
    },
    methods: {
        handleClose(done) {
            done();
        },
        jumpDetail(path) {
            this.$router.push(path);
        },
        pushLogin() {
            this.$router.push("/login");
        },
        showDraw() {
            this.drawer = true;
        },
        toggleSideBar() {
            this.$store.dispatch("app/toggleSideBar");
        },
        async logout() {
            await this.$store.dispatch("user/logout");
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        },
        toView(toPath) {
            this.$router.push("/" + toPath + "");
        },
    },
};
</script>



<style lang="scss" scoped>
@import "@/styles/variables.scss";

.operation_box {
    font-size: 20px;
    padding: 5px;
    border-radius: 5px;
    position: relative;
    left: 10px;
}

.navbar {
    padding: 0 16px;

    .el-col {
        height: 100%;
    }

    .login_box {
        font-size: 12px;
        position: relative;
        .img {
            border-radius: 50%;
            width: 35px;
            height: 35px;
            background: #ff8cb0;
            text-align: center;
            line-height: 35px;
            color: $white;
            // color: var(--white);
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.web_title {
    font-size: 20px;
    font-weight: bold;

    span {
        font-size: 14px;
        position: relative;
        left: -5px;
    }
}

.nav_left {
    color: rgb(75 85 99);
    height: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
}

.logo-box {
    height: 32px;
    width: 32px;
    margin-right: 10px;

    img {
        width: 100%;
        height: 100%;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    height: 100%;

    &:hover>div {
        cursor: pointer;
    }
}

.navbar {
    width: 100%;
    height: 50px;
    // overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                margin-top: 5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}

.flex {
    display: flex;
}

.items-center {
    align-items: center;
}

.items-align-right {
    justify-content: flex-end;
}

.flex.flex-star {
    justify-content: flex-start;
    flex-direction: column;
}

.navbar .el-row {
    width: 100%;
    // color: red;
    height: 50px;
}

.text-main {
    margin-right: 1.5rem;
}

.text-main:hover {
    color: rgb(59 130 246 / 1);
}

.siderbar-item {
    padding-left: 20px;
    padding-bottom: 15px;
}
</style>
