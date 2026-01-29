'use client';

import {
  DollarSign,
  Wifi,
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  Wind,
  Building2,
  Coffee,
  Car,
  Shield,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { City, CityDetail } from '@/types';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

interface CityInfoProps {
  city: City;
  detail: CityDetail;
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition) {
    case 'sunny':
      return <Sun className="h-6 w-6 text-yellow-500" />;
    case 'cloudy':
      return <Cloud className="h-6 w-6 text-gray-500" />;
    case 'rainy':
      return <CloudRain className="h-6 w-6 text-blue-500" />;
    case 'snowy':
      return <Snowflake className="h-6 w-6 text-cyan-500" />;
    default:
      return <Sun className="h-6 w-6 text-yellow-500" />;
  }
};

function ScoreBar({ score, maxScore = 5 }: { score: number; maxScore?: number }) {
  const percentage = (score / maxScore) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium w-8">{score}/{maxScore}</span>
    </div>
  );
}

export default function CityInfo({ city, detail }: CityInfoProps) {
  const basicInfoCards = [
    {
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      label: '월 생활비',
      value: `${Math.round(city.monthlyCost / 10000)}만원`,
      subValue: '평균',
    },
    {
      icon: <Wifi className="h-6 w-6 text-blue-500" />,
      label: '인터넷 속도',
      value: `${city.internetSpeed}Mbps`,
      subValue: '평균',
    },
    {
      icon: <WeatherIcon condition={city.weather.condition} />,
      label: '현재 날씨',
      value: `${city.weather.temp}°C`,
      subValue: city.weather.condition === 'sunny' ? '맑음' : city.weather.condition === 'cloudy' ? '흐림' : city.weather.condition === 'rainy' ? '비' : '눈',
    },
    {
      icon: <Wind className="h-6 w-6 text-emerald-500" />,
      label: '대기질',
      value: `AQI ${city.airQuality}`,
      subValue: city.airQuality <= 50 ? '좋음' : city.airQuality <= 100 ? '보통' : '나쁨',
    },
  ];

  const additionalInfoCards = [
    {
      icon: <Building2 className="h-6 w-6 text-purple-500" />,
      label: '코워킹 스페이스',
      value: `${detail.coworkingSpaces}개`,
    },
    {
      icon: <Coffee className="h-6 w-6 text-amber-600" />,
      label: '카페',
      value: `${detail.cafesCount}개+`,
    },
    {
      icon: <Car className="h-6 w-6 text-slate-500" />,
      label: '교통 편의성',
      score: detail.transportScore,
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      label: '안전성',
      score: detail.safetyScore,
    },
  ];

  return (
    <section className="space-y-12">
      {/* Basic Info Cards */}
      <div>
        <FadeIn>
          <h2 className="text-2xl font-bold mb-6">기본 정보</h2>
        </FadeIn>
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {basicInfoCards.map((item, index) => (
            <StaggerItem key={index}>
              <Card className="h-full">
                <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
                  <div className="mb-3">{item.icon}</div>
                  <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-xl sm:text-2xl font-bold">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.subValue}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Additional Info Cards */}
      <div>
        <FadeIn>
          <h2 className="text-2xl font-bold mb-6">추가 정보</h2>
        </FadeIn>
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {additionalInfoCards.map((item, index) => (
            <StaggerItem key={index}>
              <Card className="h-full">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {item.icon}
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                  {item.value ? (
                    <p className="text-xl font-bold">{item.value}</p>
                  ) : item.score !== undefined ? (
                    <ScoreBar score={item.score} />
                  ) : null}
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Description */}
      <FadeIn>
        <div>
          <h2 className="text-2xl font-bold mb-4">도시 소개</h2>
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">{detail.description}</p>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* Highlights */}
      <FadeIn>
        <div>
          <h2 className="text-2xl font-bold mb-4">주요 특징</h2>
          <div className="flex flex-wrap gap-3">
            {detail.highlights.map((highlight, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-4 py-2 text-sm"
              >
                ✨ {highlight}
              </Badge>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Tags */}
      <FadeIn>
        <div>
          <h2 className="text-2xl font-bold mb-4">태그</h2>
          <div className="flex flex-wrap gap-2">
            {city.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="px-3 py-1">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
