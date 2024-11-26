const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')
const chatbot = document.querySelector('#chatbot');
const chatbotIcon = document.querySelector('#chatbot-icon');
const chatbotClose = document.querySelector('#chatbot-close');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Chatbot functionality
// JavaScript for chatbot functionality
document.addEventListener("DOMContentLoaded", () => {
    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatbot = document.getElementById("chatbot");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");

    chatbotIcon.addEventListener("click", () => {
        chatbot.classList.toggle("active");
    });

    chatbotClose.addEventListener("click", () => {
        chatbot.classList.remove("active");
    });

    chatbotSend.addEventListener("click", async () => {
        const userMessage = chatbotInput.value.trim();
        if (!userMessage) return;

        // Display user message
        appendMessage(userMessage, "user");
        chatbotInput.value = "";

        // Send message to AI backend
        const botResponse = await getAIResponse(userMessage);
        appendMessage(botResponse, "bot");
    });

    function appendMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.className = `chatbot__message chatbot__message--${sender}`;
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    async function getAIResponse(userMessage) {
        try {
            const response = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage }),
            });
            const data = await response.json();
            return data.reply || "I'm not sure how to respond to that.";
        } catch (error) {
            console.error("Error connecting to AI:", error);
            return "Sorry, I couldn't reach the AI. Please try again later.";
        }
    }
});