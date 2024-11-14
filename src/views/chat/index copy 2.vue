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
import { getToken, setToken } from "@/utils/auth"; // get token from cookie

export default {
  data() {
    return {
      message: "",
      chatMessages: [],
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJzdWIiOiIyIiwiZXhwIjoxNzMyMDI3NTMxfQ.TPxFM9NkghPZiGoYMvQ8XQwAxVRGjH5sveNwmEEdU2E`, // 替换为实际的用户 token

      sseSource: null,
    };
  },
  mounted() {
    console.log("get", getToken());
    this.token = getToken();
  },
  methods: {
    establishConnection() {
      const url = `/chat-api/createSse?token=${encodeURIComponent(this.token)}`;

      this.sseSource = new EventSource(url);

      let currentMessage = "";

      this.sseSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
          // When done, clear the current message
          currentMessage = "";
          this.sseSource.close();
        } else {
          try {
            const parsedData = JSON.parse(event.data);
            if (parsedData.content) {
              // Append to current message
              currentMessage += parsedData.content;

              // Update the chatMessages with the current content
              if (
                this.chatMessages.length &&
                this.chatMessages[this.chatMessages.length - 1].type ===
                  "response"
              ) {
                // Update the last response message in chatMessages
                this.chatMessages[this.chatMessages.length - 1].text =
                  currentMessage;
              } else {
                // Add a new response message
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

      this.sseSource.onerror = (error) => {
        console.error("SSE Error:", error);
        this.sseSource.close();
      };
    },
    sendMessage() {
      if (!this.message.trim()) return; // Prevent sending empty messages

      // Add user message to chat messages
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
          // Handle response if needed
          console.log("Message sent successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });

      // Clear the message input
      this.message = "";
    },
  },
  mounted() {
    this.establishConnection();
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
  height: 100vh;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f0f0f0;
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
