import { useState } from 'react';
import { Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const emotionChips = [
  { emoji: '😊', label: '기쁨', color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700' },
  { emoji: '😐', label: '보통', color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600' },
  { emoji: '😢', label: '슬픔', color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700' },
  { emoji: '🔥', label: '도전', color: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700' },
  { emoji: '😤', label: '답답함', color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700' },
  { emoji: '😌', label: '평온', color: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700' }
];

export function Diary() {
  const [diaryText, setDiaryText] = useState('');
  const [spellingCorrection, setSpellingCorrection] = useState(true);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const saveDiary = () => {
    if (diaryText.trim()) {
      setShowFeedback(true);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <h1>내 일기</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className={spellingCorrection ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
            맞춤법 교정
          </span>
          <Switch 
            checked={spellingCorrection} 
            onCheckedChange={setSpellingCorrection}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Text Input */}
        <div className="space-y-3">
          <Textarea
            value={diaryText}
            onChange={(e) => setDiaryText(e.target.value)}
            placeholder="오늘 하루를 기록해보세요. 생각, 경험, 감정을 자유롭게 써보세요..."
            className="min-h-[200px] resize-none text-base leading-relaxed border-gray-200 focus:border-primary"
          />
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {diaryText.length}자
          </div>
        </div>

        {/* Emotion Tags */}
        <div className="space-y-3">
          <h3 className="text-sm">오늘 기분은 어떠세요?</h3>
          <div className="flex flex-wrap gap-2">
            {emotionChips.map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleEmotionToggle(chip.label)}
                className={`px-3 py-2 rounded-full text-sm border transition-all ${
                  selectedEmotions.includes(chip.label)
                    ? chip.color
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
                }`}
              >
                <span className="mr-1">{chip.emoji}</span>
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* AI Feedback Card */}
        {showFeedback && (
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-blue-700">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                AI 피드백
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm mb-1">긍정적인 패턴</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    오늘은 '성장'이라는 단어가 많이 보였어요. 이번 주 꾸준히 
                    일기를 작성하며 자기 성찰을 하고 계시네요.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm mb-1">부드러운 제안</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    오늘의 감정을 불러일으킨 구체적인 상황을 더 탐구해보시면 
                    시간이 지나면서 패턴을 파악할 수 있을 거예요.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-blue-100 dark:bg-gray-800 dark:border-blue-700">
                <h4 className="text-sm mb-2">추천 활동</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• 5분 마음챙김 명상 해보기</li>
                  <li>• 이번 주 비슷한 일기 다시 읽어보기</li>
                  <li>• 내일을 위한 작은 목표 세우기</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Save Button */}
        <Button 
          onClick={saveDiary}
          className="w-full"
          disabled={!diaryText.trim()}
        >
          일기 저장하기
        </Button>
      </div>
    </div>
  );
}
