'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Mail, CreditCard, RefreshCw, Shield, Rocket, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeIn } from '@/components/ui/motion';

function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Reset status
    setStatus('idle');
    setErrorMessage('');

    // Validate email
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('이메일을 입력해주세요');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('올바른 이메일 형식이 아닙니다');
      return;
    }

    // Success (MVP: 실제 전송 없이 성공 처리)
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        {/* Headline */}
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            🚀 오늘부터 노마드 라이프 시작!
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-10">
            무료로 가입하고 당신만의 완벽한 도시를 찾아보세요
          </p>
        </FadeIn>

        {/* Email Form */}
        <FadeIn delay={0.2}>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder="이메일 주소를 입력하세요"
                  className={`pl-10 h-12 bg-background text-foreground ${
                    status === 'error' ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                />
              </div>
              <Button type="submit" size="lg" variant="secondary" className="h-12 px-6">
                <Rocket className="mr-2 h-4 w-4" />
                무료로 시작하기
              </Button>
            </div>
          </form>

          {/* Status Messages */}
          {status === 'error' && (
            <div className="flex items-center justify-center gap-2 text-red-200 mb-4">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}

          {status === 'success' && (
            <div className="flex items-center justify-center gap-2 text-green-200 mb-4">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">가입이 완료되었습니다! 환영합니다 🎉</span>
            </div>
          )}
        </FadeIn>

        {/* Login Link */}
        <FadeIn delay={0.3}>
          <p className="text-sm opacity-80 mb-8">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="underline hover:no-underline font-medium">
              로그인
            </Link>
          </p>
        </FadeIn>

        {/* Trust Badges */}
        <FadeIn delay={0.4}>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 opacity-90">
              <CreditCard className="h-4 w-4" />
              <span>신용카드 필요 없음</span>
            </div>
            <div className="flex items-center gap-2 opacity-90">
              <RefreshCw className="h-4 w-4" />
              <span>언제든지 취소 가능</span>
            </div>
            <div className="flex items-center gap-2 opacity-90">
              <Shield className="h-4 w-4" />
              <span>개인정보 보호 보장</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
