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
      <div class="sliderLeft" @click="$emit('add-chat')">
        <div class="sliderBtn">
          <i class="el-icon-plus"></i>
        </div>
      </div>
      <div class="sliderRight" @click="delDialog">
        <div class="sliderBtn">
          <i class="el-icon-delete"></i>
        </div>
        <!-- <div class="sliderBtn" @click="$emit('refresh-item')"> -->
        <div class="sliderBtn">
          <i class="el-icon-refresh"></i>
        </div>
      </div>
    </div>
    <div class="sliderItems">
      <!-- 检查 localChatList 是否为空 -->
      <template v-if="localChatList && localChatList.length > 0">
        <div
          v-for="(item, index) in localChatList"
          :key="'dialog' + index"
          class="sliderChat"
          :class="{ selected: selectedIndex === index }"
          @click="selectChat(index, item.id)"
        >
          <i class="el-icon-chat-dot-round"></i>
          <p class="chatP">{{ item?.messages[0]?.content[0]?.text }}</p>
        </div>
      </template>
      <div v-else class="emptyMessage">暂无会话</div>
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
      deep: true,
      handler(newList) {
        // 默认选中最后一个对话
        this.chatList = [...newList];
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
    delDialog() {
      console.log("this.", this.chatList);
      console.log("this.", this.selectedIndex);
      if (
        this.selectedIndex !== null &&
        this.selectedIndex >= 0 &&
        this.selectedIndex < this.chatList.length
      ) {
        // 删除选中的聊天条目
        this.chatList.splice(this.selectedIndex, 1);

        // 更新 localStorage 中的 chatList 数据

        // 触发父组件的 refresh-item 方法
        let _this = this;
        setTimeout(() => {
          localStorage.setItem("chatList", JSON.stringify(_this.chatList));
        }, 300);
        setTimeout(() => {
          _this.$emit("refresh-item");
          console.log("ssssss.", _this.chatList);
        }, 300);

        // // 重置 selectedIndex
        // this.selectedIndex =
        //   this.chatList.length > 0 ? this.chatList.length - 1 : null;

        // // 重新选中新的对话条目，如果有的话
        // if (this.selectedIndex !== null) {
        //   this.$emit(
        //     "select-chat",
        //     this.selectedIndex,
        //     this.chatList[this.selectedIndex].id
        //   );
        // }
      }
    },
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
