export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
      {/* Image */}
      <div className="h-64 bg-gray-200"></div>

      {/* Content */}
      <div className="p-5">
        <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>

        <div className="h-4 w-1/2 bg-gray-200 rounded mb-3"></div>

        <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
