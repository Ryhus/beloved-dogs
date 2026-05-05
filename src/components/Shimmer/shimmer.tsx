import './ShimmerStyles.scss';

export default function ImageWithShimmer({
  src,
  alt,
  isLoading = false,
  fallback,
}: {
  src: string;
  alt: string;
  isLoading?: boolean;
  fallback?: string;
}) {
  return (
    <div className="img-wrapper">
      {isLoading ? (
        <div className="shimmer"></div>
      ) : (
        <img src={src || fallback} alt={alt} />
      )}
    </div>
  );
}
