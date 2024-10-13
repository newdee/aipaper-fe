<template>
  <div>
    <PdfViewer :pdfUrl="pdfUrl" ref="pdfViewer" />
  </div>
</template>

<script>
import PdfViewer from "./PdfViewer.vue";

export default {
  name: "App",
  components: {
    PdfViewer,
  },
  data() {
    return {
      pdfUrl: require("@/assets/third_output.pdf"),
    };
  },
  methods: {
    onPrevPage() {
      this.$refs.pdfViewer.onPrevPage();
    },
    onNextPage() {
      this.$refs.pdfViewer.onNextPage();
    },
  },
};
</script>

<style>
</style>
