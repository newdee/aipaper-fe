<template>
  <div class="chat-container">
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
    <div class="chat-input">
      <input
        v-model="message"
        placeholder="请输入您的问题"
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">
        <i class="el-icon-search"></i>
      </button>
    </div>
    <el-dialog title="编辑消息" :visible.sync="dialogVisible" width="30%">
      <el-input type="textarea" v-model="editMessageText" rows="5"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">确认</el-button>
      </span>
    </el-dialog>
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
      chatMessages: [],
      token: getToken(),
      sseSource: null,
      reconnectInterval: 5000,
      dialogVisible: false,
      editMessageIndex: null,
      editMessageText: "",
      logoMax: require("@/assets/images/logoMax.png"),
    };
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
      // const url = `/chat-api/createSse?token=${encodeURIComponent(this.token)}`;
      const url = `/createSse?token=${encodeURIComponent(this.token)}`;

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
      if (!this.message.trim()) return;

      this.chatMessages.push({ text: this.message, type: "user" });

      // const url = `/chat-api/chat?token=${encodeURIComponent(this.token)}`;
      const url = `/chat?token=${encodeURIComponent(this.token)}`;

      axios
        .post(url, { msg: this.message })
        .then((response) => {
          console.log("Message sent successfully:", response.data);
          // if (response.data.code !== 200) {
          //   this.$message({
          //     type: "error",
          //     message: response.data.message,
          //   });
          // }
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
      // const url = `/chat-api/chat?token=${encodeURIComponent(this.token)}`;
      const url = `/chat?token=${encodeURIComponent(this.token)}`;

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

<style scoped>
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
  max-width: 1000px;
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

.chat-input {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  padding: 10px;
  background-color: #f5f5f5;
  margin: 10px;
  height: 56px;
  align-items: center;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 12px 24px -16px rgba(54, 54, 73, 0.04),
    0 12px 40px 0 rgba(51, 51, 71, 0.08), 0 0 1px 0 rgba(44, 44, 54, 0.02);
  box-sizing: border-box;
  position: relative;
  border: 1px solid #fff;
}

.chat-input input {
  flex: 1;
  padding: 10px 15px;
  border-radius: 30px;
  border: none;
  background-color: #fff;
  color: #333;
  outline: none;
  margin-right: 10px;
  font-size: 14px;
  border: 1px solid #fff;
}

.chat-input:hover {
  border-color: #35f;
}

.chat-input button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: #d8d8d8;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: background-color 0.3s;
}

.chat-input:hover button {
  background-color: #35f;
  color: #fff;
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
</style>
