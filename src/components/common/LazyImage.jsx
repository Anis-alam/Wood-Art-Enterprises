import { useState } from "react";

export default function LazyImage({ src, alt, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gray-100">
      {/* Skeleton Loader */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl" />
      )}

      <img
        src={error ? "/logo.png" : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        className={`
          w-full h-full object-cover
          transition-all duration-500 ease-in-out
          ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
          ${className}
        `}
      />
    </div>
  );
}
