<template>
    <div class="ordersList">
        <!-- 页面名称 -->
        <el-checkbox-group v-model="checkList">
            <div class="orderBox">
                <el-checkbox label="复选框 A"></el-checkbox>
                <div class="order">
                    <div class="orderNum rowBetween">
                        <div class="left">订单号：1827987236658872320</div>
                        <div class="right">2024-08-15 23:12:24</div>
                    </div>
                    <div class="orderTitle">
                        关于全球变暖治理及发展前景
                    </div>
                    <div class="orderOutline rowBetween handleRow">
                        <div class="left">[本科·约2万字]</div>
                        <div class="right">
                            查看大纲
                            <svg class="icon svg-icon" aria-hidden="true">
                                <use xlink:href="#icon-view"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="orderText rowBetween handleRow">
                        <div class="left">正文（含无限改稿）</div>
                        <div class="right">
                            改稿下载
                            <svg class="icon svg-icon" aria-hidden="true">
                                <use xlink:href="#icon-download"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="orderBox">
                <el-checkbox label="复选框 B"></el-checkbox>
                <div class="order">
                    <div class="orderNum rowBetween">
                        <div class="left">订单号：1827987236658872320</div>
                        <div class="right">2024-08-15 23:12:24</div>
                    </div>
                    <div class="orderTitle">
                        关于全球变暖治理及发展前景
                    </div>
                    <div class="orderOutline rowBetween handleRow">
                        <div class="left">[本科·约2万字]</div>
                        <div class="right">
                            查看大纲
                            <svg class="icon svg-icon" aria-hidden="true">
                                <use xlink:href="#icon-view"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="orderText rowBetween handleRow">
                        <div class="left">正文（含无限改稿）</div>
                        <div class="right">
                            改稿下载
                            <svg class="icon svg-icon" aria-hidden="true">
                                <use xlink:href="#icon-download"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="orderBox">
                <el-checkbox label="复选框 C"></el-checkbox>
                <div class="order">
                    <div class="orderNum rowBetween">
                        <div class="left">订单号：1827987236658872320</div>
                        <div class="right">2024-08-15 23:12:24</div>
                    </div>
                    <div class="orderTitle">
                        关于全球变暖治理及发展前景
                    </div>
                    <div class="orderOutline rowBetween handleRow">
                        <div class="left">[本科·约2万字]</div>
                        <div class="right">
                            查看大纲
                            <svg class="icon svg-icon" aria-hidden="true">
                                <use xlink:href="#icon-view"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="orderText rowBetween handleRow">
                        <div class="left">正文（含无限改稿）</div>
                        <div class="right">
                            改稿下载
                            <svg class="icon svg-icon" aria-hidden="true">
                                <use xlink:href="#icon-download"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="orderBox">
                <el-checkbox label="复选框 D"></el-checkbox>
                <div class="order">
                    <div class="orderNum rowBetween">
                        <div class="left">订单号：1827987236658872320</div>
                        <div class="right">2024-08-15 23:12:24</div>
                    </div>
                    <div class="orderTitle">
                        关于全球变暖治理及发展前景
                    </div>
                    <div class="orderOutline rowBetween handleRow">
                        <div class="left">[本科·约2万字]</div>
                        <div class="right">
                            查看大纲
                            <svg class="icon svg-icon" aria-hidden="true">
                                <use xlink:href="#icon-view"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="orderText rowBetween handleRow">
                        <div class="left">正文（含无限改稿）</div>
                        <div class="right">
                            改稿下载
                            <svg class="icon svg-icon" aria-hidden="true">
                                <use xlink:href="#icon-download"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </el-checkbox-group>
        <div class="btns">
            <el-button type="primary" round @click="$devf">查询订单</el-button>
        </div>
    </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";

export default {
    name: "UserOrders",
    data() {
        return {
            // 定义变量
            checkList: ['复选框 A']
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
// @import "@/styles/variables.scss";
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.ordersList {
    --border:1px solid #0000001f;
    --border-bottom:1px solid #0000001f;
}
.orderBox {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;
}
.orderBox .order {
    display: block;
    flex-grow: 1;
    height: fit-content;
    font-size: 14px;
    padding: 10px 15px;
    // border: 1px solid #0000001f;
    border: var(--border);
    border-radius: 5px;
    margin-left: 10px;
}
.orderBox ::v-deep .el-checkbox .el-checkbox__label{
    display: none;
}
.rowBetween {
    display: flex;
    justify-content: space-between;
    line-height: 2em;
}
.rowBetween .left {
    color: #666;
}
.rowBetween .right {
    color: #409eff;
}
.orderNum.rowBetween div{
    color: #999;
    font-size: 12px;
}
.orderTitle {
    color: #202020;
    font-weight: 600;
}
.handleRow:not(:last-child) {
    border-bottom: var(--border-bottom);
}
.btns { 
    text-align: right;
    border-top: var(--border-bottom);
    padding: 15px 0;
}
</style>