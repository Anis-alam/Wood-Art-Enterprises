import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "Wood Art Enterprises | Premium Wooden Furniture",
  description = "Wood Art Enterprises is a premium manufacturer of wooden furniture including sofas, beds, wardrobes, dining tables, office furniture and custom furniture.",
  keywords = "Wood Art Enterprises, Wooden Furniture, Furniture Manufacturer, Sofa, Bed, Dining Table, Wardrobe, Office Furniture, Home Furniture",
  image = "/logo.png",
  url,
}) {
  const safeTitle = String(title ?? "");
  const safeDescription = String(description ?? "");
  const safeKeywords = String(keywords ?? "");
  const safeImage = String(image ?? "/logo.png");
  const safeUrl = String(url || window.location.href);

  return (
    <Helmet>
      <title>{safeTitle}</title>

      <meta name="description" content={safeDescription} />
      <meta name="keywords" content={safeKeywords} />
      <meta name="author" content="Wood Art Enterprises" />
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#3E2723" />

      <link rel="canonical" href={safeUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Wood Art Enterprises" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={safeTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:image" content={safeImage} />
      <meta property="og:url" content={safeUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={safeTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={safeImage} />
    </Helmet>
  );
}
