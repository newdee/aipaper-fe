<template>
    <div class="footer">
        <!-- 网站信息 -->
        <section class="siteInfo">
            <div class="col col_1">
                <img src="@/assets/images/MIXPAPERwxxz.png" alt="" />
                <div class="qrBox">
                    <img src="@/assets/images/qrcode.png" alt="">
                    <p>
                        公司：MIXPAPER<br />
                        联系方式：010-88766666<br />
                        地址：北京市海淀区<br />
                        扫码关注我们，获取更多信息<br />
                    </p>
                </div>
            </div>
            <div class="col col_2">
                <p class="title_mini">相关链接</p>
                <p><a href="">链接1入口</a></p>
                <p><a href="">链接2入口</a></p>
                <p><a href="">链接3入口</a></p>
            </div>
            <div class="col col_3">
                <p class="title_mini">关于</p>
                <p><a href="">关于我们</a></p>
                <p><a href="">核心技术</a></p>
            </div>
        </section>
        <!-- 底部栏 -->
        <div class="footerP">
            <p style="text-align: center; color: #666">
                © 2024 石家庄浅思科技有限公司 关于我们
                <a href="https://beian.miit.gov.cn" target="_blank">冀ICP备2024060058号-2</a>
            </p>
        </div>
    </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";

export default {
    name: "myFooter",
    data() {
        return {
            // 定义变量
        };
    },
    components: {
        // webinfo,
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

.footer {
    padding-left: $sideBarWidth !important;
}

@media only screen and (max-width: 990px) {
    .footer {
        padding-left: 0px !important;
    }
}

.siteInfo {
    display: grid;
    grid-template-columns: 11fr 3fr 7fr;
    text-align: left;
    padding: 32px 0px;

    .col {
        padding: 0 20px;

        p {
            font-size: 14px;
            color: #000000;
            line-height: 1.5em;
        }

        .title_mini {
            color: #666666;
            font-size: 14px;
            line-height: 3em;
        }
    }

    .col_1 {
        padding-left: 7em;

        >img {
            height: 20px;
            width: auto;
        }

        .qrBox {
            display: flex;
            justify-content: flex-start;
            padding-top: 16px;
            align-items: center;

            img {
                border: 1px solid #CCCCCC;
                width: 115px;
                height: 115px;
                margin-right: 16px;
            }
        }
    }

    .col_2 {
        padding-left: 3em;

        p {
            line-height: 2em;
        }
    }

    .col_3 {
        padding-left: 3em;

        p {
            line-height: 2em;
        }
    }


}

.footer {
    padding: 15px 0;
}

.footer p {
    margin: 0px;
    cursor: default;
}

.footerP {
    background: rgba(241, 241, 241, 0.93);
    padding: 24px 0;
    text-align: center;
    font-size: 12px;
}
</style>