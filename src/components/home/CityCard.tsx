'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Wifi, Users, Sun, Cloud, CloudRain, Snowflake, Wind, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { City } from '@/types';

interface CityCardProps {
  city: City;
}

const badgeStyles = {
  HOT: 'bg-red-500 hover:bg-red-600',
  POPULAR: 'bg-yellow-500 hover:bg-yellow-600 text-black',
  TRENDING: 'bg-green-500 hover:bg-green-600',
  NEW: 'bg-blue-500 hover:bg-blue-600',
};

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition) {
    case 'sunny':
      return <Sun className="h-4 w-4 text-yellow-500" />;
    case 'cloudy':
      return <Cloud className="h-4 w-4 text-gray-500" />;
    case 'rainy':
      return <CloudRain className="h-4 w-4 text-blue-500" />;
    case 'snowy':
      return <Snowflake className="h-4 w-4 text-cyan-500" />;
    default:
      return <Sun className="h-4 w-4 text-yellow-500" />;
  }
};

export default function CityCard({ city }: CityCardProps) {
  const [likeCount, setLikeCount] = useState(city.likeCount);
  const [dislikeCount, setDislikeCount] = useState(city.dislikeCount);
  const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(null);

  const handleLike = () => {
    if (userAction === 'like') {
      // 좋아요 취소
      setLikeCount(prev => prev - 1);
      setUserAction(null);
    } else {
      // 좋아요 추가
      if (userAction === 'dislike') {
        // 싫어요가 활성화되어 있으면 취소
        setDislikeCount(prev => prev - 1);
      }
      setLikeCount(prev => prev + 1);
      setUserAction('like');
    }
  };

  const handleDislike = () => {
    if (userAction === 'dislike') {
      // 싫어요 취소
      setDislikeCount(prev => prev - 1);
      setUserAction(null);
    } else {
      // 싫어요 추가
      if (userAction === 'like') {
        // 좋아요가 활성화되어 있으면 취소
        setLikeCount(prev => prev - 1);
      }
      setDislikeCount(prev => prev + 1);
      setUserAction('dislike');
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={city.image}
          alt={city.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {city.badge && (
          <Badge className={`absolute top-3 left-3 ${badgeStyles[city.badge]}`}>
            {city.badge === 'HOT' && '🔥'} {city.badge}
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        {/* City Name */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold">{city.name}</h3>
          <p className="text-sm text-muted-foreground">{city.region}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{city.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">/5.0</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-muted-foreground">💵</span>
            <span className="font-medium">{Math.round(city.monthlyCost / 10000)}만원</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi className="h-4 w-4 text-primary" />
            <span className="font-medium">{city.internetSpeed}Mbps</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-medium">{city.nomadCount}명</span>
          </div>
        </div>

        {/* Weather & Air Quality */}
        <div className="flex items-center gap-4 text-sm mb-3 py-2 px-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-1.5">
            <WeatherIcon condition={city.weather.condition} />
            <span>{city.weather.temp}°C</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wind className="h-4 w-4 text-green-500" />
            <span>AQI {city.airQuality}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {city.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-3">
        {/* 좋아요/싫어요 버튼 */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-all duration-200 ${
              userAction === 'like' ? 'text-blue-500 dark:text-blue-400' : ''
            }`}
            aria-label="이 도시에 좋아요 표시"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDislike}
            className={`flex items-center gap-1.5 transition-all duration-200 ${
              userAction === 'dislike' ? 'text-red-500 dark:text-red-400' : ''
            }`}
            aria-label="이 도시에 싫어요 표시"
          >
            <ThumbsDown className="w-4 h-4" />
            <span>{dislikeCount}</span>
          </Button>
        </div>

        {/* 기존 자세히 보기 버튼 */}
        <Button asChild variant="outline" className="w-full">
          <Link href={`/cities/${city.id}`}>자세히 보기</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
