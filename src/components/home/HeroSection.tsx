'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { TEST_IDS } from '@/config/test-ids';

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      router.push(`/cities?q=${encodeURIComponent(query)}`);
    } else {
      router.push('/cities');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden" data-testid={TEST_IDS.HERO_SECTION}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/20" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative mx-auto px-4 py-16 text-center">
        {/* Main Headline */}
        <FadeIn delay={0.1}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-primary">🌍</span> 대한민국 어디서든
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              일하고 살 수 있는 자유
            </span>
          </h1>
        </FadeIn>

        {/* Subheadline */}
        <FadeIn delay={0.2}>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            디지털 노마드를 위한 최고의 한국 도시를 찾아보세요.
            <br className="hidden sm:block" />
            생활비, 인터넷, 날씨 정보를 한눈에 비교하세요.
          </p>
        </FadeIn>

        {/* Search Bar */}
        <FadeIn delay={0.3}>
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative flex items-center group">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <Input
                type="text"
                placeholder="어디로 떠나볼까요? (예: 제주, 부산, 강릉)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-12 pr-4 h-14 text-base rounded-full border-2 transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/20 focus:scale-[1.02]"
                data-testid={TEST_IDS.HERO_SEARCH}
              />
            </div>
          </div>
        </FadeIn>

        {/* CTA Button */}
        <FadeIn delay={0.4}>
          <Button
            size="lg"
            className="rounded-full px-8 h-12 text-base mb-12 transition-transform hover:scale-105"
            onClick={handleSearch}
            data-testid={TEST_IDS.HERO_CTA_BUTTON}
          >
            <MapPin className="mr-2 h-5 w-5" />
            도시 탐색하기
          </Button>
        </FadeIn>

        {/* Stats Badges */}
        <StaggerContainer staggerDelay={0.15} delay={0.5} className="flex flex-wrap justify-center gap-4 sm:gap-8">
          <StaggerItem>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur rounded-full px-5 py-3 shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold">50개+</p>
                <p className="text-xs text-muted-foreground">등록 도시</p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur rounded-full px-5 py-3 shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold">1,234명</p>
                <p className="text-xs text-muted-foreground">노마드 회원</p>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur rounded-full px-5 py-3 shadow-sm border">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold">3,456개</p>
                <p className="text-xs text-muted-foreground">실제 리뷰</p>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
