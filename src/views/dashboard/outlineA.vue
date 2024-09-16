<template>
  <div>
    <div class="outlineIntro">
      <p class="introTitle">编辑大纲，生成全文</p>
      <p class="introSubtitle">
        🔔
        大纲可直接<span>点击编辑</span>，点击小节右侧按钮，为小节增加<span>参考资料、数据(表)、图、公式、代码段</span>，对该小节进行<span
          >增加、删减</span
        >
      </p>
    </div>
    <!-- 大纲 -->
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
        :expand-on-click-node="false"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <div class="inputBoxMain">
            <!-- 如果是编辑状态 -->
            <div class="pageSource">
              <span v-if="data.index <= 9"
                >第{{ numberToChinese(data.index) }}章</span
              >
              <span v-else>{{ data.index }}</span>
            </div>
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
            <span
              v-else
              class="showSpan"
              @click="() => edit(node, data)"
              v-text="data.label"
            ></span>
          </div>
          <span class="iconRight">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <i
                @click="() => edit(node, data)"
                class="el-icon-edit-outline g_poin"
              ></i>
            </el-tooltip>
            <!-- 新增 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="新增"
              placement="top"
            >
              <i
                @click="() => appendShow(node, data)"
                class="el-icon-circle-plus-outline g_poin"
              ></i>
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <i
                @click="() => remove(node, data)"
                class="el-icon-delete g_poin"
              ></i>
            </el-tooltip>
          </span>
        </span>
      </el-tree>
      <el-dialog :visible.sync="editStatus" width="40%">
        <div slot="title">
          <p class="dialogTitle">
            <i class="el-icon-folder-add dialogIcon"></i>
            新增章节
          </p>
          <p class="warningText">
            🔔 全文生成效果受章节数和概要内容影响，请谨慎修改
          </p>
        </div>
        <el-form
          :model="numberValidateForm"
          ref="numberValidateForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="请输入章节"
            prop="appendValue"
            :rules="[{ required: true, message: '章节不能为空' }]"
          >
            <el-input
              placeholder="请输入章节"
              v-model="numberValidateForm.appendValue"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="submitForm('numberValidateForm')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mitt from "mitt";

export default {
  data() {
    return {
      newlabel: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      numberValidateForm: {
        appendValue: "",
      },
      data: [
        {
          id: 1,
          level: 1,
          label: "请修改标题",
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
          level: 1,
          label: "请修改标题",
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
          level: 1,
          label: "请修改标题",
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
      editData: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
      editStatus: false,
    };
  },

  created() {
    this.generateIndexes(this.data);
  },
  methods: {
    generateIndexes(nodes, parentIndex = "") {
      let counter = 1;
      nodes.forEach((node) => {
        const index = parentIndex
          ? `${parentIndex}-${counter++}`
          : `${counter++}`;
        this.$set(node, "index", index);
        if (node.children && node.children.length > 0) {
          this.generateIndexes(node.children, index);
        }
      });
    },

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
      this.generateIndexes(this.data);
      // updateApiGroup(1, data)
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    appendShow(node, data) {
      this.editData = data;
      this.editStatus = true;
      this.$nextTick(() => {
        this.$refs.numberValidateForm.resetFields();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.append();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    append(node, data) {
      data = this.editData;
      // var pid = data.parentApiGroupId + ':' + data.id
      var timestamp = new Date().getTime();
      const newChild = {
        id: timestamp,
        isEdit: 0,
        apiGroupName: "T" + timestamp,
        label: this.numberValidateForm.appendValue,
        children: [],
      };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
      this.updateApiGroup(this.data);
      this.$refs.numberValidateForm.resetFields();
      this.editStatus = false;
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
      console.log(node, data, "-----------------");
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
    numberToChinese(num) {
      const chineseDigits = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
      ];
      let result = "";
      num
        .toString()
        .split("")
        .forEach((digit) => {
          result += chineseDigits[parseInt(digit, 10)];
        });
      return result;
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeDialog() {
      this.resetForm();
      this.resetForm("numberValidateForm");
      this.editStatus = false;
    },
    resetForm() {
      this.appendValue = "";
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
@import "@/styles/variables.scss";

// @import "@/index.scss";
.warningText {
  color: #ffa500;
  font-size: 14px;
}
.outlineIntro {
  max-width: 688px;
  margin: 0 auto;
  text-align: center;
  .introTitle {
    font-size: 16px;
    font-weight: bold;
    color: #3b82f6;
  }
  .introSubtitle {
    font-size: 14px;
    line-height: 20px;
    span {
      color: #d75300;
    }
  }
}
.outlineMain {
  max-width: 688px;
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
  &:hover {
    .showSpan {
      width: 80%;
      border: 1px solid #ccc;
    }
  }
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
  width: 100%;
}
::v-deep .el-tree-node__content {
  height: auto !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
.showSpan {
  display: inline-block;
  width: 100%;
}
// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.dialogIcon {
  color: #409eff;
  font-size: 20px;
  margin-right: 5px;
}
.dialogTitle {
  display: flex;
  align-items: center;
  font-weight: bold;
}
.pageSource {
  color: #333639;
  display: inline-block;
  margin-right: 10px;
  font-size: 14px;
  font-weight: bold;
}
</style>
