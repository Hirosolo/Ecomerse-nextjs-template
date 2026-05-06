"use client";

export function NewsletterSection() {
  return (
    <section className="newsletter-bg py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 xl:px-0">
        <h2 className="text-2xl font-bold md:text-3xl">Don&apos;t Miss Out Latest Trends & Offers</h2>
        <p className="mb-8 mt-3 text-blue-100">Register to receive news about the latest offers & discount codes</p>
        <form
          className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row sm:gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks!");
          }}
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="h-[52px] flex-1 rounded-md border-none px-5 text-gray-900 shadow-sm outline-none focus:ring-2 focus:ring-white/50"
          />
          <button type="submit" className="rounded-md bg-dark px-8 py-3 font-semibold text-white hover:opacity-90">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
