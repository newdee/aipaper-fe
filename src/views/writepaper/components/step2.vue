<template>
  <div class="step2Box">
    <div id="top" class="outLineTitle">
      <p class="oulineTitlePaper"><span>题目: </span>{{ requestForm.title }}</p>
      <p class="outlineTitleDesc">
        <span>科目: </span>{{ requestForm.field ? requestForm.field[1] : "跳转" }}
      </p>
    </div>
    <!-- 大纲 -->
    <!-- {{ outlineData }} -->
    <div class="outlineMain">
      <p class="tips">拖拽章节,可实现章节排序</p>
      <div class="tipOutline">
        <!-- <el-tooltip class="item" effect="dark" content="重置所有章节" placement="top">
          <el-button size="mini" icon="el-icon-search" circle></el-button>
        </el-tooltip> -->
        <!-- <el-tooltip class="item" effect="dark" content="AI生成" placement="top">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            circle
          ></el-button>
        </el-tooltip> -->
        <el-tooltip class="item" effect="dark" content="添加一级章节" placement="top">
          <el-button size="mini" type="success" @click="addPageOne" icon="el-icon-circle-plus-outline" circle>
          </el-button>
        </el-tooltip>
        <!-- <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button> -->
      </div>

      <el-tree :data="outline" node-key="id" :props="defaultProps" default-expand-all @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter" @node-drag-leave="handleDragLeave" @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd" @node-drop="handleDrop" draggable :expand-on-click-node="false"
        :allow-drop="allowDrop" :allow-drag="allowDrag">
        <div class="slotContentBox" slot-scope="{ node, data }">
          <div class="custom-tree-node">
            <div class="inputBoxMain">
              <!-- 如果是编辑状态 -->
              <div class="pageSource">
                <span v-if="data.index < 99">第{{ numberToChinese(data.index) }}章
                </span>
                <span v-else> {{ data.index }} </span>
              </div>
              <template v-if="data.isEdit == 1">
                <input ref="input" class="editInput" size="mini" @blur="() => submitEdit(node, data)"
                  v-model="newlabel" />

                <!-- 放弃、提交按钮废弃，改为失去焦点自动提交 -->
                <!-- <el-button type="text"
              size="mini"
              @click="() => cancelEdit(node,data)">C</el-button>
            <el-button type="text"
              size="mini"
              @click="() => submitEdit(node,data)">S</el-button> -->
              </template>
              <!-- 如果不是编辑状态 -->
              <span v-else class="showSpan" @click="() => edit(node, data)" v-text="data.title"></span>
            </div>

            <div v-if="data.level >= maxLevel" class="iconRight">
              <div>
                <el-tooltip placement="top" content="插入图表配置">
                  <span @click="showImgF(data)">
                    <i class="el-icon-edit-outline"></i>
                    插入图表
                  </span>
                </el-tooltip>
                <!-- 新增 -->
                <el-tooltip :num="data.index.split('-').length" v-if="data.index.split('-').length < 3" class="item"
                  effect="dark" content="新增下一级" placement="top">
                  <i @click="() => appendShow(node, data)" class="el-icon-circle-plus-outline g_poin"></i>
                  <!-- <i @click="() => appendSections(node, data)" class="el-icon-circle-plus-outline g_poin"></i> -->
                </el-tooltip>
                <el-tooltip :num="data.index.split('-').length" class="item" effect="dark" content="新增同级"
                  placement="top">
                  <i @click="() => appendShowSibling(node, data)" class="el-icon-circle-plus-outline g_poin"
                    style="color:red;"></i>
                  <!-- <i @click="() => appendSections(node, data)" class="el-icon-circle-plus-outline g_poin"></i> -->
                </el-tooltip>
                <!-- 删除 -->
                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                  <i @click="() => remove(node, data)" class="el-icon-delete g_poin"></i>
                </el-tooltip>
              </div>
              <div class="rightbottom">
                <!-- 表 -->
                <i v-show="data.insert_table && data.insert_table.status" class="el-icon-s-marketing"></i>
                <!-- 图 -->
                <i v-show="data.insert_plot && data.insert_plot.status" class="el-icon-picture"></i>
                <!-- 公式 -->
                <i v-show="data.insert_latex_formula &&
                  data.insert_latex_formula.status
                  " class="el-icon-s-flag"></i>
                <!-- 代码 -->
                <i v-show="data.insert_code && data.insert_code.status" class="el-icon-s-management"></i>
              </div>
            </div>
          </div>
          <div v-if="data.summary" class="contentInput">
            <!-- <textarea type="textarea" v-model="data.content"  /> -->
            <textarea-autosize class="ownInput" rows="1" placeholder="Type something here..." ref="myTextarea"
              v-model="data.summary" />
          </div>
        </div>
      </el-tree>
    </div>
    <div @click="textF" class="outlineRepeat g_poin">
      <p>
        大纲不满意? 重新生成
        <i class="el-icon-refresh"></i>
      </p>
    </div>
    <!-- 付费项选择 -->

    <div class="spendingBox">
      <p class="fuTitle">您将获得</p>
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
            <p>[学术创新]</p>
            <p>x1</p>
            <p class="alignR">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-checkmark"></use>
              </svg>
            </p>
          </div>
        </div>
      </div>
      <p class="fuTitle">附加服务</p>
      <div class="adds">
        <!-- <div class="item">
                    <p></p>
                </div> -->
        <el-checkbox-group class="addService" v-model="checkboxGroup1" size="small">
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
    <div class="warningP agreeText">
      <el-checkbox v-model="checked">
        我已阅读并同意：平台所生成的全文为范文，仅用作参考，不用作毕业论文、发表刊物等
      </el-checkbox>
    </div>
    <div class="warningP generateSpan">
      <span class="g_poin" @click="generateForm">生成全文</span>
      <!-- <span class="g_poin" @click="textF">生成全文</span> -->
    </div>

    <!-- 生成全文操作前置声明 -->
    <el-dialog title="提示" :append-to-body="true" :lock-scroll="false" :visible.sync="statementDialogVisible"
      width="30%">
      <span>平台所生成的全文为范文，仅用作参考，不用做毕业论文、发表刊物等</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="agreeGenerate">同意并生成全文</el-button>
      </span>
    </el-dialog>
    <el-dialog :append-to-body="true" :lock-scroll="false" :visible.sync="editStatus" width="40%">
      <div slot="title">
        <p class="dialogTitle">
          <i class="el-icon-folder-add dialogIcon"></i>
          新增章节
        </p>
        <p class="warningText">
          🔔 全文生成效果受章节数和概要内容影响，请谨慎修改
        </p>
      </div>
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="120px" class="demo-ruleForm">
        <el-radio-group v-if="insertSibling" v-model="numberValidateForm.insertPosition">
          <el-radio label="after">本章之后</el-radio>
          <el-radio label="before">本章之前</el-radio>
        </el-radio-group>
        <el-form-item label="请输入章节" prop="appendValue" :rules="[{ required: true, message: '章节不能为空' }]">
          <el-input placeholder="请输入章节" v-model="numberValidateForm.appendValue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请输入章节内容" prop="appendValue">
          <el-input placeholder="请输入章节内容" v-model="numberValidateForm.appendContent" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitForm('numberValidateForm')">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <!-- 插入图表 -->
    <el-dialog :append-to-body="true" :lock-scroll="false" title="插入图表" :visible.sync="imgExcelSetStatus" width="80%"
      label-width="130px">
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="140px" class="demo-ruleForm">
        <el-form-item prop="appendValue">
          <div class="leftLabel" slot="label">
            <el-switch v-model="currentRow.insert_table.status" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
            <span class="labelSpan">插入数据表</span>
          </div>
          <el-input type="textarea" autosize placeholder="请用自然语言描述您要插入数据表的信息" v-model="currentRow.insert_table.content"
            autocomplete="off"></el-input>
        </el-form-item>
        <!-- 插入图 -->
        <el-form-item prop="appendValue">
          <div class="leftLabel" slot="label">
            <el-switch v-model="currentRow.insert_plot.status" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
            <span class="labelSpan">插入图形</span>
          </div>
          <el-input type="textarea" autosize placeholder="请用自然语言描述 图形 的相关信息" v-model="currentRow.insert_plot.content"
            autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="appendValue">
          <div class="leftLabel" slot="label">
            <el-switch
              v-model="currentRow.insert_mermaid.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
            <span class="labelSpan">插入Mermaid图形</span>
          </div>
          <el-input
            type="textarea"
            autosize
            placeholder="请输入图的名称"
            v-model="currentRow.insert_mermaid.content"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->
        <el-form-item prop="appendValue">
          <div class="leftLabel" slot="label">
            <el-switch v-model="currentRow.insert_latex_formula.status" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
            <span class="labelSpan">请用自然语言描述 插入公式</span>
          </div>
          <el-input type="textarea" autosize placeholder="请输入插入公式" v-model="currentRow.insert_latex_formula.content"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="appendValue">
          <div class="leftLabel" slot="label">
            <el-switch v-model="currentRow.insert_code.status" active-color="#13ce66" inactive-color="#ff4949">
            </el-switch>
            <span class="labelSpan">插入代码段</span>
          </div>
          <div class="codeSelectInfo">
            <el-input type="textarea" autosize placeholder="请输入插入代码段" v-model="currentRow.insert_code.content"
              autocomplete="off"></el-input>
            <el-select v-model="currentRow.insert_code.code_language" placeholder="请选择">
              <el-option tag="q1" label="Python" value="Python"> </el-option>
              <el-option tag="q2" label="Java" value="Java"> </el-option>
              <el-option tag="q3" label="JavaScript" value="JavaScript">
              </el-option>
              <el-option tag="q4" label="C++" value="C++"> </el-option>
              <el-option tag="q5" label="C#" value="C#"> </el-option>
              <el-option tag="q5" label="PHP" value="PHP"> </el-option>
              <el-option tag="q5" label="Go" value="Go"> </el-option>
              <el-option tag="q5" label="Dart" value="Dart"> </el-option>
              <el-option tag="Rust" label="Rust" value="Rust"> </el-option>
              <el-option tag="SQL" label="SQL" value="SQL"> </el-option>
              <el-option tag="LaTeX" label="LaTeX" value="LaTeX"> </el-option>
              <el-option tag="Markdown" label="Markdown" value="Markdown">
              </el-option>
              <el-option tag="Swift" label="Swift" value="Swift"> </el-option>
              <el-option tag="Ruby" label="Ruby" value="Ruby"> </el-option>
              <el-option tag="Erlang" label="Erlang" value="Erlang">
              </el-option>
              <el-option tag="Erlang" label="Erlang" value="Erlang">
              </el-option>
              <el-option tag="Perl" label="Perl" value="Perl"> </el-option>
              <el-option tag="Kotlin" label="Kotlin" value="Kotlin">
              </el-option>
              <el-option tag="Swift" label="Swift" value="Swift"> </el-option>
            </el-select>
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFDialog">取 消</el-button>
        <el-button type="primary" @click="closeFDialog"> 确 定 </el-button>
      </span>
    </el-dialog>
    <!--  -->
    <order-dialog :requestKey="requestKey" :payStatus="payStatus"></order-dialog>
  </div>
</template>

<script>
import mitt from "mitt";
import { getToken } from "@/utils/auth"; //
import { mapGetters } from "vuex";
// 方法
import { getOrder, orderDetailById } from "@/api/user";
import polling from "@/utils/get-order-detail.js";
import orderDialog from "./orderDialog.vue";

import { title } from "@/settings";
export default {
  name: "step2",
  data() {
    return {
      title: "艺术批评的时间作用及发展历程",
      descri: "1201 艺术学理论类",
      newlabel: "",
      checked: false,
      payStatus: false,
      defaultProps: {
        children: "sections",
        label: "title",
      },
      numberValidateForm: {
        appendValue: "",
        appendContent: "",
      },
      selectForm: {
        data1: "",
        checked: "",
      },
      outline: [
        {
          chapter_num: "第一章",
          title: "引言",
          sections: [
            {
              title: "研究背景与意义",
              num: "1.1",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: {
                status: false,
                content: "",
              },
              insert_table: {
                status: false,
                content: "",
              },
              insert_plot: {
                status: false,
                content: "",
              },
            },
            {
              title: "本研究的主要贡献和创新点",
              num: "1.2",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: {
                status: false,
                content: "",
              },
              insert_table: {
                status: false,
                content: "",
              },
              insert_plot: {
                status: false,
                content: "",
              },
            },
          ],
        },
        {
          chapter_num: "第二章",
          title: "文献综述",
          sections: [
            {
              title: "研究理论基础",
              num: "2.1",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: {
                status: false,
                content: "",
              },
              insert_table: {
                status: false,
                content: "",
              },
              insert_plot: {
                status: false,
                content: "",
              },
            },
            {
              title: "研究现状",
              num: "2.2",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: {
                status: false,
                content: "",
              },
              insert_table: {
                status: false,
                content: "",
              },
              insert_plot: {
                status: false,
                content: "",
              },
            },
            {
              title: "本研究的创新点",
              num: "2.3",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: {
                status: false,
                content: "",
              },
              insert_table: {
                status: false,
                content: "",
              },
              insert_plot: {
                status: false,
                content: "",
              },
            },
          ],
        },
        {
          chapter_num: "第三章",
          title: "xxx的研究方法",
          sections: [
            {
              title: "xxx技术说明",
              num: "3.1",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多",
              insert_code: {
                status: false,
                content: "",
              },
              insert_table: {
                status: false,
                content: "",
              },
              insert_plot: {
                status: false,
                content: "",
              },
            },
            {
              title:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多方法说明",
              num: "3.2",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: ["公式1"],
              insert_table: {
                status: false,
                content: "",
              },
              insert_plot: {
                status: false,
                content: "",
              },
            },
            {
              title: "本研究的方法设计",
              num: "3.3",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: ["公式1", "公式2"],
              insert_table: {
                status: false,
                content: "",
              },
              insert_plot: {
                status: false,
                content: "",
              },
            },
          ],
        },
        {
          chapter_num: "第四章",
          title: "xxx结果分析",
          sections: [
            {
              title: "xxx的分析",
              num: "4.1",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: {
                status: false,
                content: "",
              },
              insert_table: {
                status: false,
                content: "xxx分析表格1",
              },
              insert_plot: {
                status: false,
                content: "xxx分析图表1",
              },
            },
            {
              title: "xxx的分析",
              num: "4.2",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , ",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: {
                status: false,
                content: "",
              },
              insert_table: {
                status: true,
                content: ["xxx分析表格1", "xxx分析表格2"],
              },
              insert_plot: {
                status: false,
                content: ["xxx分析表格1", "xxx分析表格2"],
              },
            },
            {
              title: "结果分析",
              num: "4.3",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , ",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: {
                status: false,
                content: "",
              },
              insert_table: {
                status: false,
                content: ["xxx分析表格1", "xxx分析表格2"],
              },
              insert_plot: {
                status: false,
                content: "xxx分析图表1",
              },
            },
          ],
        },
        {
          chapter_num: "第五章",
          title: "讨论与结论",
          sections: [
            {
              title: "讨论",
              num: "5.1",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , ",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: {
                status: false,
                content: "",
              },
              insert_table: {
                status: false,
                content: "",
              },
              insert_plot: {
                status: false,
                content: "",
              },
            },
            {
              title: "结论",
              num: "5.2",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , ",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: {
                status: false,
                content: "",
              },
              insert_table: {
                status: false,
                content: "",
              },
              insert_plot: {
                status: false,
                content: "",
              },
            },
          ],
        },
        {
          chapter_num: "第六章",
          title: "研究局限与未来展望",
          sections: [
            {
              title: "研究局限",
              num: "6.1",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , ",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: {
                status: false,
                content: "",
              },
              insert_table: {
                status: false,
                content: "",
              },
              insert_plot: {
                status: false,
                content: "",
              },
            },
            {
              title: "未来研究方向提出展望",
              num: "6.2",
              summary:
                "正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , 正文内容 , 数据很多正文内容 , 数据很多正文内容 , 数据很多正文内容 , ",
              insert_code: {
                status: false,
                content: "",
              },
              insert_mermaid: {
                status: false,
                content: "",
              },
              insert_latex_formula: {
                status: false,
                content: "",
              },
              insert_table: {
                status: false,
                content: "",
              },
              insert_plot: {
                status: false,
                content: "",
              },
            },
          ],
        },
      ],
      timestamp: null,
      requestKey: "",
      paperPercentage: 0,
      imgExcelSetStatus: false,

      editData: {}, // 被选中的节点的数据
      editParentData: {}, // 被选中节点的父节点
      editStatus: false,
      checkboxGroup1: [],
      statementDialogVisible: false,
      currentRow: {
        insert_code: {
          status: false,
          content: "",
        },
        insert_mermaid: {
          status: false,
          content: "",
        },
        insert_latex_formula: {
          status: false,
          content: "",
        },
        insert_table: {
          status: false,
          content: "",
        },
        insert_plot: {
          status: false,
          content: "",
        },
      },
      idCount: 1,
      // 计算当前是几级大纲
      maxLevel: 2,
      out_trade_no: "",
      insertSibling: false, // true:插入到同级 false:插入到下一级
    };
  },
  props: {
    outlineData: {
      type: Array,
      require: true,
    },
  },
  watch: {
    outlineData: {
      deep: true,
      immediate: true,
      handler(val) {
        // this.outline = val;
        // this.generateIndexes(this.outline);
      },
    },
  },
  components: {
    orderDialog,
  },
  created() {
    this.generateIndexes(this.outline);

    console.log(this.outline, "outline");
  },

  computed: {
    // 计算属性
    ...mapGetters(["requestForm"]),
  },
  methods: {
    showImgF(item) {
      console.log("item", item);
      this.imgExcelSetStatus = true;
      this.currentRow = item;
    },
    addPageOne() {
      this.outline.push({
        id: new Date().getTime(),
        level: 1,
        title: "请修改标题",
        sections: [
          {
            id: new Date().getTime() - 100,
            title: "请修改标题",
            content: "请修改标题",
            level: 2,
            insert_code: {
              status: false,
              content: "",
            },
            insert_mermaid: {
              status: false,
              content: "",
            },
            insert_latex_formula: {
              status: false,
              content: "",
            },
            insert_table: {
              status: false,
              content: "",
            },
            insert_plot: {
              status: false,
              content: "",
            },
          },
        ],
      });
      this.generateIndexes(this.outline);
    },
    generateIndexes(nodes, parentIndex = "", level = 1) {
      let counter = 1;
      nodes.forEach((node) => {
        const index = parentIndex
          ? `${parentIndex}-${counter++}`
          : `${counter++}`;
        this.$set(node, "index", index);
        // 设置 level 属性
        this.$set(node, "level", level);
        if (!node.id) {
          const uniqueId = "node" + this.idCount++;
          this.$set(node, "id", uniqueId);
        }
        // if (level > this.maxLevel) {
        //   this.maxLevel = level;
        // }
        if (node.sections && node.sections.length > 0) {
          this.generateIndexes(node.sections, index, level + 1);
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
      console.log('1014---当前大纲对象:', data);
      this.generateIndexes(this.outline);
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
      if (this.numberValidateForm.hasOwnProperty('insertPosition')) {
        delete this.numberValidateForm.insertPosition
      }
      this.insertSibling = false;
      this.editStatus = true;
      this.$nextTick(() => {
        this.$refs.numberValidateForm.resetFields();
      });
    },
    appendShowSibling(node, data) {
      console.log('1030---node和data:', node, data);
      this.editData = data;
      this.editParentData = node.parent.data;
      console.log('1039---node.parent:', this.editParentData);
      this.editStatus = true;
      this.$set(this.numberValidateForm, 'insertPosition', 'after');
      this.insertSibling = true;
      this.$nextTick(() => {
        this.$refs.numberValidateForm.resetFields();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          if (this.insertSibling) {
            this.appendSibling();
          } else {
            this.appendSections();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    appendSections(node, data) {
      data = this.editData;
      // var pid = data.parentApiGroupId + ':' + data.id
      var timestamp = new Date().getTime();
      const newChild = {
        id: timestamp,
        isEdit: 0,
        apiGroupName: "T" + timestamp,
        title: this.numberValidateForm.appendValue,
        summary: this.numberValidateForm.appendContent
          ? this.numberValidateForm.appendContent
          : "章节内容",
        insert_code: {
          status: false,
          content: "",
        },
        insert_mermaid: {
          status: false,
          content: "",
        },
        insert_latex_formula: {
          status: false,
          content: "",
        },
        insert_table: {
          status: false,
          content: "",
        },
        insert_plot: {
          status: false,
          content: "",
        },
        sections: [],
      };
      if (!data.sections) {
        this.$set(data, "sections", []);
      }
      data.sections.push(newChild);
      this.updateApiGroup(this.outline);
      this.$refs.numberValidateForm.resetFields();
      this.editStatus = false;
    },
    appendSibling(parentNodeData, data) {
      data = this.editData;
      parentNodeData = this.editParentData;
      console.log("1103---插入同级,parentNode:", parentNodeData);
      var timestamp = new Date().getTime();
      const newChild = {
        id: timestamp,
        isEdit: 0,
        apiGroupName: "T" + timestamp,
        title: this.numberValidateForm.appendValue,
        summary: this.numberValidateForm.appendContent
          ? this.numberValidateForm.appendContent
          : "章节内容",
        insert_code: {
          status: false,
          content: "",
        },
        insert_mermaid: {
          status: false,
          content: "",
        },
        insert_latex_formula: {
          status: false,
          content: "",
        },
        insert_table: {
          status: false,
          content: "",
        },
        insert_plot: {
          status: false,
          content: "",
        },
        sections: [],
      };
      if (!parentNodeData.hasOwnProperty('sections')) {
        this.$set(parentNodeData, "sections", []);
      }
      console.log('1141----parentNode.sections:', parentNodeData.sections);

      if (this.numberValidateForm.insertPosition == 'after') {
        const targetIndex = parentNodeData.sections.findIndex(item => item.index === data.index);
        if (targetIndex !== -1) {
          parentNodeData.sections.splice(targetIndex + 1, 0, newChild);
        }
      } else if (this.numberValidateForm.insertPosition == 'before') {
        const targetIndex = parentNodeData.sections.findIndex(item => item.index === data.index);
        if (targetIndex !== -1) {
          parentNodeData.sections.splice(targetIndex, 0, newChild);
        }
      }
      // parentNodeData.sections.push(newChild);
      this.updateApiGroup(this.outline);
      this.$refs.numberValidateForm.resetFields();
      this.editStatus = false;
    },

    remove(node, data) {
      const parent = node.parent;
      const sections = parent.data.sections || parent.data;
      const index = sections.findIndex((d) => d.id === data.id);
      sections.splice(index, 1);
      this.updateApiGroup(this.outline);
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
        // console.log(this.outline)
        this.updateApiGroup(this.outline);
      }
    },
    textF() {
      this.statementDialogVisible = true;
    },

    // 生成全文
    generateForm() {
      if (!this.checked) {
        this.statementDialogVisible = true;
      } else {
        this.payStatus = false;
        const hasToken = getToken();
        if (hasToken) {
          let data = {
            user_id: 1,
            payment_method: "alipay",
            total_amount: 154.75,
            key: this.requestForm.key,
            // key: "eb3a2422-301c-47ba-be1f-7c334e15c655",
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
          // this.getDetail(34);
          getOrder(data)
            .then((res) => {
              console.log("res", res);
              console.log("res", res);
              this.payStatus = true;
              let payUrl = res.result.pay_link;
              console.log("payUrl", payUrl);
              // TODO: 去除固定key
              this.requestKey = res.result.out_trade_no;
              // this.requestKey = "5e0c2e41-e865-4269-a02d-fb0b919cd822";
              // this.requestKey = "15b41aa3-ec35-45e9-ac6b-bfe3b7ba3d8d";
              if (payUrl) {
                window.open(payUrl, "_blank");
              }
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
      console.log("drag start");
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
      this.generateIndexes(this.outline);
    },
    allowDrop(draggingNode, dropNode, type) {
      return true;
    },
    numberToChinese(num) {
      const chineseNums = [
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
      ];
      const units = ["", "十", "百", "千", "万", "十", "百", "千", "亿"];

      let result = "";
      let strNum = num.toString();
      let len = strNum.length;

      for (let i = 0; i < len; i++) {
        let digit = parseInt(strNum[i]);
        if (digit !== 0) {
          result += chineseNums[digit] + units[len - i - 1];
        } else if (result && result[result.length - 1] !== "零") {
          result += chineseNums[digit];
        }
      }

      // 处理特殊情况，如“一百零一”而不是“一百一”
      result = result.replace(/零+/g, "零");
      result = result.replace(/零([十百千])/, "$1");

      // 去掉末尾的零
      result = result.replace(/零+$/, "");

      // 特殊处理“十”和“十一”
      if (result === "十") {
        result = "十";
      } else if (result.startsWith("一十")) {
        result = result.replace("一十", "十");
      }

      return result;
    },
    allowDrag(draggingNode) {
      console.log(draggingNode.data);
      return draggingNode.data.title.indexOf("hahah") === -1;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    closeDialog() {
      this.resetForm();
      this.resetForm("numberValidateForm");
      this.editStatus = false;
    },
    closeFDialog() {
      this.numberValidateForm = false;
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

.popperTitle {
  font-size: 10px;
}

.outlineRepeat {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 64px;

  p {
    display: inline-block;
    padding: 0 18px;
    line-height: 34px;
    height: 34px;
    border-radius: 17px;
    font-size: 14px;
    color: #d4a11c;
    border: 1px solid #d4a11c;
  }
}

.spendingBox {
  max-width: 688px;
  width: 100%;
  margin: 0 auto;
  padding: 0px 10px 10px 10px;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  >p {
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .maintxt .borderBox {
    border-color: #d4a11c;

    svg.icon {
      color: #d4a11c;
    }
  }

  .att .borderBox {
    width: 150px;
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
      display: flex;
      flex-wrap: wrap;

      label.el-checkbox {
        width: 150px;
        display: flex;
        flex-direction: row-reverse;
        padding: 10px;
        margin: 5px 8px;
        background-image: linear-gradient(45deg,
            rgb(252, 243, 205),
            transparent);
        border: 1px solid #d4a11c;
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
  max-width: 688px;
  margin: 0 auto;
  margin-top: 20px;
}

.agreeText {
  white-space: nowrap;
  /* 防止文字换行 */
  overflow: hidden;
  /* 隐藏超出的内容 */
  text-overflow: ellipsis;
}

// @import "@/index.scss";
.warningText {
  color: #ffa500;
  font-size: 14px;
  margin-top: 20px;
}

.generateSpan {
  text-align: center;
  padding-bottom: 60px;

  span {
    display: inline-block;
    background: #d4a11c;
    height: 40px;
    width: 160px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 15px;
    font-weight: bold;
    padding: 0 22px;
    color: #fff;
  }
}

.outlineIntro {
  padding-top: 50px;
  max-width: 688px;
  margin: 0 auto;
  text-align: center;

  .introTitle {
    font-size: 16px;
    font-weight: bold;
    color: #d4a11c;
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
  max-width: 860px;
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

.tipOutline {
  text-align: right;
  margin-bottom: 10px;
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
      border: 1px solid #3355fe;
    }
  }
}

.iconRight {
  color: $menuActiveText;
  position: absolute;
  top: 10px;
  font-size: 14px;
  height: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px;
  padding-top: 3px;
  padding-bottom: 20px;

  &>div {
    background-color: #fff;
  }
}

.oulineTitlePaper {
  font-size: 20px;
  color: #000;
  margin: 20px 0;
  margin-top: 30px;
  text-align: center;
  font-weight: bold;
}

:deep(.el-tree-node__content) {
  align-items: flex-start !important;
}

:deep(.el-tree-node__expand-icon.expanded) {
  position: relative;
  top: 8px;
}

.codeSelectInfo {
  display: flex;

  :deep(.el-input__inner) {
    height: 30px;
  }

  .el-input__inner {
    height: 30px;
  }

  ::deep .el-input__inner {
    height: 30px;
  }
}

.outlineTitleDesc {
  text-align: center;
  font-weight: bold;
  font-size: 16px;
}

.editInput {
  outline: none;
  border: none;
  height: 28px;
  width: 80%;
  font-weight: bold;
  font-size: 14px;
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
  font-size: 14px;
  font-weight: bold;
  color: #333639;
  height: 28px;
  line-height: 28px;
  font-weight: bold;
  padding-left: 5px;
  border-radius: 5px;
}

// 媒体查询
// @media only screen and (max-width: 939px) {
// }
.dialogIcon {
  color: #d4a11c;
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

.step2Box {
  max-width: 1200px;
  padding-top: 60px;
  background-color: #fff;
  margin-top: 16px;
  border-radius: 12px;
}

.slotContentBox {
  font-size: 14px;
  font-weight: bold;
  position: relative;
  width: 100%;
  color: #333639;
}

.ownInput {
  border: none;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  margin: 5px;
  margin-top: -5px;
  max-width: 500px;
  // padding-top: 10px;
  padding: 10px;

  // padding-top: 0px;
  // padding-bottom: 20px;
  &:hover {
    border: 1px solid #3355fe;
  }

  &:focus {
    border: 1px solid #3355fe;
  }

  &:active {
    border: 1px solid #3355fe;
  }

  &:focus {
    border-color: #3355fe;
    box-shadow: 0 0 5px #3355fe;
    outline: none;
  }
}

.fuTitle {
  font-size: 18xp;
  font-weight: bold;
  margin: 32px 0;
  color: #1f2937;
}

.rightbottom {
  color: #3355fe;
  font-size: 18px;
}

.labelSpan {
  font-family: PingFangSC, PingFang SC;
  margin-left: 16px;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 20px;
  text-align: left;
}

.leftLabel {
  display: flex;
  align-items: center;
  height: 32px;
}
</style>
