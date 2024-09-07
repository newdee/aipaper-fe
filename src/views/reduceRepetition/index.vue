<template>
    <div class="reduceRepetiton">
        <Navbar></Navbar>
        <header>
            <h1>智能降重、降AIGC率</h1>
            <h1>只需一键，既可降低重复率，也可降低AIGC率</h1>
        </header>
        <div class="edit flex">

        </div>
    </div>
</template>

<script>
import Navbar from "@/layout/components/Navbar";

export default {
    components: {
        Navbar,
    },
    data() {
        return {
            logo: require("@/assets/images/logo_paper.png"),
            drawer: false,
            direction: "rtl", //抽屉方向
        };
    },
    computed: {
    },
    methods: {
    },
};
</script>



<style lang="scss" scoped>
@import "@/styles/variables.scss";
</style>