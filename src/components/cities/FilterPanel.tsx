'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { regions } from '@/data/cities';

export interface Filters {
  region: string;
  maxCost: number | null;
  minInternet: number | null;
  sortBy: 'rating' | 'cost' | 'internet' | 'nomads';
}

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const costOptions = [
  { label: '전체', value: null },
  { label: '150만원 이하', value: 1500000 },
  { label: '160만원 이하', value: 1600000 },
  { label: '170만원 이하', value: 1700000 },
];

const internetOptions = [
  { label: '전체', value: null },
  { label: '400Mbps 이상', value: 400 },
  { label: '500Mbps 이상', value: 500 },
  { label: '700Mbps 이상', value: 700 },
];

const sortOptions = [
  { label: '평점순', value: 'rating' as const },
  { label: '생활비순', value: 'cost' as const },
  { label: '인터넷순', value: 'internet' as const },
  { label: '노마드 수', value: 'nomads' as const },
];

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const activeFiltersCount = [
    filters.region !== '전체',
    filters.maxCost !== null,
    filters.minInternet !== null,
  ].filter(Boolean).length;

  const resetFilters = () => {
    onChange({
      region: '전체',
      maxCost: null,
      minInternet: null,
      sortBy: 'rating',
    });
  };

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3">
        {/* Region Filter */}
        <select
          value={filters.region}
          onChange={(e) => onChange({ ...filters, region: e.target.value })}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        {/* Cost Filter */}
        <select
          value={filters.maxCost ?? ''}
          onChange={(e) => onChange({ ...filters, maxCost: e.target.value ? Number(e.target.value) : null })}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {costOptions.map((option) => (
            <option key={option.label} value={option.value ?? ''}>
              생활비: {option.label}
            </option>
          ))}
        </select>

        {/* Internet Filter */}
        <select
          value={filters.minInternet ?? ''}
          onChange={(e) => onChange({ ...filters, minInternet: e.target.value ? Number(e.target.value) : null })}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {internetOptions.map((option) => (
            <option key={option.label} value={option.value ?? ''}>
              인터넷: {option.label}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value as Filters['sortBy'] })}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              정렬: {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">적용된 필터:</span>

          {filters.region !== '전체' && (
            <Badge variant="secondary" className="gap-1">
              {filters.region}
              <button onClick={() => onChange({ ...filters, region: '전체' })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.maxCost !== null && (
            <Badge variant="secondary" className="gap-1">
              {(filters.maxCost / 10000).toFixed(0)}만원 이하
              <button onClick={() => onChange({ ...filters, maxCost: null })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.minInternet !== null && (
            <Badge variant="secondary" className="gap-1">
              {filters.minInternet}Mbps 이상
              <button onClick={() => onChange({ ...filters, minInternet: null })}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-6 text-xs">
            전체 초기화
          </Button>
        </div>
      )}
    </div>
  );
}
