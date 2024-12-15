<template>
  <div class="chatMain">
    <div class="sidebarLeft">
      <div class="sliderTitle">
        <div class="sliderLeft">
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
          :class="['messageBox', msg.type]"
          v-for="(msg, index) in chatMessages"
          :key="index"
        >
          <div class="userInfo">
            <img v-if="msg.type === 'user'" :src="avatar" alt="" />
            <img
              v-if="msg.type === 'response'"
              :src="logoMax"
              alt=""
              class="logoMax"
            />
          </div>
          <div :class="['message', msg.type]">
            <div
              :class="[
                'infoList',
                msg.type == 'user' ? 'userTitle' : 'answerTitle',
              ]"
            >
              <div v-html="renderMarkdown(msg.text)"></div>
              <div v-if="msg.type === 'response'" class="responseBottom">
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
              </div>
            </div>
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
            <el-dropdown>
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
            </el-dropdown>
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

          <el-tooltip
            class="item"
            effect="dark"
            content="上传文件"
            placement="top"
          >
            <div class="workItem">
              <i class="el-icon-paperclip"></i>
            </div>
          </el-tooltip>
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
            v-model="message"
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
              @click="sendMessage"
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

export default {
  data() {
    return {
      message: "",
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
      chatList: [],
      imgBoxList: [], // 上传图片列表
      currentChatData: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "你好",
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
    };
  },
  created() {
    this.chatBaseApi = process.env.VUE_APP_CHAT_BASE_API;

    console.log("Chat API Base URL:", process.env.VUE_APP_CHAT_BASE_API);
  },
  mounted() {
    this.getChatInfo();
    this.establishConnection();
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
    onFileChange(event) {
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
        this.sendMessage(); // Call the function to perform the search
      }
    },
    getChatInfo() {
      const url = `${this.chatBaseApi}chatAllInfo?token=${encodeURIComponent(
        this.token
      )}`;
      axios.get(url, { token: this.token }).then((response) => {
        console.log(response, "sssreposne");
        // this.model_list = response.data.result.model_list;
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

    establishConnection() {
      const url = `${this.chatBaseApi}createSse?token=${encodeURIComponent(
        this.token
      )}`;

      this.sseSource = new EventSource(url);

      let currentMessage = "";

      this.sseSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
          currentMessage = "";
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

                if (
                  this.chatMessages.length &&
                  this.chatMessages[this.chatMessages.length - 1].type ===
                    "response"
                ) {
                  this.chatMessages[this.chatMessages.length - 1].text =
                    currentMessage;
                } else {
                  this.chatMessages.push({
                    text: currentMessage,
                    type: "response",
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

      this.sseSource.onerror = () => {
        console.error("SSE Error: attempting to reconnect");
        this.sseSource.close();
        setTimeout(this.establishConnection, this.reconnectInterval);
      };
    },
    sendMessage() {
      zhuge.track(`GPT页面用户使用`, {});
      if (!this.message.trim()) return;

      this.chatMessages.push({ text: this.message, type: "user" });

      const url = `${this.chatBaseApi}chat?token=${encodeURIComponent(
        this.token
      )}`;
      let data = {
        msg: this.message, // 用户输入的信息，如果是上传文件，需要根据上传文件接口的返参将用户输入和返参进行拼接
        temperature: 0.7, // 温度
        model: "gpt-4o-mini", // 用户所选模型，不在模型列表的请求会被后端拒绝
        image_url: "", // 图片的base64格式，如果上传图片需要该字段，不传图片则留空
      };
      axios
        .post(url, data)
        .then((response) => {
          console.log("Message sent successfully:", response.data);
          if (response.data.code !== 200 && response.data.message) {
            this.$message({
              type: "error",
              message: response.data.message,
            });
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
            this.sendMessage();
          }
        });

      this.message = "";
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
            type: "response",
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
