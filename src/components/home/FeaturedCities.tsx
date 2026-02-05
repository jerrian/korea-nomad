'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CityCard from './CityCard';
import { featuredCities } from '@/data/cities';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { TEST_IDS } from '@/config/test-ids';

export default function FeaturedCities() {
  return (
    <section id="featured-cities" className="py-20 bg-muted/30" data-testid={TEST_IDS.FEATURED_CITIES}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              🏆 인기 노마드 도시
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              실제 노마드들이 가장 많이 선택한 도시들을 만나보세요
            </p>
          </div>
        </FadeIn>

        {/* Cities Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredCities.map((city) => (
            <StaggerItem key={city.id}>
              <CityCard city={city} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA Button */}
        <FadeIn>
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
              <Link href="/cities">
                ✨ 모든 도시 둘러보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
