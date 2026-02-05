'use client';

import { Target, BarChart3, Users, Map, Calculator, Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { features } from '@/data/cities';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';
import { TEST_IDS } from '@/config/test-ids';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  BarChart3,
  Users,
  Map,
  Calculator,
  Camera,
};

export default function Features() {
  return (
    <section className="py-20 bg-muted/30" data-testid={TEST_IDS.FEATURES}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              ✨ 왜 KoreaNomad인가요?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              디지털 노마드를 위한 최고의 기능들을 만나보세요
            </p>
          </div>
        </FadeIn>

        {/* Features Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <StaggerItem key={feature.title}>
                <Card
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/30 h-full"
                >
                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      {Icon && <Icon className="h-7 w-7 text-primary" />}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
