import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailClient, type ProductDetailModel } from "./product-detail-client";

const SANITY = "https://cdn.sanity.io/images/rpq7htxl/production";
const img = (file: string) => `${SANITY}/${file}`;

const PORTABLE_GRINDER: ProductDetailModel = {
  name: "Portable Electric Grinder Maker",
  discountLabel: "30% OFF",
  oldPrice: 888,
  price: 777,
  reviewCount: 0,
  inStock: true,
  gallery: [
    {
      display: img("e5c57afcfb88cd4f47f0b7b177669b7489b2b4cb-570x512.png"),
      thumb: img("63ba21713bd7c47d4780092d9e3da05efd7a8688-100x100.png"),
    },
    {
      display: img("93f2a05cb239e5e8a938b0f9eaeebb1dd61b2713-100x100.png"),
      thumb: img("93f2a05cb239e5e8a938b0f9eaeebb1dd61b2713-100x100.png"),
    },
  ],
  descriptionParagraphs: [
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  ],
};

const BY_SLUG: Record<string, ProductDetailModel> = {
  "portable-electric-grinder-maker": PORTABLE_GRINDER,
};

export function generateStaticParams() {
  return Object.keys(BY_SLUG).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = BY_SLUG[slug];
  if (!product) notFound();
  return {
    title: `${product.name} | NextMerce - Next.js E-commerce Template`,
    description:
      "Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    openGraph: {
      title: `${product.name} | NextMerce`,
      images: [{ url: img("e5c57afcfb88cd4f47f0b7b177669b7489b2b4cb-570x512.png") }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = BY_SLUG[slug];
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
