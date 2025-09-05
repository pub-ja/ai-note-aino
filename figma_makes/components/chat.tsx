import { useState, useEffect } from 'react';
import { Send, Copy, Languages, FileText, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '안녕하세요! 생각 정리, 클립보드 번역, 노트 작성을 도와드릴게요. 오늘은 어떤 걸 도와드릴까요?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showClipboardToast, setShowClipboardToast] = useState(true);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: '네, 이해했습니다. 도와드릴게요. 이 대화를 노트로 만들어 드릴까요? 아니면 더 자세한 분석을 제공해드릴까요?',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Clipboard Toast */}
      {showClipboardToast && (
        <Alert className="m-4 mb-0 bg-blue-50 border-blue-200">
          <Copy className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 flex items-center justify-between">
            <span>복사한 텍스트를 요약할까요? "회의 내용 정리..."</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowClipboardToast(false)}
              className="h-auto p-1 text-blue-600 hover:text-blue-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground ml-12'
                  : 'bg-white border border-gray-200 mr-12'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2 whitespace-nowrap">
            <FileText className="h-4 w-4" />
            요약하기
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2 whitespace-nowrap">
            <Languages className="h-4 w-4" />
            번역하기
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2 whitespace-nowrap">
            <Copy className="h-4 w-4" />
            노트 저장
          </Button>
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2 items-center">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-1 rounded-full border-gray-300 focus:border-primary"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button
            onClick={sendMessage}
            size="sm"
            className="rounded-full w-10 h-10 p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}