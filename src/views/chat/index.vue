<template>
  <div class="chatMain">
    <!-- <div class="sidebarLeft">
      <div class="sliderContent">
        <span>asdfasdf</span>
      </div>
    </div> -->
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
        <!-- <div class="chatBottomHeader">
          <el-tooltip
            class="item"
            effect="dark"
            content="切换模型"
            placement="top"
          >
            <div class="workItem">
              <svg class="icon svg-icon" aria-hidden="true">
                <use xlink:href="#icon-OpenAI"></use>
              </svg>
            </div>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="上传图片"
            placement="top"
          >
            <div class="workItem">
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
          <div class="workItem">
            <el-tooltip
              class="item"
              effect="dark"
              content="新建对话"
              placement="top"
            >
              <i class="el-icon-circle-plus-outline"></i>
            </el-tooltip>
          </div>
        </div> -->
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
      token: getToken(),
      sseSource: null,
      reconnectInterval: 5000,
      dialogVisible: false,
      editMessageIndex: null,
      editMessageText: "",
      logoMax: require("@/assets/images/logoMax.png"),
      chatBaseApi: "",
    };
  },
  created() {
    this.chatBaseApi = process.env.VUE_APP_CHAT_BASE_API;

    console.log("Chat API Base URL:", process.env.VUE_APP_CHAT_BASE_API);
  },
  mounted() {
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
    handleKeydown(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        // Enter key pressed without Shift
        e.preventDefault(); // Prevents the default behavior (inserting a new line)
        this.sendMessage(); // Call the function to perform the search
      }
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

      axios
        .post(url, { msg: this.message })
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
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
  background-color: #fff;
  color: #e0e0e0;
  position: relative;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
.messageBox {
  position: relative;
  max-width: 1100px;
  padding-left: 40px;
  padding-right: 20px;
}
.message {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
}

.message.user {
  background-color: #d0dfef;
  align-self: flex-start;
  color: #000;
}

.message.response {
  background-color: #f6f7fb;
  color: #000;
  align-self: flex-end;
}

.userInfo {
  position: absolute;
  top: 5px;
  left: 10px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  background: #d8e3ff;
}
.userInfo img {
  width: 100%;
  height: 100%;
}
.userInfo .logoMax {
  width: 70%;
  height: 70%;
}
.infoList {
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 14px;
  line-height: 22px;
}

.userTitle {
  font-size: 16px;
}

.code-block {
  position: relative;
  border: 1px solid #333;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  background-color: #2d2d2d;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #444;
  padding: 5px 10px;
  color: #ccc;
  font-size: 12px;
}

.language-label {
  font-weight: bold;
  color: #ffcc00;
}

.code-buttons {
  display: flex;
  gap: 5px;
}

.edit-icon {
  display: none; /* Initially hide the button */
  position: absolute;
  right: 5px;
  top: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: #666;
}
.reload-icon {
  cursor: pointer;

  font-size: 24px;

  color: #000;
}

.messageBox.user:hover .edit-icon {
  display: block; /* Show the button on hover */
}
.messageBox.response:hover .reload-icon {
  display: block; /* Show the button on hover */
}

::v-deep .code-block {
  margin: 0;
  padding: 0px;
  background-color: #2d2d2d !important;
  color: #cccccc !important;
  border-radius: 5px !important;
  overflow-x: auto !important;
}
::v-deep .code-header {
  padding: 10px;
  background: #585a73;
  display: flex;
  justify-content: space-between;
}
::v-deep .code-block pre {
  padding: 0 10px 10px 10px;
}
::v-deep .code-buttons button {
  border: none;
  background: transparent;
  color: #fff;
  margin: 0 5px;
}
.responseBottom {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.defaultText {
  position: absolute;
  max-width: 1100px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 300px;
  font-size: 30px;
  color: #2d2d2d;
  display: flex;
  padding-top: 300px;
  align-items: flex-start;
  justify-content: center;
  p {
    font-size: 24px;
    display: flex;
    font-weight: 600;
    justify-content: center;
    line-height: 36px;
    align-items: center;
  }
  img {
    width: 46px;
    height: 46px;
    margin-right: 10px;
  }
}
.chatBottom {
  border-top: 1px solid #dcdfe6;
  padding: 5px;
  padding-left: 10px;
  .chatBottomHeader {
    height: 40px;

    display: flex;
    align-items: center;
    font-size: 22px;
    color: #57606a;
    .workItem {
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .tipBottom {
    color: #808080;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bottomLeft {
      p {
        margin-top: 5px;
      }
      .icon {
        font-size: 16px;
      }
      .tipText {
        font-size: 12px;
        margin-left: 5px;
      }
    }
    .bottomRight {
      width: 80px;
      height: 40px;
    }
  }
}
::v-deep .chatBoxInput {
  textarea {
    border: none;
    resize: none;
  }
}
.chatMain {
  display: flex;
  .sidebarLeft {
    width: 260px;
    border-right: 1px solid hsl(var(--border));
    pointer-events: auto;
    background: #fff;
    .sliderContent {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 4px;
    }
    border-right: 1px solid #dcdfe6;
  }
  .chat-container {
    flex: 1;
  }
}
</style>
