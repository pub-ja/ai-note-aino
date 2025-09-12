import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { cn } from '../ui/utils';

// Define types and data right inside the component or outside if they don't depend on props
type Page = 'chat' | 'notes' | 'diary' | 'calendar';

const onboardingSlides = [
  {
    title: "복사만 하면 바로 요약/번역",
    description: "클립보드 내용을 AI가 자동으로 감지하여 즉시 요약하고 번역합니다",
  },
  {
    title: "노트, 일기, 회고까지 이어지는 AI",
    description: "생각을 체계적인 노트로 정리하고 AI 인사이트로 연결점을 발견하세요",
  },
  {
    title: "감정 추적과 개인 맞춤 피드백",
    description: "일상을 기록하고 AI로부터 개인화된 피드백과 성장 인사이트를 받아보세요",
  }
];

const navItems = [
  { id: 'chat' as Page, label: '채팅' },
  { id: 'notes' as Page, label: '노트' },
  { id: 'diary' as Page, label: '일기' },
  { id: 'calendar' as Page, label: '캘린더' }
];


function AppContainer() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeView, setActiveView] = useState<Page>('chat');
  const [chatInput, setChatInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [chatInput]);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => {
    setIsChatOpen(false);
    setIsFullScreen(false);
  };
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const shouldBeFullScreen = isFullScreen || isMobile;

  return (
    <>
      <div
        className={cn(
          '@container fixed transition-all duration-300 ease-in-out',
          {
            'opacity-100 translate-y-0': isChatOpen,
            'opacity-0 translate-y-10 pointer-events-none': !isChatOpen,
          },
          !isMobile && 'shadow-xl',
          shouldBeFullScreen
            ? 'w-full h-full top-0 left-0 right-0 bottom-0 rounded-none'
            : 'bottom-6 right-6 w-[440px] h-[700px] rounded-2xl'
        )}
      >
        <div className={cn(
          "flex h-full w-full bg-white overflow-hidden",
          shouldBeFullScreen ? 'rounded-none' : 'rounded-2xl'
        )}>
          {/* --- Icon Sidebar --- */}
          <div className={cn(
            "flex-shrink-0 bg-gray-50 border-r border-gray-200 flex-col w-16 items-center py-4 space-y-4 z-30",
            (isFullScreen && !isMobile) ? 'flex' : 'hidden'
          )}>
            <button className="p-2 rounded-lg hover:bg-gray-200" aria-label="사이드바 토글" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
            </button>
            <nav className="flex flex-col items-center space-y-2">
              {navItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={cn(
                      'flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors',
                      {
                        'bg-blue-100 text-blue-600': isActive,
                        'text-gray-600 hover:bg-gray-200': !isActive,
                      }
                    )}
                    aria-label={item.label}
                  >
                    <div className="w-6 h-6 border-2 border-gray-400 rounded-sm flex items-center justify-center text-xs font-bold text-gray-400">
                      {item.label.charAt(0)}
                    </div>
                    <span className="text-xs mt-1">{item.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="flex-grow"></div>
            <button type="button" className="p-2 rounded-lg hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
          </div>

          {/* --- Expanded Menu (Push/Overlay Logic) --- */}
          <div
            className={cn(
              'bg-white border-r border-gray-200 flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out',
              {
                'w-full @md:w-72': isMenuOpen,
                'w-0': !isMenuOpen,
                'absolute left-0 h-full z-20': !isFullScreen || isMobile,
              }
            )}
          >
            <div
              className={cn(
                'flex items-center justify-between p-3 border-b flex-shrink-0',
                { hidden: !isMenuOpen }
              )}
            >
              <h3 className="text-lg font-bold">메뉴</h3>
              <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="메뉴 닫기" onClick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
              </button>
            </div>
            <div className={cn('flex-grow overflow-y-auto', { hidden: !isMenuOpen })}>
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
                <button className={cn("p-2 rounded-lg hover:bg-gray-100", { 'hidden': isFullScreen && !isMobile })} aria-label="메뉴 열기" onClick={toggleMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
                </button>
                <span className="text-lg font-bold text-gray-800">AINO</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">로그인</button>
                <button
                  className={cn('p-2 rounded-lg hover:bg-gray-100',
                    {
                      hidden: isMobile,
                    }
                  )}
                  aria-label="전체 화면"
                  onClick={toggleFullScreen}
                >
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
                  <Swiper modules={[Navigation]} spaceBetween={16} slidesPerView={1} navigation breakpoints={{ 701: { slidesPerView: 3, spaceBetween: 16 } }}>
                    {onboardingSlides.map((slide, index) => (
                      <SwiperSlide key={index}>
                        <a href="#" className="block p-5 h-40 text-left bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                          <h3 className="text-blue-600 font-semibold mb-2">{slide.title}</h3>
                          <p className="text-sm text-gray-600 leading-normal">{slide.description}</p>
                        </a>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="flex-shrink-0 p-4 border-t bg-white">
              <div className="flex items-end space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4s-4 1.79-4 4v12.5c0 2.76 2.24 5 5 5s5-2.24 5-5V6h-1.5z" /></svg></button>
                <textarea
                  ref={textareaRef}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg resize-none max-h-40"
                  placeholder="요약, 번역할 내용을 입력하거나 파일을 첨부하세요."
                  rows={1}
                />
                <button className="p-2 rounded-lg hover:bg-gray-100 self-end"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAB to open chat */}
      <button
        className={cn(
          'fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center z-50 shadow-lg transition-opacity',
          {
            'opacity-0 pointer-events-none': isChatOpen,
            'opacity-100': !isChatOpen,
          }
        )}
        aria-label="챗봇 열기"
        onClick={openChat}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
      </button>
    </>
  )
}

export default AppContainer;
