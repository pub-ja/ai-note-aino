/**
 * @file 챗봇 UI의 전반적인 동작을 관리하는 메인 스크립트 파일입니다.
 * DOMContentLoaded 이벤트를 리스닝하여 모든 DOM 요소가 로드된 후 스크립트를 실행합니다.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    // 스크립트 전체에서 사용될 주요 DOM 요소들을 변수에 할당합니다.
    const body = document.body;
    const kaChatbotAppContainer = document.querySelector('.ka-chatbot-app-container');
    const chatContainer = document.querySelector('.ka-chatbot');
    const fullscreenBtn = document.querySelector('.ka-chatbot__header-button.-fullscreen');
    const chatFab = document.querySelector('.ka-chatbot-fab'); // 플로팅 버튼
    const mainCloseBtn = document.querySelector('.ka-chatbot__header-button.-close');
    const sidebar = document.querySelector('.ka-chatbot__sidebar');
    const expandedMenu = document.querySelector('.ka-chatbot__sidebar-expand-menu');
    const expandedMenuCloseBtn = document.querySelector('.ka-chatbot__expanded-menu-close-button');
    const overlay = document.querySelector('.ka-chatbot__overlay');
    const sidebarToggleButtons = document.querySelectorAll('.ka-chatbot__sidebar-toggle-button, .ka-chatbot__header-menu-button');

    // 채팅 관련 DOM 요소
    const chatMessages = document.querySelector('.ka-chatbot__messages');
    const chatInput = document.querySelector('.ka-chatbot__input');
    const sendBtn = document.querySelector('.ka-chatbot__send-button');
    const attachBtn = document.querySelector('.ka-chatbot__attach-button');
    const stopBtn = document.querySelector('.ka-chatbot__stop-button');
    const fileAttachmentArea = document.querySelector('.ka-chatbot__file-attachment-area');
    const initialScreen = document.querySelector('.ka-chatbot__initial-screen');
    const chatMessagesWrapper = document.querySelector('.ka-chatbot__messages-wrapper');

    // 상담 이력 관련 DOM 요소
    const sidebarContentWrapper = document.querySelector('.ka-chatbot__sidebar-content-wrapper');
    const expandedMenuList = document.querySelector('.ka-chatbot__expanded-menu-list');
    const historyListView = document.querySelector('.ka-chatbot__history-list-view');
    const historyDetailView = document.querySelector('.ka-chatbot__history-detail-view');
    const historyListItems = document.querySelectorAll('.ka-chatbot__history-item');
    const historyCloseButtons = document.querySelectorAll('.ka-chatbot__history-close-button');
    const historyBackButton = document.querySelector('.ka-chatbot__history-back-button');

    // 상담 이력 아이템 옵션(더보기, 이름바꾸기) 관련 DOM 요소
    const moreButtons = document.querySelectorAll('.ka-chatbot__history-item-wrapper .more-button');
    const renameButtons = document.querySelectorAll('.ka-chatbot__history-item-option-rename');
    const saveRenameButtons = document.querySelectorAll('.ka-chatbot__history-item-rename-save');
    const cancelRenameButtons = document.querySelectorAll('.ka-chatbot__history-item-rename-cancel');

    // --- Resizer ---    
    // 사이드바와 메인 콘텐츠 영역 사이의 크기를 조절하는 Resizer 로직입니다.
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

    /**
     * 마우스 이동에 따라 확장 메뉴의 너비를 조절합니다.
     * @param {MouseEvent} e 마우스 이벤트 객체
     */
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
    // 초기 화면의 추천 질문 슬라이드를 위한 Swiper 라이브러리 초기화 코드입니다.
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

    /**
     * 창 크기와 챗봇 모드(일반/전체화면)에 따라 Swiper 슬라이드 개수를 동적으로 조절합니다.
     */
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

    /**
     * 사이드바 확장 메뉴를 열고 닫습니다.
     */
    function toggleSidebar() {
        chatContainer.classList.toggle('-menu-open');
    }

    /**
     * 플로팅 버튼을 눌렀을 때 챗봇 창을 엽니다.
     */
    function openChat() {
        chatContainer.classList.add('-open');
        if (chatFab) {
            chatFab.classList.add('-d-none');
        }
    }

    /**
     * 닫기 버튼을 눌렀을 때 챗봇 창을 닫습니다.
     */
    function closeChat() {
        chatContainer.classList.remove('-open');
        if (chatFab) {
            chatFab.classList.remove('-d-none');
        }
        kaChatbotAppContainer.classList.remove('-fullscreen-mode');
        chatContainer.classList.remove('-menu-open'); // 확장 메뉴도 함께 닫습니다.
    }

    /**
     * 채팅 시작 시 초기 화면을 숨기고 메시지 영역을 표시합니다.
     */
    function startChat() {
        if (initialScreen && !initialScreen.classList.contains('-d-none')) {
            initialScreen.classList.add('-d-none');
        }
        if (chatMessagesWrapper && !chatMessagesWrapper.classList.contains('-d-block')) {
            chatMessagesWrapper.classList.add('-d-block');
        }
        // Swiper가 깨지는 것을 방지하기 위해 DOM 변경 후 업데이트를 실행합니다.
        setTimeout(() => { 
            if (swiper) {
                swiper.update(); 
            }
        }, 50);
    }

    /**
     * 채팅 메시지를 화면에 추가합니다.
     * @param {string} content 메시지 내용 (텍스트 또는 HTML)
     * @param {'sent' | 'received'} type 메시지 타입 (보낸 메시지 또는 받은 메시지)
     * @param {boolean} isHtml content가 HTML 형식인지 여부
     */
    function addMessage(content, type, isHtml = false) {
        if (!initialScreen.classList.contains('-d-none')) {
            startChat();
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('ka-chatbot__message', `-${type}`);

        if (isHtml) {
            // HTML 콘텐츠를 파싱하여 올바른 구조로 재조립합니다.
            const tempContainer = document.createElement('div');
            tempContainer.innerHTML = content;

            const bubble = document.createElement('div');
            bubble.classList.add('ka-chatbot__message-bubble');

            // .ka-chatbot__message-content와 .ka-chatbot__message-actions를 찾아 버블 내부에 추가합니다.
            const msgContent = tempContainer.querySelector('.ka-chatbot__message-content');
            const msgActions = tempContainer.querySelector('.ka-chatbot__message-actions');
            if (msgContent) bubble.appendChild(msgContent);
            if (msgActions) bubble.appendChild(msgActions);
            
            messageElement.appendChild(bubble);

            // .ka-chatbot__quick-replies와 .ka-chatbot__related-info는 버블의 형제 요소로 추가합니다.
            const quickReplies = tempContainer.querySelector('.ka-chatbot__quick-replies');
            const relatedInfo = tempContainer.querySelector('.ka-chatbot__related-info');
            if (quickReplies) messageElement.appendChild(quickReplies);
            if (relatedInfo) messageElement.appendChild(relatedInfo);

        } else {
            // 일반 텍스트 메시지를 처리합니다.
            const bubble = document.createElement('div');
            bubble.classList.add('ka-chatbot__message-bubble');
            const p = document.createElement('p');
            p.textContent = content;
            bubble.appendChild(p);
            messageElement.appendChild(bubble);
        }

        chatMessages.appendChild(messageElement);
        // 새 메시지가 추가된 후 스크롤을 맨 아래로 이동합니다.
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /**
     * 사용자가 입력한 메시지를 전송하고 봇의 응답을 시뮬레이션합니다.
     */
    function sendMessage() {
        const messageText = chatInput.value.trim();
        if (messageText !== '') {
            addMessage(messageText, 'sent');
            chatInput.value = '';
            chatInput.style.height = ''; // 높이 초기화

            // AI가 응답을 생성하는 동안 '답변 중지' 버튼을 표시합니다.
            if (stopBtn) {
                stopBtn.classList.add('-d-block');
            }

            // 봇 응답을 시뮬레이션합니다.
            setTimeout(() => {
                const botResponseHtml = `
                    <div class="ka-chatbot__message-content">
                        <p>대한항공 수하물 규정에 대해 알려드릴게요.</p>
                        <ol class="ka-chatbot__message-list">
                            <li>
                                <strong>휴대 수하물</strong>
                                <ul>
                                    <li>개수: 2개 (휴대용 가방 1개 + 개인 소지품 1개)</li>
                                    <li>무게: 총합 10kg 이하</li>
                                </ul>
                            </li>
                            <li>
                                <strong>위탁 수하물</strong>
                                <ul>
                                    <li>개수: 1개</li>
                                    <li>무게: 32kg 이하</li>
                                </ul>
                            </li>
                        </ol>
                        <p>더 자세한 정보는 <a href="#">수하물 규정 페이지</a>에서 확인하세요.</p>
                    </div>
                    <div class="ka-chatbot__message-actions">
                        <button class="ka-chatbot__action-button" title="도움이 됐어요">👍</button>
                        <button class="ka-chatbot__action-button" title="도움이 안됐어요">👎</button>
                    </div>
                    <div class="ka-chatbot__quick-replies">
                        <button class="ka-chatbot__quick-reply">사실과 달라요</button>
                        <button class="ka-chatbot__quick-reply">설명이 부족해요</button>
                        <button class="ka-chatbot__quick-reply">답변이 너무 길어요</button>
                    </div>
                    <div class="ka-chatbot__related-info">
                        <h3 class="ka-chatbot__related-title">함께 알면 좋은 정보</h3>
                        <a href="#" class="ka-chatbot__related-link">기내 반입 금지 물품</a>
                        <a href="#" class="ka-chatbot__related-link">초과 수하물 요금</a>
                    </div>
                `;
                addMessage(botResponseHtml, 'received', true);
                
                // AI 응답 후 '답변 중지' 버튼을 숨깁니다.
                if (stopBtn) {
                    stopBtn.classList.remove('-d-block');
                }
            }, 1000);
        }
    }

    // --- Event Listeners ---
    // 각 DOM 요소에 이벤트 리스너를 할당하여 상호작용을 처리합니다.

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

    // 상담 이력 메뉴 관련 이벤트 리스너
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

    // 상담 이력 '더보기' 및 '이름 바꾸기' 기능 관련 이벤트 리스너
    if (moreButtons) {
        moreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemWrapper = button.closest('.ka-chatbot__history-item-wrapper');
                if (itemWrapper) {
                    document.querySelectorAll('.ka-chatbot__history-item-wrapper.-show-options, .ka-chatbot__history-item-wrapper.-show-rename').forEach(wrapper => {
                        if (wrapper !== itemWrapper) {
                            wrapper.classList.remove('-show-options', '-show-rename');
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

    // 메시지 전송 버튼 및 입력창(Enter 키) 이벤트
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

        // 입력 내용에 따라 textarea 높이 자동 조절
        chatInput.addEventListener('input', () => {
            chatInput.style.height = '0';
            chatInput.style.height = `${chatInput.scrollHeight}px`;
        });
    }

    // 파일 첨부 버튼 (시뮬레이션)
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

    // 답변 중지 버튼
    if (stopBtn) {
        stopBtn.addEventListener('click', () => {
            console.log('AI response stopped.');
            stopBtn.classList.add('-d-none');
        });
    }

    // 창 크기 변경 시 Swiper 업데이트
    window.addEventListener('resize', updateSwiperSlidesPerView);

    // 메뉴 외부 클릭 시 닫기
    document.body.addEventListener('click', (e) => {
        document.querySelectorAll('.ka-chatbot__history-item-wrapper.-show-options, .ka-chatbot__history-item-wrapper.-show-rename').forEach(wrapper => {
            if (!wrapper.contains(e.target)) {
                wrapper.classList.remove('-show-options', '-show-rename');
            }
        });
    });
});