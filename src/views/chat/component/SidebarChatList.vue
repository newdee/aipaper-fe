<template>
  <div :class="[leftChatListStatus ? 'sidebarLeft' : 'sidebarLeft0']">
    <el-tooltip class="item" effect="dark" content="收起会话" placement="right">
      <div
        @click="toggleSidebar(false)"
        v-show="leftChatListStatus"
        class="arrowControl"
      >
        <i class="el-icon-arrow-left"></i>
      </div>
    </el-tooltip>

    <el-tooltip class="item" effect="dark" content="打开会话" placement="right">
      <div
        v-show="!leftChatListStatus"
        @click="toggleSidebar(true)"
        class="arrowControl arrowControlRight"
      >
        <i class="el-icon-arrow-right"></i>
      </div>
    </el-tooltip>

    <div class="sliderTitle">
      <div class="sliderLeft" @click="$emit('add-chat-item')">
        <div class="sliderBtn">
          <i class="el-icon-plus"></i>
        </div>
      </div>
      <div class="sliderRight">
        <div class="sliderBtn">
          <i class="el-icon-delete"></i>
        </div>
        <div class="sliderBtn">
          <i class="el-icon-refresh"></i>
        </div>
      </div>
    </div>
    <div class="sliderItems">
      <template v-for="(item, index) in localChatList">
        <div
          :key="'dialog' + index"
          class="sliderChat"
          :class="{ selected: selectedIndex === index }"
          @click="selectChat(index, item.id)"
        >
          <i class="el-icon-chat-dot-round"></i>
          <p class="chatP">{{ item.messages[0].content[0].text }}</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    leftChatListStatus: Boolean,
    localChatList: Array,
  },
  data() {
    return {
      selectedIndex: null,
    };
  },
  watch: {
    localChatList: {
      immediate: true,
      handler(newList) {
        // 默认选中最后一个对话
        if (newList.length > 0) {
          this.selectedIndex = newList.length - 1;
          this.$emit(
            "select-chat",
            this.selectedIndex,
            newList[this.selectedIndex].id
          );
        }
      },
    },
  },
  methods: {
    toggleSidebar(status) {
      this.$emit("update:leftChatListStatus", status);
    },
    selectChat(index, id) {
      this.selectedIndex = index;
      this.$emit("select-chat", index, id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../index.scss";

.sliderChat {
  // 默认样式
}

.sliderChat.selected {
  background-color: #f0f0f0; // 选中样式背景色，可以根据需要调整
}
</style>
