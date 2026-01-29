import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { allCities } from '@/data/cities';
import { getCityDetail, getCityReviews, getRelatedCities } from '@/data/cityDetails';
import CityHero from '@/components/city/CityHero';
import CityInfo from '@/components/city/CityInfo';
import CityReviews from '@/components/city/CityReviews';
import RelatedCities from '@/components/city/RelatedCities';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = allCities.find((c) => c.id === slug);

  if (!city) {
    return { title: '도시를 찾을 수 없습니다 - KoreaNomad' };
  }

  return {
    title: `${city.name} - KoreaNomad`,
    description: `${city.name}의 디지털 노마드 정보를 확인하세요. 생활비 ${Math.round(city.monthlyCost / 10000)}만원, 인터넷 ${city.internetSpeed}Mbps, ${city.nomadCount}명의 노마드가 활동 중입니다.`,
    openGraph: {
      title: `${city.name} - KoreaNomad`,
      description: `${city.name}의 디지털 노마드 정보`,
      images: [city.image],
    },
  };
}

export function generateStaticParams() {
  return allCities.map((city) => ({
    slug: city.id,
  }));
}

export default async function CityDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const city = allCities.find((c) => c.id === slug);

  if (!city) {
    notFound();
  }

  const detail = getCityDetail(slug);
  const reviews = getCityReviews(slug);
  const relatedCityIds = getRelatedCities(slug, 4);
  const relatedCities = allCities.filter((c) => relatedCityIds.includes(c.id));

  return (
    <main className="min-h-screen bg-background">
      <CityHero city={city} />
      <div className="container mx-auto px-4 py-12 space-y-16">
        {detail && <CityInfo city={city} detail={detail} />}
        {reviews.length > 0 && <CityReviews reviews={reviews} />}
        {relatedCities.length > 0 && <RelatedCities cities={relatedCities} />}
      </div>
    </main>
  );
}
