import { Suspense } from 'react';
import CitiesContent from '@/components/cities/CitiesContent';

export default function CitiesPage() {
  return (
    <Suspense>
      <CitiesContent />
    </Suspense>
  );
}
