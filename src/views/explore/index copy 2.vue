<template>
  <div>
    <input
      type="text"
      v-model="userInput"
      @keyup.enter="sendMessage"
      placeholder="Type your message"
    />
    <div v-for="message in messages" :key="message.id">
      {{ message.text }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userInput: "",
      messages: [],
      eventSource: null,

      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJzdWIiOiIyIiwiZXhwIjoxNzMyMDI3NTMxfQ.TPxFM9NkghPZiGoYMvQ8XQwAxVRGjH5sveNwmEEdU2E`, // 替换为实际的用户 toke};
    };
  },
  methods: {
    establishSSEConnection() {
      // 建立 SSE 连接

      this.eventSource = new EventSource(
        `/chat-api/createSse?token=${encodeURIComponent(this.token)}`,
        {
          headers: {
            name: 1,
          },
        }
      );

      this.eventSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
          // 处理结束标识
          this.closeSSEConnection();
        } else {
          // 处理接收的数据
          this.messages.push({ id: this.messages.length, text: event.data });
        }
      };

      this.eventSource.onerror = (error) => {
        console.error("SSE connection error:", error);
        this.closeSSEConnection();
      };
    },
    closeSSEConnection() {
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
      }
    },
    sendMessage() {
      if (this.userInput.trim() === "") return;

      // 在这里调用 chat 接口
      axios
        .post(
          "http://43.134.129.99:30003/chat",
          {
            message: this.userInput,
          },
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        )
        .then((response) => {
          console.log("Message sent:", response.data);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });

      this.userInput = "";
    },
  },
  created() {
    this.establishSSEConnection();
  },
  destroyed() {
    this.closeSSEConnection();
  },
};
</script>

<style scoped>
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
