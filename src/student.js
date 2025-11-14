
const chatInput = document.getElementById('chat-input');
const sendChatButton = document.getElementById('send-chat');
const chatHistory = document.getElementById('chat-history');

sendChatButton.addEventListener('click', () => {
    const userMessage = chatInput.value;
    if (userMessage.trim() !== '') {
        appendMessage('user', userMessage);
        chatInput.value = '';

        // Simulate a bot response
        setTimeout(() => {
            appendMessage('bot', 'This is a simulated response.');
        }, 1000);
    }
});

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', `${sender}-message`);
    messageElement.textContent = message;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to the bottom
}
