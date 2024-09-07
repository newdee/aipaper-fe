<template>
  <div>
    <div class="info-box">
      <div class="info_left">
        <p class="">今日大纲</p>
        <p class="detailNum">7632</p>
      </div>
      <div>
        <p class="text-slate-800">今日正文</p>
        <p class="detailNum">1356</p>
      </div>
    </div>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
.info-box {
  width: 160px;
  height: 60px;
  background-color: #0000001a;
  border-radius: 5px;
  position: fixed;
  left: 10px;
  top: 80px;
  display: flex;
  justify-content: space-between;
  padding: 4px 16px;
  font-size: 14px;
  color: #1e293b;
  p {
    line-height: 0px;
  }
}
.detailNum {
  color: #dc8447;
  font-weight: bold;
  font-size: 20px;
  padding: 3px;
}
@media only screen and (max-width: 768px) {
  .info-box {
    top: 50px;
    width: 100%;
    justify-content: center;
  }
  .info_left {
    margin-right: 50px;
  }
}
</style>