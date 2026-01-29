'use client';

import { Star, ThumbsUp, ThumbsDown, User, Briefcase, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CityReview } from '@/types';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/motion';

interface CityReviewsProps {
  reviews: CityReview[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function CityReviews({ reviews }: CityReviewsProps) {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      reviews.length > 0
        ? (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100
        : 0,
  }));

  return (
    <section>
      <FadeIn>
        <h2 className="text-2xl font-bold mb-6">
          노마드 리뷰 ({reviews.length}개)
        </h2>
      </FadeIn>

      {/* Rating Summary */}
      <FadeIn delay={0.1}>
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Average Rating */}
              <div className="text-center sm:text-left">
                <div className="text-5xl font-bold mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center sm:justify-start mb-2">
                  <StarRating rating={Math.round(averageRating)} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {reviews.length}개의 리뷰
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="flex-1 space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm w-12">{rating}점</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Review List */}
      <StaggerContainer staggerDelay={0.1} className="space-y-4">
        {reviews.map((review) => (
          <StaggerItem key={review.id}>
            <Card>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="h-3 w-3" />
                        <span>{review.job}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StarRating rating={review.rating} />
                    <Badge variant="secondary" className="text-xs">
                      {review.stayDuration} 체류
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {review.content}
                </p>

                {/* Pros & Cons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.pros.map((pro, index) => (
                    <Badge
                      key={`pro-${index}`}
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {pro}
                    </Badge>
                  ))}
                  {review.cons.map((con, index) => (
                    <Badge
                      key={`con-${index}`}
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200"
                    >
                      <ThumbsDown className="h-3 w-3 mr-1" />
                      {con}
                    </Badge>
                  ))}
                </div>

                {/* Date */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(review.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
