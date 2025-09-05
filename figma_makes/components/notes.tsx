import { useState } from 'react';
import { ArrowLeft, FileText, Tag, Link2, Calendar, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Note {
  id: string;
  title: string;
  snippet: string;
  date: string;
  keywords: string[];
  connections: string[];
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: '디자인팀 회의 요약',
    snippet: '새로운 앱 인터페이스와 사용자 플로우 개선 방안에 대해 논의했습니다...',
    date: '2024-01-15',
    keywords: ['디자인', 'UI/UX', '회의'],
    connections: ['프로젝트 계획', '팀 동기화']
  },
  {
    id: '2',
    title: '주간 회고',
    snippet: '이번 주는 생산적이었습니다. 모바일 앱 개발에서 좋은 진전을 보였어요...',
    date: '2024-01-14',
    keywords: ['회고', '진행상황', '모바일'],
    connections: ['개인 성장']
  },
  {
    id: '3',
    title: '사용자 리서치 노트',
    snippet: '노트 작성 습관에 대한 사용자 인터뷰에서 얻은 주요 발견사항들...',
    date: '2024-01-13',
    keywords: ['리서치', '사용자 인터뷰', '인사이트'],
    connections: ['사용자 조사', '제품 개발']
  }
];

export function Notes() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  if (selectedNote) {
    return (
      <div className="flex flex-col h-full bg-background">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedNote(null)}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="flex-1 truncate">{selectedNote.title}</h1>
        </div>

        {/* Note Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {new Date(selectedNote.date).toLocaleDateString()}
            </div>
            <p className="leading-relaxed">
              {selectedNote.snippet} 세부적인 내용을 살펴보면, 사용자 경험을 개선하기 위한 
              여러 방안들이 제시되었습니다. 특히 모바일 환경에서의 접근성과 직관적인 
              인터페이스 설계에 중점을 두어 논의를 진행했습니다.
            </p>
          </div>

          {/* AI Insights */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                AI 인사이트
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="flex items-center gap-2 text-sm mb-2">
                  <Tag className="h-4 w-4" />
                  키워드
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNote.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-sm mb-2">
                  <Link2 className="h-4 w-4" />
                  연결된 노트
                </h4>
                <div className="space-y-2">
                  {selectedNote.connections.map((connection, index) => (
                    <div key={index} className="text-sm text-blue-600 underline">
                      {connection}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <h1>노트</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          템플릿 적용
        </Button>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mockNotes.map((note) => (
          <Card 
            key={note.id} 
            className="cursor-pointer hover:shadow-md transition-shadow bg-white"
            onClick={() => setSelectedNote(note)}
          >
            <CardContent className="p-4">
              <h3 className="mb-2 text-base">{note.title}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {note.snippet}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{new Date(note.date).toLocaleDateString()}</span>
                <div className="flex gap-1">
                  {note.keywords.slice(0, 2).map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-1.5 py-0">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}