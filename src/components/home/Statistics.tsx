'use client';

import { useEffect, useState, useRef } from 'react';
import { Building2, Users, Star, Calendar, Coffee, Wifi } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { statistics } from '@/data/cities';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Users,
  Star,
  Calendar,
  Coffee,
  Wifi,
};

function useCountUp(end: number, duration: number = 2000, shouldStart: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function (easeOutQuart)
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
}

function StatCard({ stat, isVisible }: { stat: typeof statistics[0]; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2000, isVisible);
  const Icon = iconMap[stat.icon];

  return (
    <Card className="text-center hover:shadow-md transition-shadow">
      <CardContent className="pt-6 pb-4">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
          {Icon && <Icon className="h-6 w-6 text-primary" />}
        </div>
        <div className="text-3xl font-bold text-primary mb-1">
          {count.toLocaleString()}
          {stat.suffix && <span className="text-xl">{stat.suffix}</span>}
        </div>
        <div className="text-sm font-medium">{stat.label}</div>
        {stat.subLabel && (
          <div className="text-xs text-muted-foreground mt-1">{stat.subLabel}</div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            📊 믿을 수 있는 노마드 커뮤니티
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            숫자로 보는 KoreaNomad의 성장
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statistics.map((stat) => (
            <StatCard key={stat.label} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
