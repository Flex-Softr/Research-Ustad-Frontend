import { User } from 'lucide-react';

interface PlaceholderAvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export default function PlaceholderAvatar({ name, size = 128, className = '' }: PlaceholderAvatarProps) {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div 
      className={`bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold ${className}`}
      style={{ width: size, height: size }}
    >
      {initials || <User className="w-8 h-8" />}
    </div>
  );
} 