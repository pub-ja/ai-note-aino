import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* wrap */}
      <div className="ka-chatbot-app-container">

        {/* 챗봇 컨테이너 */}
        <div className={`ka-chatbot ${isChatOpen ? '-open' : ''} ${isMenuOpen ? '-menu-open' : ''}`}>
          {/* 챗봇 사이드바 */}
          <div className="ka-chatbot__sidebar">
            <button className="ka-chatbot__sidebar-toggle-button" aria-label="사이드바 토글" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </button>
            <nav className="ka-chatbot__sidebar-menu-nav">
              {/* 메뉴 아이템들 */}
            </nav>
            <button type="button" className="ka-chatbot__sidebar-setting">
              setting
            </button>
          </div>
          {/* // 챗봇 사이드바 */}

          <div className="ka-chatbot__sidebar-expand-menu">
            <div className="ka-chatbot__expanded-menu-header">
              <h3>메뉴</h3>
              <button className="ka-chatbot__expanded-menu-close-button" aria-label="메뉴 닫기" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            <div className="ka-chatbot__sidebar-content-wrapper">
              {/* Default Menu List View */}
              <ul className="ka-chatbot__expanded-menu-list -d-block">
                <li><a href="#" data-view="history-list">노트 목록</a></li>
                <li><a href="#">설정</a></li>
                <li><a href="#">도움말</a></li>
              </ul>

              {/* History List View (initially hidden) */}
              <div className="ka-chatbot__history-list-view -d-none">
                <div className="ka-chatbot__history-header">
                  <h3>노트 목록</h3>
                  <button className="ka-chatbot__history-close-button" aria-label="노트 목록 닫기">X</button>
                </div>
                <ul className="ka-chatbot__history-list">
                  <li className="ka-chatbot__history-item-wrapper">
                    <button className="ka-chatbot__history-item" data-history-id="1" aria-label="2026년 7월 1일 노트">
                      <span className="date">웹사이트 요약</span>
                    </button>
                    <button className="more-button" aria-label="2026년 7월 1일 노트 더보기">...</button>
                    <div className="ka-chatbot__history-item-options" role="menu">
                      <button role="menuitem" className="ka-chatbot__history-item-option-rename" aria-label="이름 바꾸기">이름 바꾸기</button>
                      <button role="menuitem" className="ka-chatbot__history-item-option-delete" aria-label="삭제">삭제</button>
                    </div>
                    <div className="ka-chatbot__history-item-rename-input-wrapper -d-none">
                      <input type="text" className="ka-chatbot__history-item-rename-input" aria-label="노트 이름 입력" value="웹사이트 요약" />
                      <button className="ka-chatbot__history-item-rename-save" aria-label="저장">저장</button>
                      <button className="ka-chatbot__history-item-rename-cancel" aria-label="취소">취소</button>
                    </div>
                  </li>
                  <li className="ka-chatbot__history-item-wrapper">
                    <button className="ka-chatbot__history-item" data-history-id="2" aria-label="2026년 7월 2일 노트">
                      <span className="date">이미지 번역</span>
                    </button>
                    <button className="more-button" aria-label="2026년 7월 2일 노트 더보기">...</button>
                    <div className="ka-chatbot__history-item-options" role="menu">
                      <button role="menuitem" className="ka-chatbot__history-item-option-rename" aria-label="이름 바꾸기">이름 바꾸기</button>
                      <button role="menuitem" className="ka-chatbot__history-item-option-delete" aria-label="삭제">삭제</button>
                    </div>
                    <div className="ka-chatbot__history-item-rename-input-wrapper -d-none">
                      <input type="text" className="ka-chatbot__history-item-rename-input" aria-label="노트 이름 입력" value="이미지 번역" />
                      <button className="ka-chatbot__history-item-rename-save" aria-label="저장">저장</button>
                      <button className="ka-chatbot__history-item-rename-cancel" aria-label="취소">취소</button>
                    </div>
                  </li>
                </ul>
              </div>

              {/* History Detail View (initially hidden) */}
              <div className="ka-chatbot__history-detail-view -d-none" role="region" aria-label="노트 상세 내용">
                <div className="ka-chatbot__history-detail-header">
                  <button className="ka-chatbot__history-back-button" aria-label="이전">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                    </svg>
                  </button>
                  <h3>노트 내용</h3>
                  <button className="ka-chatbot__history-close-button" aria-label="노트 목록 닫기">X</button>
                </div>
                <div className="ka-chatbot__history-detail-content">
                  <div className="ka-chatbot__message -sent">
                    <div className="ka-chatbot__message-bubble">
                      <p>https://www.example.com/article/long-text-to-summarize</p>
                    </div>
                  </div>
                  <div className="ka-chatbot__message -received">
                    <div className="ka-chatbot__message-bubble">
                      <p>해당 URL의 내용을 분석하고 있습니다. 잠시만 기다려주세요...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ka-chatbot__resizer" aria-label="크기 조절" role="separator" tabIndex={0}></div>

          <div className="ka-chatbot__main -initial" role="dialog" aria-labelledby="dialogTitle" aria-modal="true">
            <div className="ka-chatbot__main-inner" role="document" tabIndex={-1}>
              <main>
                <div role="log">
                  <div aria-live="polite" aria-relevant="additions" aria-atomic="false"></div>
                  <div className="ka-chatbot__header">
                    <button className="ka-chatbot__header-menu-button" aria-label="메뉴 열기" onClick={toggleMenu}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                      </svg>
                    </button>
                    <span className="ka-chatbot__title">AINO</span>
                    <div className="ka-chatbot__header-buttons">
                      <button className="ka-chatbot__button">
                        로그인
                      </button>
                    </div>
                  </div>
                  <div className="ka-chatbot__body">
                    <div className="ka-chatbot__initial-screen">
                      <div className="ka-chatbot__initial-screen-header">
                        <h1 className="_hidden" id="dialogTitle">AI 요약/번역 노트</h1>
                        <div className="ka-chatbot__app-logo"></div>
                        <h2 className="ka-chatbot__initial-screen-title">AINO가<br />당신의 기록을 도와드릴게요</h2>
                      </div>

                      <div className="ka-chatbot__swiper-container">
                        <Swiper
                          modules={[Navigation]}
                          spaceBetween={16}
                          slidesPerView={1}
                          navigation
                          breakpoints={{
                            701: {
                              slidesPerView: 4,
                              spaceBetween: 16
                            }
                          }}
                        >
                          <SwiperSlide>
                            <a href="#" className="ka-chatbot__suggestion-card">
                              <h3>URL 요약</h3>
                              <p>웹사이트 주소를 입력하고 핵심 내용을 요약해보세요.</p>
                            </a>
                          </SwiperSlide>
                          <SwiperSlide>
                            <a href="#" className="ka-chatbot__suggestion-card">
                              <h3>텍스트 번역</h3>
                              <p>궁금한 내용을 원하는 언어로 바로 번역할 수 있어요.</p>
                            </a>
                          </SwiperSlide>
                          <SwiperSlide>
                            <a href="#" className="ka-chatbot__suggestion-card">
                              <h3>키워드 추출</h3>
                              <p>긴 글의 핵심 키워드를 빠르게 파악하고 정리하세요.</p>
                            </a>
                          </SwiperSlide>
                          <SwiperSlide>
                            <a href="#" className="ka-chatbot__suggestion-card">
                              <h3>이미지 텍스트 변환</h3>
                              <p>이미지 속 글자를 텍스트로 변환하여 활용해보세요.</p>
                            </a>
                          </SwiperSlide>
                          <SwiperSlide>
                            <a href="#" className="ka-chatbot__suggestion-card">
                              <h3>PDF 내용 분석</h3>
                              <p>PDF 파일을 업로드하고 내용을 요약/번역 해보세요.</p>
                            </a>
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>

                    <div className="ka-chatbot__messages-wrapper" role="log" aria-live="polite" aria-relevant="additions" aria-atomic="false">
                      <div className="ka-chatbot__messages">
                      </div>
                    </div>
                  </div>

                  <div className="ka-chatbot__input-area" role="region" aria-label="메시지 작성">
                    <div className="ka-chatbot__file-attachment-area">
                    </div>
                    <div className="ka-chatbot__input-controls">
                      <button className="ka-chatbot__attach-button" aria-label="사진 및 파일 추가">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4s-4 1.79-4 4v12.5c0 2.76 2.24 5 5 5s5-2.24 5-5V6h-1.5z" />
                        </svg>
                      </button>
                      <textarea className="ka-chatbot__input" placeholder="요약, 번역할 내용을 입력하거나 파일을 첨부하세요." rows={1}></textarea>
                      <button className="ka-chatbot__send-button" aria-label="메시지 전송">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                      </button>
                    </div>
                    <button className="ka-chatbot__stop-button" aria-label="답변 중지하기">답변 중지</button>
                  </div>

                  <div className="ka-chatbot__header-end-buttons">
                    <button className="ka-chatbot__header-button -fullscreen" aria-label="전체 화면">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                      </svg>
                    </button>
                    <button className="ka-chatbot__header-button -close" aria-label="챗봇 닫기" onClick={closeChat}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </main>
            </div>
          </div>

          <div className="ka-chatbot__overlay"></div>
        </div>

        <button className={`ka-chatbot-fab ${isChatOpen ? '-d-none' : ''}`} aria-label="챗봇 열기" onClick={openChat}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default App
