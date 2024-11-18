<template>
  <div class="container">
    <div class="card" v-for="(card, index) in cards" :key="index">
      <div class="background-circle"></div>
      {{ card.title }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: [
        { title: "论文灵感" },
        { title: "海量数据" },
        { title: "提纲推荐" },
        { title: "查重降重" },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.card {
  width: 250px;
  height: 400px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  position: relative;
  overflow: hidden;
}

.card:nth-child(1) {
  background: linear-gradient(135deg, #44c767 0%, #5cbf2a 100%);
}
.card:nth-child(2) {
  background: linear-gradient(135deg, #f9d423 0%, #f83600 100%);
}
.card:nth-child(3) {
  background: linear-gradient(135deg, #add100 0%, #7b920a 100%);
}
.card:nth-child(4) {
  background: linear-gradient(135deg, #ffb75e 0%, #ed8f03 100%);
}

.background-circle {
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  opacity: 0.1;
  background-color: white;
}

.card:nth-child(1) .background-circle {
  top: 20px;
  right: -30px;
}
.card:nth-child(2) .background-circle {
  bottom: -30px;
  left: 20px;
}
.card:nth-child(3) .background-circle {
  top: -30px;
  left: 20px;
}
.card:nth-child(4) .background-circle {
  bottom: 20px;
  right: -30px;
}
</style>
