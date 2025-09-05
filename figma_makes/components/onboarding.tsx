import { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, FileText, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { DarkModeToggle } from './dark-mode-toggle';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: MessageSquare,
    title: "복사만 하면 바로 요약/번역",
    description: "클립보드 내용을 AI가 자동으로 감지하여 즉시 요약하고 번역합니다",
    image: "💬"
  },
  {
    icon: FileText,
    title: "노트, 일기, 회고까지 이어지는 AI",
    description: "생각을 체계적인 노트로 정리하고 AI 인사이트로 연결점을 발견하세요",
    image: "📝"
  },
  {
    icon: Calendar,
    title: "감정 추적과 개인 맞춤 피드백",
    description: "일상을 기록하고 AI로부터 개인화된 피드백과 성장 인사이트를 받아보세요",
    image: "📊"
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background px-6 py-8">
      {/* Header with Dark Mode Toggle */}
      <div className="flex justify-end mb-4">
        <DarkModeToggle />
      </div>

      {/* Progress Indicator */}
      <div className="flex space-x-2 mb-8">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-colors ${
              index <= currentSlide ? 'bg-primary' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-6xl mb-8">
          {slides[currentSlide].image}
        </div>
        
        <h1 className="text-2xl mb-4 text-foreground">
          {slides[currentSlide].title}
        </h1>
        
        <p className="text-gray-600 mb-12 max-w-sm leading-relaxed">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          이전
        </Button>

        {currentSlide === slides.length - 1 ? (
          <Button onClick={onComplete} className="px-8">
            시작하기
          </Button>
        ) : (
          <Button onClick={nextSlide} className="flex items-center gap-2 px-8">
            다음
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}