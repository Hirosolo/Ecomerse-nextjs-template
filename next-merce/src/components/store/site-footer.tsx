const SANITY = "https://cdn.sanity.io/images/rpq7htxl/production";

export function SiteFooter() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-12 border-b border-white/15 px-4 py-14 md:grid-cols-2 xl:grid-cols-4">
        <div className="text-center xl:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo/logo.svg" alt="" className="mx-auto mb-8 h-9 w-auto xl:mx-0" />
          <h4 className="mb-8 text-xl font-semibold capitalize text-[#eae4e4]">Help & Support</h4>
          <ul className="space-y-5 text-[15px] font-medium text-[#eae4e4] xl:px-4">
            <li className="flex justify-center gap-3 xl:justify-start">
              <i className="fas fa-map-marker-alt mt-1 shrink-0 text-blue" aria-hidden />
              685 Market Street,Las Vegas, LA 95820,United States.
            </li>
            <li className="flex justify-center gap-3 xl:justify-start">
              <i className="fas fa-phone mt-1 shrink-0 text-blue" aria-hidden />
              <a href="tel:+0995327869843" className="underline hover:text-white">
                (+099) 532-786-9843
              </a>
            </li>
            <li className="flex justify-center gap-3 xl:justify-start">
              <i className="fas fa-envelope mt-1 shrink-0 text-blue" aria-hidden />
              <a href="mailto:support@example.com" className="underline hover:text-white">
                support@example.com
              </a>
            </li>
          </ul>
          <div className="mt-10 flex justify-center gap-6 text-xl xl:justify-start">
            {(["fab fa-facebook-f", "fab fa-twitter", "fab fa-instagram", "fab fa-linkedin-in"] as const).map((c) => (
              <a key={c} href="#" className="text-[#eae4e4] hover:text-blue">
                <i className={c} aria-hidden />
              </a>
            ))}
          </div>
        </div>
        <div className="text-center md:text-left">
          <h4 className="mb-8 text-xl font-semibold capitalize text-[#eae4e4]">Account</h4>
          <ul className="space-y-4 text-[15px]">
            {["Login / Register", "Cart", "Wishlist", "Shop"].map((x) => (
              <li key={x}>
                <a href="#" className="hover:text-white">
                  {x}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h4 className="mb-8 text-xl font-semibold capitalize text-[#eae4e4]">Quick Link</h4>
          <ul className="space-y-4 text-[15px]">
            {["Privacy Policy", "Refund Policy", "Terms of Use", "FAQ's", "Contact"].map((x) => (
              <li key={x}>
                <a href="#" className="hover:text-white">
                  {x}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center xl:text-left">
          <h4 className="mb-2 text-xl font-semibold capitalize text-[#eae4e4]">Download App</h4>
          <p className="text-[15px] uppercase tracking-wide text-[#eae4e4]">Save $3 With App & New User only</p>
          <div className="mt-6 flex justify-center gap-4 xl:justify-start">
            <a href="#">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${SANITY}/b2669d03f86219c8b49fcead04fa6bb8f1dc169d-81x51.png`} alt="" className="h-10 w-auto" />
            </a>
            <a href="#">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${SANITY}/71de8e3fb7e6f757e0716825b945ef6e47ced708-74x74.png`} alt="" className="h-12 w-auto" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-6 border-t border-white/25 px-4 py-8 text-sm sm:flex-row">
        <p className="text-[#eae4e4]">
          © 2026 . All rights reserved by{" "}
          <a href="#" className="text-blue hover:underline">
            Pimjo
          </a>{" "}
          .
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-2xl text-[#eae4e4]">
          <span className="mr-2 text-lg font-semibold capitalize">We Accept:</span>
          <i className="fab fa-cc-visa hover:text-white" aria-hidden />
          <i className="fab fa-cc-mastercard hover:text-white" aria-hidden />
          <i className="fab fa-cc-paypal hover:text-white" aria-hidden />
          <i className="fab fa-cc-apple-pay hover:text-white" aria-hidden />
        </div>
      </div>
    </footer>
  );
}
