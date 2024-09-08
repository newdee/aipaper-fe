<template>
    <div class="page">
        <el-backtop></el-backtop>
        <!-- 范文样例 -->
        <section class="sec sec1">
            <p class="title-1">选择范文题目：</p>
            <el-radio-group v-model="sampleTitle">
                <el-radio v-for="(titleType, i) in sampleTiles" :label="titleType" :key="'title' + i">{{
                titleMap[titleType] }}</el-radio>
            </el-radio-group>
            <p class="title-1">选择范文材料：</p>
            <el-radio-group v-model="sampleMaterial">
                <el-radio v-for="(material, j) in sampleMaterials" :label="material" :key="'material' + j">
                    <div v-html="JSON.parse(materialMap[material])"></div>
                </el-radio>
            </el-radio-group>
        </section>
        <section class="sec sec2">
            <img src="@/assets/images/aigc.png" />
        </section>
        <section class="sec sec3">
            <div class="imgbox">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/1.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/2.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/3.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/4.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/5.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/6.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/7.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/8.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/9.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/10.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/11.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/12.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/13.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/14.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/15.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/16.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/17.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/18.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/19.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/20.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/21.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/22.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/23.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/24.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/25.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/26.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/27.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/28.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/29.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/30.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/31.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/32.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/33.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/34.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/35.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/36.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/37.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/38.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/39.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/40.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/41.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/42.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/43.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/44.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/45.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/46.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/47.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/48.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/49.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/50.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/51.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/52.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/53.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/54.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/55.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/56.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/57.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/58.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/59.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/60.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/61.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/62.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/63.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/64.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/65.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/66.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/67.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/68.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/69.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/70.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/71.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/72.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/73.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/74.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/75.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/76.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/77.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/78.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/79.jpg" alt="">
                <img src="https://aijar-content.yyjjtech.com/demo/vue/main/80.jpg" alt="">
            </div>
        </section>
    </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import { sms } from "@/api/login";
// import webinfo from "@/components/webinfo.vue";

export default {
    name: "maincon",
    data() {
        return {
            // 定义变量
            sampleTitle: 1,
            sampleMaterial: 1,
            sampleTiles: [1, 2, 3],
            titleMap: {
                1: '【计算机类】基于Golang和Vue.js的个人博客系统设计与实现',
                2: '【医药学类】热炎宁颗粒工艺提升对于药效的提升',
                3: '【金融学类】基于机器学习的银行信贷评分模型研究',
            },
            sampleMaterials: [1, 2, 3, 4, 5,],
            materialMap: {
                1: '"正文(含<span style=\\"color:#d75300\\">数据</span>、<span style=\\"color:#d75300\\">图</span>、<span style=\\"color:#d75300\\">表</span>、<span style=\\"color:#d75300\\">代码</span>)"',
                2: '"开题报告"',
                3: '"任务书"',
                4: '"调查问卷"',
                5: '"答辩汇报PPT"'
            }
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
* p {
    margin: 0px;
}

// 引入scss
// @import './index.scss';

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.sec {
    width: 43rem;
    background: #fff;
    margin: 15px auto;
    padding: 15px;
    line-height: 2;
    border-radius: .5rem;
    box-shadow: 0 1px 3px 0 #d1d5db, 0 1px 2px -1px #d1d5db;
    overflow: hidden;
    position: relative;
}

.sec2 {
    background: #f6f3ff;
}

.title-1 {
    font-weight: bold;
}

.sec1 ::v-deep .el-radio {
    line-height: 2em;
    margin-right: 1.2rem;
}

.sec1 ::v-deep .el-radio .el-radio__label {
    display: inline-block;
}

.sec1 ::v-deep .el-radio__input.is-checked+.el-radio__label {
    color: #606266 !important;
}

.sec2 img {
    width: 100%;
    height: auto;
}

.sec3 {
    box-shadow: none;
    overflow: visible;
}

.sec3 .imgbox {
    margin: -15px;
}

.sec3 .imgbox img {
    width: 100%;
    height: auto;
    margin-bottom: 5px;
    border-radius: .5rem;
    box-shadow: 0 1px 3px 0 #d1d5db, 0 1px 2px -1px #d1d5db;
}
</style>