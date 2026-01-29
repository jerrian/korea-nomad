'use client';

import { Search, BarChart3, Plane, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

const steps = [
  {
    number: '①',
    icon: Search,
    title: '탐색하기',
    description: '50개 이상의 도시를 필터링하고 검색해 당신에게 완벽한 곳을 찾아보세요',
    features: ['15개 필터', '실시간 검색', 'AI 추천'],
  },
  {
    number: '②',
    icon: BarChart3,
    title: '비교하기',
    description: '생활비, 인터넷, 날씨 등 다양한 조건으로 도시를 비교해보세요',
    features: ['상세 비교', '실시간 데이터', '사용자 리뷰'],
  },
  {
    number: '③',
    icon: Plane,
    title: '떠나기',
    description: '커뮤니티에 참여하고 실제 노마드들과 정보를 공유하며 여정을 시작하세요',
    features: ['커뮤니티', '모임 참여', '네트워킹'],
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              💡 이렇게 시작하세요
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              3단계로 완벽한 노마드 도시를 찾아보세요
            </p>
          </div>
        </FadeIn>

        {/* Steps */}
        <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines (Desktop) */}
          <div className="hidden md:block absolute top-24 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary/50 to-primary/50" />
          <div className="hidden md:block absolute top-24 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary/50 to-primary/50" />

          {steps.map((step, index) => (
            <StaggerItem key={step.title}>
              <Card className="relative border-2 hover:border-primary/50 transition-colors h-full">
                {/* Step Number Badge */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                    {index + 1}
                  </div>
                </div>

                <CardContent className="pt-10 pb-6 px-6 text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 text-sm">
                    {step.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {step.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                      >
                        • {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>

                {/* Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center py-4">
                    <ArrowRight className="h-6 w-6 text-primary rotate-90" />
                  </div>
                )}
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
