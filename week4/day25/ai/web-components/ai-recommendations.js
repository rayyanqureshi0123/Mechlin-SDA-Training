class AIRecommendations {
    constructor(container, options = {}) {
        this.container = container;
        this.apiUrl =
            options.apiUrl ||
            "http://127.0.0.1:5001/recommendations";

        this.feedbackUrl =
            options.feedbackUrl ||
            "http://127.0.0.1:5001/recommendations/feedback";

        this.profile =
            options.profile || {
                interests: [],
                skills: []
            };

        this.recommendations = [];

        this.render();
        this.loadRecommendations();
    }

    render() {
        this.container.innerHTML = `
            <div class="ai-recommendations">
                <div class="ai-recommendations__header">
                    <h2>AI Recommendations</h2>

                    <button
                        type="button"
                        id="refresh-recommendations"
                    >
                        Refresh
                    </button>
                </div>

                <div
                    id="recommendations-status"
                    hidden
                ></div>

                <div
                    id="recommendations-list"
                    class="ai-recommendations__list"
                ></div>
            </div>
        `;

        this.status =
            this.container.querySelector(
                "#recommendations-status"
            );

        this.list =
            this.container.querySelector(
                "#recommendations-list"
            );

        this.refreshButton =
            this.container.querySelector(
                "#refresh-recommendations"
            );

        this.refreshButton.addEventListener(
            "click",
            () => this.loadRecommendations()
        );
    }

    setStatus(message, visible = true) {
        this.status.textContent = message;
        this.status.hidden = !visible;
    }

    async loadRecommendations() {
        this.setStatus("Loading recommendations...");
        this.refreshButton.disabled = true;

        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    profile: this.profile
                })
            });

            if (!response.ok) {
                throw new Error(
                    `Request failed with status ${response.status}`
                );
            }

            const data = await response.json();

            this.recommendations =
                data.recommendations || [];

            this.renderRecommendations();

            this.setStatus("", false);
        } catch (error) {
            console.error(
                "Recommendation error:",
                error
            );

            this.setStatus(
                "Unable to load recommendations."
            );
        } finally {
            this.refreshButton.disabled = false;
        }
    }

    renderRecommendations() {
        this.list.innerHTML = "";

        if (!this.recommendations.length) {
            this.list.innerHTML =
                "<p>No recommendations available.</p>";

            return;
        }

        this.recommendations.forEach(
            (recommendation, index) => {
                const card =
                    document.createElement("article");

                card.className =
                    "ai-recommendation-card";

                card.innerHTML = `
                    <h3>
                        ${this.escapeHtml(
                            recommendation.title
                        )}
                    </h3>

                    <p>
                        ${this.escapeHtml(
                            recommendation.description
                        )}
                    </p>

                    <small>
                        Category:
                        ${this.escapeHtml(
                            recommendation.category || "general"
                        )}
                    </small>

                    <p>
                        <strong>Why:</strong>
                        ${this.escapeHtml(
                            recommendation.reason || ""
                        )}
                    </p>

                    <div class="ai-recommendation-card__actions">
                        <button
                            type="button"
                            data-action="like"
                            data-index="${index}"
                        >
                            👍 Like
                        </button>

                        <button
                            type="button"
                            data-action="dislike"
                            data-index="${index}"
                        >
                            👎 Dislike
                        </button>

                        <button
                            type="button"
                            data-action="bookmark"
                            data-index="${index}"
                        >
                            🔖 Bookmark
                        </button>
                    </div>
                `;

                card
                    .querySelectorAll("button")
                    .forEach((button) => {
                        button.addEventListener(
                            "click",
                            () => {
                                this.handleFeedback(
                                    index,
                                    button.dataset.action
                                );
                            }
                        );
                    });

                this.list.appendChild(card);
            }
        );
    }

    async handleFeedback(index, feedback) {
        const recommendation =
            this.recommendations[index];

        if (!recommendation) {
            return;
        }

        try {
            const response = await fetch(
                this.feedbackUrl,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        recommendationId:
                            `rec-${index + 1}`,
                        feedback
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Feedback request failed with status ${response.status}`
                );
            }

            this.setStatus(
                `Feedback recorded: ${feedback}`
            );
        } catch (error) {
            console.error(
                "Feedback error:",
                error
            );

            this.setStatus(
                "Unable to save feedback."
            );
        }
    }

    escapeHtml(value) {
        const element =
            document.createElement("div");

        element.textContent =
            String(value ?? "");

        return element.innerHTML;
    }
}

if (typeof window !== "undefined") {
    window.AIRecommendations = AIRecommendations;
}