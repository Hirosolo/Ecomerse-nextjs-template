"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import { NewsletterSection } from "@/components/store/newsletter-section";
import { SiteFooter } from "@/components/store/site-footer";

const SANITY = "https://cdn.sanity.io/images/rpq7htxl/production";
const sanityImg = (file: string) => `${SANITY}/${file}`;

type TabKey = "description" | "additional" | "reviews";

export type ProductDetailModel = {
  name: string;
  discountLabel: string;
  oldPrice: number;
  price: number;
  reviewCount: number;
  inStock: boolean;
  gallery: { display: string; thumb: string }[];
  descriptionParagraphs: string[];
};

const RECENTLY_VIEWED = [
  { name: "Indoor Steel Adjustable Silent Treadmill Home Fitness", price: 888, oldPrice: 999, image: sanityImg("2be620f7ac309ca4d821aaa974acce33cc573274-570x512.png") },
  { name: "Rangs 43 Inch Frameless FHD Double Glass Android TV", price: 700, oldPrice: 800, image: sanityImg("0b215fcdd92c0e533b052a09660ce01c5e5f6b9a-570x512.png") },
  { name: "iPhone 16 Pro Max", price: 899, oldPrice: 930, image: sanityImg("51bf79d5b889ae69a97e0a04434606c0947d8b5f-570x512.webp") },
  { name: "Apple AirPods Max", price: 450, oldPrice: 500, image: sanityImg("0766155169a618af5f1336006bfe004994191fa9-570x512.png") },
  { name: "Apple Watch Ultra", price: 89, oldPrice: 99, image: sanityImg("7683842eedd40dfda0d5fbdc29e13a3fd02c5e4f-570x512.png") },
  { name: "MacBook Air M4 chip, 16/256GB", price: 600, oldPrice: 699, image: sanityImg("4215cfaa2c068852000e05a6df2b61c9aa2eba46-570x512.png") },
];

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="25" viewBox="0 0 24 25" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.25 2.75C6.14154 2.75 2 6.89029 2 11.998C2 17.1056 6.14154 21.2459 11.25 21.2459C13.5335 21.2459 15.6238 20.4187 17.2373 19.0475L20.7182 22.5287C21.011 22.8216 21.4859 22.8217 21.7788 22.5288C22.0717 22.2359 22.0718 21.761 21.7789 21.4681L18.2983 17.9872C19.6714 16.3736 20.5 14.2826 20.5 11.998C20.5 6.89029 16.3585 2.75 11.25 2.75ZM3.5 11.998C3.5 7.71905 6.96962 4.25 11.25 4.25C15.5304 4.25 19 7.71905 19 11.998C19 16.2769 15.5304 19.7459 11.25 19.7459C6.96962 19.7459 3.5 16.2769 3.5 11.998Z"
        fill="#343C54"
      />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M4.3125 7.21875L9 11.9063L13.6875 7.21875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuBarsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3.33398 5L16.6673 5M3.33398 15L16.6673 15M3.33398 10L16.6673 10" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarRow() {
  return (
    <div className="flex items-center gap-1 text-gray-300">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden>
          <path d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z" />
        </svg>
      ))}
    </div>
  );
}

export function ProductDetailClient({ product }: { product: ProductDetailModel }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [cartDrawerMounted, setCartDrawerMounted] = useState(false);
  const [cartPanelOpen, setCartPanelOpen] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<TabKey>("description");
  const [recentScroll, setRecentScroll] = useState({ atStart: true, atEnd: false });
  const recentRef = React.useRef<HTMLDivElement>(null);

  function openCart() {
    setCartDrawerMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setCartPanelOpen(true)));
  }

  function closeCart() {
    setCartPanelOpen(false);
    window.setTimeout(() => setCartDrawerMounted(false), 300);
  }

  function scrollRecent(dir: -1 | 1) {
    const el = recentRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 280, behavior: "smooth" });
  }

  function onRecentScroll() {
    const el = recentRef.current;
    if (!el) return;
    const atStart = el.scrollLeft <= 2;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    setRecentScroll({ atStart, atEnd });
  }

  useEffect(() => {
    const el = recentRef.current;
    if (!el) return;
    const tick = () => {
      const atStart = el.scrollLeft <= 2;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      setRecentScroll({ atStart, atEnd });
    };
    tick();
    const ro = new ResizeObserver(tick);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const mainSrc = product.gallery[galleryIdx]?.display ?? product.gallery[0].display;

  return (
    <>
      <header className="fixed left-0 top-0 z-[999] w-full bg-white transition-all duration-300 ease-in-out">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 xl:px-0">
          <div className="flex flex-col gap-5 py-6 ease-out duration-200 lg:flex-row lg:items-center lg:justify-between xl:justify-between xl:gap-8">
            <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-10 xl:w-auto">
              <Link href="/" className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo/logo.svg" alt="Logo" width={165} height={36} className="h-9 w-auto" />
              </Link>
              <div className="w-full max-w-[475px]">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
                    <div className="relative hidden max-w-[200px] shrink-0 rounded-full sm:block" style={{ width: 200 }}>
                      <button
                        type="button"
                        className="flex w-full cursor-default items-center justify-between gap-1 rounded-full border border-gray-3 bg-white px-4 py-2.5 text-sm leading-[22px]"
                        aria-hidden
                      >
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          <MenuBarsIcon className="shrink-0 text-dark" />
                          <span className="font-medium text-dark">All Categories</span>
                        </span>
                        <ChevronDown className="shrink-0 text-dark" />
                      </button>
                    </div>
                    <div className="relative w-full lg:min-w-[370px]">
                      <input
                        name="search"
                        type="search"
                        placeholder="I am shopping for..."
                        autoComplete="off"
                        className="custom-search h-[42px] w-full rounded-full border border-gray-3 bg-gray-1 py-2.5 pl-5 pr-10 outline-hidden duration-200 ease-in"
                      />
                      <button type="submit" aria-label="Search" className="-translate-y-1/2 absolute top-1/2 right-5 flex h-[42px] items-center justify-center duration-200 ease-in hover:text-blue">
                        <SearchIcon className="h-5 w-5 text-gray-6" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex w-full flex-col gap-[30px] lg:w-auto xl:flex-row">
              <div className="flex w-full items-center justify-between gap-8 lg:w-auto lg:justify-end">
                <div className="flex items-center gap-5">
                  <a href="#" className="hidden items-center gap-2.5 xl:flex">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-3">
                      <i className="far fa-user text-sm text-dark" aria-hidden />
                    </div>
                    <div className="leading-none">
                      <span className="mb-1.5 block text-[10px] font-medium uppercase text-gray-600">account</span>
                      <span className="text-custom-sm font-medium text-dark">Sign In / Register</span>
                    </div>
                  </a>
                  <a href="#" className="relative hidden flex-col items-center text-[11px] text-dark hover:text-blue xl:flex">
                    <i className="far fa-heart mb-1 text-lg" aria-hidden />
                    Wishlist
                    <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">0</span>
                  </a>
                  <button type="button" className="relative flex flex-col items-center text-[11px] text-dark hover:text-blue" onClick={openCart} aria-label="Cart">
                    <span className="relative mb-1 flex">
                      <i className="fas fa-shopping-bag text-lg" aria-hidden />
                      <span className="absolute -right-4 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue px-2 text-custom-sm font-medium leading-none text-white">
                        0
                      </span>
                    </span>
                    Cart
                  </button>
                </div>
                <button
                  type="button"
                  aria-label="Toggler"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-3 xl:hidden"
                  onClick={() => setMobileMenuOpen((v) => !v)}
                >
                  <MenuBarsIcon className="scale-125" />
                </button>
              </div>
              {mobileMenuOpen && (
                <div className="border-t border-gray-3 py-4 text-sm xl:hidden">
                  <Link href="/" className="block py-2 text-blue font-medium">
                    Home
                  </Link>
                  <a href="#" className="block py-2 text-dark">
                    Popular
                  </a>
                  <a href="#" className="block py-2 text-dark">
                    Shop
                  </a>
                  <a href="#" className="block py-2 text-dark">
                    Contact
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-3 xl:border-y">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 xl:px-0">
            <nav className="hidden xl:block">
              <ul className="flex flex-row items-center gap-6">
                <li>
                  <a href="#" className="text-custom-sm flex py-6 font-medium text-dark hover:text-blue">
                    Popular
                  </a>
                </li>
                <li>
                  <a href="#" className="text-custom-sm flex py-6 font-medium text-dark hover:text-blue">
                    Shop
                  </a>
                </li>
                <li>
                  <a href="#" className="text-custom-sm flex py-6 font-medium text-dark hover:text-blue">
                    Contact
                  </a>
                </li>
                <li className="relative">
                  <button
                    type="button"
                    className="text-custom-sm flex items-center gap-1.5 py-6 font-medium capitalize text-dark hover:text-blue"
                    onClick={() => setPagesOpen((v) => !v)}
                    aria-expanded={pagesOpen}
                  >
                    pages
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {pagesOpen && (
                    <ul className="absolute left-0 top-full z-50 min-w-[220px] rounded-lg border border-gray-3 bg-white p-1 shadow-lg">
                      {["Shop With Sidebar", "Shop Without Sidebar", "Checkout", "Cart", "Wishlist", "Sign in"].map((label) => (
                        <li key={label}>
                          <a href="#" className="text-custom-sm block rounded-lg px-4 py-[7px] hover:bg-gray-2 hover:text-blue">
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <div className="overflow-hidden shadow-breadcrumb pt-[209px] sm:pt-[155px] lg:pt-[95px] xl:pt-[165px]">
          <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 xl:px-0 xl:py-10">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <h1 className="text-xl font-semibold capitalize text-dark sm:text-2xl xl:text-[26px]">Shop Details</h1>
              <ul className="flex items-center gap-2">
                <li className="text-custom-sm hover:text-blue">
                  <Link href="/">Home /</Link>
                </li>
                <li className="text-custom-sm capitalize text-blue last:text-blue">shop details</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="relative overflow-hidden pt-5 pb-20 lg:pt-20 xl:pt-28">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 xl:px-0">
            <div className="flex flex-col gap-[30px] lg:flex-row xl:gap-16">
              <div className="w-full lg:w-1/2">
                <div className="relative flex min-h-[512px] items-center justify-center rounded-lg bg-gray-2 p-4 shadow-sm sm:p-[30px]">
                  <button
                    type="button"
                    aria-label="button for zoom"
                    className="gallery__Image absolute top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-gray-1 text-dark shadow-sm duration-200 ease-out hover:text-blue lg:top-6 lg:right-6"
                  >
                    <i className="fas fa-magnifying-glass-plus text-lg" aria-hidden />
                  </button>
                  <div className="relative flex max-h-[400px] w-full items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mainSrc} alt={product.name} width={400} height={400} className="max-h-[400px] w-auto object-contain" />
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-[18px] sm:flex-nowrap">
                  {product.gallery.map((g, i) => (
                    <button
                      key={g.thumb}
                      type="button"
                      onClick={() => setGalleryIdx(i)}
                      className={`flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-lg bg-gray-2 shadow-sm duration-200 ease-out sm:h-[100px] sm:w-[100px] ${
                        galleryIdx === i ? "border-2 border-blue" : "border-2 border-transparent hover:border-blue"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g.thumb} alt="" width={50} height={50} className="object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-dark sm:text-2xl xl:text-[26px]">{product.name}</h2>
                  <div className="inline-flex shrink-0 rounded-full bg-blue px-2.5 py-0.5 text-xs font-medium text-white">{product.discountLabel}</div>
                </div>

                <div className="mb-[18px] flex flex-wrap items-center gap-[22px]">
                  <div className="flex items-center gap-2.5">
                    <StarRow />
                    <span className="text-custom-sm text-gray-600">
                      ( {product.reviewCount} customer reviews )
                    </span>
                  </div>
                  {product.inStock && (
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <i className="fas fa-circle-check" aria-hidden />
                      <span>In Stock</span>
                    </div>
                  )}
                </div>

                <h3 className="mb-[18px] text-xl font-medium text-dark">
                  <span className="mr-2 text-dark">
                    Price: <span className="text-gray-6 line-through">${product.oldPrice}</span> <span>${product.price}</span>
                  </span>
                </h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="mb-9 mt-[30px] flex flex-col gap-[18px] border-y border-gray-3 py-9">
                    <div className="flex items-center gap-4">
                      <div className="min-w-[65px]">
                        <h4 className="font-medium capitalize text-dark">Color:</h4>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <label htmlFor="color-black" className="flex cursor-pointer select-none items-center">
                          <input type="radio" id="color-black" name="color" className="sr-only" defaultChecked />
                          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full">
                            <span className="h-5 w-5 rounded-full bg-black" />
                          </span>
                        </label>
                        <label htmlFor="color-white" className="flex cursor-pointer select-none items-center">
                          <input type="radio" id="color-white" name="color" className="sr-only" />
                          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full">
                            <span className="h-5 w-5 rounded-full border border-gray-400 bg-white" />
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-[18px]">
                    <div className="flex items-center rounded-full border border-gray-3">
                      <button
                        type="button"
                        aria-label="button for remove product"
                        className="flex h-12 w-12 items-center justify-center duration-200 ease-out hover:text-blue"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                      >
                        <span className="text-lg font-medium">−</span>
                      </button>
                      <span className="flex h-12 w-16 items-center justify-center border-x border-gray-400 text-base font-medium">{qty}</span>
                      <button
                        type="button"
                        aria-label="button for add product"
                        className="flex h-12 w-12 items-center justify-center duration-200 ease-out hover:text-blue"
                        onClick={() => setQty((q) => q + 1)}
                      >
                        <span className="text-lg font-medium">+</span>
                      </button>
                    </div>
                    <button type="button" className="inline-flex rounded-full bg-blue px-7 py-3 font-medium text-white duration-200 ease-out hover:bg-blue-dark">
                      Purchase Now
                    </button>
                    <button type="submit" className="inline-flex rounded-full bg-dark px-7 py-3 font-medium text-white duration-200 ease-out hover:bg-gray-800">
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      aria-label="Add to wishlist"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-3 duration-200 ease-out hover:border-transparent hover:bg-dark hover:text-white"
                    >
                      <i className="far fa-heart" aria-hidden />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-gray-2 py-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 xl:px-0">
            <div className="flex flex-wrap items-center gap-5 rounded-[10px] bg-white px-4 py-[18px] shadow-sm sm:px-6 xl:gap-[50px]">
              {(
                [
                  { key: "description" as const, label: "Description" },
                  { key: "additional" as const, label: "Additional Information" },
                  { key: "reviews" as const, label: "Reviews" },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className={`relative font-medium duration-200 ease-out hover:text-blue lg:text-lg ${
                    tab === key ? "text-blue before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:bg-blue" : "text-dark before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-blue before:duration-200 before:ease-out hover:before:w-full"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === "description" && (
              <div className="mt-12 flex flex-col gap-[30px] sm:flex-row xl:gap-[50px]">
                <div className="w-full max-w-[670px]">
                  <h2 className="mb-7 text-2xl font-medium text-dark">Specifications:</h2>
                  <div className="space-y-4 text-base leading-7 text-gray-6">
                    {product.descriptionParagraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "additional" && (
              <div className="mt-10 rounded-xl bg-white p-4 shadow-sm sm:p-6">
                <p>No additional information available!</p>
              </div>
            )}

            {tab === "reviews" && (
              <div className="mt-12 flex flex-col gap-[30px] sm:flex-row xl:gap-[50px]">
                <p className="text-gray-600">Loading reviews...</p>
              </div>
            )}
          </div>
        </section>

        <section className="overflow-hidden pt-14 pb-16">
          <div className="mx-auto w-full max-w-7xl border-b border-gray-3 px-4 sm:px-6 xl:px-0">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-dark xl:text-[28px]">Recently Viewed Products</h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="previous button"
                  disabled={recentScroll.atStart}
                  onClick={() => scrollRecent(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-3 text-dark disabled:opacity-30"
                >
                  <svg width="24" height="24" viewBox="0 0 25 24" fill="none" aria-hidden>
                    <path
                      d="M15.2335 5.21967C15.5263 5.51256 15.5263 5.98744 15.2335 6.28033L9.51379 12L15.2335 17.7197C15.5263 18.0126 15.5263 18.4874 15.2335 18.7803C14.9406 19.0732 14.4657 19.0732 14.1728 18.7803L7.92279 12.5303C7.6299 12.2374 7.6299 11.7626 7.92279 11.4697L14.1728 5.21967C14.4657 4.92678 14.9406 4.92678 15.2335 5.21967Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="next button"
                  disabled={recentScroll.atEnd}
                  onClick={() => scrollRecent(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-3 text-dark disabled:opacity-30"
                >
                  <svg width="24" height="24" viewBox="0 0 24 25" fill="none" aria-hidden>
                    <path
                      d="M9.08979 19.2803C8.79689 18.9874 8.79689 18.5126 9.08979 18.2197L14.8095 12.5L9.08979 6.78033C8.7969 6.48744 8.7969 6.01256 9.08979 5.71967C9.38268 5.42678 9.85756 5.42678 10.1504 5.71967L16.4004 11.9697C16.6933 12.2626 16.6933 12.7374 16.4004 13.0303L10.1504 19.2803C9.85755 19.5732 9.38268 19.5732 9.08979 19.2803Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              ref={recentRef}
              onScroll={onRecentScroll}
              className="scrollbar-hide flex gap-6 overflow-x-auto pb-10"
            >
              {RECENTLY_VIEWED.map((p) => (
                <div key={p.name} className="w-[220px] shrink-0">
                  <div className="mb-4 flex h-[200px] items-center justify-center rounded-lg border border-gray-2 bg-[#F6F7FB]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} width={180} height={180} className="object-contain" />
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-custom-sm font-medium text-dark">{p.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-[#57585D]">${p.oldPrice}</span>
                    <span className="text-lg font-semibold text-[#394150]">${p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <NewsletterSection />
        <SiteFooter />
      </main>

      {cartDrawerMounted && (
        <div className="fixed inset-0 z-[9999] flex justify-end bg-black/50">
          <button type="button" className="absolute inset-0" aria-label="Close" onClick={closeCart} />
          <div
            className={`relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
              cartPanelOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex shrink-0 items-center justify-between border-b p-6">
              <h2 className="text-xl font-bold text-dark">Cart View</h2>
              <button type="button" className="text-gray-600 hover:text-dark" onClick={closeCart} aria-label="Close cart">
                <i className="fas fa-times text-xl" />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-dark">
              <p className="text-lg font-medium">Your cart is empty!</p>
              <button type="button" className="text-blue underline" onClick={closeCart}>
                Continue Shopping
              </button>
              <a href="#" className="text-gray-600 hover:text-blue">
                View Cart
              </a>
            </div>
            <div className="border-t p-6">
              <div className="mb-4 flex justify-between text-[17px] font-semibold">
                <span>Subtotal:</span>
                <span>$ 0.00</span>
              </div>
              <button type="button" className="w-full rounded-lg bg-blue py-3 font-semibold text-white hover:bg-blue-dark">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
