'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Wifi, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { City } from '@/types';
import { FadeIn } from '@/components/ui/motion';

interface CityHeroProps {
  city: City;
}

const badgeStyles = {
  HOT: 'bg-red-500 hover:bg-red-600',
  POPULAR: 'bg-yellow-500 hover:bg-yellow-600 text-black',
  TRENDING: 'bg-green-500 hover:bg-green-600',
  NEW: 'bg-blue-500 hover:bg-blue-600',
};

export default function CityHero({ city }: CityHeroProps) {
  return (
    <section className="relative h-[40vh] min-h-[300px] max-h-[500px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={city.image}
        alt={city.name}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
        {/* Top: Back Button */}
        <FadeIn delay={0.1}>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-fit text-white hover:bg-white/20"
          >
            <Link href="/cities">
              <ArrowLeft className="mr-2 h-4 w-4" />
              도시 목록
            </Link>
          </Button>
        </FadeIn>

        {/* Bottom: City Info */}
        <div className="space-y-4">
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-3">
              {city.badge && (
                <Badge className={badgeStyles[city.badge]}>
                  {city.badge === 'HOT' && '🔥'} {city.badge}
                </Badge>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                {city.name}
              </h1>
              <p className="text-lg sm:text-xl text-white/80">{city.region}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{city.rating.toFixed(1)}</span>
                <span className="text-white/70">/5.0</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Wifi className="h-5 w-5" />
                <span className="font-semibold">{city.internetSpeed}Mbps</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="h-5 w-5" />
                <span className="font-semibold">{city.nomadCount}명</span>
                <span className="text-white/70">노마드</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
