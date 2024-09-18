<template>
    <div class="footer">
        <!-- 底部栏 -->
        <p style="text-align: center;color:#666;">
            © 2024 石家庄浅思科技有限公司 关于我们
            <a href="https://beian.miit.gov.cn" target="_blank">冀ICP备2024060058号-2</a>
        </p>
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
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.footer {
    padding: 15px 0;
}
.footer p {
    margin: 0px;
    cursor: default;
}
</style>