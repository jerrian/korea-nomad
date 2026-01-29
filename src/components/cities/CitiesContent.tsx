'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { allCities } from '@/data/cities';
import { useDebounce } from '@/hooks/useDebounce';
import SearchBar from '@/components/cities/SearchBar';
import FilterPanel, { Filters } from '@/components/cities/FilterPanel';
import CityGrid from '@/components/cities/CityGrid';
import { FadeIn } from '@/components/ui/motion';

export default function CitiesContent() {
  const searchParams = useSearchParams();
  const gridRef = useRef<HTMLDivElement>(null);
  const initialQuery = searchParams.get('q') ?? '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<Filters>({
    region: '전체',
    maxCost: null,
    minInternet: null,
    sortBy: 'rating',
  });

  const debouncedSearch = useDebounce(searchQuery, 300);

  // URL 검색어가 있으면 결과 영역으로 스크롤
  useEffect(() => {
    if (initialQuery && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [initialQuery]);

  const filteredCities = useMemo(() => {
    let result = [...allCities];

    // Search filter
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (city) =>
          city.name.toLowerCase().includes(query) ||
          city.region.toLowerCase().includes(query) ||
          city.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Region filter
    if (filters.region !== '전체') {
      result = result.filter((city) => city.region === filters.region);
    }

    // Cost filter
    if (filters.maxCost !== null) {
      result = result.filter((city) => city.monthlyCost <= filters.maxCost!);
    }

    // Internet filter
    if (filters.minInternet !== null) {
      result = result.filter((city) => city.internetSpeed >= filters.minInternet!);
    }

    // Sort
    switch (filters.sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'cost':
        result.sort((a, b) => a.monthlyCost - b.monthlyCost);
        break;
      case 'internet':
        result.sort((a, b) => b.internetSpeed - a.internetSpeed);
        break;
      case 'nomads':
        result.sort((a, b) => b.nomadCount - a.nomadCount);
        break;
    }

    return result;
  }, [debouncedSearch, filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <FadeIn>
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                  <span className="sr-only">홈으로</span>
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">도시 찾기</h1>
                <p className="text-muted-foreground">
                  {allCities.length}개 도시 중 {filteredCities.length}개 표시
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Search & Filters */}
          <FadeIn delay={0.1}>
            <div className="space-y-4">
              <div className="max-w-md">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="도시, 지역, 태그로 검색..."
                />
              </div>
              <FilterPanel filters={filters} onChange={setFilters} />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* City Grid */}
      <div ref={gridRef} className="container mx-auto px-4 py-8">
        <CityGrid cities={filteredCities} />
      </div>
    </div>
  );
}
