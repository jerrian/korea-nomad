'use client';

import { City } from '@/types';
import CityCard from '@/components/home/CityCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/motion';

interface CityGridProps {
  cities: City[];
}

export default function CityGrid({ cities }: CityGridProps) {
  if (cities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">검색 결과가 없습니다.</p>
        <p className="text-sm text-muted-foreground mt-2">
          다른 검색어나 필터를 시도해보세요.
        </p>
      </div>
    );
  }

  return (
    <StaggerContainer
      key={cities.map((c) => c.id).join(',')}
      staggerDelay={0.05}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {cities.map((city) => (
        <StaggerItem key={city.id}>
          <CityCard city={city} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
