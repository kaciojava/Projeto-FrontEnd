document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.querySelector('.chat-container');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input');
    const chatSend = document.querySelector('.chat-send');
    const chatMessages = document.querySelector('.chat-messages');

    // Load saved messages from localStorage
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    
    // Display saved messages
    messages.forEach(message => {
        addMessage(message.text, message.type);
    });

    chatClose.addEventListener('click', () => {
        chatContainer.classList.remove('show');
        setTimeout(() => {
            chatContainer.style.display = 'none';
        }, 300);
    });

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            saveMessages();
            
            // Get bot response
            const response = getBotResponse(message);
            
            // Add bot response with a small delay
            setTimeout(() => {
                addMessage(response, 'bot');
                saveMessages();
            }, 500);

            chatInput.value = '';
        }
    }

    // Handle send button click and Enter key
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Save to messages array
        messages.push({ text, type });
    }

    // Save messages to localStorage
    function saveMessages() {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }

    // Bot response logic
    function getBotResponse(message) {
        // Convert message to lowercase and remove accents for better matching
        const normalizedMessage = message.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        // Define response patterns
        const responses = [
            {
                patterns: ['ola', 'oi', 'hello', 'hey'],
                response: 'Olá! Como posso ajudar você hoje?'
            },
            {
                patterns: ['download', 'baixar', 'instalar'],
                response: 'Você pode baixar nossa plataforma clicando no botão "DOWNLOAD" na página inicial.'
            },
            {
                patterns: ['preco', 'valor', 'custo', 'pagamento'],
                response: 'Nossa plataforma é totalmente gratuita e open-source!'
            },
            {
                patterns: ['documentacao', 'manual', 'ajuda', 'como usar'],
                response: 'Você pode encontrar nossa documentação completa clicando no botão "DOCUMENTAÇÃO" na página inicial.'
            },
            {
                patterns: ['suporte', 'problema', 'erro', 'bug'],
                response: 'Para suporte técnico, por favor descreva seu problema em detalhes e nossa equipe irá ajudá-lo o mais breve possível.'
            },
            {
                patterns: ['recursos', 'funcionalidades', 'caracteristicas'],
                response: 'Nossa plataforma oferece recursos avançados para testes de penetração, pesquisa de segurança, análise forense e engenharia reversa.'
            },
            {
                patterns: ['contato', 'email', 'telefone'],
                response: 'Você pode nos contatar através da seção "CONTATE-NOS" no menu superior do site.'
            }
        ];

        // Find matching response
        for (const item of responses) {
            if (item.patterns.some(pattern => normalizedMessage.includes(pattern))) {
                return item.response;
            }
        }

        // Default response
        return 'Desculpe, não entendi sua pergunta. Pode reformular de outra forma?';
    }
});