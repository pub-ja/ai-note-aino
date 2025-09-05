import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface DayData {
  date: number;
  emotion: 'happy' | 'neutral' | 'sad' | 'excited' | 'frustrated' | 'calm' | null;
  intensity: number;
}

const emotionColors = {
  happy: 'bg-green-400 dark:bg-green-500',
  neutral: 'bg-gray-300 dark:bg-gray-500',
  sad: 'bg-blue-400 dark:bg-blue-500',
  excited: 'bg-orange-400 dark:bg-orange-500',
  frustrated: 'bg-red-400 dark:bg-red-500',
  calm: 'bg-purple-400 dark:bg-purple-500'
};

const emotionEmojis = {
  happy: '😊',
  neutral: '😐',
  sad: '😢',
  excited: '🔥',
  frustrated: '😤',
  calm: '😌'
};

const mockCalendarData: DayData[] = Array.from({ length: 31 }, (_, i) => ({
  date: i + 1,
  emotion: i % 7 === 0 ? null : (['happy', 'neutral', 'sad', 'excited', 'frustrated', 'calm'] as const)[Math.floor(Math.random() * 6)],
  intensity: Math.floor(Math.random() * 5) + 1
}));

const weeklyTrendData = [
  { day: '월', mood: 7 },
  { day: '화', mood: 6 },
  { day: '수', mood: 8 },
  { day: '목', mood: 5 },
  { day: '금', mood: 9 },
  { day: '토', mood: 8 },
  { day: '일', mood: 7 }
];

export function Calendar() {
  const [currentMonth] = useState('January 2024');
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  const getDaysInMonth = () => {
    const days = [];
    const firstDayOfWeek = 2; // Assuming January 1st, 2024 is a Monday (1)
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= 31; i++) {
      days.push(mockCalendarData[i - 1]);
    }
    
    return days;
  };

  const getEmotionLabel = (emotion: string) => {
    const emotionLabels: Record<string, string> = {
      happy: '기쁨',
      neutral: '보통',
      sad: '슬픔',
      excited: '도전',
      frustrated: '답답함',
      calm: '평온'
    };
    return emotionLabels[emotion] || emotion;
  };

  if (selectedDay) {
    return (
      <div className="flex flex-col h-full bg-background">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 bg-card border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedDay(null)}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="flex-1">2024년 1월 {selectedDay.date}일</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Day Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  selectedDay.emotion ? emotionColors[selectedDay.emotion] : 'bg-muted'
                }`}>
                  {selectedDay.emotion ? emotionEmojis[selectedDay.emotion] : '📝'}
                </div>
                <div>
                  <h3 className="text-lg">
                    {selectedDay.emotion ? getEmotionLabel(selectedDay.emotion) : '기록 없음'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedDay.emotion ? `강도: ${selectedDay.intensity}/5` : '첫 번째 일기를 작성해보세요'}
                  </p>
                </div>
              </div>
              
              {selectedDay.emotion && (
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">
                    "새로운 프로젝트 작업으로 생산적인 하루를 보냈다. 팀으로서 
                    우리가 만들어가는 진전에 대해 낙관적으로 느끼고 있다..."
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weekly Trend */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">주간 감정 추이</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyTrendData}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#2563EB" 
                      strokeWidth={2}
                      dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>낮은 기분</span>
                <span>높은 기분</span>
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-blue-700">
            <CardContent className="p-4">
              <h4 className="text-sm mb-3">주간 인사이트</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 금요일에 기분이 최고조였네요 - 한 주를 멋지게 마무리!</li>
                <li>• 목요일에 에너지가 낮았어요 - 어떤 요인이 영향을 줬는지 생각해보세요</li>
                <li>• 전반적으로 긍정적이고 일관성 있는 추세를 보이고 있어요</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <Button variant="ghost" size="sm" className="p-2">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1>2024년 1월</h1>
        <Button variant="ghost" size="sm" className="p-2">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 p-4">
        <Card className="overflow-hidden">
          {/* Week Days Header */}
          <div className="grid grid-cols-7 bg-muted border-b border-border">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div key={day} className="p-3 text-center text-sm text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {getDaysInMonth().map((day, index) => (
              <button
                key={index}
                onClick={() => day && setSelectedDay(day)}
                className="aspect-square p-2 border-b border-r border-border hover:bg-muted/50 transition-colors relative"
                disabled={!day}
              >
                {day && (
                  <>
                    <span className="text-sm">{day.date}</span>
                    {day.emotion && (
                      <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full ${emotionColors[day.emotion]}`} />
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Legend */}
        <Card className="mt-4">
          <CardContent className="p-4">
            <h4 className="text-sm mb-3">감정 색상</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(emotionColors).map(([emotion, color]) => {
                return (
                  <div key={emotion} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${color}`} />
                    <span>{getEmotionLabel(emotion)}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}