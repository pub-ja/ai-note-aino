import { MessageSquare, FileText, BookOpen, Calendar } from 'lucide-react';

type Page = 'chat' | 'notes' | 'diary' | 'calendar';

interface BottomNavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const navItems = [
  { id: 'chat' as Page, label: '채팅', icon: MessageSquare },
  { id: 'notes' as Page, label: '노트', icon: FileText },
  { id: 'diary' as Page, label: '일기', icon: BookOpen },
  { id: 'calendar' as Page, label: '캘린더', icon: Calendar }
];

export function BottomNavigation({ currentPage, onPageChange }: BottomNavigationProps) {
  return (
    <div className="bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-primary bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-primary' : ''}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}