class AIChatbot {
    constructor(container, options = {}) {
        this.container = container;
        this.apiUrl = options.apiUrl || "http://127.0.0.1:5001/chat";
        this.storageKey = options.storageKey || "ai-chatbot-history";
        this.messages = this.loadHistory();

        this.render();
        this.bindEvents();
        this.renderMessages();
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to load chat history:", error);
            return [];
        }
    }

    saveHistory() {
        localStorage.setItem(
            this.storageKey,
            JSON.stringify(this.messages)
        );
    }

    render() {
        this.container.innerHTML = `
            <div class="ai-chatbot">
                <div class="ai-chatbot__header">
                    <h2>AI Assistant</h2>
                </div>

                <div class="ai-chatbot__messages" id="chat-messages"></div>

                <div class="ai-chatbot__typing" id="typing-indicator" hidden>
                    AI is typing...
                </div>

                <form class="ai-chatbot__form" id="chat-form">
                    <input
                        type="text"
                        id="chat-input"
                        placeholder="Ask something..."
                        autocomplete="off"
                        required
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        `;

        this.messageContainer =
            this.container.querySelector("#chat-messages");

        this.form =
            this.container.querySelector("#chat-form");

        this.input =
            this.container.querySelector("#chat-input");

        this.typingIndicator =
            this.container.querySelector("#typing-indicator");
    }

    bindEvents() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.sendMessage();
        });
    }

    renderMessages() {
        this.messageContainer.innerHTML = "";

        this.messages.forEach((message) => {
            const element = document.createElement("div");

            element.className =
                `ai-chatbot__message ai-chatbot__message--${message.role}`;

            element.textContent = message.content;

            this.messageContainer.appendChild(element);
        });

        this.messageContainer.scrollTop =
            this.messageContainer.scrollHeight;
    }

    addMessage(role, content) {
        this.messages.push({
            role,
            content,
            timestamp: new Date().toISOString()
        });

        this.saveHistory();
        this.renderMessages();
    }

    setTyping(isTyping) {
        this.typingIndicator.hidden = !isTyping;
    }

    async sendMessage() {
        const message = this.input.value.trim();

        if (!message) {
            return;
        }

        this.addMessage("user", message);
        this.input.value = "";
        this.setTyping(true);

        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message,
                    history: this.messages
                })
            });

            if (!response.ok) {
                throw new Error(
                    `Request failed with status ${response.status}`
                );
            }

            const data = await response.json();

            this.addMessage(
                "assistant",
                data.response || "No response received."
            );
        } catch (error) {
            console.error("Chatbot error:", error);

            this.addMessage(
                "assistant",
                "Sorry, something went wrong. Please try again."
            );
        } finally {
            this.setTyping(false);
            this.input.focus();
        }
    }

    clearHistory() {
        this.messages = [];
        localStorage.removeItem(this.storageKey);
        this.renderMessages();
    }
}

if (typeof window !== "undefined") {
    window.AIChatbot = AIChatbot;
}