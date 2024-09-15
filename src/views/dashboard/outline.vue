<template>
  <div class="outlineMain">
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <div class="inputBoxMain">
          <!-- 如果是编辑状态 -->
          <template v-if="data.isEdit == 1">
            <input
              ref="input"
              class="editInput"
              size="mini"
              @blur="() => submitEdit(node, data)"
              v-model="newlabel"
            />
            <!-- 放弃、提交按钮废弃，改为失去焦点自动提交 -->
            <!-- <el-button type="text"
              size="mini"
              @click="() => cancelEdit(node,data)">C</el-button>
            <el-button type="text"
              size="mini"
              @click="() => submitEdit(node,data)">S</el-button> -->
          </template>
          <!-- 如果不是编辑状态 -->
          <span v-else v-text="data.label"></span>
        </div>
        <span class="iconRight">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i
              @click="() => edit(node, data)"
              class="el-icon-edit-outline g_poin"
            ></i>
          </el-tooltip>
          <!-- 新增 -->
          <el-tooltip class="item" effect="dark" content="新增" placement="top">
            <i
              @click="() => append(node, data)"
              class="el-icon-circle-plus-outline g_poin"
            ></i>
          </el-tooltip>
          <!-- 删除 -->
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i
              @click="() => remove(node, data)"
              class="el-icon-delete g_poin"
            ></i>
          </el-tooltip>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newlabel: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      data: [
        {
          id: 1,
          label: "第一章",
          content: "请修改标题",

          children: [
            {
              id: 4,
              label: "二级 1-1",
              content: "请修改标题",

              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
              children: [
                {
                  id: 11,
                  label: "三级 3-2-1",
                },
                {
                  id: 12,
                  label: "三级 3-2-2",
                },
                {
                  id: 13,
                  label: "三级 3-2-3",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    allowDrag(draggingNode) {
      // 顶层默认分组不允许拖拽
      if (draggingNode.data.id === 1) {
        return false;
      } else {
        return true;
      }
      // return draggingNode.data.apiGroupName.indexOf('三级 3-2-2') === -1
    },
    updateApiGroup(data) {
      console.log(data);
      // updateApiGroup(1, data)
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    append(node, data) {
      // var pid = data.parentApiGroupId + ':' + data.id
      var timestamp = new Date().getTime();
      const newChild = {
        id: timestamp,
        isEdit: 0,
        apiGroupName: "T" + timestamp,
        children: [],
      };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
      this.updateApiGroup(this.data);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
      this.updateApiGroup(this.data);
    },
    edit(node, data) {
      console.log(
        "before:",
        data.id,
        // data.parentApiGroupId,
        data.label,
        data.isEdit
      );
      this.$set(data, "isEdit", 1);
      this.newlabel = data.label;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
      console.log("after:", data.id, data.label, data.isEdit);
    },

    submitEdit(node, data) {
      // console.log('点击了保存按钮')
      if (data.label == this.newlabel) {
        console.log("没有修改");
        this.newlabel = "";
        this.$set(data, "isEdit", 0);
      } else {
        this.$set(data, "label", this.newlabel);
        this.newlabel = "";
        this.$set(data, "isEdit", 0);
        // console.log('after:', data.id, data.label)
        // console.log(this.data)
        this.updateApiGroup(this.data);
      }
    },
    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
@import "@/styles/variables.scss";

// @import "@/index.scss";
.outlineMain {
  width: 688px;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 32px;
  padding: 16px;
}
.custom-tree-node {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // background: red;
}
.iconRight {
  color: $menuActiveText;
}
.editInput {
  outline: none;
  border: none;
  height: 90%;
  width: 80%;
}
.inputBoxMain {
  // height: 100%;
}
::v-deep .el-tree-node__content {
  height: auto !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
</style>