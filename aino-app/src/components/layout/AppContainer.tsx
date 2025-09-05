import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function AppContainer() {
    const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => {
    setIsChatOpen(false);
    setIsFullScreen(false);
  };
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  // AINO App is a fixed container on the screen
  const appContainerStyles = `
    fixed bottom-6 right-6 rounded-2xl shadow-xl transition-all duration-300 ease-in-out
    ${isFullScreen ? 'w-full h-full top-0 left-0 right-0 bottom-0 rounded-none' : 'w-[440px] h-[700px]'}
    ${isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
  `;

  return (
    <>
      <div className={appContainerStyles}>
        <div className="flex h-full w-full bg-white overflow-hidden rounded-2xl">
          {/* --- Icon Sidebar --- */}
          <div className="flex-shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col w-16 items-center py-4 space-y-4 z-30">
            <button className="p-2 rounded-lg hover:bg-gray-200" aria-label="사이드바 토글" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
            </button>
            <nav className="flex flex-col space-y-2">{/* Menu items here */}</nav>
            <div className="flex-grow"></div>
            <button type="button" className="p-2 rounded-lg hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
          </div>

          {/* --- Expanded Menu (Push/Overlay Logic) --- */}
          <div className={`bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out ${isMenuOpen ? 'w-72' : 'w-0'} ${isFullScreen ? '' : 'absolute left-16 h-full z-20'}`}>
            <div className={`flex items-center justify-between p-3 border-b flex-shrink-0 ${isMenuOpen ? '' : 'hidden'}`}>
              <h3 className="text-lg font-bold">메뉴</h3>
              <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="메뉴 닫기" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
              </button>
            </div>
            <div className={`flex-grow overflow-y-auto ${isMenuOpen ? '' : 'hidden'}`}>
              <ul className="py-2">
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-50">노트 목록</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-50">설정</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-50">도움말</a></li>
              </ul>
            </div>
          </div>

          {/* --- Main Content --- */}
          <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
            {/* Header */}
            <div className="flex items-center justify-between flex-shrink-0 p-3 border-b bg-white">
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 hidden" aria-label="메뉴 열기" onClick={toggleMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
                </button>
                <span className="text-lg font-bold text-gray-800">AINO</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">로그인</button>
                <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="전체 화면" onClick={toggleFullScreen}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="챗봇 닫기" onClick={closeChat}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              <div className="flex flex-col items-center justify-center text-center h-full">
                <div className="ka-chatbot__app-logo mb-4"></div>
                <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-4">AINO가<br />당신의 기록을 도와드릴게요</h2>
                <div className="w-full max-w-4xl">
                  <Swiper modules={[Navigation]} spaceBetween={16} slidesPerView={1} navigation breakpoints={{ 701: { slidesPerView: 4, spaceBetween: 16 } }}>
                    <SwiperSlide>
                      <a href="#" className="block p-5 h-40 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <h3 className="text-blue-600 font-semibold mb-2">URL 요약</h3>
                        <p className="text-sm text-gray-600 leading-normal">웹사이트 주소를 입력하고 핵심 내용을 요약해보세요.</p>
                      </a>
                    </SwiperSlide>
                    <SwiperSlide>
                      <a href="#" className="block p-5 h-40 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <h3 className="text-blue-600 font-semibold mb-2">텍스트 번역</h3>
                        <p className="text-sm text-gray-600 leading-normal">궁금한 내용을 원하는 언어로 바로 번역할 수 있어요.</p>
                      </a>
                    </SwiperSlide>
                    <SwiperSlide>
                      <a href="#" className="block p-5 h-40 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <h3 className="text-blue-600 font-semibold mb-2">키워드 추출</h3>
                        <p className="text-sm text-gray-600 leading-normal">긴 글의 핵심 키워드를 빠르게 파악하고 정리하세요.</p>
                      </a>
                    </SwiperSlide>
                    <SwiperSlide>
                      <a href="#" className="block p-5 h-40 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <h3 className="text-blue-600 font-semibold mb-2">이미지 텍스트 변환</h3>
                        <p className="text-sm text-gray-600 leading-normal">이미지 속 글자를 텍스트로 변환하여 활용해보세요.</p>
                      </a>
                    </SwiperSlide>
                    <SwiperSlide>
                      <a href="#" className="block p-5 h-40 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <h3 className="text-blue-600 font-semibold mb-2">PDF 내용 분석</h3>
                        <p className="text-sm text-gray-600 leading-normal">PDF 파일을 업로드하고 내용을 요약/번역 해보세요.</p>
                      </a>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4s-4 1.79-4 4v12.5c0 2.76 2.24 5 5 5s5-2.24 5-5V6h-1.5z" /></svg></button>
                <textarea className="w-full px-3 py-2 border rounded-lg resize-none" placeholder="요약, 번역할 내용을 입력하거나 파일을 첨부하세요." rows={1}></textarea>
                <button className="p-2 rounded-lg hover:bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAB to open chat */}
      <button className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center z-50 shadow-lg transition-opacity ${isChatOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} aria-label="챗봇 열기" onClick={openChat}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
      </button>
    </>
  )
}

export default AppContainer;
