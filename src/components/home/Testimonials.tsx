'use client';

import { Star, MapPin, Briefcase, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { testimonials } from '@/data/cities';
import { FadeIn } from '@/components/ui/motion';
import { TEST_IDS } from '@/config/test-ids';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-5 w-5 ${
            star <= rating
              ? 'text-yellow-500 fill-yellow-500'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20" data-testid={TEST_IDS.TESTIMONIALS}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              ⭐ 노마드들의 실제 후기
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              실제 노마드들이 경험한 생생한 이야기를 들어보세요
            </p>
          </div>
        </FadeIn>

        {/* Testimonials Carousel */}
        <FadeIn delay={0.2}>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      {/* Rating */}
                      <StarRating rating={testimonial.rating} />

                      {/* Content */}
                      <blockquote className="mt-4 text-muted-foreground leading-relaxed">
                        &ldquo;{testimonial.content}&rdquo;
                      </blockquote>

                      {/* Author Info */}
                      <div className="mt-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.author}</div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {testimonial.job}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {testimonial.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </FadeIn>

        {/* Mobile Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === 0 ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
