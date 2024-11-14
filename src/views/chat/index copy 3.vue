<template>
  <div class="chat-container">
    <div class="chat-messages">
      <div
        v-for="(msg, index) in chatMessages"
        :key="index"
        :class="['message', msg.type]"
      >
        <p>{{ msg.text }}</p>
      </div>
    </div>
    <div class="chat-input">
      <input
        v-model="message"
        placeholder="Enter your message"
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getToken } from "@/utils/auth"; // Assume getToken fetches a fresh token if needed

export default {
  data() {
    return {
      message: "",
      chatMessages: [],
      token: getToken(),
      sseSource: null,
      reconnectInterval: 5000,
    };
  },
  mounted() {
    this.establishConnection();
  },
  methods: {
    establishConnection() {
      const url = `/chat-api/createSse?token=${encodeURIComponent(this.token)}`;

      this.sseSource = new EventSource(url);

      let currentMessage = "";

      this.sseSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
          currentMessage = "";
        } else {
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
            console.error("Error parsing SSE data:", error);
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

      const url = `/chat-api/chat?token=${encodeURIComponent(this.token)}`;

      axios
        .post(
          url,
          { msg: this.message },
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .then((response) => {
          console.log("Message sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          // Check if the error is token-related and refresh the token if needed
          if (error.response && error.response.status === 401) {
            this.token = getToken(); // Refresh token
            this.sendMessage(); // Retry sending the message
          }
        });

      this.message = "";
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
  height: calc(100vh - 200px);
  position: relative;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f0f0f0;
  margin: 0px;
}

.message {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
}

.message.user {
  background-color: #d1e7dd;
  align-self: flex-start;
}

.message.response {
  background-color: #fff3cd;
  align-self: flex-end;
}

.chat-input {
  display: flex;
  padding: 10px;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
}

.chat-input input {
  flex: 1;
  padding: 5px;
  margin-right: 10px;
}

.chat-input button {
  padding: 5px 10px;
}
</style>
