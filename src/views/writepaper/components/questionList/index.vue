<template>
  <div class="progress-component">
    <div class="labels">
      <span
        class="label satisfied"
        :class="{ voted: votedType === 'satisfied' }"
      >
        <i v-if="votedType === 'satisfied'" class="el-icon-circle-check"></i>
        满意 {{ satisfiedPercentage }}%
      </span>
      <span class="label neutral" :class="{ voted: votedType === 'neutral' }">
        <i v-if="votedType === 'neutral'" class="el-icon-circle-check"></i>
        一般 {{ neutralPercentage }}%
      </span>
      <span
        class="label unsatisfied"
        :class="{ voted: votedType === 'unsatisfied' }"
      >
        <i v-if="votedType === 'unsatisfied'" class="el-icon-circle-check"></i>
        不满意 {{ unsatisfiedPercentage }}%
      </span>
    </div>
    <div class="progress-bar">
      <div
        class="progress-section satisfied"
        :style="{ width: satisfiedPercentage + '%' }"
      ></div>
      <div
        class="progress-section neutral"
        :style="{ width: neutralPercentage + '%' }"
      ></div>
      <div
        class="progress-section unsatisfied"
        :style="{ width: unsatisfiedPercentage + '%' }"
      ></div>
    </div>
    <div class="buttons" v-if="!votedType">
      <button class="button satisfied" @click="setPercentage('satisfied')">
        满意
      </button>
      <button class="button neutral" @click="setPercentage('neutral')">
        一般
      </button>
      <button class="button unsatisfied" @click="setPercentage('unsatisfied')">
        不满意
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      satisfiedPercentage: 92,
      neutralPercentage: 7,
      unsatisfiedPercentage: 1,
      votedType: null,
    };
  },
  methods: {
    setPercentage(type) {
      this.votedType = type; // 仅记录用户投票的类型
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-component {
  width: 100%;
  margin: 0 auto;
  padding: 50px 220px;
  background-color: #fff;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
}

.progress-bar {
  display: flex;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-section {
  height: 100%;
}

.satisfied {
  background-color: #67c23a;
}

.neutral {
  background-color: #909399;
}

.unsatisfied {
  background-color: #f56c6c;
}

.labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  .satisfied {
    background-color: #fff;
    color: #67c23a;
  }

  .neutral {
    color: #909399;
    background-color: #fff;
  }

  .unsatisfied {
    color: #f56c6c;
    background-color: #fff;
  }
}

.label {
  font-size: 14px;
  display: flex;
  align-items: center;
}

.label.voted {
  font-weight: bold;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.button.satisfied {
  background-color: #67c23a;
}

.button.neutral {
  background-color: #909399;
}

.button.unsatisfied {
  background-color: #f56c6c;
}
</style>
