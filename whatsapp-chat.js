document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWindow = document.querySelector('.chat-window');
    const minimizeBtn = document.querySelector('.minimize-btn');
    const closeBtn = document.querySelector('.close-btn');
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    const chatMessages = document.querySelector('.chat-messages');

    // Load saved messages
    let messages = JSON.parse(localStorage.getItem('whatsappMessages')) || [];
    
    // Display saved messages
    messages.forEach(message => {
        addMessage(message.text, message.type);
    });

    // Toggle chat window
    chatToggle.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
        setTimeout(() => chatInput.focus(), 300);
    });

    minimizeBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            saveMessages();
            
            // Get bot response after a short delay
            setTimeout(() => {
                const response = getBotResponse(message);
                addMessage(response, 'bot');
                saveMessages();
            }, 500);

            chatInput.value = '';
        }
    }

    // Handle send button click and Enter key
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.textContent = text;
        
        const timeDiv = document.createElement('div');
        timeDiv.classList.add('message-time');
        timeDiv.textContent = getCurrentTime();
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Save to messages array
        messages.push({ text, type, timestamp: new Date().getTime() });
    }

    // Get current time in HH:mm format
    function getCurrentTime() {
        const now = new Date();
        return now.getHours().toString().padStart(2, '0') + ':' + 
               now.getMinutes().toString().padStart(2, '0');
    }

    // Save messages to localStorage
    function saveMessages() {
        localStorage.setItem('whatsappMessages', JSON.stringify(messages));
    }

    // Normalize text by removing accents and converting to lowercase
    function normalizeText(text) {
        return text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[.,!?]/g, '');
    }

    // Bot response logic
    function getBotResponse(message) {
        const normalizedInput = normalizeText(message);
        
        // Define response patterns
        const responses = [
            {
                patterns: ['ola', 'oi', 'hello', 'ei', 'bom dia', 'boa tarde', 'boa noite'],
                response: 'Olá! Sou o assistente da E-Corp Security. Como posso ajudar você? 🛡️'
            },
            {
                patterns: ['download', 'baixar', 'instalar', 'instalacao'],
                response: 'Para baixar nossa plataforma, clique no botão "DOWNLOAD" na página inicial. O download é totalmente gratuito! 📥'
            },
            {
                patterns: ['seguranca', 'protecao', 'virus', 'malware', 'hacker'],
                response: 'A E-Corp Security oferece soluções avançadas de segurança, incluindo testes de penetração, análise forense e proteção contra ameaças. 🔒'
            },
            {
                patterns: ['preco', 'valor', 'custo', 'pagamento', 'assinatura'],
                response: 'Nossa plataforma é 100% gratuita e open-source! Não há custos ocultos. 💚'
            },
            {
                patterns: ['documentacao', 'manual', 'ajuda', 'tutorial', 'como usar'],
                response: 'Você pode acessar nossa documentação completa clicando no botão "DOCUMENTAÇÃO". Lá você encontrará guias detalhados e tutoriais. 📚'
            },
            {
                patterns: ['problema', 'erro', 'bug', 'falha', 'dificuldade'],
                response: 'Por favor, descreva o problema em detalhes para que eu possa ajudar melhor. Se precisar de suporte técnico avançado, nossa equipe está disponível 24/7. 🛠️'
            },
            {
                patterns: ['recursos', 'funcionalidades', 'ferramentas', 'caracteristicas'],
                response: 'A E-Corp Security oferece:\n• Testes de Penetração\n• Pesquisa de Segurança\n• Análise Forense\n• Engenharia Reversa\n• Proteção em Tempo Real 🛡️'
            },
            {
                patterns: ['contato', 'email', 'telefone', 'suporte', 'atendimento'],
                response: 'Você pode nos contatar através da seção "CONTATE-NOS" no menu superior. Nossa equipe responderá em até 24 horas! 📧'
            },
            {
                patterns: ['linux', 'sistema', 'void', 'distribuicao', 'os'],
                response: 'A E-Corp Security é baseada em Void Linux, oferecendo máxima performance e segurança. É uma distribuição especialmente otimizada para testes de segurança. 🐧'
            }
        ];

        // Find matching response
        for (const item of responses) {
            if (item.patterns.some(pattern => normalizedInput.includes(pattern))) {
                return item.response;
            }
        }

        // Default response
        return 'Desculpe, não entendi completamente sua pergunta. Você pode reformular ou perguntar sobre nossos serviços, downloads, documentação ou suporte? 🤔';
    }
});
