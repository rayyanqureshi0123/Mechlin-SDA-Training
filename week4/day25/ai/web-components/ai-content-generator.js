class AIContentGenerator {
    constructor(container, options = {}) {
        this.container = container;
        this.apiUrl =
            options.apiUrl || "http://127.0.0.1:5001/generate";

        this.lastRequest = null;
        this.generatedContent = "";

        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="ai-content-generator">
                <h2>AI Content Generator</h2>

                <form id="content-generator-form">
                    <label>
                        Content Type
                        <select id="content-type">
                            <option value="article">Article</option>
                            <option value="blog">Blog Post</option>
                            <option value="social">Social Media Post</option>
                            <option value="summary">Summary</option>
                        </select>
                    </label>

                    <label>
                        Topic
                        <input
                            type="text"
                            id="content-topic"
                            placeholder="Enter a topic"
                            required
                        />
                    </label>

                    <label>
                        Tone
                        <select id="content-tone">
                            <option value="professional">
                                Professional
                            </option>
                            <option value="friendly">Friendly</option>
                            <option value="casual">Casual</option>
                            <option value="educational">
                                Educational
                            </option>
                        </select>
                    </label>

                    <label>
                        Length
                        <select id="content-length">
                            <option value="short">Short</option>
                            <option value="medium" selected>
                                Medium
                            </option>
                            <option value="long">Long</option>
                        </select>
                    </label>

                    <label>
                        Keywords
                        <input
                            type="text"
                            id="content-keywords"
                            placeholder="AI, technology, web development"
                        />
                    </label>

                    <button type="submit" id="generate-button">
                        Generate
                    </button>
                </form>

                <div id="generator-status" hidden></div>

                <div class="ai-content-generator__result">
                    <h3>Generated Content</h3>

                    <textarea
                        id="generated-content"
                        rows="12"
                        readonly
                        placeholder="Your generated content will appear here..."
                    ></textarea>

                    <div>
                        <button type="button" id="copy-content">
                            Copy
                        </button>

                        <button type="button" id="regenerate-content">
                            Regenerate
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.form =
            this.container.querySelector("#content-generator-form");

        this.generateButton =
            this.container.querySelector("#generate-button");

        this.status =
            this.container.querySelector("#generator-status");

        this.contentOutput =
            this.container.querySelector("#generated-content");

        this.copyButton =
            this.container.querySelector("#copy-content");

        this.regenerateButton =
            this.container.querySelector("#regenerate-content");
    }

    bindEvents() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.generateContent();
        });

        this.copyButton.addEventListener("click", () => {
            this.copyContent();
        });

        this.regenerateButton.addEventListener("click", () => {
            if (this.lastRequest) {
                this.generateContent(this.lastRequest);
            }
        });
    }

    getFormData() {
        const keywordsValue =
            this.container
                .querySelector("#content-keywords")
                .value;

        return {
            contentType:
                this.container
                    .querySelector("#content-type")
                    .value,

            topic:
                this.container
                    .querySelector("#content-topic")
                    .value
                    .trim(),

            tone:
                this.container
                    .querySelector("#content-tone")
                    .value,

            length:
                this.container
                    .querySelector("#content-length")
                    .value,

            keywords: keywordsValue
                .split(",")
                .map((keyword) => keyword.trim())
                .filter(Boolean)
        };
    }

    setStatus(message, visible = true) {
        this.status.textContent = message;
        this.status.hidden = !visible;
    }

    async generateContent(requestData = null) {
        const data = requestData || this.getFormData();

        if (!data.topic) {
            this.setStatus("Please enter a topic.");
            return;
        }

        this.lastRequest = data;
        this.generateButton.disabled = true;
        this.setStatus("Generating content...");

        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(
                    `Request failed with status ${response.status}`
                );
            }

            const result = await response.json();

            this.generatedContent =
                result.content || "";

            this.contentOutput.value =
                this.generatedContent;

            this.setStatus("Content generated successfully.");
        } catch (error) {
            console.error(
                "Content generation error:",
                error
            );

            this.setStatus(
                "Unable to generate content. Please try again."
            );
        } finally {
            this.generateButton.disabled = false;
        }
    }

    async copyContent() {
        if (!this.generatedContent) {
            this.setStatus("There is no generated content to copy.");
            return;
        }

        try {
            await navigator.clipboard.writeText(
                this.generatedContent
            );

            this.setStatus("Content copied to clipboard.");
        } catch (error) {
            console.error(
                "Clipboard error:",
                error
            );

            this.setStatus(
                "Unable to copy content."
            );
        }
    }
}

if (typeof window !== "undefined") {
    window.AIContentGenerator = AIContentGenerator;
}