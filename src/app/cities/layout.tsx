import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: '도시 찾기',
  description:
    '대한민국 16개 이상의 디지털 노마드 도시를 탐색하세요. 생활비, 인터넷 속도, 노마드 커뮤니티 정보를 한눈에 비교할 수 있습니다.',
  openGraph: {
    title: '도시 찾기 | KoreaNomad',
    description: '대한민국 디지털 노마드 도시를 탐색하고 비교하세요',
    url: 'https://koreanomad.com/cities',
  },
};

export default function CitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
