<template>
  <div class="dropdown" @click="toggleDropdown">
    <div class="workItem">
      <svg class="icon svg-icon" aria-hidden="true">
        <use xlink:href="#icon-OpenAI"></use>
      </svg>
      <span class="selected-model">{{ currentModelName }}</span>
    </div>
    <ul v-if="dropdownOpen" class="dropdown-menu">
      <li
        v-for="(item, index) in model_list"
        :key="'model' + index"
        @click.stop="selectModel(index)"
        :class="{ selected: item.select }"
      >
        {{ item.modelName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    model_list: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      dropdownOpen: false,
    };
  },
  computed: {
    currentModelName() {
      const selected = this.model_list.find((item) => item.select);
      return selected ? selected.modelName : "Select Model";
    },
  },
  watch: {
    value(newVal) {
      this.model_list.forEach(
        (item) => (item.select = item.modelName === newVal)
      );
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    selectModel(index) {
      this.model_list.forEach((item) => (item.select = false));
      this.model_list[index].select = true;
      this.$emit("input", this.model_list[index].modelName);
      this.dropdownOpen = false;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.dropdownOpen = false;
      }
    },
  },
  mounted() {
    this.model_list.forEach((item) => {
      item.select = item.modelName === this.value;
    });
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style>
/* 样式代码保持不变 */
.dropdown {
  position: relative;
  display: inline-block;
  font-family: Arial, sans-serif;
}

.selected-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.3s;
}

.selected-item:hover {
  border-color: #c0c4cc;
}

.icon {
  transition: transform 0.3s;
}

.arrow-up {
  transform: rotate(-180deg);
}

.arrow-down {
  transform: rotate(0deg);
}

.dropdown-menu {
  position: absolute;
  bottom: calc(100% + 4px);
  left: 0;
  width: 260px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dropdown-menu li {
  padding: 10px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-menu li:hover {
  background-color: #f5f7fa;
}

.dropdown-menu li.selected {
  background-color: #f0f0f0;
  color: #409eff;
}
.workItem {
  font-size: 22px;
  position: relative;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.selected-model {
  margin-left: 10px;
  width: 220px;
  font-size: 16px;
  color: #333;
  display: inline-block;
  vertical-align: middle;
  margin-right: 50px;
}
</style>
