'use client';

import { City } from '@/types';
import CityCard from '@/components/home/CityCard';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

interface RelatedCitiesProps {
  cities: City[];
}

export default function RelatedCities({ cities }: RelatedCitiesProps) {
  if (cities.length === 0) {
    return null;
  }

  return (
    <section>
      <FadeIn>
        <h2 className="text-2xl font-bold mb-6">비슷한 도시 추천</h2>
      </FadeIn>

      <StaggerContainer
        staggerDelay={0.1}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {cities.map((city) => (
          <StaggerItem key={city.id}>
            <CityCard city={city} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
