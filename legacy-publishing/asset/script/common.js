document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const body = document.body;
    const kaChatbotAppContainer = document.querySelector('.ka-chatbot-app-container');
    const chatContainer = document.querySelector('.ka-chatbot');
    const fullscreenBtn = document.querySelector('.ka-chatbot__header-button.-fullscreen');
    const chatFab = document.querySelector('.ka-chatbot-fab');
    const mainCloseBtn = document.querySelector('.ka-chatbot__header-button.-close');
    const sidebar = document.querySelector('.ka-chatbot__sidebar');
    const expandedMenu = document.querySelector('.ka-chatbot__sidebar-expand-menu');
    const expandedMenuCloseBtn = document.querySelector('.ka-chatbot__expanded-menu-close-button');
    const overlay = document.querySelector('.ka-chatbot__overlay');
    const sidebarToggleButtons = document.querySelectorAll('.ka-chatbot__sidebar-toggle-button, .ka-chatbot__header-menu-button');

    const chatMessages = document.querySelector('.ka-chatbot__messages');
    const chatInput = document.querySelector('.ka-chatbot__input');
    const sendBtn = document.querySelector('.ka-chatbot__send-button');
    const attachBtn = document.querySelector('.ka-chatbot__attach-button');
    const stopBtn = document.querySelector('.ka-chatbot__stop-button');
    const fileAttachmentArea = document.querySelector('.ka-chatbot__file-attachment-area');
    const initialScreen = document.querySelector('.ka-chatbot__initial-screen');
    const chatMessagesWrapper = document.querySelector('.ka-chatbot__messages-wrapper');

    // NEW: History related DOM elements
    const sidebarContentWrapper = document.querySelector('.ka-chatbot__sidebar-content-wrapper');
    const expandedMenuList = document.querySelector('.ka-chatbot__expanded-menu-list');
    const historyListView = document.querySelector('.ka-chatbot__history-list-view');
    const historyDetailView = document.querySelector('.ka-chatbot__history-detail-view');
    const historyListItems = document.querySelectorAll('.ka-chatbot__history-item');
    const historyCloseButtons = document.querySelectorAll('.ka-chatbot__history-close-button');
    const historyBackButton = document.querySelector('.ka-chatbot__history-back-button');

    // NEW: History item options and rename elements
    const moreButtons = document.querySelectorAll('.ka-chatbot__history-item-wrapper .more-button');
    const renameButtons = document.querySelectorAll('.ka-chatbot__history-item-option-rename');
    const saveRenameButtons = document.querySelectorAll('.ka-chatbot__history-item-rename-save');
    const cancelRenameButtons = document.querySelectorAll('.ka-chatbot__history-item-rename-cancel');

    // --- Resizer ---    
    const resizer = document.querySelector('.ka-chatbot__resizer');
    let isResizing = false;

    if (resizer) {
        resizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', () => {
                isResizing = false;
                document.removeEventListener('mousemove', handleMouseMove);
            });
        });
    }

    function handleMouseMove(e) {
        if (!isResizing) return;

        const sidebarWidth = sidebar.offsetWidth;
        const newWidth = e.clientX - sidebarWidth;
        const minWidth = 200; // 최소 너비
        const maxWidth = 500; // 최대 너비

        if (newWidth > minWidth && newWidth < maxWidth) {
            expandedMenu.style.width = `${newWidth}px`;
        }
    }

    // --- Swiper Initialization ---
    const swiper = new Swiper('.ka-chatbot__swiper-container', {
        slidesPerView: 1,
        spaceBetween: 16,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // --- Functions ---
    function updateSwiperSlidesPerView() {
        if (kaChatbotAppContainer.classList.contains('-fullscreen-mode') && window.innerWidth <= 700) {
            kaChatbotAppContainer.classList.remove('-fullscreen-mode');
        }

        if (window.innerWidth <= 700) {
            swiper.params.slidesPerView = 1;
        } else if (kaChatbotAppContainer.classList.contains('-fullscreen-mode')) {
            swiper.params.slidesPerView = 4;
        } else {
            swiper.params.slidesPerView = 1;
        }
        swiper.update();
    }

    function toggleSidebar() {
        chatContainer.classList.toggle('-menu-open');
    }

    function openChat() {
        chatContainer.classList.add('-open');
        if (chatFab) {
            chatFab.classList.add('-d-none');
        }
    }

    function closeChat() {
        chatContainer.classList.remove('-open');
        if (chatFab) {
            chatFab.classList.remove('-d-none');
        }
        kaChatbotAppContainer.classList.remove('-fullscreen-mode');
        chatContainer.classList.remove('-menu-open'); // 확장 메뉴 닫기
    }

    function startChat() {
        if (initialScreen) {
            initialScreen.classList.add('-d-none'); // Hide initial screen directly
        }
        if (chatMessagesWrapper) {
            chatMessagesWrapper.classList.add('-d-block'); // Show messages wrapper
        }
        setTimeout(() => { 
            if (swiper) {
                swiper.update(); 
            }
        }, 50);
    }

    function addMessage(content, type, isHtml = false) {
        if (!initialScreen.classList.contains('-d-none')) {
            startChat();
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('ka-chatbot__message', `-${type}`);

        if (isHtml) {
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = content;

            const bubble = document.createElement('div');
            bubble.classList.add('ka-chatbot__message-bubble');

            const msgContent = tempContainer.querySelector('.ka-chatbot__message-content');
            const msgActions = tempContainer.querySelector('.ka-chatbot__message-actions');
            if (msgContent) bubble.appendChild(msgContent);
            if (msgActions) messageElement.appendChild(msgActions); // Append actions after bubble
            
            messageElement.prepend(bubble); // Prepend bubble to message element

            const quickReplies = tempContainer.querySelector('.ka-chatbot__quick-replies');
            if (quickReplies) messageElement.appendChild(quickReplies);

        } else {
            const bubble = document.createElement('div');
            bubble.classList.add('ka-chatbot__message-bubble');
            const p = document.createElement('p');
            p.textContent = content;
            bubble.appendChild(p);
            messageElement.appendChild(bubble);
        }

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText !== '') {
            addMessage(messageText, 'sent');
            chatInput.value = '';
            chatInput.style.height = '';

            if (stopBtn) {
                stopBtn.classList.add('-d-block');
            }

            setTimeout(() => {
                const botResponseHtml = `
                    <div class="ka-chatbot__message-content">
                        <p>요청하신 내용의 <strong>요약, 번역 및 키워드 추출</strong> 결과입니다.</p>
                        <div class="ka-chatbot__message-card">
                            <h4>요약</h4>
                            <p>빠른 갈색 여우가 게으른 개를 뛰어 넘습니다. 이 문장은 영어 알파벳의 모든 글자를 포함하는 팬그램으로, 타이핑 연습이나 폰트 테스트에 자주 사용됩니다.</p>
                        </div>
                        <div class="ka-chatbot__message-card">
                            <h4>영문 번역 (English)</h4>
                            <p>The quick brown fox jumps over the lazy dog.</p>
                        </div>
                        <div class="ka-chatbot__message-card">
                            <h4>주요 키워드</h4>
                            <div class="ka-chatbot__keyword-tags">
                                <span class="ka-chatbot__keyword-tag">여우</span>
                                <span class="ka-chatbot__keyword-tag">개</span>
                                <span class="ka-chatbot__keyword-tag">팬그램</span>
                                <span class="ka-chatbot__keyword-tag">알파벳</span>
                            </div>
                        </div>
                    </div>
                    <div class="ka-chatbot__message-actions">
                        <button class="ka-chatbot__action-button" title="노트로 저장">💾 노트로 저장</button>
                        <button class="ka-chatbot__action-button" title="복사하기">📋 복사</button>
                    </div>
                    <div class="ka-chatbot__quick-replies">
                        <button class="ka-chatbot__quick-reply">요약이 이상해요</button>
                        <button class="ka-chatbot__quick-reply">번역이 어색해요</button>
                        <button class="ka-chatbot__quick-reply">키워드를 추가해주세요</button>
                    </div>
                `;
                addMessage(botResponseHtml, 'received', true);
                if (stopBtn) {
                    stopBtn.classList.remove('-d-block');
                }
            }, 1000);
        }
    }

    // --- Event Listeners ---
    if (chatFab) {
        chatFab.addEventListener('click', openChat);
    }
    if (mainCloseBtn) {
        mainCloseBtn.addEventListener('click', closeChat);
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            kaChatbotAppContainer.classList.toggle('-fullscreen-mode');
            chatContainer.classList.toggle('-push-menu');
            updateSwiperSlidesPerView();
            if (kaChatbotAppContainer.classList.contains('-fullscreen-mode')) {
                if (chatFab) chatFab.classList.add('-d-none');
            } else {
                if (chatFab) chatFab.classList.remove('-d-none');
            }
        });
    }

    sidebarToggleButtons.forEach(button => {
        button.addEventListener('click', toggleSidebar);
    });

    if (expandedMenuCloseBtn) {
        expandedMenuCloseBtn.addEventListener('click', toggleSidebar);
    }

    if (expandedMenuList) {
        const historyMenuItem = expandedMenuList.querySelector('a[data-view="history-list"]');
        if (historyMenuItem) {
            historyMenuItem.addEventListener('click', (e) => {
                e.preventDefault();
                if (expandedMenuList) expandedMenuList.classList.add('-d-none');
                if (historyListView) historyListView.classList.remove('-d-none');
            });
        }
    }

    if (historyListItems) {
        historyListItems.forEach(item => {
            item.addEventListener('click', () => {
                if (historyListView) historyListView.classList.add('-d-none');
                if (historyDetailView) historyDetailView.classList.remove('-d-none');
            });
        });
    }

    if (historyBackButton) {
        historyBackButton.addEventListener('click', () => {
            if (historyDetailView) historyDetailView.classList.add('-d-none');
            if (historyListView) historyListView.classList.remove('-d-none');
        });
    }

    if (historyCloseButtons) {
        historyCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (expandedMenuList) expandedMenuList.classList.remove('-d-none');
                if (historyListView) historyListView.classList.add('-d-none');
                if (historyDetailView) historyDetailView.classList.add('-d-none');
                toggleSidebar();
            });
        });
    }

    if (moreButtons) {
        moreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemWrapper = button.closest('.ka-chatbot__history-item-wrapper');
                if (itemWrapper) {
                    document.querySelectorAll('.ka-chatbot__history-item-wrapper.-show-options, .ka-chatbot__history-item-wrapper.-show-rename').forEach(wrapper => {
                        if (wrapper !== itemWrapper) {
                            wrapper.classList.remove('-show-options');
                            wrapper.classList.remove('-show-rename');
                        }
                    });
                    itemWrapper.classList.toggle('-show-options');
                    if (itemWrapper.classList.contains('-show-options')) {
                        itemWrapper.classList.remove('-show-rename');
                    }
                }
            });
        });
    }

    if (renameButtons) {
        renameButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemWrapper = button.closest('.ka-chatbot__history-item-wrapper');
                if (itemWrapper) {
                    itemWrapper.classList.remove('-show-options');
                    itemWrapper.classList.add('-show-rename');
                    const renameInput = itemWrapper.querySelector('.ka-chatbot__history-item-rename-input');
                    const dateSpan = itemWrapper.querySelector('.ka-chatbot__history-item .date');
                    if (renameInput && dateSpan) renameInput.value = dateSpan.textContent.trim();
                    if (renameInput) renameInput.focus();
                }
            });
        });
    }

    if (saveRenameButtons) {
        saveRenameButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemWrapper = button.closest('.ka-chatbot__history-item-wrapper');
                if (itemWrapper) {
                    const dateSpan = itemWrapper.querySelector('.ka-chatbot__history-item .date');
                    const renameInput = itemWrapper.querySelector('.ka-chatbot__history-item-rename-input');
                    if (dateSpan && renameInput) dateSpan.textContent = renameInput.value.trim();
                    itemWrapper.classList.remove('-show-rename');
                }
            });
        });
    }

    if (cancelRenameButtons) {
        cancelRenameButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemWrapper = button.closest('.ka-chatbot__history-item-wrapper');
                if (itemWrapper) {
                    itemWrapper.classList.remove('-show-rename');
                }
            });
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        chatInput.addEventListener('input', () => {
            chatInput.style.height = '0';
            chatInput.style.height = `${chatInput.scrollHeight}px`;
        });
    }

    if (attachBtn) {
        attachBtn.addEventListener('click', () => {
            const fileName = 'sample_document.pdf';
            const fileSize = '45.45KB';
            const fileElement = document.createElement('div');
            fileElement.classList.add('ka-chatbot__file-info');
            fileElement.innerHTML = `
                <span class="file-icon"></span>
                <span class="file-name">${fileName}</span>
                <span class="file-size">${fileSize}</span>
                <button class="delete-file-button" aria-label="파일 삭제">X</button>
            `;
            fileAttachmentArea.innerHTML = '';
            fileAttachmentArea.appendChild(fileElement);
            fileElement.querySelector('.delete-file-button').addEventListener('click', () => {
                fileElement.remove();
            });
        });
    }

    if (stopBtn) {
        stopBtn.addEventListener('click', () => {
            console.log('AI response stopped.');
            stopBtn.classList.add('-d-none');
        });
    }

    window.addEventListener('resize', updateSwiperSlidesPerView);

    document.body.addEventListener('click', (e) => {
        document.querySelectorAll('.ka-chatbot__history-item-wrapper.-show-options, .ka-chatbot__history-item-wrapper.-show-rename').forEach(wrapper => {
            if (!wrapper.contains(e.target)) {
                wrapper.classList.remove('-show-options');
                wrapper.classList.remove('-show-rename');
            }
        });
    });
});
