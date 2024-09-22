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
            <el-popover
              popper-class="popperTitle"
              placement="top"
              title="添加参考资料"
              width="200"
              trigger="hover"
            >
              <el-input
                size="mini"
                placeholder="请输入内容"
                v-model="data.data1"
                clearable
              >
              </el-input>
              <el-switch
                class="switchMini"
                slot="reference"
                size="mini"
                v-model="data.checked1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-popover>
            <!-- 表 -->

            <el-popover
              popper-class="popperTitle"
              placement="top"
              title="点亮图标,本节插入数据表"
              width="200"
              trigger="hover"
            >
              <el-input
                size="mini"
                placeholder="请输入数据表类型"
                v-model="data.data2"
                clearable
              >
              </el-input>
              <el-switch
                class="switchMini"
                slot="reference"
                size="mini"
                v-model="data.checked2"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-popover>
            <!-- 图 -->
            <el-popover
              popper-class="popperTitle"
              placement="top"
              title="点亮图标,本节插入图"
              width="200"
              trigger="hover"
            >
              <el-input
                size="mini"
                placeholder="请输入图类型"
                v-model="data.data3"
                clearable
              >
              </el-input>
              <el-switch
                class="switchMini"
                slot="reference"
                size="mini"
                v-model="data.checked3"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-popover>
            <!-- 代码 -->
            <el-popover
              popper-class="popperTitle"
              placement="top"
              title="点亮图标,本节插入代码"
              width="200"
              trigger="hover"
            >
              <el-input
                size="mini"
                placeholder="请输入代码类型"
                v-model="data.data4"
                clearable
              >
              </el-input>
              <el-switch
                class="switchMini"
                slot="reference"
                size="mini"
                v-model="data.checked4"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-popover>
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
          <el-button type="primary" @click="submitForm('numberValidateForm')">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>
    <div class="outlineRepeat">
      <p>
        大纲不满意? 重新生成
        <i class="el-icon-refresh"></i>
      </p>
    </div>
    <!-- 付费项选择 -->
    <div class="spendingBox">
      <p>您将获得</p>
      <div class="maintxt">
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>[中文]水稻灰粉病的调查研究</p>
            <p>本科·2万字<span>含无限改稿</span></p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
      </div>
      <div class="att">
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>[文献综述]</p>
            <p>x1</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>[中英文摘要]</p>
            <p>x1</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>[中英文参考文献]</p>
            <p>x1</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
        <div class="borderBox">
          <div class="left">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-wj-zw"></use>
            </svg>
          </div>
          <div class="right">
            <p>[致谢模板]</p>
            <p>x1</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
      </div>
      <p>附加服务</p>
      <div class="adds">
        <!-- <div class="item">
                    <p></p>
                </div> -->
        <el-checkbox-group
          class="addService"
          v-model="checkboxGroup1"
          size="small"
        >
          <el-checkbox label="1" border>
            <div class="cusLabel">
              <p>开题报告</p>
              <div class="price">
                <span>4.9元</span>
                <span>19.9元</span>
              </div>
            </div>
          </el-checkbox>
          <el-checkbox label="2" border>
            <div class="cusLabel">
              <p>任务书</p>
              <div class="price">
                <span>4.9元</span>
                <span>19.9元</span>
              </div>
            </div>
          </el-checkbox>
          <el-checkbox label="3" border>
            <div class="cusLabel">
              <p>CAD三维设计</p>
              <div class="price">
                <span>19.9元</span>
                <span>39.9元</span>
              </div>
            </div>
          </el-checkbox>
          <el-checkbox label="4" border>
            <div class="cusLabel">
              <p>答辩汇报PPT</p>
              <div class="price">
                <span>19.9元</span>
                <span>49.9元</span>
              </div>
            </div>
          </el-checkbox>
          <el-checkbox label="5" border>
            <div class="cusLabel">
              <p>调查问卷</p>
              <div class="price">
                <span>9.9元</span>
                <span>19.9元</span>
              </div>
            </div>
          </el-checkbox>
          <el-checkbox label="6" border>
            <div class="cusLabel">
              <p>“投喂”AI</p>
              <div class="price">
                <span>9.9元</span>
                <span>29.9元</span>
              </div>
            </div>
          </el-checkbox>
          <el-checkbox label="7" border>
            <div class="cusLabel">
              <p>一键降AIGC率</p>
              <div class="price">
                <span>18元</span>
                <span>180元</span>
              </div>
            </div>
          </el-checkbox>
        </el-checkbox-group>
        <p class="tips" @click="reduceAIGC">
          AIGC率知网超25%<span>包退费</span>
        </p>
      </div>
    </div>
    <div class="warningP">
      <el-checkbox v-model="checked">
        我已阅读并同意：平台所生成的全文为范文，仅用作参考，不用作毕业论文、发表刊物等
      </el-checkbox>
    </div>
    <div class="warningP generateSpan">
      <span class="g_poin" @click="generateForm">生成全文</span>
    </div>
    <!-- 付款成功弹窗 -->
    <el-dialog title="确认支付" :visible.sync="payStatus" width="30%">
      <i>支付确认弹窗，暂定会跳转订单页</i>
      <p>TODO：暂未增加跳转</p>

      <p>您是否已成功支付？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消支付</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确定支付</el-button
        >
      </span>
    </el-dialog>
    <!-- 生成全文操作前置声明 -->
    <el-dialog title="提示" :visible.sync="statementDialogVisible" width="30%">
      <span
        >平台所生成的全文为范文，仅用作参考，不用做毕业论文、发表刊物等</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="agreeGenerate"
          >同意并生成全文</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import mitt from "mitt";
import { getToken } from "@/utils/auth"; //
// 方法
import { getOrder } from "@/api/user";
export default {
  data() {
    return {
      newlabel: "",
      checked: false,
      payStatus: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
      numberValidateForm: {
        appendValue: "",
      },
      selectForm: {
        data1: "",
        checked: "",
      },
      data: [
        {
          id: 1,
          level: 1,
          checked1: "",
          data1: "",
          checked2: "",
          data2: "",
          checked3: "",
          data3: "",
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
      checkboxGroup1: [],
      statementDialogVisible: false,
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
    // 生成全文
    generateForm() {
      if (!this.checked) {
        this.statementDialogVisible = true;
      } else {
        const hasToken = getToken();
        if (hasToken) {
          let data = {
            user_id: 1,
            payment_method: "alipay",
            total_amount: 154.75,
            items: [
              {
                product_id: "1",
                quantity: 1,
                price: 149.85,
              },
              {
                product_id: "7",
                quantity: 1,
                price: 4.9,
              },
            ],
          };
          getOrder(data)
            .then((res) => {
              console.log("res", res);
              this.payStatus = true;
              // if(res.)
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消生成",
              });
            });
        }
      }
    },
    agreeGenerate() {
      // 关闭确认弹窗
      this.statementDialogVisible = false;
      // 勾选"我已阅读并同意...."
      this.checked = true;
      // 接下来弹出付款二维码,走付款流程
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
    reduceAIGC() {
      if (this.checkboxGroup1.indexOf("7") != -1) {
        console.log("572---", this.checkboxGroup1);
        let i = this.checkboxGroup1.indexOf("7");
        this.checkboxGroup1.splice(i, 1);
      } else {
        console.log("576---", this.checkboxGroup1);
        this.checkboxGroup1.push("7");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// 引入scss
@import "@/styles/variables.scss";

.switchMini {
  transform: scale(0.7);
}
.popperTitle {
  font-size: 10px;
}
.outlineRepeat {
  text-align: center;
  margin-top: 50px;

  p {
    display: inline-block;
    padding: 0 18px;
    line-height: 34px;
    height: 34px;
    border-radius: 17px;
    font-size: 14px;
    color: #3b82f6;
    border: 1px solid #3b82f6;
  }
}

.spendingBox {
  width: 688px;
  margin: 0 auto;
  padding: 24px 10px 0px 10px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  > p {
    font-size: 18px;
    padding: 0 10px;
  }
  .borderBox {
    border: 1px solid transparent;
    border-radius: 5px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding: 15px 10px;
    margin: 5px 8px;
    .left {
      flex: none;
      svg.icon {
        width: 35px;
        height: 35px;
      }
    }
    .right {
      flex-grow: 1;
      position: relative;
      padding-left: 5px;
      .alignR {
        text-align: right;
        position: absolute;
        right: 0;
        bottom: -8px;
        svg.icon {
          width: 14px;
          height: 14px;
          color: #018417;
        }
      }
      p {
        margin: 0;
        line-height: 1.5em;
      }
      p:first-child {
        padding: 5px 0;
      }
    }
  }
  .att {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  .maintxt .borderBox {
    border-color: #409eff;
    svg.icon {
      color: #409eff;
    }
  }
  .att .borderBox {
    border-color: #01847f;
    font-size: 12px;
    .right p {
      white-space: nowrap;
    }
    svg.icon {
      color: #01847f;
    }
  }
  .adds {
    .addService {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      label.el-checkbox {
        display: flex;
        flex-direction: row-reverse;
        padding: 10px;
        margin: 5px 10px;
        background-image: linear-gradient(45deg, #eef9fe, transparent);
        border: 1px solid #a9d4ff;
        border-radius: 5px;
        align-items: center;
        height: auto;
        justify-content: space-between;
        .cusLabel {
          font-size: 14px;
          p {
            margin: 0px;
            line-height: 1.5em;
            color: #202020;
          }
          .price span:first-child {
            color: #ee6562;
            font-weight: 600;
          }
          .price span:last-child {
            font-size: 12px;
            color: #7e7e7e;
            text-decoration: line-through;
          }
        }
      }
    }
    .tips {
      padding: 0 15px;
      font-size: 10px;
      margin: 0px 0px 5px 0;
      cursor: pointer;
      span {
        color: #ee6562;
      }
    }
  }
}

.warningP {
  width: 688px;
  margin: 0 auto;
  margin-top: 20px;
}

// @import "@/index.scss";
.warningText {
  color: #ffa500;
  font-size: 14px;
}

.generateSpan {
  text-align: center;

  span {
    display: inline-block;
    background: #3b82f6;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    padding: 0 22px;
    color: #fff;
  }
}

.outlineIntro {
  max-width: 688px;
  margin: 0 auto;
  margin-top: 50px;
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
