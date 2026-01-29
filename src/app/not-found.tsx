'use client';

import Link from 'next/link';
import { Home, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/ui/motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <FadeIn>
          <div className="mb-8">
            <span className="text-8xl font-bold text-primary/20">404</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-2xl font-bold mb-4">
            페이지를 찾을 수 없습니다
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-muted-foreground mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br />
            URL을 확인하시거나 아래 링크를 이용해주세요.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                홈으로 가기
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/cities">
                <MapPin className="mr-2 h-4 w-4" />
                도시 둘러보기
              </Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="text-muted-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              이전 페이지로
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
