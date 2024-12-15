<template>
  <div class="chatMain">
    <div
      v-if="false"
      :class="[leftChatListStatus ? 'sidebarLeft' : 'sidebarLeft0']"
    >
      <el-tooltip
        class="item"
        effect="dark"
        content="收起会话"
        placement="right"
      >
        <div
          @click="leftChatListStatus = false"
          v-show="leftChatListStatus"
          class="arrowControl"
        >
          <i class="el-icon-arrow-left"></i>
        </div>
      </el-tooltip>

      <el-tooltip
        class="item"
        effect="dark"
        content="打开会话"
        placement="right"
      >
        <div
          v-show="!leftChatListStatus"
          @click="leftChatListStatus = true"
          class="arrowControl arrowControlRight"
        >
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-tooltip>

      <div class="sliderTitle">
        <div class="sliderLeft" @click="addChatItem">
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
        <!-- <div
          :class="[
            activeIndex == index ? 'sliderChat activeSilder' : 'sliderChat',
          ]"
        >
          <i class="el-icon-chat-dot-round"></i>
          <p>你好</p>
        </div> -->
        <div class="sliderChat">
          <i class="el-icon-chat-dot-round"></i>
          <p>你好</p>
        </div>
        <div class="sliderChat">
          <i class="el-icon-chat-dot-round"></i>
          <p>你好</p>
        </div>
      </div>
    </div>
    <div class="chat-container">
      <!-- <div class="navChat">
      <el-button>清屏</el-button>
    </div> -->
      <div v-show="chatMessages.length <= 0" class="defaultText">
        <p>
          <span><img src="@/assets/images/logoMax.png" alt="" /></span>
          万象AI, 您的私人助手!
        </p>
      </div>
      <div class="chat-messages">
        <div
          :class="['messageBox', msg.role]"
          v-for="(msg, index) in chatMessages"
          :key="index"
        >
          <div class="userInfo">
            <img v-if="msg.role === 'user'" :src="avatar" alt="" />
            <img
              v-if="msg.role === 'assistant'"
              :src="logoMax"
              alt=""
              class="logoMax"
            />
          </div>
          <div :class="['message', msg.type]">
            <!-- 问 user -->
            <template v-if="msg.role == 'user'">
              <div
                v-for="(item, index) in msg.content"
                :key="'wen' + index"
                class="userTitle infoList"
              >
                <div v-if="item.type == 'text'" class="textBox">
                  {{ item.text }}
                </div>
                <div v-if="item.type == 'image_url'" class="imgBox">
                  <img :src="item.image_url.url" alt="" />
                </div>
              </div>
            </template>
            <!-- 答 user -->
            <template v-if="msg.role == 'assistant'">
              <div
                v-for="(item, index) in msg.content"
                :key="'wen' + index"
                class="answerTitle infoList"
              >
                <div class="textBox">
                  <div v-html="renderMarkdown(item.text)"></div>
                </div>
              </div>
            </template>
            <!-- <div v-html="renderMarkdown(msg.content.text)"></div> -->
            <!-- <div v-if="msg.type === 'assistant'" class="responseBottom">
                <div></div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="重新生成"
                  placement="top"
                >
                  <el-button
                    size="mini"
                    circle
                    @click="regenerateResponse(index - 1)"
                    class="reload-icon"
                  >
                    <svg class="icon svg-icon" aria-hidden="true">
                      <use xlink:href="#icon-reload"></use>
                    </svg>
                  </el-button>
                </el-tooltip>
              </div> -->
          </div>
          <button
            v-if="msg.type === 'user'"
            @click="openEditDialog(index)"
            class="edit-icon"
          >
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#icon-edit"></use>
            </svg>
          </button>
        </div>
      </div>
      <div class="chatBottom GH">
        <div class="chatBottomHeader">
          <el-tooltip
            class="item"
            effect="dark"
            content="切换模型"
            placement="top"
          >
            <module-select v-model="modelName"></module-select>
            <!-- <el-dropdown>
              <div class="workItem">
                <svg class="icon svg-icon" aria-hidden="true">
                  <use xlink:href="#icon-OpenAI"></use>
                </svg>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in model_list"
                  :key="'model' + index"
                >
                  {{ item.modelName }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="上传图片"
            placement="top"
          >
            <div class="workItem upload-button">
              <input
                class="file-input"
                ref="fileInput"
                type="file"
                @change="onFileChange"
                accept="image/*"
              />
              <i class="el-icon-picture-outline-round"></i>
            </div>
          </el-tooltip>

          <!-- <el-tooltip
            class="item"
            effect="dark"
            content="上传文件"
            placement="top"
          >
            <div class="workItem" @click="getFile">
              <i class="el-icon-paperclip"></i>
            </div>
          </el-tooltip> -->
          <!-- <div class="workItem">
            <el-tooltip
              class="item"
              effect="dark"
              content="新建对话"
              placement="top"
            >
              <i class="el-icon-circle-plus-outline"></i>
            </el-tooltip>
          </div> -->
        </div>

        <div class="chatBoxInput">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入您的问题"
            v-model="inputMessage"
            @keydown.native="handleKeydown"
          >
          </el-input>
          <!-- <button @click="sendMessage">
          <i class="el-icon-search"></i>
        </button> -->
        </div>
        <div class="tipBottom">
          <div class="bottomLeft">
            <p>
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-feiji"></use>
              </svg>
              <span class="tipText">Ctrl + Enter</span>
            </p>
            <p>
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-huiche"></use>
              </svg>
              <span class="tipText">Enter</span>
            </p>
          </div>
          <div class="bottomRight">
            <el-button
              icon="el-icon-s-promotion"
              type="primary "
              @click="establishConnection"
              >发送</el-button
            >
          </div>
        </div>
        <div v-if="imgBoxList.length > 0" class="fileBottom">
          <!-- <img :src="base64Image" alt="Uploaded Image" /> -->
          <div
            v-for="(item, index) in imgBoxList"
            :key="'file' + index"
            class="fileBox"
          >
            <div class="delImgBtn red" @click="resetImgList">
              <i class="el-icon-delete"></i>
            </div>
            <img :src="item.image_url.url" alt="" />
          </div>
        </div>
      </div>
      <el-dialog title="编辑消息" :visible.sync="dialogVisible" width="30%">
        <el-input type="textarea" v-model="editMessageText" rows="5"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmEdit">确认</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getToken } from "@/utils/auth";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // 确保路径和样式名称正确
import { mapGetters } from "vuex";
import moduleSelect from "./component/moduleSelect.vue";
export default {
  components: {
    moduleSelect,
  },
  data() {
    return {
      leftChatListStatus: false,
      inputMessage: "",
      textarea: "",
      chatMessages: [],
      model_list: [
        {
          modelName: "claude-3-5",
          select: false,
        },
        {
          modelName: "gpt-4o-all",
          select: false,
        },
        {
          modelName: "gpt-4o-mini",
          select: true,
        },
        {
          modelName: "o1-mini",
          select: false,
        },
      ],
      temperature: 0.5,
      token: getToken(),
      sseSource: null,
      activeIndex: 0,
      reconnectInterval: 5000,
      dialogVisible: false,
      editMessageIndex: null,
      editMessageText: "",
      logoMax: require("@/assets/images/logoMax.png"),
      chatBaseApi: "",
      localChatList: [],
      modelName: "gpt-4o-mini",
      imgBoxList: [], // 上传图片列表
      currentChatData: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "你好",
            },
            {
              type: "image_url",
              image_url: {
                url: "",
              },
            },
          ],
        },
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: "你好！有什么我可以帮助你的吗？",
            },
          ],
        },
      ],
      base64Image: "",
      chatId: "",
    };
  },
  created() {
    this.chatBaseApi = process.env.VUE_APP_CHAT_BASE_API;
    this.chatId = this.generateUniqueId();
    console.log("Chat API Base URL:", process.env.VUE_APP_CHAT_BASE_API);
    this.localChatList = JSON.parse(localStorage.getItem("chatList"));
    console.log("this.localChatList", this.localChatList);
  },
  mounted() {
    this.getChatInfo();
    // this.establishConnection();
    this.addCopyAndToggleListeners();
  },
  updated() {
    this.scrollToBottom();
  },
  computed: {
    // 计算属性
    ...mapGetters(["avatar"]),
  },
  methods: {
    resetImgList() {
      this.imgBoxList = [];
    },
    generateUniqueId() {
      const timestamp = Date.now().toString(36); // 基于当前时间的时间戳
      const randomNum = Math.random().toString(36).substr(2, 9); // 随机数
      return `id_${timestamp}_${randomNum}`;
    },
    addChatItem() {
      this.leftChatListStatus = !this.leftChatListStatus;
    },
    getFile() {
      console.log("chatMessages", this.chatMessages);
      this.leftChatListStatus = !this.leftChatListStatus;
    },
    onFileChange(event) {
      if (this.imgBoxList.length >= 1) {
        this.$message({
          type: "warning",
          message: "暂支持单图片上传",
        });
        return false;
      }
      const file = event.target.files[0]; // 获取用户选择的文件
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file); // 将文件读取为Data URL
        reader.onload = () => {
          let data = {
            type: "image_url",
            image_url: {
              url: reader.result,
            },
          };
          this.imgBoxList.push(data);
        };

        reader.onerror = (error) => {
          console.error("Error reading file: ", error);
        };
      }
    },
    handleKeydown(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        // Enter key pressed without Shift
        e.preventDefault(); // Prevents the default behavior (inserting a new line)

        this.establishConnection(); // Call the function to perform the search
      }
    },
    getChatInfo() {
      const url = `${this.chatBaseApi}chatAllInfo?token=${encodeURIComponent(
        this.token
      )}`;
      axios.get(url, { token: this.token }).then((response) => {
        console.log(response, "sssreposne");
        this.model_list = response.data.result.model_list;
        this.temperature = response.data.result.temperature;
      });
    },
    renderMarkdown(text) {
      const renderer = new marked.Renderer();

      renderer.code = (code, language) => {
        const validLanguage = hljs.getLanguage(language)
          ? language
          : "plaintext";
        const highlighted = hljs.highlight(validLanguage, code).value;

        return `
      <div class="code-block">
        <div class="code-header">
          <span class="language-label">${language.toUpperCase()}</span>
          <div class="code-buttons">
            <button class="toggle-btn">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-expend"></use>
              </svg></button>
            <button class="copy-btn">⧉</button>
          </div>
        </div>
        <pre><code class="language-${validLanguage}">${highlighted}</code></pre>
      </div>
    `;
      };

      marked.setOptions({
        renderer,
        highlight: (code, lang) => {
          const validLanguage = hljs.getLanguage(lang) ? lang : "plaintext";
          return hljs.highlight(validLanguage, code).value;
        },
        gfm: true,
        langPrefix: "language-",
        mangle: false,
      });

      return marked.parse(text);
    },
    setLocal() {
      let data = {
        model: this.modelName,
        stream: true,
        temperature: this.temperature,
        top_p: 1,
        id: this.chatId,
        messages: [],
      };
      data.messages = this.currentChatData;

      if (this.localChatList.length < 1) {
        // 如果列表为空，则直接添加
        this.localChatList.push(data);
      } else {
        // 查找与当前 chatId 匹配的索引
        let index = this.localChatList.findIndex(
          (item) => item.id === this.chatId
        );

        if (index !== -1) {
          // 如果找到了匹配的项，用 data 替换原来的项
          this.localChatList[index] = data;
        } else {
          // 如果没有找到匹配的项，将 data 添加到数组中
          this.localChatList.push(data);
        }
      }

      // 更新 localStorage
      localStorage.setItem("chatList", JSON.stringify(this.localChatList));
    },
    establishConnection() {
      if (!this.inputMessage.trim()) {
        return false;
      }
      const url = `${this.chatBaseApi}createSse?token=${encodeURIComponent(
        this.token
      )}`;

      this.sseSource = new EventSource(url);

      let currentMessage = "";

      this.sseSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
          currentMessage = "";
          // 存储数据
          this.setLocal();
          // alert("结束了");
        } else {
          // 添加一个基本的 JSON 检查
          if (
            event.data.trim().startsWith("{") &&
            event.data.trim().endsWith("}")
          ) {
            try {
              const parsedData = JSON.parse(event.data);
              if (parsedData.content) {
                currentMessage += parsedData.content;
                console.log("....", currentMessage);
                // 存储结构
                let content = [
                  {
                    type: "text",
                    text: currentMessage,
                  },
                ];
                if (
                  this.chatMessages.length &&
                  this.chatMessages[this.chatMessages.length - 1].role ===
                    "assistant"
                ) {
                  this.chatMessages[this.chatMessages.length - 1].content =
                    content;
                } else {
                  this.chatMessages.push({
                    content: content,
                    role: "assistant",
                  });
                }
              }
            } catch (error) {
              console.error(
                "Error parsing SSE data:",
                error,
                "Data:",
                event.data
              );
            }
          } else {
            console.warn("Received non-JSON data:", event.data);
          }
        }
      };
      // 判断 SSE 连接是否成功建立
      this.sseSource.onopen = () => {
        console.log("SSE connection established.");
        // 你可以在这里执行其他初始化逻辑
        if (!this.inputMessage.trim()) {
          return false;
        }
        this.sendMessage();
      };
      this.sseSource.onerror = () => {
        // console.error("SSE Error: attempting to reconnect");
        // this.sseSource.close();
        // setTimeout(this.establishConnection, this.reconnectInterval);
      };
    },
    // 发送消息 组装信息
    setChatData() {
      let data = {
        role: "user",
        content: [],
      };
      if (!!this.inputMessage) {
        data.content.push({
          type: "text",
          text: this.inputMessage,
        });
      }
      if (this.imgBoxList.length > 0) {
        this.imgBoxList.forEach((item) => {
          data.content.push(item);
        });
      }
      this.chatMessages.push(data);
    },
    sendMessage() {
      zhuge.track(`GPT页面用户使用`, {});

      const url = `${this.chatBaseApi}chat?token=${encodeURIComponent(
        this.token
      )}`;
      let data = {
        msg: this.inputMessage, // 用户输入的信息，如果是上传文件，需要根据上传文件接口的返参将用户输入和返参进行拼接
        temperature: 0.7, // 温度
        model: this.modelName, // 用户所选模型，不在模型列表的请求会被后端拒绝
        image_url: "", // 图片的base64格式，如果上传图片需要该字段，不传图片则留空
      };
      if (this.imgBoxList.length > 0) {
        data.image_url = this.imgBoxList[0].image_url.url;
      }
      this.setChatData();
      axios
        .post(url, data)
        .then((response) => {
          console.log("Message sent successfully:", response.data);
          if (response.data.code !== 200 && response.data.message) {
            this.$message({
              type: "error",
              message: response.data.message,
            });
          } else {
          }
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          this.$message({
            type: "error",
            message: "请求失败,请重试!",
          });
          if (error.response && error.response.status === 401) {
            this.token = getToken();
            // this.establishConnection();
          }
        });

      this.inputMessage = "";
      this.imgBoxList = [];
    },
    scrollToBottom() {
      const container = this.$el.querySelector(".chat-messages");
      container.scrollTop = container.scrollHeight;
    },
    addCopyAndToggleListeners() {
      document.addEventListener("click", (event) => {
        if (event.target.classList.contains("copy-btn")) {
          const code = event.target
            .closest(".code-block")
            .querySelector("code").textContent;
          navigator.clipboard.writeText(code).then(() => {
            this.$message.info("代码已复制！");
          });
        }

        // Handle toggle button click
        if (event.target.closest(".toggle-btn")) {
          const pre = event.target.closest(".code-block").querySelector("pre");
          pre.style.display = pre.style.display === "none" ? "block" : "none";

          // Update the SVG icon based on the display state
          const useElement = event.target
            .closest(".toggle-btn")
            .querySelector("use");
          if (pre.style.display === "none") {
            useElement.setAttribute("xlink:href", "#icon-collapse"); // Assuming you have an icon for collapse
          } else {
            useElement.setAttribute("xlink:href", "#icon-expend");
          }
        }
      });
    },
    openEditDialog(index) {
      this.editMessageIndex = index;
      this.editMessageText = this.chatMessages[index].text;
      this.dialogVisible = true;
    },
    confirmEdit() {
      if (this.editMessageText.trim() !== "") {
        this.chatMessages[this.editMessageIndex].text = this.editMessageText;
        this.regenerateResponse(this.editMessageIndex);
      }
      this.dialogVisible = false;
    },
    // 发送聊天消息
    regenerateResponse(index) {
      const message = this.chatMessages[index].text;
      const url = `${this.chatBaseApi}chat?token=${encodeURIComponent(
        this.token
      )}`;

      axios
        .post(
          url,
          { msg: message },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          // Assuming response contains new answer
          this.imgBoxList = [];
          this.chatMessages.splice(index + 1, 1, {
            text: response.data,
            type: "assistant",
          });
        })
        .catch((error) => {
          console.error("Error regenerating response:", error);
          this.$message({
            type: "error",
            message: "请求失败,请重试!",
          });
        });
    },
  },
  beforeDestroy() {
    if (this.sseSource) {
      this.sseSource.close();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
