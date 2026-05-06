"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { NewsletterSection } from "@/components/store/newsletter-section";
import { SiteFooter } from "@/components/store/site-footer";

const SANITY = "https://cdn.sanity.io/images/rpq7htxl/production";
const sanityImg = (file: string) => `${SANITY}/${file}`;
const PROMO = (n: 1 | 2 | 3) =>
  `https://demo.nextmerce.com/images/promo/promo-0${n}.png`;

const heroSlides = [
  {
    badge: "Premium design",
    title: "Apple Watch Ultra",
    desc: "Advanced imaging performance with a 200MP AI camera with Enhanced image quality.",
    img: sanityImg("3af96421a4b69c287b8ffef379a11ab170d7449d-758x521.png"),
    href: "#",
  },
  {
    badge: "SPECIAL EDITION",
    title: "Apple AirPods Max",
    desc: "Transparency mode, and spatial audio, it delivers a premium listening experience.",
    img: sanityImg("e917b32218e3bd2e9c5b7f6a00d376440a11ae92-758x521.png"),
    href: "#",
  },
  {
    badge: "LIMITED EDITION",
    title: "iPhone 16 Pro Max",
    desc: "Featuring A18 Chip, Liquid Glass, and AI-Powered Innovation",
    img: sanityImg("288e9226a28e5cf95406292cbedd8c4bef1b8554-758x521.png"),
    href: "#",
  },
] as const;

const heroSideTiles = [
  {
    title: "Smart Security Home Camera",
    save: 450,
    bg: "#D7EBF2",
    image: sanityImg(
      "8e4cb1084e433d3220697458461de41a51c91818-176x212.png",
    ),
    href: "#",
  },
  {
    title: "Galaxy S24 Ultra 5G",
    save: 600,
    bg: "#EAE7DE",
    image: sanityImg(
      "0d5daaaaa7554a8765e5feff240a4370eb50a9c5-176x212.png",
    ),
    href: "#",
  },
] as const;

const categoryTiles = [
  { label: "Smartphones", image: sanityImg("c6244264720ff53b24288804d8f973549a005ac7-411x376.png") },
  { label: "Smart Watches", image: sanityImg("c6244264720ff53b24288804d8f973549a005ac7-411x376.png") },
  { label: "Laptops", image: sanityImg("c6244264720ff53b24288804d8f973549a005ac7-411x376.png") },
  { label: "Gaming", image: sanityImg("c6244264720ff53b24288804d8f973549a005ac7-411x376.png") },
  { label: "Fitness", image: sanityImg("c6244264720ff53b24288804d8f973549a005ac7-411x376.png") },
  { label: "Audio", image: sanityImg("c6244264720ff53b24288804d8f973549a005ac7-411x376.png") },
];

const newArrivalProducts = [
  {
    name: "Portable Electric Grinder Maker",
    price: 777,
    oldPrice: 888,
    image: sanityImg("e5c57afcfb88cd4f47f0b7b177669b7489b2b4cb-570x512.png"),
    slug: "portable-electric-grinder-maker",
  },
  { name: "Indoor Steel Adjustable Silent Treadmill Home Fitness", price: 888, oldPrice: 999, image: sanityImg("2be620f7ac309ca4d821aaa974acce33cc573274-570x512.png") },
  { name: "Rangs 43 Inch Frameless FHD Double Glass Android TV", price: 700, oldPrice: 800, image: sanityImg("0b215fcdd92c0e533b052a09660ce01c5e5f6b9a-570x512.png") },
  { name: "iPhone 16 Pro Max", price: 899, oldPrice: 930, image: sanityImg("51bf79d5b889ae69a97e0a04434606c0947d8b5f-570x512.webp") },
  { name: "Apple AirPods Max", price: 450, oldPrice: 500, image: sanityImg("0766155169a618af5f1336006bfe004994191fa9-570x512.png") },
  { name: "Apple Watch Ultra", price: 89, oldPrice: 99, image: sanityImg("7683842eedd40dfda0d5fbdc29e13a3fd02c5e4f-570x512.png") },
  { name: "MacBook Air M4 chip, 16/256GB", price: 600, oldPrice: 699, image: sanityImg("4215cfaa2c068852000e05a6df2b61c9aa2eba46-570x512.png") },
  { name: "Apple iMac M4 24-inch 2025", price: 333, oldPrice: 555, image: sanityImg("af403fd1c9e6d18995f9fcc86bc0f1ff4fa8a51e-570x512.png") },
];

const promoBlocks = [
  {
    eyebrowProduct: "Apple iPhone 14 Plus",
    title: "UP TO 30% OFF",
    body: "iPhone 14 has the same superspeedy chip that's in iPhone 13 Pro, A15 Bionic, with a 5‑core GPU, powers all the latest features.",
    cta: "Buy Now",
    image: PROMO(1),
    className: "promo-blue",
    buttonClass: "text-[#3c50e0]",
  },
  {
    eyebrowProduct: "Foldable Motorised Treadmill",
    title: "Workout At Home",
    subtitle: "Flat 20% off",
    body: "Foldable Motorised Treadmill with advanced features.",
    cta: "Grab Now",
    image: PROMO(2),
    className: "promo-dark",
    buttonClass: "text-dark",
  },
  {
    eyebrowProduct: "Apple Watch Ultra",
    title: "Up to 40% off",
    body: "The aerospace-grade titanium case strikes the perfect balance of everything.",
    cta: "Buy Now",
    image: PROMO(3),
    className: "promo-orange",
    buttonClass: "text-orange-600",
  },
] as const;

const bestSellerProducts = [
  { name: "Apple iMac M4 24-inch 2025", price: 333, oldPrice: 555, image: sanityImg("af403fd1c9e6d18995f9fcc86bc0f1ff4fa8a51e-570x512.png") },
  { name: "Apple AirPods Max", price: 450, oldPrice: 500, image: sanityImg("0766155169a618af5f1336006bfe004994191fa9-570x512.png") },
  { name: "iPhone 16 Pro Max", price: 899, oldPrice: 930, image: sanityImg("51bf79d5b889ae69a97e0a04434606c0947d8b5f-570x512.webp") },
  { name: "MacBook Air M4 chip, 16/256GB", price: 600, oldPrice: 699, image: sanityImg("4215cfaa2c068852000e05a6df2b61c9aa2eba46-570x512.png") },
  { name: "Indoor Steel Adjustable Silent Treadmill Home Fitness", price: 888, oldPrice: 999, image: sanityImg("2be620f7ac309ca4d821aaa974acce33cc573274-570x512.png") },
  { name: "Rangs 43 Inch Frameless FHD Double Glass Android TV", price: 700, oldPrice: 800, image: sanityImg("0b215fcdd92c0e533b052a09660ce01c5e5f6b9a-570x512.png") },
];

const feedbackQuote =
  "Lorem ipsum dolor sit amet, adipiscing elit. Donec malesuada justo vitaeaugue suscipit beautiful vehicula";

const testimonialPair = [
  { name: "Davis Dorwart", role: "Serial Entrepreneur", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face", quote: feedbackQuote },
  { name: "Wilson Dias", role: "Backend Developer", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face", quote: feedbackQuote },
];

const FEEDBACK_GROUPS = 3;

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="25" viewBox="0 0 24 25" fill="none" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.25 2.75C6.14154 2.75 2 6.89029 2 11.998C2 17.1056 6.14154 21.2459 11.25 21.2459C13.5335 21.2459 15.6238 20.4187 17.2373 19.0475L20.7182 22.5287C21.011 22.8216 21.4859 22.8217 21.7788 22.5288C22.0717 22.2359 22.0718 21.761 21.7789 21.4681L18.2983 17.9872C19.6714 16.3736 20.5 14.2826 20.5 11.998C20.5 6.89029 16.3585 2.75 11.25 2.75ZM3.5 11.998C3.5 7.71905 6.96962 4.25 11.25 4.25C15.5304 4.25 19 7.71905 19 11.998C19 16.2769 15.5304 19.7459 11.25 19.7459C6.96962 19.7459 3.5 16.2769 3.5 11.998Z" fill="#343C54" />
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

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerMounted, setCartDrawerMounted] = useState(false);
  const [cartPanelOpen, setCartPanelOpen] = useState(false);
  const [clicked, setClicked] = useState<Record<string, boolean>>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [feedbackSlide, setFeedbackSlide] = useState(0);
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const categoryRef = React.useRef<HTMLDivElement>(null);

  const slidesCount = heroSlides.length;

  useEffect(() => {
    const id = setInterval(() => setCurrentSlide((s) => (s + 1) % slidesCount), 5000);
    return () => clearInterval(id);
  }, [slidesCount]);

  useEffect(() => {
    const end = new Date();
    end.setDate(end.getDate() + 3);
    function tick() {
      const d = +end - +new Date();
      if (d > 0) {
        setCountdown({
          days: String(Math.floor(d / 86400000)).padStart(2, "0"),
          hours: String(Math.floor((d % 86400000) / 3600000)).padStart(2, "0"),
          minutes: String(Math.floor((d % 3600000) / 60000)).padStart(2, "0"),
          seconds: String(Math.floor((d % 60000) / 1000)).padStart(2, "0"),
        });
      }
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  function openCart() {
    setCartDrawerMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setCartPanelOpen(true)));
  }

  function closeCart() {
    setCartPanelOpen(false);
    window.setTimeout(() => setCartDrawerMounted(false), 300);
  }

  function noopCartFeedback(key: string) {
    setClicked((p) => ({ ...p, [key]: true }));
    window.setTimeout(() => setClicked((p) => ({ ...p, [key]: false })), 850);
  }

  return (
    <>
      {/* Fixed header — class names aligned with demo.nextmerce.com */}
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
                      <button type="button" className="flex w-full cursor-default items-center justify-between gap-1 rounded-full border border-gray-3 bg-white px-4 py-2.5 text-sm leading-[22px]" aria-hidden>
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          <MenuBarsIcon className="text-dark shrink-0" />
                          <span className="font-medium text-dark">All Categories</span>
                        </span>
                        <ChevronDown className="text-dark shrink-0" />
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
                      <i className="far fa-user text-dark text-sm" aria-hidden />
                    </div>
                    <div className="leading-none">
                      <span className="mb-1.5 block text-[10px] font-medium uppercase text-gray-600">account</span>
                      <span className="text-custom-sm font-medium text-dark">Sign In / Register</span>
                    </div>
                  </a>
                  <button type="button" className="relative flex flex-col items-center text-[11px] text-gray-600 xl:hidden">
                    <i className="far fa-heart mb-1 text-lg" aria-hidden />
                    Wishlist
                    <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-0.5 text-[10px] text-white">
                      0
                    </span>
                  </button>
                  <a href="#" className="relative hidden flex-col items-center text-[11px] text-dark hover:text-blue xl:flex">
                    <i className="far fa-heart mb-1 text-lg" aria-hidden />
                    Wishlist
                    <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                      0
                    </span>
                  </a>
                  <button type="button" className="relative flex flex-col items-center text-[11px] text-dark hover:text-blue" onClick={openCart} aria-label="Cart">
                    <span className="relative mb-1 flex">
                      <i className="fas fa-shopping-bag text-lg" aria-hidden />
                      <span className="-right-4 -top-2 absolute flex h-6 w-6 items-center justify-center rounded-full bg-blue px-2 text-custom-sm leading-none font-medium text-white">
                        0
                      </span>
                    </span>
                    Cart
                  </button>
                </div>
                <button
                  type="button"
                  aria-label="Toggler"
                  className="flex h-10 w-10 items-center justify-center rounded-lg xl:hidden border border-gray-3"
                  onClick={() => setMobileMenuOpen((v) => !v)}
                >
                  <MenuBarsIcon className="scale-125" />
                </button>
              </div>
              {mobileMenuOpen && (
                <div className="border-t border-gray-3 py-4 text-sm xl:hidden">
                  <a href="#" className="block py-2 text-blue font-medium">
                    Sign In / Register
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
      </header>

      <main className="bg-gray-2 text-dark pt-52 sm:pt-44 lg:pt-36 xl:pt-[12.875rem]">
        {/* Hero + USP strip (single section shell like demo) */}
        <section className="overflow-hidden pb-10 lg:pb-[50px] xl:pb-[60px] pt-14 sm:pt-10 lg:pt-12">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 xl:px-0">
            <div className="flex flex-col gap-5 xl:flex-row">
              {/* 2/3 — hero carousel */}
              <div className="w-full xl:w-2/3">
                <div className="relative z-[1] overflow-hidden rounded-[10px] bg-white">
                  <div className="relative min-h-[260px] sm:min-h-[380px] md:min-h-[440px]">
                    {heroSlides.map((sl, idx) => (
                      <div
                        key={sl.title}
                        className={`absolute inset-0 transition-opacity duration-[600ms] ease-in-out ${currentSlide === idx ? "z-[2] opacity-100" : "z-0 opacity-0 pointer-events-none"}`}
                      >
                        <div className="relative md:min-h-[440px]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            alt=""
                            src={sl.img}
                            className="h-auto max-h-[533px] w-full rounded-[10px] object-cover"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-[10px] bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
                          <div className="absolute left-8 top-1/2 z-[2] max-w-[366px] -translate-y-1/2 lg:left-20">
                            <div className="mb-5 flex items-center gap-4">
                              <span className="block text-lg font-medium uppercase text-white">{sl.badge}</span>
                            </div>
                            <h1 className="mb-3 text-xl font-semibold text-white sm:text-[40px] sm:leading-tight">
                              <a href={sl.href} className="hover:underline">
                                {sl.title}
                              </a>
                            </h1>
                            <p className="text-sm text-white/80">{sl.desc}</p>
                            <a
                              href={sl.href}
                              className="mt-6 inline-flex rounded-full bg-blue px-9 py-3 text-custom-sm font-medium text-white duration-200 ease-out hover:bg-blue-dark sm:mt-10"
                            >
                              Shop Now
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-4 left-1/2 z-[3] flex -translate-x-1/2 gap-2">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`hero ${i + 1}`}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-2.5 w-2.5 rounded-full transition-all ${currentSlide === i ? "scale-125 bg-blue" : "bg-white/60"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 1/3 — stacked tiles */}
              <div className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:w-1/3 xl:flex-col">
                {heroSideTiles.map((t) => (
                  <div
                    key={t.title}
                    className="relative w-full rounded-[10px] px-6 py-4 sm:px-7 sm:py-5"
                    style={{ backgroundColor: t.bg }}
                  >
                    <div className="flex justify-between gap-4">
                      <div className="flex w-full max-w-[153px] flex-col justify-between">
                        <h2 className="max-w-[153px] text-[22px] font-semibold text-dark hover:text-blue">
                          <a href={t.href}>{t.title}</a>
                        </h2>
                        <div>
                          <span className="text-dark flex items-center gap-1 text-lg">
                            <span className="text-custom-sm font-medium">Save up to</span>
                            <span className="font-semibold text-blue">${t.save}</span>
                          </span>
                        </div>
                      </div>
                      <div className="w-full max-w-[180px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={t.image} alt="" width={180} height={210} className="ml-auto h-auto w-full max-w-[180px] object-contain" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature strip — max width 1060px on demo */}
          <div className="mx-auto mt-10 w-full max-w-[1060px] px-4 sm:px-8 xl:px-0">
                <div className="flex flex-wrap items-center gap-[30px] xl:gap-[50px]">
              {[
                { src: "/images/icons/icon-01.svg", title: "Free Shipping", desc: "For all orders $200" },
                { src: "/images/icons/icon-02.svg", title: "1 & 1 Returns", desc: "Cancellation after 1 day" },
                { src: "/images/icons/icon-03.svg", title: "100% Secure Payments", desc: "Gurantee secure payments" },
                { src: "/images/icons/icon-04.svg", title: "24/7 Dedicated Support", desc: "Anywhere & anytime" },
              ].map((f) => (
                <div key={f.title} className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.src} alt="" width={40} height={41} />
                  <div>
                    <h3 className="text-lg font-medium text-dark">{f.title}</h3>
                    <p className="text-sm text-gray-6">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Browse by category */}
        <section className="overflow-hidden border-b border-gray-3 pb-16">
          <div className="mx-auto w-full max-w-7xl border-gray-3 px-4 sm:px-6 xl:px-0">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-dark xl:text-heading-5">Browse by Category</h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="previous button"
                  className="rounded border border-gray-3 p-2 text-dark disabled:pointer-events-none disabled:opacity-50"
                  disabled
                >
                  <i className="fas fa-chevron-left" aria-hidden />
                </button>
                <button type="button" aria-label="next button" className="rounded border border-gray-3 p-2 text-dark">
                  <i className="fas fa-chevron-right" aria-hidden />
                </button>
              </div>
            </div>
            <div ref={categoryRef} className="-mx-2 flex snap-x gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {categoryTiles.map((c) => (
                <div key={c.label} className="w-[44%] shrink-0 snap-center px-2 sm:w-1/3 md:w-1/4 lg:w-[16.66%]">
                  <div className="category-card group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="category-overlay absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-3">
                      <span className="text-sm font-semibold text-white">{c.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New arrivals — responsive grid */}
        <section className="overflow-hidden pt-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 xl:px-0">
            <div className="mb-7 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-dark xl:text-heading-5">New Arrivals</h2>
              <a href="#" className="text-custom-sm inline-flex rounded-full border border-gray-3 bg-gray-1 py-2.5 px-7 font-medium text-dark duration-200 ease-out hover:border-transparent hover:bg-dark hover:text-white">
                View All
              </a>
            </div>
            <div className="grid grid-cols-1 gap-x-[30px] gap-y-9 sm:grid-cols-2 xl:grid-cols-4">
              {newArrivalProducts.map((p) => (
                <div key={p.name} className="group">
                  <div className="relative mb-4 flex min-h-[270px] items-center justify-center overflow-hidden rounded-lg border border-gray-2 bg-[#F6F7FB]">
                    <Link href={p.slug ? `/products/${p.slug}` : "#"}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.name} width={250} height={250} className="object-contain" />
                    </Link>
                    <div className="absolute bottom-0 left-0 flex w-full translate-y-full justify-center gap-2.5 pb-5 duration-200 ease-linear group-hover:translate-y-0">
                      <button type="button" aria-label="button for quick view" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-dark shadow-lg duration-200 ease-out hover:text-blue">
                        <i className="fas fa-eye w-5 text-sm" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => noopCartFeedback(`na-${p.name}`)}
                        className={`rounded-full px-4 py-2 text-custom-sm font-medium text-white duration-150 ${clicked[`na-${p.name}`] ? "bg-green-600" : "bg-dark hover:bg-blue"}`}
                      >
                        {clicked[`na-${p.name}`] ? "Added" : "Add to cart"}
                      </button>
                      <button type="button" aria-label="button for favorite select" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-dark shadow-lg hover:text-blue">
                        <i className="far fa-heart" aria-hidden />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 line-clamp-2 text-custom-sm font-medium text-dark">
                      <Link href={p.slug ? `/products/${p.slug}` : "#"} className="hover:text-blue">
                        {p.name}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-[#57585D]">${p.oldPrice}</span>
                      <span className="text-lg font-semibold text-[#394150]">${p.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Promo */}
        <section className="border-t border-gray-3 bg-gray-2 py-10">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-3 sm:px-6 xl:px-0">
            {promoBlocks.map((b) => (
              <article
                key={b.cta + b.title}
                className={`${b.className} relative overflow-hidden rounded-3xl p-8 text-white`}
              >
                <div className="relative z-10 max-w-[260px] space-y-3">
                  <p className="text-xs font-medium opacity-95">{b.eyebrowProduct}</p>
                  <h3 className="text-2xl font-bold">{b.title}</h3>
                  {"subtitle" in b && b.subtitle ? <p className="text-sm font-semibold">{b.subtitle}</p> : null}
                  <p className="text-xs leading-relaxed opacity-90 sm:text-sm">{b.body}</p>
                  <button type="button" className={`mt-2 rounded-full bg-white px-5 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50 ${b.buttonClass}`}>
                    {b.cta}
                  </button>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.image} alt="" className="pointer-events-none absolute bottom-0 right-0 max-h-[70%] w-[55%] object-contain" />
              </article>
            ))}
          </div>
        </section>

        {/* Best sellers */}
        <section className="bg-white pb-16 pt-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-0">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="mb-4 text-lg text-gray-500">Don’t Miss!!</p>
                <h2 className="text-xl font-semibold text-dark xl:text-3xl">Best Sellers</h2>
              </div>
              <a href="#" className="hidden text-custom-sm font-medium text-blue underline sm:inline hover:text-blue-dark">
                View All
              </a>
            </div>
            <div className="scrollbar-hide flex snap-x gap-6 overflow-x-auto pb-8">
              {bestSellerProducts.map((p) => (
                <a key={p.name} href="#" className="group w-[200px] shrink-0 overflow-hidden rounded-2xl bg-white pb-10 shadow-sm snap-start ring-1 ring-gray-3 sm:w-[236px]">
                  <div className="relative mx-auto mb-6 aspect-square w-[90%] max-w-[218px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt=""
                      className="pointer-events-none absolute left-[-20%] top-[-14%] h-[138%] w-[140%] max-w-none object-contain duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-7 text-center">
                    <p className="mb-12 line-clamp-2 px-10 text-custom-sm font-medium text-dark xl:text-base xl:leading-snug">
                      {p.name}
                    </p>
                    <div className="flex justify-center gap-4 px-14 text-lg font-semibold text-dark xl:text-2xl">
                      <span className="opacity-55 line-through">${p.oldPrice}</span>
                      <span>${p.price}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div className="text-center sm:hidden">
              <a href="#" className="text-custom-sm inline-flex rounded-full border border-blue px-12 py-3 font-medium uppercase tracking-wide hover:bg-blue hover:text-white">
                View All Products
              </a>
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section className="relative overflow-hidden bg-gray-950 py-16 text-white">
          <div className="absolute inset-0 opacity-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1600&h=800&fit=crop" alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/85 to-transparent" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 xl:px-0">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="space-y-10">
                <p className="text-base font-semibold uppercase tracking-[0.08em] text-blue">Enhance Your Music Experience</p>
                <div>
                  <h2 className="text-[clamp(28px,4vw,40px)] font-semibold uppercase tracking-[0.2em]">iPhone 16 Pro Max</h2>
                </div>
                <p className="max-w-lg text-xl text-opacity-95 text-gray-200">
                  Experience the future of mobile technology with the most advanced iPhone ever.
                </p>
                <div className="flex flex-wrap gap-3">
                  {(
                    [
                      ["days", countdown.days, "Days"],
                      ["hours", countdown.hours, "Hours"],
                      ["minutes", countdown.minutes, "Minutes"],
                      ["seconds", countdown.seconds, "Seconds"],
                    ] as const
                  ).map(([k, val, lbl]) => (
                    <div key={k} className="countdown-box min-w-[5.375rem] rounded-lg px-[18px] py-4">
                      <div className="text-[28px] font-semibold leading-none md:text-heading-5">{val}</div>
                      <span className="mt-5 block max-w-[3.0625rem] text-center text-xs font-medium capitalize text-gray-500">{lbl}</span>
                    </div>
                  ))}
                </div>
                <a href="#" className="rounded-md bg-black px-9 py-[15px] text-[15px] font-medium text-yellow-500 ring-[7px] ring-[#FFA800]/90 duration-150 ease-linear hover:bg-[#FFB822] hover:text-black">
                  Check it Out!
                </a>
              </div>
              <div className="hidden justify-end md:flex">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sanityImg("af403fd1c9e6d18995f9fcc86bc0f1ff4fa8a51e-570x512.png")} alt="" className="max-h-[420px] animate-float object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="border-y border-gray-200 bg-[#ebebed] py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-2xl font-bold text-dark md:text-3xl">User Feedbacks</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-gray-700">{feedbackQuote}</p>
            <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-2xl">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${feedbackSlide * 100}%)` }}>
                {Array.from({ length: FEEDBACK_GROUPS }).map((_, g) => (
                  <div key={g} className="grid w-full shrink-0 grid-cols-1 gap-10 px-2 md:grid-cols-2 md:gap-14 md:px-8 lg:gap-24">
                    {testimonialPair.map((t) => (
                      <article key={`${t.name}-${g}`} className="bg-white px-6 py-10 text-center md:rounded-2xl md:px-14 md:py-14 md:text-left md:shadow-sm">
                        <blockquote className="text-sm italic text-gray-800 md:text-base">“{t.quote}”</blockquote>
                        <div className="mt-8 flex flex-col items-center gap-4 md:mt-10 md:flex-row md:justify-center md:gap-10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={t.avatar} alt="" width={120} height={120} className="h-20 w-20 rounded-full border-8 border-teal-200 object-cover md:h-28 md:w-28 md:border-teal-500/80" />
                          <div className="md:text-left">
                            <h3 className="text-lg font-semibold text-dark">{t.name}</h3>
                            <p className="text-custom-sm uppercase tracking-[0.2em] text-gray-800">{t.role}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
              <button type="button" aria-label="Previous testimonial" disabled={feedbackSlide === 0} onClick={() => setFeedbackSlide((v) => Math.max(0, v - 1))} className="absolute left-0 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-dark shadow hover:bg-gray-50 disabled:opacity-30 md:flex">
                <i className="fas fa-chevron-left" />
              </button>
              <button type="button" aria-label="Next testimonial" disabled={feedbackSlide >= FEEDBACK_GROUPS - 1} onClick={() => setFeedbackSlide((v) => Math.min(FEEDBACK_GROUPS - 1, v + 1))} className="absolute right-0 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-dark shadow hover:bg-gray-50 disabled:opacity-30 md:flex">
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
        </section>

        <NewsletterSection />

        <SiteFooter />

        {cartDrawerMounted && (
          <div className="fixed inset-0 z-[9999] flex justify-end bg-black/50">
            <button type="button" className="absolute inset-0" aria-label="Close" onClick={closeCart} />
            <div className={`relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${cartPanelOpen ? "translate-x-0" : "translate-x-full"}`}>
              <div className="flex shrink-0 items-center justify-between border-b p-6">
                <h2 className="text-xl font-bold text-dark">Cart View</h2>
                <button type="button" className="text-gray-600 hover:text-dark" onClick={closeCart} aria-label="Close cart"><i className="fas fa-times text-xl" /></button>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-dark">
                <p className="text-lg font-medium">Your cart is empty!</p>
                <button type="button" className="text-blue underline" onClick={closeCart}>Continue Shopping</button>
                <a href="#" className="text-gray-600 hover:text-blue">View Cart</a>
              </div>
              <div className="border-t p-6">
                <div className="mb-4 flex justify-between text-[17px] font-semibold">
                  <span>Subtotal:</span>
                  <span>$ 0.00</span>
                </div>
                <button type="button" className="w-full rounded-lg bg-blue py-3 font-semibold text-white hover:bg-blue-dark">Checkout</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
