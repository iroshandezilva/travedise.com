import type { Metadata } from "next";

import { WebflowScripts, type ScriptSpec } from "@/components/webflow-scripts";

export const metadata: Metadata = {
  title: "Travedise - Your Next Adventure Starts Here",
  description:
    "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  },
};

const WEBFLOW_SCRIPTS: ScriptSpec[] = [
  {
    src: "/js/jquery-3.5.1.min.js",
  },
  {
    src: "/js/webflow.schunk.f2efb3c5440a81cf.js",
  },
  {
    src: "/js/webflow.schunk.72d587c97fcfb3e2.js",
  },
  {
    src: "/js/webflow.schunk.121b0d7ff03e0f4a.js",
  },
  {
    src: "/js/webflow.0d7b5389.b533fdc3a664c5bd.js",
  },
  {
    src: "/js/gsap/gsap.min.js",
  },
  {
    src: "/js/gsap/ScrollTrigger.min.js",
  },
  {
    src: "/js/gsap/SplitText.min.js",
  },
  {
    inline: "gsap.registerPlugin(ScrollTrigger,SplitText);",
  },
];

export default function HomePage() {
  return (
    <>
      <div className="page-wrapper">
        <div className="main-wrapper">
          <div className="reserve-now-popup">
            <div className="reserve-form-block w-form">
              <img
                src="/assets/69c38c90a6a389dfc58352a6_cross.webp"
                loading="lazy"
                data-w-id="530e693e-5897-d704-e1d2-83e0c089ad5c"
                alt="Reserve Cross"
                className="reserve-cross"
              />
              <div className="reserve-top-details">
                <h3 className="reserve-now">Reserve Now</h3>
                <p className="reserve-desp">You’ll receive a confirmation within 24h.</p>
              </div>
              <form
                id="wf-form-Reserve-Form"
                name="wf-form-Reserve-Form"
                data-name="Reserve Form"
                method="get"
                className="package-form"
                data-wf-page-id="69c38c90a6a389dfc58351db"
                data-wf-element-id="530e693e-5897-d704-e1d2-83e0c089ad62"
              >
                <div className="package-fields reserve">
                  <label htmlFor="Reserve-Name" className="field-label">
                    Name
                  </label>
                  <input
                    className="text-field w-input"
                    maxLength={256}
                    name="Reserve-Name"
                    data-name="Reserve Name"
                    placeholder="Your Name"
                    type="text"
                    id="Reserve-Name"
                    required
                  />
                </div>
                <div className="package-fields reserve">
                  <label htmlFor="Reserve-Email" className="field-label">
                    Email
                  </label>
                  <input
                    className="text-field w-input"
                    maxLength={256}
                    name="Reserve-Email"
                    data-name="Reserve Email"
                    placeholder="name@email.com"
                    type="email"
                    id="Reserve-Email"
                    required
                  />
                </div>
                <div className="package-fields reserve">
                  <label htmlFor="Reserve-Number-of-Guests" className="field-label">
                    Number of Guests
                  </label>
                  <input
                    className="text-field w-input"
                    maxLength={256}
                    name="Reserve-Number-of-Guests"
                    data-name="Reserve Number of Guests"
                    placeholder="3 Person"
                    type="text"
                    id="Reserve-Number-of-Guests"
                    required
                  />
                </div>
                <div className="package-fields reserve">
                  <label htmlFor="Choice-Tour" className="field-label">
                    Select your package
                  </label>
                  <select
                    id="Choice-Tour"
                    name="Choice-Tour"
                    data-name="Choice Tour"
                    className="text-field select w-select"
                  >
                    <option value="">Choice Tour</option>
                    <option value="Bali Tour">Bali Tour</option>
                    <option value="Honeymoon">Honeymoon</option>
                    <option value="Adventure">Adventure</option>
                  </select>
                </div>
                <div className="package-fields reserve">
                  <label htmlFor="Reserve-Message" className="field-label">
                    Special Notes
                  </label>
                  <textarea
                    id="Reserve-Message"
                    name="Reserve-Message"
                    maxLength={5000}
                    data-name="Reserve Message"
                    placeholder="Write your message here"
                    required
                    className="text-field text-area w-input"
                    defaultValue={""}
                  />
                </div>
                <input
                  type="submit"
                  data-wait=""
                  className="package-form-button w-button"
                  defaultValue="Send Message"
                />
                <a
                  href="https://www.pixoora.com/"
                  target="_blank"
                  className="pixopay-button w-button"
                >
                  Pay With Pixopay
                </a>
              </form>
              <div className="package-success-message w-form-done">
                <div>Thank you! Your submission has been received!</div>
              </div>
              <div className="package-error-message w-form-fail">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
          <div
            data-w-id="4fab5d82-741a-4e71-8ecb-4857170b8646"
            data-animation="default"
            data-collapse="medium"
            data-duration="400"
            data-easing="ease"
            data-easing2="ease"
            role="banner"
            className="navbar transparent-navbar w-nav"
          >
            <div className="container">
              <div className="navbar-wrapper">
                <a href="/" aria-current="page" className="navbar-brand w-nav-brand w--current">
                  <img
                    loading="lazy"
                    src="/assets/69e71a6f589fe83624cd3faf_travedise-logo.svg"
                    alt="Tripvana Logo"
                    className="tripvana-logo"
                  />
                </a>
                <nav role="navigation" className="nav-menu-wrapper w-nav-menu">
                  <div className="nav-menu transparent-nav-menu">
                    <a
                      href="/"
                      aria-current="page"
                      className="nav-link transparent-nav-link w--current"
                    >
                      Home
                    </a>
                    <a href="/about" className="nav-link transparent-nav-link">
                      About
                    </a>
                    <a href="/packages" className="nav-link transparent-nav-link">
                      Packages
                    </a>
                    <a href="/contact" className="nav-link transparent-nav-link">
                      Contact
                    </a>
                    <a href="/blog" className="nav-link transparent-nav-link">
                      Blog
                    </a>
                    <a
                      href="/contact"
                      data-w-id="4fab5d82-741a-4e71-8ecb-4857170b8688"
                      className="button-01 transparent mob-trans w-inline-block"
                    >
                      <div className="button-text-block">
                        <div className="button-text">Book Now</div>
                        <div className="button-text-02">Book Now</div>
                      </div>
                      <div className="button-icon-block transparent">
                        <div className="button-arrow-block">
                          <div className="arrow-item">
                            <img
                              loading="lazy"
                              src="/assets/69c38c90a6a389dfc58351fe_Frame-2147223741-1-.webp"
                              alt="Button Arrow"
                              className="button-arrow"
                            />
                          </div>
                          <div className="arrow-item-02">
                            <img
                              loading="lazy"
                              src="/assets/69c38c90a6a389dfc58351fe_Frame-2147223741-1-.webp"
                              alt="Button Arrow"
                              className="button-arrow"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="hover-eliment transparent"></div>
                    </a>
                  </div>
                </nav>
                <div className="nav-buttons-block">
                  <a
                    href="/contact"
                    data-w-id="4fab5d82-741a-4e71-8ecb-4857170b8696"
                    className="button-01 transparent w-inline-block"
                  >
                    <div className="button-text-block">
                      <div className="button-text">Book Now</div>
                      <div className="button-text-02">Book Now</div>
                    </div>
                    <div className="button-icon-block transparent">
                      <div className="button-arrow-block">
                        <div className="arrow-item">
                          <img
                            loading="lazy"
                            src="/assets/69c38c90a6a389dfc58351fe_Frame-2147223741-1-.webp"
                            alt="Button Arrow"
                            className="button-arrow"
                          />
                        </div>
                        <div className="arrow-item-02">
                          <img
                            loading="lazy"
                            src="/assets/69c38c90a6a389dfc58351fe_Frame-2147223741-1-.webp"
                            alt="Button Arrow"
                            className="button-arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="hover-eliment transparent"></div>
                  </a>
                </div>
                <div className="menu-button w-nav-button">
                  <div
                    data-is-ix2-target="1"
                    className="hamburger-lottie transparent"
                    data-w-id="4fab5d82-741a-4e71-8ecb-4857170b86a4"
                    data-animation-type="lottie"
                    data-src="/assets/69c38c90a6a389dfc58351fd_Menu-Black-Hamburger.json"
                    data-loop="0"
                    data-direction="1"
                    data-autoplay="0"
                    data-renderer="svg"
                    data-default-duration="0"
                    data-duration="0"
                    data-loading="eager"
                    data-ix2-initial-state="0"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <section className="home-hero-section">
            <div className="hero-content-wrapper">
              <div className="hero-container">
                <div className="hero-wrapper">
                  <div className="hero-top-content">
                    <h1
                      data-w-id="75f4af37-819f-1acf-9202-6bcdfd23d5d9"
                      style={{ opacity: "0" }}
                      className="white-text middle-alignment home"
                    >
                      Your Next Adventure Starts Here
                    </h1>
                    <div data-w-id="75f4af37-819f-1acf-9202-6bcdfd23d5db" style={{ opacity: "0" }}>
                      <a
                        data-w-id="75f4af37-819f-1acf-9202-6bcdfd23d5dc"
                        href="/contact"
                        className="button-2 w-inline-block"
                      >
                        <div className="svg-filter_embed w-embed">
                          <svg
                            width="0"
                            height="0"
                            className="absolute hidden"
                            colorInterpolationFilters="sRGB"
                          >
                            {"\n"}
                            <defs>
                              {"\n"}
                              <filter id="buttonFilter">
                                {"\n"}
                                <feGaussianBlur
                                  in="SourceGraphic"
                                  stdDeviation="5"
                                  result="blur"
                                ></feGaussianBlur>
                                {"\n"}
                                <feColorMatrix
                                  in="blur"
                                  mode="matrix"
                                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                                  result="buttonFilter"
                                ></feColorMatrix>
                                {"\n"}
                                <feComposite
                                  in="SourceGraphic"
                                  in2="buttonFilter"
                                  operator="atop"
                                ></feComposite>
                                {"\n"}
                                <feBlend in="SourceGraphic" in2="buttonFilter"></feBlend>
                                {"\n"}
                              </filter>
                              {"\n"}
                            </defs>
                            {"\n"}
                          </svg>
                        </div>
                        <div
                          style={{ backgroundColor: "rgb(255,255,255)" }}
                          className="button-3_content-wrap"
                        >
                          <div>Book Your Tour</div>
                        </div>
                        <div
                          style={{
                            WebkitTransform:
                              "translate3d(0px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)",
                            MozTransform:
                              "translate3d(0px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)",
                            msTransform:
                              "translate3d(0px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)",
                            transform:
                              "translate3d(0px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0deg) skew(0, 0)",
                          }}
                          className="button-3_arrow-wrapper"
                        >
                          <div className="button_arrow-icon w-embed">
                            <svg
                              width="17"
                              height="16"
                              viewBox="0 0 17 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {"\n"}
                              <g clipPath="url(#clip0_200_259)">
                                {"\n"}
                                <path
                                  d="M15.4999 0H7.16657V0.666667H15.3619L0.503906 15.5247L0.97524 15.996L15.8332 1.138V9.33333H16.4999V1C16.4999 0.448667 16.0512 0 15.4999 0Z"
                                  fill="#091733"
                                ></path>
                                {"\n"}
                              </g>
                              {"\n"}
                              <defs>
                                {"\n"}
                                <clipPath id="clip0_200_259">
                                  {"\n"}
                                  <rect
                                    width="16"
                                    height="16"
                                    fill="white"
                                    transform="translate(0.5)"
                                  ></rect>
                                  {"\n"}
                                </clipPath>
                                {"\n"}
                              </defs>
                              {"\n"}
                            </svg>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-bottom-content">
                <div className="container govaisor"></div>
                <div
                  data-w-id="75f4af37-819f-1acf-9202-6bcdfd23d5e5"
                  style={{ opacity: "0" }}
                  className="slider-overflow home"
                >
                  <div
                    data-delay="3000"
                    data-animation="slide"
                    className="home-hero-slider w-slider"
                    data-autoplay="true"
                    data-easing="ease"
                    data-hide-arrows="false"
                    data-disable-swipe="false"
                    data-autoplay-limit="0"
                    data-nav-spacing="3"
                    data-duration="500"
                    data-infinite="true"
                  >
                    <div className="home-hero-mask w-slider-mask">
                      <div
                        data-w-id="75f4af37-819f-1acf-9202-6bcdfd23d5e8"
                        className="home-hero-slide w-slide"
                      >
                        <div className="w-dyn-list">
                          <div role="list" className="w-dyn-items">
                            <div role="listitem" className="w-dyn-item">
                              <a
                                href="/packages/hillcountry"
                                className="slider-card w-inline-block"
                              >
                                <div
                                  style={{
                                    backgroundImage:
                                      "url(/assets/6a41dca96291ea3120748b1b_R806lZ8a9OCcxaRnHAtBY8t7F3ZIFpQdlaRoFCYK.jpg)",
                                  }}
                                  className="thumbnail"
                                >
                                  <div
                                    data-w-id="75f4af37-819f-1acf-9202-6bcdfd23d5ee"
                                    className="chip"
                                  >
                                    <div className="text-sm">$2500 PP / 8 Nights</div>
                                  </div>
                                </div>
                                <div className="div-block-4">
                                  <h1 className="text-base">Hill Country & Beach</h1>
                                  <div className="subtitle-icon-block">
                                    <div className="button_arrow-icon w-embed">
                                      <svg
                                        width="17"
                                        height="16"
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        {"\n"}
                                        <g clipPath="url(#clip0_200_259)">
                                          {"\n"}
                                          <path
                                            d="M15.4999 0H7.16657V0.666667H15.3619L0.503906 15.5247L0.97524 15.996L15.8332 1.138V9.33333H16.4999V1C16.4999 0.448667 16.0512 0 15.4999 0Z"
                                            fill="#091733"
                                          ></path>
                                          {"\n"}
                                        </g>
                                        {"\n"}
                                        <defs>
                                          {"\n"}
                                          <clipPath id="clip0_200_259">
                                            {"\n"}
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                              transform="translate(0.5)"
                                            ></rect>
                                            {"\n"}
                                          </clipPath>
                                          {"\n"}
                                        </defs>
                                        {"\n"}
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-w-id="75f4af37-819f-1acf-9202-6bcdfd23d5f7"
                        className="home-hero-slide w-slide"
                      >
                        <div className="w-dyn-list">
                          <div role="list" className="w-dyn-items">
                            <div role="listitem" className="w-dyn-item">
                              <a
                                href="/packages/best-of-sri-lanka"
                                className="slider-card w-inline-block"
                              >
                                <div
                                  style={{
                                    backgroundImage: "url(/assets/6a41dd7eab34901277d0a2df_6.jpg)",
                                  }}
                                  className="thumbnail"
                                >
                                  <div
                                    data-w-id="75f4af37-819f-1acf-9202-6bcdfd23d5fd"
                                    className="chip"
                                  >
                                    <div className="text-sm">$3200 PP / 11 Nights</div>
                                  </div>
                                </div>
                                <div className="div-block-4">
                                  <h1 className="text-base">Sri lanka With Little Ones</h1>
                                  <div className="subtitle-icon-block">
                                    <div className="button_arrow-icon w-embed">
                                      <svg
                                        width="17"
                                        height="16"
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        {"\n"}
                                        <g clipPath="url(#clip0_200_259)">
                                          {"\n"}
                                          <path
                                            d="M15.4999 0H7.16657V0.666667H15.3619L0.503906 15.5247L0.97524 15.996L15.8332 1.138V9.33333H16.4999V1C16.4999 0.448667 16.0512 0 15.4999 0Z"
                                            fill="#091733"
                                          ></path>
                                          {"\n"}
                                        </g>
                                        {"\n"}
                                        <defs>
                                          {"\n"}
                                          <clipPath id="clip0_200_259">
                                            {"\n"}
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                              transform="translate(0.5)"
                                            ></rect>
                                            {"\n"}
                                          </clipPath>
                                          {"\n"}
                                        </defs>
                                        {"\n"}
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-w-id="75f4af37-819f-1acf-9202-6bcdfd23d606"
                        className="home-hero-slide w-slide"
                      >
                        <div className="w-dyn-list">
                          <div role="list" className="w-dyn-items">
                            <div role="listitem" className="w-dyn-item">
                              <a
                                href="/packages/wildlife-package"
                                className="slider-card w-inline-block"
                              >
                                <div
                                  style={{
                                    backgroundImage:
                                      "url(/assets/6a41db4b8d4186c694daefc8_protect-the-environment-on-your-sri-lanka-wildlife-safari-header.jpg)",
                                  }}
                                  className="thumbnail"
                                >
                                  <div
                                    data-w-id="75f4af37-819f-1acf-9202-6bcdfd23d60c"
                                    className="chip"
                                  >
                                    <div className="text-sm">$ 3000 PP / 8 Nights</div>
                                  </div>
                                </div>
                                <div className="div-block-4">
                                  <h1 className="text-base">Wildlife Package </h1>
                                  <div className="subtitle-icon-block">
                                    <div className="button_arrow-icon w-embed">
                                      <svg
                                        width="17"
                                        height="16"
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        {"\n"}
                                        <g clipPath="url(#clip0_200_259)">
                                          {"\n"}
                                          <path
                                            d="M15.4999 0H7.16657V0.666667H15.3619L0.503906 15.5247L0.97524 15.996L15.8332 1.138V9.33333H16.4999V1C16.4999 0.448667 16.0512 0 15.4999 0Z"
                                            fill="#091733"
                                          ></path>
                                          {"\n"}
                                        </g>
                                        {"\n"}
                                        <defs>
                                          {"\n"}
                                          <clipPath id="clip0_200_259">
                                            {"\n"}
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                              transform="translate(0.5)"
                                            ></rect>
                                            {"\n"}
                                          </clipPath>
                                          {"\n"}
                                        </defs>
                                        {"\n"}
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-w-id="edf07b66-ccad-8467-59d9-e89bfece21f2"
                        className="home-hero-slide w-slide"
                      >
                        <div className="w-dyn-list">
                          <div role="list" className="w-dyn-items">
                            <div role="listitem" className="w-dyn-item">
                              <a
                                href="/packages/scenic-sri-lanka"
                                className="slider-card w-inline-block"
                              >
                                <div
                                  style={{
                                    backgroundImage:
                                      "url(/assets/6a31a10cd01707ff15b90bad_lou-lou-b-photo-xSI-8hwyUzE-unsplash-1.jpg)",
                                  }}
                                  className="thumbnail"
                                >
                                  <div
                                    data-w-id="edf07b66-ccad-8467-59d9-e89bfece21f8"
                                    className="chip"
                                  >
                                    <div className="text-sm">$2600 PP / 8 Days</div>
                                  </div>
                                </div>
                                <div className="div-block-4">
                                  <h1 className="text-base">Scenic Sri Lanka </h1>
                                  <div className="subtitle-icon-block">
                                    <div className="button_arrow-icon w-embed">
                                      <svg
                                        width="17"
                                        height="16"
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        {"\n"}
                                        <g clipPath="url(#clip0_200_259)">
                                          {"\n"}
                                          <path
                                            d="M15.4999 0H7.16657V0.666667H15.3619L0.503906 15.5247L0.97524 15.996L15.8332 1.138V9.33333H16.4999V1C16.4999 0.448667 16.0512 0 15.4999 0Z"
                                            fill="#091733"
                                          ></path>
                                          {"\n"}
                                        </g>
                                        {"\n"}
                                        <defs>
                                          {"\n"}
                                          <clipPath id="clip0_200_259">
                                            {"\n"}
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                              transform="translate(0.5)"
                                            ></rect>
                                            {"\n"}
                                          </clipPath>
                                          {"\n"}
                                        </defs>
                                        {"\n"}
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-w-id="4cfae66e-9f9d-ed04-fb87-fdc013072dfe"
                        className="home-hero-slide w-slide"
                      >
                        <div className="w-dyn-list">
                          <div role="list" className="w-dyn-items">
                            <div role="listitem" className="w-dyn-item">
                              <a
                                href="/packages/dream-honeymoon-in-sri-lanka"
                                className="slider-card w-inline-block"
                              >
                                <div
                                  style={{
                                    backgroundImage:
                                      "url(/assets/6a41d8a9f90b0844dda793bf_Couple-on-Bentota-Beach.webp)",
                                  }}
                                  className="thumbnail"
                                >
                                  <div
                                    data-w-id="4cfae66e-9f9d-ed04-fb87-fdc013072e04"
                                    className="chip"
                                  >
                                    <div className="text-sm">$4000 PP / 10 NIGHTS</div>
                                  </div>
                                </div>
                                <div className="div-block-4">
                                  <h1 className="text-base">Honeymoon In Sri Lanka</h1>
                                  <div className="subtitle-icon-block">
                                    <div className="button_arrow-icon w-embed">
                                      <svg
                                        width="17"
                                        height="16"
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        {"\n"}
                                        <g clipPath="url(#clip0_200_259)">
                                          {"\n"}
                                          <path
                                            d="M15.4999 0H7.16657V0.666667H15.3619L0.503906 15.5247L0.97524 15.996L15.8332 1.138V9.33333H16.4999V1C16.4999 0.448667 16.0512 0 15.4999 0Z"
                                            fill="#091733"
                                          ></path>
                                          {"\n"}
                                        </g>
                                        {"\n"}
                                        <defs>
                                          {"\n"}
                                          <clipPath id="clip0_200_259">
                                            {"\n"}
                                            <rect
                                              width="16"
                                              height="16"
                                              fill="white"
                                              transform="translate(0.5)"
                                            ></rect>
                                            {"\n"}
                                          </clipPath>
                                          {"\n"}
                                        </defs>
                                        {"\n"}
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="home-left-arrow w-slider-arrow-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 22 22"
                        fill="none"
                        className="home-slider-arrow"
                      >
                        <g clipPath="url(#clip0_650_567)">
                          <path
                            d="M0.686344 10.3125L6.41551 4.58333L6.87384 5.04167L1.23955 10.676L21.6693 10.676L21.6693 11.324L1.23955 11.324L6.87384 16.9583L6.41551 17.4167L0.686344 11.6875C0.307303 11.3085 0.307302 10.6915 0.686344 10.3125Z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="home-right-arrow w-slider-arrow-right">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 22 22"
                        fill="none"
                        className="home-slider-arrow"
                      >
                        <g clipPath="url(#clip0_650_566)">
                          <path
                            d="M21.3176 10.3125L15.5884 4.58333L15.1301 5.04167L20.7644 10.676L0.334604 10.676L0.334605 11.324L20.7644 11.324L15.1301 16.9583L15.5884 17.4167L21.3176 11.6875C21.6966 11.3085 21.6966 10.6915 21.3176 10.3125Z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="slide-nav w-slider-nav w-round w-num"></div>
                  </div>
                  <div className="home-slider-transparent-line">
                    <div style={{ width: "33.33%" }} className="slider-line-animation"></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-delay="4000"
              data-animation="slide"
              className="hero-slider w-slider"
              data-autoplay="true"
              data-easing="ease"
              data-hide-arrows="false"
              data-disable-swipe="false"
              data-autoplay-limit="0"
              data-nav-spacing="3"
              data-duration="500"
              data-infinite="true"
            >
              <div className="w-slider-mask">
                <div className="w-slide">
                  <div className="slide-content">
                    <div className="slide-img"></div>
                    <div className="div-block-3"></div>
                  </div>
                </div>
                <div className="w-slide">
                  <div className="slide-content">
                    <div className="slide-img two"></div>
                    <div className="div-block-3"></div>
                  </div>
                </div>
                <div className="w-slide">
                  <div className="slide-content">
                    <div className="slide-img three"></div>
                    <div className="div-block-3"></div>
                  </div>
                </div>
                <div className="w-slide">
                  <div className="slide-content">
                    <div className="slide-img four"></div>
                    <div className="div-block-3"></div>
                  </div>
                </div>
              </div>
              <div className="w-slider-nav w-round"></div>
            </div>
          </section>
          <section
            data-w-id="97c2b06d-75ea-27f7-dc58-1a88b3a3c79a"
            className="tour-activities-section"
          >
            <div className="wrapper update-activities-wrapper">
              <div className="container">
                <div className="tour-activities-top">
                  <div data-w-id="97c2b06d-75ea-27f7-dc58-1a88b3a3c79e" style={{ opacity: "0" }}>
                    <div data-wf--subtitle-block--variant="base" className="subtitle-block">
                      <div className="subtitle-icon-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="subtitle-icon"
                        >
                          <path
                            d="M8 0L9.81019 6.18981L16 8L9.81019 9.81019L8 16L6.18981 9.81019L0 8L6.18981 6.18981L8 0Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="subtitle-text">Our Tour Activities</div>
                    </div>
                  </div>
                  <div>
                    <div className="activities-heading-block">
                      <h2 className="text-5xl center-align scroll-trigger">
                        <strong className="bold-text">
                          Whether you’re chasing adventure, discovering culture, or simply looking
                          for a moment of calm, Travedise brings you experiences made for every
                          traveler.
                        </strong>
                      </h2>
                    </div>
                    <div className="activities-heading-block display-none">
                      <h2 className="center-align activities-title">
                        culture, or calm — we’ve got the
                      </h2>
                      <div className="activities-heading-overlay _02 hidden"></div>
                    </div>
                    <div className="activities-heading-block display-none">
                      <h2 className="center-align activities-title">
                        perfect experience for every kind
                      </h2>
                      <div className="activities-heading-overlay _03"></div>
                    </div>
                    <div className="activities-heading-block display-none">
                      <h2 className="center-align activities-title">of traveler.</h2>
                      <div className="activities-heading-overlay _04"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-current="Tab 1"
                data-easing="ease"
                data-duration-in="300"
                data-duration-out="100"
                className="tour-activities-tabs w-tabs"
              >
                <div
                  data-w-id="97c2b06d-75ea-27f7-dc58-1a88b3a3c7a3"
                  style={{ opacity: "0" }}
                  className="tabs-menu-activities w-tab-menu"
                >
                  <a
                    data-w-tab="Tab 1"
                    className="activities-tab-link w-inline-block w-tab-link w--current"
                  >
                    <div>All</div>
                  </a>
                  <a data-w-tab="Tab 2" className="activities-tab-link w-inline-block w-tab-link">
                    <div>Wildlife</div>
                  </a>
                  <a data-w-tab="Tab 3" className="activities-tab-link w-inline-block w-tab-link">
                    <div>Relaxation</div>
                  </a>
                  <a data-w-tab="Tab 4" className="activities-tab-link w-inline-block w-tab-link">
                    <div>Adventure</div>
                  </a>
                  <a data-w-tab="Tab 5" className="activities-tab-link w-inline-block w-tab-link">
                    <div>Historical</div>
                  </a>
                </div>
                <div className="tabs-content-activities w-tab-content">
                  <div data-w-tab="Tab 1" className="activities-tab-pane w-tab-pane w--tab-active">
                    <div className="activities-marquees">
                      <div className="activities-marquee-items">
                        <img
                          loading="lazy"
                          src="/assets/6a30c76515a814dcdce30652_pexels-thilina-alagiyawanna-3266092-36638354-1.jpg"
                          alt="Activities Image"
                          className="activities-image _01"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c7acc2c72bdcf3334bec_kavindaf-plate-6316591-1.png"
                          alt="Activities Image"
                          className="activities-image _02"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c7d75601d08b07505cb0_chathura-anuradha-subasinghe-isdvqf04MDk-unsplash-2.jpg"
                          alt="Activities Image"
                          className="activities-image _03"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c7fc9cd3d56da1003d44_pexels-naveen-3885421-5780322-1.jpg"
                          alt="Activities Image"
                          className="activities-image _04"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c81af9f0933ad1bcbbfe_hazy-momo-zq0Uoiht0Q-unsplash-2.jpg"
                          alt="Activities Image"
                          className="activities-image _05"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c8441d3e21d69bdb2459_anupa-uthsara-5Np6ZsLDVIM-unsplash.jpg"
                          alt="Activities Image"
                          className="activities-image _06"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c865412d62d1b36615b3_pexels-pok-rie-33563-37208428-1.png"
                          alt="Activities Image"
                          className="activities-image _07"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c88f469a611a86bf765d_pexels-freestockpro-319948-1.jpg"
                          alt="Activities Image"
                          className="activities-image _08"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c8aa925087c35aacbfa1_pexels-thilina-alagiyawanna-3266092-36608901-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c8cb44dbd82ad5fceb77_nilantha-sanjeewa-EXHIHvJu4VU-unsplash-2.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                      </div>
                      <div className="activities-marquee-items">
                        <img
                          loading="lazy"
                          src="/assets/6a30c76515a814dcdce30652_pexels-thilina-alagiyawanna-3266092-36638354-1.jpg"
                          alt="Activities Image"
                          className="activities-image _01"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c7acc2c72bdcf3334bec_kavindaf-plate-6316591-1.png"
                          alt="Activities Image"
                          className="activities-image _02"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c7d75601d08b07505cb0_chathura-anuradha-subasinghe-isdvqf04MDk-unsplash-2.jpg"
                          alt="Activities Image"
                          className="activities-image _03"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c7fc9cd3d56da1003d44_pexels-naveen-3885421-5780322-1.jpg"
                          alt="Activities Image"
                          className="activities-image _04"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c81af9f0933ad1bcbbfe_hazy-momo-zq0Uoiht0Q-unsplash-2.jpg"
                          alt="Activities Image"
                          className="activities-image _05"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c8441d3e21d69bdb2459_anupa-uthsara-5Np6ZsLDVIM-unsplash.jpg"
                          alt="Activities Image"
                          className="activities-image _06"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c865412d62d1b36615b3_pexels-pok-rie-33563-37208428-1.png"
                          alt="Activities Image"
                          className="activities-image _07"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c88f469a611a86bf765d_pexels-freestockpro-319948-1.jpg"
                          alt="Activities Image"
                          className="activities-image _08"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c8aa925087c35aacbfa1_pexels-thilina-alagiyawanna-3266092-36608901-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c8cb44dbd82ad5fceb77_nilantha-sanjeewa-EXHIHvJu4VU-unsplash-2.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                      </div>
                    </div>
                  </div>
                  <div data-w-tab="Tab 2" className="activities-tab-pane w-tab-pane">
                    <div className="activities-marquees">
                      <div className="activities-marquee-items">
                        <img
                          loading="lazy"
                          src="/assets/6a30c96facb038e84b6b2cc6_zoshua-colah-chzS0stfVvI-unsplash-1.png"
                          alt="Activities Image"
                          className="activities-image _01"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c989eb1a083d1ae78e2e_pexels-donn-33380230-1.jpg"
                          alt="Activities Image"
                          className="activities-image _02"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c9b0e1bbd9886583089d_pexels-rajee-kumar-1029496084-33130315-1.jpg"
                          alt="Activities Image"
                          className="activities-image _03"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c9c899206a557480ca73_pexels-donn-33718393-1.jpg"
                          alt="Activities Image"
                          className="activities-image _04"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c9ec5a033ac368f366b7_pexels-bopopics-14621285-1.jpg"
                          alt="Activities Image"
                          className="activities-image _05"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ca066cc6b608b4cfaa55_pexels-marina-zvada-844583049-35598981-1.jpg"
                          alt="Activities Image"
                          className="activities-image _06"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c8441d3e21d69bdb2459_anupa-uthsara-5Np6ZsLDVIM-unsplash.jpg"
                          alt="Activities Image"
                          className="activities-image _07"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ca33412d62d1b366979c_pexels-steve-hodder-2160406976-37114886-1.jpg"
                          alt="Activities Image"
                          className="activities-image _08"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ca5030eb92a3c26505ca_pexels-symeon-ekizoglou-1107605-9025410-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30dcff786134bd999a8430_pexels-sethumadhavan-308835-6252951-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30dd1d44dbd82ad5026a8e_sb-bandara-1GJKxIkSR0E-unsplash-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30dd46469a611a86c5484d_ajai-s-O_J1nltjMJ4-unsplash.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30dd5fa1435ff084242638_pexels-ihsan-faiz-703148304-37615784-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                      </div>
                      <div className="activities-marquee-items">
                        <img
                          loading="lazy"
                          src="/assets/6a30c96facb038e84b6b2cc6_zoshua-colah-chzS0stfVvI-unsplash-1.png"
                          alt="Activities Image"
                          className="activities-image _01"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c989eb1a083d1ae78e2e_pexels-donn-33380230-1.jpg"
                          alt="Activities Image"
                          className="activities-image _02"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c9b0e1bbd9886583089d_pexels-rajee-kumar-1029496084-33130315-1.jpg"
                          alt="Activities Image"
                          className="activities-image _03"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c9c899206a557480ca73_pexels-donn-33718393-1.jpg"
                          alt="Activities Image"
                          className="activities-image _04"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c9ec5a033ac368f366b7_pexels-bopopics-14621285-1.jpg"
                          alt="Activities Image"
                          className="activities-image _05"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ca066cc6b608b4cfaa55_pexels-marina-zvada-844583049-35598981-1.jpg"
                          alt="Activities Image"
                          className="activities-image _06"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30c8441d3e21d69bdb2459_anupa-uthsara-5Np6ZsLDVIM-unsplash.jpg"
                          alt="Activities Image"
                          className="activities-image _07"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ca33412d62d1b366979c_pexels-steve-hodder-2160406976-37114886-1.jpg"
                          alt="Activities Image"
                          className="activities-image _08"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ca5030eb92a3c26505ca_pexels-symeon-ekizoglou-1107605-9025410-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30dcff786134bd999a8430_pexels-sethumadhavan-308835-6252951-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30dd1d44dbd82ad5026a8e_sb-bandara-1GJKxIkSR0E-unsplash-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30dd46469a611a86c5484d_ajai-s-O_J1nltjMJ4-unsplash.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30dd5fa1435ff084242638_pexels-ihsan-faiz-703148304-37615784-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                      </div>
                    </div>
                  </div>
                  <div data-w-tab="Tab 3" className="activities-tab-pane w-tab-pane">
                    <div className="activities-marquees">
                      <div className="activities-marquee-items">
                        <img
                          loading="lazy"
                          src="/assets/6a30ddb6a35eafeec6ab1c9c_adam-marikar-3sJIC7dKcpQ-unsplash-1-1.jpg"
                          alt="Activities Image"
                          className="activities-image _01"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ddd644dbd82ad502b686_pexels-thilina-alagiyawanna-3266092-36477892-1.jpg"
                          alt="Activities Image"
                          className="activities-image _02"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30de0094a94b113934b1c1_pexels-charithk-5991294-1.jpg"
                          alt="Activities Image"
                          className="activities-image _03"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30de22c8cf3a07003238cd_pexels-rohan001-7028721-1.jpg"
                          alt="Activities Image"
                          className="activities-image _04"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30de535931c63d6ab0d165_pexels-isharakasthuriarachchi-11453113-1.jpg"
                          alt="Activities Image"
                          className="activities-image _05"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30de77cdc905fa64376db4_pexels-roman-odintsov-4555781-1.jpg"
                          alt="Activities Image"
                          className="activities-image _06"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30de9222694c53c44e6bf8_pexels-roman-odintsov-4870775-1.jpg"
                          alt="Activities Image"
                          className="activities-image _07"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30deacc9ad635d08dc4b84_pexels-marina-zvada-844583049-35598983-1.jpg"
                          alt="Activities Image"
                          className="activities-image _08"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30df72acb038e84b70fbc8_pexels-esrageziyor-45760220-11495863-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30dfa0a63e446cc184a485_hazy-momo-zq0Uoiht0Q-unsplash-2.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                      </div>
                      <div className="activities-marquee-items">
                        <img
                          loading="lazy"
                          src="/assets/6a30ddb6a35eafeec6ab1c9c_adam-marikar-3sJIC7dKcpQ-unsplash-1-1.jpg"
                          alt="Activities Image"
                          className="activities-image _01"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ddd644dbd82ad502b686_pexels-thilina-alagiyawanna-3266092-36477892-1.jpg"
                          alt="Activities Image"
                          className="activities-image _02"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30de0094a94b113934b1c1_pexels-charithk-5991294-1.jpg"
                          alt="Activities Image"
                          className="activities-image _03"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30de22c8cf3a07003238cd_pexels-rohan001-7028721-1.jpg"
                          alt="Activities Image"
                          className="activities-image _04"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30de535931c63d6ab0d165_pexels-isharakasthuriarachchi-11453113-1.jpg"
                          alt="Activities Image"
                          className="activities-image _05"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30de77cdc905fa64376db4_pexels-roman-odintsov-4555781-1.jpg"
                          alt="Activities Image"
                          className="activities-image _06"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30de9222694c53c44e6bf8_pexels-roman-odintsov-4870775-1.jpg"
                          alt="Activities Image"
                          className="activities-image _07"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30deacc9ad635d08dc4b84_pexels-marina-zvada-844583049-35598983-1.jpg"
                          alt="Activities Image"
                          className="activities-image _08"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30df72acb038e84b70fbc8_pexels-esrageziyor-45760220-11495863-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30dfa0a63e446cc184a485_hazy-momo-zq0Uoiht0Q-unsplash-2.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                      </div>
                    </div>
                  </div>
                  <div data-w-tab="Tab 4" className="activities-tab-pane w-tab-pane">
                    <div className="activities-marquees">
                      <div className="activities-marquee-items">
                        <img
                          loading="lazy"
                          src="/assets/6a30e226a1435ff08425b1b0_zoshua-colah-chzS0stfVvI-unsplash-1.jpg"
                          alt="Activities Image"
                          className="activities-image _01"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30eec236aa45a1594deb08_pexels-rajee-kumar-1029496084-33130315-1.jpg"
                          alt="Activities Image"
                          className="activities-image _02"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30eeeac8cf3a07003837a3_pexels-steve-hodder-2160406976-37114886-1.jpg"
                          alt="Activities Image"
                          className="activities-image _03"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ef0244dbd82ad509c788_pexels-donn-33380230-1.jpg"
                          alt="Activities Image"
                          className="activities-image _04"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ef1d3b52c125874cd2f0_pexels-sethumadhavan-308835-6252951-1.jpg"
                          alt="Activities Image"
                          className="activities-image _05"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ef356cc6b608b4dbe2aa_anupa-uthsara-5Np6ZsLDVIM-unsplash.jpg"
                          alt="Activities Image"
                          className="activities-image _06"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ef4facb038e84b773018_pexels-marina-zvada-844583049-35598981-1.jpg"
                          alt="Activities Image"
                          className="activities-image _07"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ef7e1171162297987e29_gemmmm-6GJGwKwTsLE-unsplash-1.jpg"
                          alt="Activities Image"
                          className="activities-image _08"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30efb2a63e446cc18ae411_pexels-donn-33718393-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30efce61ab0577fffda636_pexels-symeon-ekizoglou-1107605-9025410-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                      </div>
                      <div className="activities-marquee-items">
                        <img
                          loading="lazy"
                          src="/assets/6a30e226a1435ff08425b1b0_zoshua-colah-chzS0stfVvI-unsplash-1.jpg"
                          alt="Activities Image"
                          className="activities-image _01"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30eec236aa45a1594deb08_pexels-rajee-kumar-1029496084-33130315-1.jpg"
                          alt="Activities Image"
                          className="activities-image _02"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30eeeac8cf3a07003837a3_pexels-steve-hodder-2160406976-37114886-1.jpg"
                          alt="Activities Image"
                          className="activities-image _03"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ef0244dbd82ad509c788_pexels-donn-33380230-1.jpg"
                          alt="Activities Image"
                          className="activities-image _04"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ef1d3b52c125874cd2f0_pexels-sethumadhavan-308835-6252951-1.jpg"
                          alt="Activities Image"
                          className="activities-image _05"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ef356cc6b608b4dbe2aa_anupa-uthsara-5Np6ZsLDVIM-unsplash.jpg"
                          alt="Activities Image"
                          className="activities-image _06"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ef4facb038e84b773018_pexels-marina-zvada-844583049-35598981-1.jpg"
                          alt="Activities Image"
                          className="activities-image _07"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30ef7e1171162297987e29_gemmmm-6GJGwKwTsLE-unsplash-1.jpg"
                          alt="Activities Image"
                          className="activities-image _08"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30efb2a63e446cc18ae411_pexels-donn-33718393-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30efce61ab0577fffda636_pexels-symeon-ekizoglou-1107605-9025410-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                      </div>
                    </div>
                  </div>
                  <div data-w-tab="Tab 5" className="activities-tab-pane w-tab-pane">
                    <div className="activities-marquees">
                      <div className="activities-marquee-items">
                        <img
                          loading="lazy"
                          src="/assets/6a30f067d94ce26d7f208cd8_javier-saint-jean-r4pIcB2reug-unsplash.jpg"
                          alt="Activities Image"
                          className="activities-image _01"
                        />
                        <img
                          loading="lazy"
                          height="Auto"
                          alt="Activities Image"
                          src="/assets/6a30f06736aa45a1594eab63_anthony-lim-EZGPy_HOZWQ-unsplash-1.jpg"
                          className="activities-image _02"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f068e1bbd988658f05aa_julie-ricard-RmFX5bxHqCg-unsplash-1.jpg"
                          alt="Activities Image"
                          className="activities-image _03"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f068f517588c869d7049_pexels-samirusandeepa-32547976-1.jpg"
                          alt="Activities Image"
                          className="activities-image _04"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f068a6b4b2b3b886e6c9_pexels-sofiia-asmi-3378970-31753811-1.jpg"
                          alt="Activities Image"
                          className="activities-image _05"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f067925087c35ab975c4_agnieszka-stankiewicz-OMgi4DfiO3c-unsplash-1.jpg"
                          alt="Activities Image"
                          className="activities-image _06"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f067f5cabe53dd2d92fe_pexels-marina-zvada-844583049-35598972-1.jpg"
                          alt="Activities Image"
                          className="activities-image _07"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f067acb038e84b78fd84_Activities-Image.jpg"
                          alt="Activities Image"
                          className="activities-image _08"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f06aead42166f50706dc_pexels-ven-vijaya-1243576398-23229191-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f069b0ee3485bed3a824_pexels-thilina-alagiyawanna-3266092-37010222-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f069279ffc899a7e9a8c_pexels-thilina-alagiyawanna-3266092-37010222-1-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                      </div>
                      <div className="activities-marquee-items">
                        <img
                          loading="lazy"
                          src="/assets/6a30f067d94ce26d7f208cd8_javier-saint-jean-r4pIcB2reug-unsplash.jpg"
                          alt="Activities Image"
                          className="activities-image _01"
                        />
                        <img
                          loading="lazy"
                          height="Auto"
                          alt="Activities Image"
                          src="/assets/6a30f06736aa45a1594eab63_anthony-lim-EZGPy_HOZWQ-unsplash-1.jpg"
                          className="activities-image _02"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f068e1bbd988658f05aa_julie-ricard-RmFX5bxHqCg-unsplash-1.jpg"
                          alt="Activities Image"
                          className="activities-image _03"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f068f517588c869d7049_pexels-samirusandeepa-32547976-1.jpg"
                          alt="Activities Image"
                          className="activities-image _04"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f068a6b4b2b3b886e6c9_pexels-sofiia-asmi-3378970-31753811-1.jpg"
                          alt="Activities Image"
                          className="activities-image _05"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f067925087c35ab975c4_agnieszka-stankiewicz-OMgi4DfiO3c-unsplash-1.jpg"
                          alt="Activities Image"
                          className="activities-image _06"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f067f5cabe53dd2d92fe_pexels-marina-zvada-844583049-35598972-1.jpg"
                          alt="Activities Image"
                          className="activities-image _07"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f067acb038e84b78fd84_Activities-Image.jpg"
                          alt="Activities Image"
                          className="activities-image _08"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f06aead42166f50706dc_pexels-ven-vijaya-1243576398-23229191-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f069b0ee3485bed3a824_pexels-thilina-alagiyawanna-3266092-37010222-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                        <img
                          loading="lazy"
                          src="/assets/6a30f069279ffc899a7e9a8c_pexels-thilina-alagiyawanna-3266092-37010222-1-1.jpg"
                          alt="Activities Image"
                          className="activities-image _09"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="booking-process-section">
            <div className="container">
              <div className="wrapper booking-process-wrapper">
                <div className="tour-activities-top">
                  <div data-w-id="5e358601-cda3-d8ad-fbdb-44a5e34989ec" style={{ opacity: "0" }}>
                    <div data-wf--subtitle-block--variant="base" className="subtitle-block">
                      <div className="subtitle-icon-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="subtitle-icon"
                        >
                          <path
                            d="M8 0L9.81019 6.18981L16 8L9.81019 9.81019L8 16L6.18981 9.81019L0 8L6.18981 6.18981L8 0Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="subtitle-text">Booking Process</div>
                    </div>
                  </div>
                  <h2
                    data-w-id="5e358601-cda3-d8ad-fbdb-44a5e34989ee"
                    style={{ opacity: "0" }}
                    className="text-5xl center-align"
                  >
                    Follow these simple steps to reserve your trip with ease.
                  </h2>
                </div>
                <div
                  data-delay="4000"
                  data-animation="slide"
                  className="booking-process-slider w-slider"
                  data-autoplay="true"
                  data-easing="ease"
                  style={{ opacity: "0" }}
                  data-hide-arrows="false"
                  data-disable-swipe="false"
                  data-w-id="f1fe3e5a-8920-fcd9-8fef-a19af9e7e170"
                  data-autoplay-limit="0"
                  data-nav-spacing="3"
                  data-duration="500"
                  data-infinite="false"
                >
                  <div className="booking-process-mask w-slider-mask">
                    <div
                      data-w-id="f1fe3e5a-8920-fcd9-8fef-a19af9e7e172"
                      className="booking-process-slide _01 w-slide"
                    >
                      <div className="booking-slider-contents">
                        <div
                          id="w-node-f2aea143-70cb-690a-816f-3ca39201930a-92019309"
                          className="booking-slider-left"
                        >
                          <h3 className="text-5xl">01</h3>
                          <div className="booking-slider-content">
                            <h5 className="text-3xl black">Tell Us What You Want</h5>
                            <p className="text-base">
                              Share your dates, interests and travel style. A specialist replies
                              within 24 hours. Not a bot, not a sales rep — an actual travel
                              designer
                            </p>
                          </div>
                        </div>
                        <img
                          src="/assets/6a30fab1023e59ceb0236bf7_Booking-Slider-Image.jpg"
                          loading="lazy"
                          alt="Booking Slider Image"
                          className="booking-slider-image"
                        />
                      </div>
                    </div>
                    <div
                      data-w-id="30e73cfe-22e7-7367-c481-1aff39df6e98"
                      className="booking-process-slide _02 w-slide"
                    >
                      <div className="booking-slider-contents">
                        <div
                          id="w-node-f2aea143-70cb-690a-816f-3ca39201930a-92019309"
                          className="booking-slider-left"
                        >
                          <h3 className="text-5xl">02</h3>
                          <div className="booking-slider-content">
                            <h5 className="text-3xl black">Select a Package</h5>
                            <p className="text-base">
                              Click on the tour you love to view full details including itinerary,
                              pricing, and inclusions.
                            </p>
                          </div>
                        </div>
                        <img
                          src="/assets/6a30fab54cf89df2f63f43b8_oliver-sjostrom-SDrAcUDJ-Qg-unsplash-2.jpg"
                          loading="lazy"
                          alt="Booking Slider Image"
                          className="booking-slider-image"
                        />
                      </div>
                    </div>
                    <div
                      data-w-id="8b4ff798-6ddb-48b1-e7e4-3034ac64b588"
                      className="booking-process-slide _03 w-slide"
                    >
                      <div className="booking-slider-contents">
                        <div
                          id="w-node-f2aea143-70cb-690a-816f-3ca39201930a-92019309"
                          className="booking-slider-left"
                        >
                          <h3 className="text-5xl">03</h3>
                          <div className="booking-slider-content">
                            <h5 className="text-3xl black">Confirm & Pay</h5>
                            <p className="text-base">
                              Once you're happy with everything, confirm your trip with secure
                              payment.
                            </p>
                          </div>
                        </div>
                        <img
                          src="/assets/6a30fab5dafa1809d13db625_paul-kapischka-43fXBR3mqoY-unsplash.jpg"
                          loading="lazy"
                          alt="Booking Slider Image"
                          className="booking-slider-image"
                        />
                      </div>
                    </div>
                    <div
                      data-w-id="b9a3f1d4-dafa-53ee-35a7-cca798a9e7ff"
                      className="booking-process-slide _04 w-slide"
                    >
                      <div className="booking-slider-contents">
                        <div
                          id="w-node-f2aea143-70cb-690a-816f-3ca39201930a-92019309"
                          className="booking-slider-left"
                        >
                          <h3 className="text-5xl">04</h3>
                          <div className="booking-slider-content">
                            <h5 className="text-3xl black">Pack & Travel</h5>
                            <p className="text-base">
                              We handle all the logistics so you can relax and enjoy your journey
                              from day one.
                            </p>
                          </div>
                        </div>
                        <img
                          src="/assets/6a30fab27bbf7979a38659ee_morgan-nott-h9AFT1fFSzE-unsplash-1.jpg"
                          loading="lazy"
                          alt="Booking Slider Image"
                          className="booking-slider-image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="booking-left-arrow w-slider-arrow-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 24 25"
                      fill="none"
                      className="booking-arrow"
                    >
                      <path
                        d="M14.5 19.5C14.367 19.5 14.233 19.447 14.135 19.342L9.993 14.912C9.357 14.276 9 13.416 9 12.5C9 11.584 9.357 10.724 10.004 10.076L14.134 5.65799C14.322 5.45499 14.639 5.44699 14.841 5.63499C15.043 5.82299 15.053 6.13999 14.865 6.34199L10.723 10.772C10.252 11.243 10 11.852 10 12.501C10 13.15 10.252 13.759 10.711 14.218L14.865 18.659C15.053 18.861 15.043 19.178 14.841 19.366C14.745 19.456 14.622 19.5 14.5 19.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="booking-right-arrow w-slider-arrow-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 24 25"
                      fill="none"
                      className="booking-arrow"
                    >
                      <path
                        d="M10.4995 19.5C10.3765 19.5 10.2545 19.455 10.1585 19.365C9.95653 19.177 9.94653 18.86 10.1345 18.658L14.2765 14.228C14.7475 13.757 14.9995 13.148 14.9995 12.499C14.9995 11.85 14.7475 11.241 14.2885 10.782L10.1345 6.341C9.94653 6.139 9.95653 5.822 10.1585 5.634C10.3595 5.447 10.6765 5.455 10.8655 5.657L15.0075 10.087C15.6435 10.723 16.0005 11.583 16.0005 12.499C16.0005 13.415 15.6435 14.275 14.9965 14.923L10.8665 19.341C10.7675 19.446 10.6345 19.499 10.5015 19.499L10.4995 19.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="slide-nav-booking-process w-slider-nav w-round w-num"></div>
                </div>
                <div className="booking-underline">
                  <div style={{ width: "25%" }} className="booking-line-animation"></div>
                </div>
              </div>
            </div>
          </section>
          <section className="packages-section">
            <div className="container">
              <div className="wrapper packages-wrapper">
                <div className="tour-activities-top">
                  <div data-w-id="e4ba16d5-f103-2e7c-3f21-3eb20909a829" style={{ opacity: "0" }}>
                    <div data-wf--subtitle-block--variant="base" className="subtitle-block">
                      <div className="subtitle-icon-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="subtitle-icon"
                        >
                          <path
                            d="M8 0L9.81019 6.18981L16 8L9.81019 9.81019L8 16L6.18981 9.81019L0 8L6.18981 6.18981L8 0Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="subtitle-text">Travel Packages</div>
                    </div>
                  </div>
                  <h2
                    data-w-id="e4ba16d5-f103-2e7c-3f21-3eb20909a82c"
                    style={{ opacity: "0" }}
                    className="text-5xl center-align"
                  >
                    Curated tour packages designed for every kind of traveler — from beach lovers to
                    mountain explorers.
                  </h2>
                </div>
                <div className="collection-list-wrapper-packages w-dyn-list">
                  <div role="list" className="collection-list-packages w-dyn-items">
                    <div
                      data-w-id="e4ba16d5-f103-2e7c-3f21-3eb20909a830"
                      style={{ opacity: "0" }}
                      role="listitem"
                      className="w-dyn-item"
                    >
                      <a
                        data-w-id="f5b80040-8a15-896a-25a3-71a8c305a107"
                        href="/packages/simply-srilanka"
                        className="packages-item-link w-inline-block"
                      >
                        <div
                          style={{
                            backgroundImage:
                              "url(/assets/6a6d9f9f00db30d38bd252e1_d6f4a52ad327b383ba0943fdf8286174.jpg)",
                          }}
                          className="package-card"
                        >
                          <div className="content-wrapper">
                            <div className="title-container">
                              <div className="overline">$3000 PP / 10 Nights</div>
                              <div className="text-3xl centre max-2lines">Simply Sri Lanka</div>
                            </div>
                            <div
                              data-w-id="f5b80040-8a15-896a-25a3-71a8c305a10d"
                              className="button-outline"
                            >
                              <div>
                                <div className="button-2-text _01">More info</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div
                      data-w-id="e4ba16d5-f103-2e7c-3f21-3eb20909a830"
                      style={{ opacity: "0" }}
                      role="listitem"
                      className="w-dyn-item"
                    >
                      <a
                        data-w-id="f5b80040-8a15-896a-25a3-71a8c305a107"
                        href="/packages/best-of-sri-lanka"
                        className="packages-item-link w-inline-block"
                      >
                        <div
                          style={{ backgroundImage: "url(/assets/6a41dd7eab34901277d0a2df_6.jpg)" }}
                          className="package-card"
                        >
                          <div className="content-wrapper">
                            <div className="title-container">
                              <div className="overline">$3200 PP / 11 Nights</div>
                              <div className="text-3xl centre max-2lines">
                                Sri lanka With Little Ones
                              </div>
                            </div>
                            <div
                              data-w-id="f5b80040-8a15-896a-25a3-71a8c305a10d"
                              className="button-outline"
                            >
                              <div>
                                <div className="button-2-text _01">More info</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                    <div
                      data-w-id="e4ba16d5-f103-2e7c-3f21-3eb20909a830"
                      style={{ opacity: "0" }}
                      role="listitem"
                      className="w-dyn-item"
                    >
                      <a
                        data-w-id="f5b80040-8a15-896a-25a3-71a8c305a107"
                        href="/packages/scenic-sri-lanka"
                        className="packages-item-link w-inline-block"
                      >
                        <div
                          style={{
                            backgroundImage:
                              "url(/assets/6a31a10cd01707ff15b90bad_lou-lou-b-photo-xSI-8hwyUzE-unsplash-1.jpg)",
                          }}
                          className="package-card"
                        >
                          <div className="content-wrapper">
                            <div className="title-container">
                              <div className="overline">$2600 PP / 8 Days</div>
                              <div className="text-3xl centre max-2lines">Scenic Sri Lanka </div>
                            </div>
                            <div
                              data-w-id="f5b80040-8a15-896a-25a3-71a8c305a10d"
                              className="button-outline"
                            >
                              <div>
                                <div className="button-2-text _01">More info</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="review-section">
            <div className="container">
              <div className="wrapper review-wrapper">
                <div className="tour-activities-top review">
                  <div data-w-id="f84103ab-0437-4fb5-7d04-a1dca0253556" style={{ opacity: "0" }}>
                    <div
                      data-wf--subtitle-block--variant="white"
                      className="subtitle-block w-variant-38bc5100-ac3d-1f4c-f013-04adbcdd5c81"
                    >
                      <div className="subtitle-icon-block w-variant-38bc5100-ac3d-1f4c-f013-04adbcdd5c81">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="subtitle-icon"
                        >
                          <path
                            d="M8 0L9.81019 6.18981L16 8L9.81019 9.81019L8 16L6.18981 9.81019L0 8L6.18981 6.18981L8 0Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="subtitle-text w-variant-38bc5100-ac3d-1f4c-f013-04adbcdd5c81">
                        Travelers Review
                      </div>
                    </div>
                  </div>
                  <h2
                    data-w-id="f84103ab-0437-4fb5-7d04-a1dca0253559"
                    style={{ opacity: "0" }}
                    className="text-5xl center-align on-color"
                  >
                    The Best Time to See Sri Lanka Is This Year
                  </h2>
                </div>
                <div
                  data-w-id="f84103ab-0437-4fb5-7d04-a1dca025355b"
                  style={{ opacity: "0" }}
                  className="slider-main-contents"
                >
                  <div
                    data-delay="4000"
                    data-animation="slide"
                    className="review-slider w-slider"
                    data-autoplay="false"
                    data-easing="ease"
                    data-hide-arrows="true"
                    data-disable-swipe="false"
                    data-autoplay-limit="1"
                    data-nav-spacing="3"
                    data-duration="500"
                    data-infinite="false"
                  >
                    <div
                      data-w-id="f84103ab-0437-4fb5-7d04-a1dca025357a"
                      className="review-mask w-slider-mask"
                    >
                      <div className="review-slide _01 w-slide">
                        <div className="review-slider-content info">
                          <h6 className="text-3xl">Free Tourist Visas</h6>
                          <div className="review-slider-info">
                            <h5 className="text-xl">
                              Sri Lanka is rolling out free 30-day tourist visas for Australian
                              passport holders in 2026, a limited pilot programme valid through
                              March 2027
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="review-slide _02 w-slide">
                        <div className="review-slider-content info">
                          <h6 className="text-3xl">A Direct Route from Melbourne</h6>
                          <div className="review-slider-info">
                            <h5 className="text-xl">
                              Jetstar launches direct Melbourne to Colombo flights from August 2026,
                              opening the easiest access Australians have ever had to the island
                            </h5>
                          </div>
                        </div>
                      </div>
                      <div className="review-slide _03 w-slide">
                        <div className="review-slider-content info">
                          <h6 className="text-3xl">Record-Year Quality, Pre-Rush Pricing</h6>
                          <div className="review-slider-info">
                            <h5 className="text-xl">
                              Sri Lanka recorded its highest-ever arrival numbers in 2025. Hotels
                              and operators are still pricing for recovery, not demand. That window
                              closes soon
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="review-left-arrow w-slider-arrow-left">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 24 25"
                        fill="none"
                        className="review-arrow"
                      >
                        <path
                          d="M14.5 19.431C14.367 19.431 14.233 19.378 14.135 19.273L9.993 14.843C9.357 14.207 9 13.347 9 12.431C9 11.515 9.357 10.655 10.004 10.007L14.134 5.58902C14.322 5.38602 14.639 5.37802 14.841 5.56602C15.043 5.75402 15.053 6.07102 14.865 6.27302L10.723 10.703C10.252 11.174 10 11.783 10 12.432C10 13.081 10.252 13.69 10.711 14.149L14.865 18.59C15.053 18.792 15.043 19.109 14.841 19.297C14.745 19.387 14.622 19.431 14.5 19.431Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div className="review-right-arrow w-slider-arrow-right">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 24 25"
                        fill="none"
                        className="review-arrow"
                      >
                        <path
                          d="M9.5 19.431C9.633 19.431 9.767 19.378 9.865 19.273L14.007 14.843C14.643 14.207 15 13.347 15 12.431C15 11.515 14.643 10.655 13.996 10.007L9.866 5.58902C9.678 5.38602 9.361 5.37802 9.159 5.56602C8.957 5.75402 8.947 6.07102 9.135 6.27302L13.277 10.703C13.748 11.174 14 11.783 14 12.432C14 13.081 13.748 13.69 13.289 14.149L9.135 18.59C8.947 18.792 8.957 19.109 9.159 19.297C9.255 19.387 9.378 19.431 9.5 19.431Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div className="review-slider-slide-nav w-slider-nav"></div>
                  </div>
                </div>
                <div className="review-underline">
                  <div className="review-line-animation"></div>
                </div>
              </div>
            </div>
          </section>
          <section className="blog-section">
            <div className="container">
              <div className="wrapper packages-wrapper">
                <div className="tour-activities-top">
                  <div data-w-id="58cd97f0-edde-1e4e-5d3b-e0d0f2fea5fc">
                    <div data-wf--subtitle-block--variant="base" className="subtitle-block">
                      <div className="subtitle-icon-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="subtitle-icon"
                        >
                          <path
                            d="M8 0L9.81019 6.18981L16 8L9.81019 9.81019L8 16L6.18981 9.81019L0 8L6.18981 6.18981L8 0Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="subtitle-text">Blog & Tips</div>
                    </div>
                  </div>
                  <h2
                    data-w-id="58cd97f0-edde-1e4e-5d3b-e0d0f2fea5ff"
                    className="text-5xl center-align"
                  >
                    Expert travel advice to help you explore smarter and deeper.
                  </h2>
                </div>
                <div className="blog-bottom">
                  <div className="collection-list-wrapper-packages w-dyn-list">
                    <div role="list" className="collection-list-blogs w-dyn-items">
                      <div
                        data-w-id="58cd97f0-edde-1e4e-5d3b-e0d0f2fea604"
                        role="listitem"
                        className="w-dyn-item"
                      >
                        <a
                          data-w-id="58cd97f0-edde-1e4e-5d3b-e0d0f2fea605"
                          href="/blog-posts/the-ultimate-honeymoon-destination"
                          className="packages-item-link w-inline-block"
                        >
                          <div className="overflow-hidden packages-overflow">
                            <img
                              src="/assets/6a461383af667aadb1948559_Couple-Image-1.webp"
                              loading="lazy"
                              alt="Packages Item Image"
                              className="packages-item-image blog"
                            />
                            <div className="blog-abs-detail">
                              <div className="blog-date white-color">September 7, 2025</div>
                              <div className="blog-reading-time">3 min read</div>
                            </div>
                          </div>
                          <div className="package-item-detail full-height">
                            <div className="title-container left">
                              <div className="text-2xl">The Ultimate Honeymoon Destination</div>
                              <p className="text-base medium-empasize max-character">
                                Experience the perfect romantic getaway with stunning beaches, misty
                                hills, luxury stays, and unforgettable memories.
                              </p>
                            </div>
                            <div
                              data-w-id="58cd97f0-edde-1e4e-5d3b-e0d0f2fea60e"
                              className="button-03 white top-m-20"
                            >
                              <div className="button-2-texts">
                                <div className="button-2-text _01">Read Article</div>
                                <div className="button-2-text _02">Read Article</div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        data-w-id="58cd97f0-edde-1e4e-5d3b-e0d0f2fea604"
                        role="listitem"
                        className="w-dyn-item"
                      >
                        <a
                          data-w-id="58cd97f0-edde-1e4e-5d3b-e0d0f2fea605"
                          href="/blog-posts/family-friendly-destinations-that-everyone-will-love"
                          className="packages-item-link w-inline-block"
                        >
                          <div className="overflow-hidden packages-overflow">
                            <img
                              src="/assets/6a6906707995be283ce08558_482bb97c283af3d87563adf063de29e9.jpg"
                              loading="lazy"
                              alt="Packages Item Image"
                              className="packages-item-image blog"
                            />
                            <div className="blog-abs-detail">
                              <div className="blog-date white-color">September 7, 2025</div>
                              <div className="blog-reading-time">3 min read</div>
                            </div>
                          </div>
                          <div className="package-item-detail full-height">
                            <div className="title-container left">
                              <div className="text-2xl">
                                Family-Friendly Destinations That Everyone Will Love
                              </div>
                              <p className="text-base medium-empasize max-character">
                                Traveling with family doesn’t have to be stressful. Discover safe,
                                fun, and exciting.
                              </p>
                            </div>
                            <div
                              data-w-id="58cd97f0-edde-1e4e-5d3b-e0d0f2fea60e"
                              className="button-03 white top-m-20"
                            >
                              <div className="button-2-texts">
                                <div className="button-2-text _01">Read Article</div>
                                <div className="button-2-text _02">Read Article</div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        data-w-id="58cd97f0-edde-1e4e-5d3b-e0d0f2fea604"
                        role="listitem"
                        className="w-dyn-item"
                      >
                        <a
                          data-w-id="58cd97f0-edde-1e4e-5d3b-e0d0f2fea605"
                          href="/blog-posts/why-2026-is-the-best-year-for-travel-and-tour"
                          className="packages-item-link w-inline-block"
                        >
                          <div className="overflow-hidden packages-overflow">
                            <img
                              src="/assets/6a690661bb4ef972fdbf43a1_77563cb74a78f4eb68b074f6721221a8.jpg"
                              loading="lazy"
                              alt="Packages Item Image"
                              sizes="100vw"
                              srcSet="/assets/6a690661bb4ef972fdbf43a1_77563cb74a78f4eb68b074f6721221a8-p-500.jpg 500w, /assets/6a690661bb4ef972fdbf43a1_77563cb74a78f4eb68b074f6721221a8-p-800.jpg 800w, /assets/6a690661bb4ef972fdbf43a1_77563cb74a78f4eb68b074f6721221a8.jpg 1000w"
                              className="packages-item-image blog"
                            />
                            <div className="blog-abs-detail">
                              <div className="blog-date white-color">September 16, 2025</div>
                              <div className="blog-reading-time">3 min read</div>
                            </div>
                          </div>
                          <div className="package-item-detail full-height">
                            <div className="title-container left">
                              <div className="text-2xl">
                                Why 2026 Is the Best Year for Travel and Tour
                              </div>
                              <p className="text-base medium-empasize max-character">
                                With new flight routes, improved global connections trending
                                destinations, 2026 is shaping.
                              </p>
                            </div>
                            <div
                              data-w-id="58cd97f0-edde-1e4e-5d3b-e0d0f2fea60e"
                              className="button-03 white top-m-20"
                            >
                              <div className="button-2-texts">
                                <div className="button-2-text _01">Read Article</div>
                                <div className="button-2-text _02">Read Article</div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <a
                    data-wf--button-03--variant="base"
                    data-w-id="34559677-dfd5-1be1-1f82-0af189093acf"
                    href="/blog"
                    className="button-03 w-inline-block"
                  >
                    <div className="button-2-texts">
                      <div className="text-base">Read More Blogs</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="faq-section">
            <div className="container">
              <div className="wrapper faq-wrapper">
                <div className="tour-activities-top faq">
                  <div data-w-id="72812a12-c6e8-fdbd-5047-3abe8e81c4ae">
                    <div data-wf--subtitle-block--variant="base" className="subtitle-block">
                      <div className="subtitle-icon-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="subtitle-icon"
                        >
                          <path
                            d="M8 0L9.81019 6.18981L16 8L9.81019 9.81019L8 16L6.18981 9.81019L0 8L6.18981 6.18981L8 0Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                      <div className="subtitle-text">FAQ</div>
                    </div>
                  </div>
                  <h2 data-w-id="72812a12-c6e8-fdbd-5047-3abe8e81c4b1" className="text-6xl centre">
                    Everything you need to know was clearly answered.
                  </h2>
                </div>
                <div className="faq-all-lists">
                  <div data-w-id="72812a12-c6e8-fdbd-5047-3abe8e81c4b4" className="faq-list-wrap">
                    <div className="faq-question">
                      <h6 className="faq-ques">
                        When is the best time of year to visit Sri Lanka?
                      </h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="72812a12-c6e8-fdbd-5047-3abe8e81c4b8"
                        data-animation-type="lottie"
                        data-src="/assets/68ab3db1916f2bb4da9390b7_Plus-to-minus.json"
                        data-loop="0"
                        data-direction="1"
                        data-autoplay="0"
                        data-renderer="svg"
                        data-default-duration="0"
                        data-duration="0.5"
                        data-loading="eager"
                        data-ix2-initial-state="0"
                      ></div>
                    </div>
                    <div className="faq-answer">
                      <p className="faq-para">
                        Generally speaking, we think the best time to travel to Sri Lanka in terms
                        of weather, and to visit as many areas as possible, is late December to
                        April. However, there are huge benefits to travelling outside this period,
                        and we regard Sri Lanka as a year-round destination. Please see our Sri
                        Lanka Weather Guide for more information.
                      </p>
                    </div>
                  </div>
                  <div data-w-id="72812a12-c6e8-fdbd-5047-3abe8e81c4bc" className="faq-list-wrap">
                    <div className="faq-question">
                      <h6 className="faq-ques">How much time do you really need in Sri Lanka?</h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="72812a12-c6e8-fdbd-5047-3abe8e81c4c0"
                        data-animation-type="lottie"
                        data-src="/assets/68ab3db1916f2bb4da9390b7_Plus-to-minus.json"
                        data-loop="0"
                        data-direction="1"
                        data-autoplay="0"
                        data-renderer="svg"
                        data-default-duration="0"
                        data-duration="0.5"
                        data-loading="eager"
                        data-ix2-initial-state="0"
                      ></div>
                    </div>
                    <div className="faq-answer">
                      <p className="faq-para">
                        We would normally suggest a minimum of seven days. However, if you are
                        combining Sri Lanka with the Maldives, it is possible to take a shorter trip
                        and still get a taste of what Sri Lanka has to offer. For those short on
                        time, we can plan a trip that focuses on easy-to-access areas to avoid too
                        much travel. Our Sri Lanka specialists can help with this.
                      </p>
                    </div>
                  </div>
                  <div data-w-id="72812a12-c6e8-fdbd-5047-3abe8e81c4c4" className="faq-list-wrap">
                    <div className="faq-question">
                      <h6 className="faq-ques">How much does a trip cost to Sri Lanka?</h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="72812a12-c6e8-fdbd-5047-3abe8e81c4c8"
                        data-animation-type="lottie"
                        data-src="/assets/68ab3db1916f2bb4da9390b7_Plus-to-minus.json"
                        data-loop="0"
                        data-direction="1"
                        data-autoplay="0"
                        data-renderer="svg"
                        data-default-duration="0"
                        data-duration="0.5"
                        data-loading="eager"
                        data-ix2-initial-state="0"
                      ></div>
                    </div>
                    <div className="faq-answer">
                      <p className="faq-para">
                        Most of our Sri Lanka trips start around £2,500 to £3,000 per person, based
                        on 10–14 nights with mid-range boutique hotels, private guiding, and
                        flights. For luxury stays (think Ulagalla or Wild Coast Tented Lodge),
                        you're looking at £5,000 and up per person for the same trip length. What's
                        included: your own private driver-guide, all accommodation, all experiences
                        and activities, internal transport, and 24-hour support. We can arrange your
                        international flights as well, or you can book those yourself. The price
                        moves up or down depending on how you travel; how long you're here, which
                        hotels suit you, and what you want to do. That's exactly why we design
                        everything with you first.
                      </p>
                    </div>
                  </div>
                  <div data-w-id="72812a12-c6e8-fdbd-5047-3abe8e81c4cc" className="faq-list-wrap">
                    <div className="faq-question">
                      <h6 className="faq-ques">
                        What's the difference between a tailor-made tour of Sri Lanka and a standard
                        package holiday?
                      </h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="72812a12-c6e8-fdbd-5047-3abe8e81c4d0"
                        data-animation-type="lottie"
                        data-src="/assets/68ab3db1916f2bb4da9390b7_Plus-to-minus.json"
                        data-loop="0"
                        data-direction="1"
                        data-autoplay="0"
                        data-renderer="svg"
                        data-default-duration="0"
                        data-duration="0.5"
                        data-loading="eager"
                        data-ix2-initial-state="0"
                      ></div>
                    </div>
                    <div className="faq-answer">
                      <p className="faq-para">
                        A tailor-made holiday to Sri Lanka includes a private driver and is designed
                        completely around you. All of the accommodation is handpicked, and the route
                        is designed around your interests and weather patterns. A package holiday is
                        pre-designed on specific dates and in specific hotels.
                      </p>
                    </div>
                  </div>
                  <div data-w-id="55975dc9-2a13-cea9-6484-cd5939ce3fd3" className="faq-list-wrap">
                    <div className="faq-question">
                      <h6 className="faq-ques">Is Sri Lanka an easy country to travel around?</h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="55975dc9-2a13-cea9-6484-cd5939ce3fd7"
                        data-animation-type="lottie"
                        data-src="/assets/68ab3db1916f2bb4da9390b7_Plus-to-minus.json"
                        data-loop="0"
                        data-direction="1"
                        data-autoplay="0"
                        data-renderer="svg"
                        data-default-duration="0"
                        data-duration="0.5"
                        data-loading="eager"
                        data-ix2-initial-state="0"
                      ></div>
                    </div>
                    <div className="faq-answer">
                      <p className="faq-para">
                        Sri Lanka is a very easy country to travel around with Red Dot, with your
                        own personal chauffeur-guide and car. This is by far the easiest, safest and
                        most convenient way to get around in comfort. We can also arrange helicopter
                        or light-aircraft flights, as well as train journeys.
                      </p>
                    </div>
                  </div>
                  <div data-w-id="8edb50b2-fa32-ba23-9729-fb2117b079ae" className="faq-list-wrap">
                    <div className="faq-question">
                      <h6 className="faq-ques">Is Sri Lanka generally safe for travellers?</h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="8edb50b2-fa32-ba23-9729-fb2117b079b2"
                        data-animation-type="lottie"
                        data-src="/assets/68ab3db1916f2bb4da9390b7_Plus-to-minus.json"
                        data-loop="0"
                        data-direction="1"
                        data-autoplay="0"
                        data-renderer="svg"
                        data-default-duration="0"
                        data-duration="0.5"
                        data-loading="eager"
                        data-ix2-initial-state="0"
                      ></div>
                    </div>
                    <div className="faq-answer">
                      <p className="faq-para">
                        Yes, Sri Lanka is generally considered safe, but as with all destinations we
                        recommend exercising the same caution you would at home. Be careful with
                        valuable belongings, and if something feels uncomfortable, trust your
                        instincts. Having a chauffeur-guide with you can add reassurance compared
                        with booking local transfers, buses or trains, and we provide 24-hour
                        support on the ground.
                      </p>
                    </div>
                  </div>
                  <div data-w-id="747834b4-76a2-47d5-0701-e44cb0eb4a02" className="faq-list-wrap">
                    <div className="faq-question">
                      <h6 className="faq-ques">Do I need a visa?</h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="747834b4-76a2-47d5-0701-e44cb0eb4a06"
                        data-animation-type="lottie"
                        data-src="/assets/68ab3db1916f2bb4da9390b7_Plus-to-minus.json"
                        data-loop="0"
                        data-direction="1"
                        data-autoplay="0"
                        data-renderer="svg"
                        data-default-duration="0"
                        data-duration="0.5"
                        data-loading="eager"
                        data-ix2-initial-state="0"
                      ></div>
                    </div>
                    <div className="faq-answer">
                      <p className="faq-para">
                        If you are travelling on a British passport, you need to obtain an
                        Electronic Travel Authorization (ETA) online before you travel. As of 25 May
                        2026, the tourist ETA is free for British passport holders for a stay of up
                        to 30 days. Visa rules and fees can change, so check the official ETA portal
                        and the UK Foreign Travel Advice website before departure. Please ask us if
                        you need more help.
                      </p>
                    </div>
                  </div>
                  <div data-w-id="31de91ee-9741-01dd-d154-f9ecf6ffe865" className="faq-list-wrap">
                    <div className="faq-question">
                      <h6 className="faq-ques">
                        Is Sri Lanka a good place to travel with children?
                      </h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="31de91ee-9741-01dd-d154-f9ecf6ffe869"
                        data-animation-type="lottie"
                        data-src="/assets/68ab3db1916f2bb4da9390b7_Plus-to-minus.json"
                        data-loop="0"
                        data-direction="1"
                        data-autoplay="0"
                        data-renderer="svg"
                        data-default-duration="0"
                        data-duration="0.5"
                        data-loading="eager"
                        data-ix2-initial-state="0"
                      ></div>
                    </div>
                    <div className="faq-answer">
                      <p className="faq-para">
                        Sri Lanka is an exceptional option for children of all ages because of its
                        variety, manageable journey times and often-direct flights. Find out more
                        about Little Red Dot in Sri Lanka, created for small children and young
                        families. Sri Lanka is also a brilliant option for teenagers with many
                        different interests and personality types.
                      </p>
                    </div>
                  </div>
                  <div data-w-id="7773ff7f-330d-4cdf-8552-a45c3cff7015" className="faq-list-wrap">
                    <div className="faq-question">
                      <h6 className="faq-ques">Is Sri Lanka really worth visiting?</h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="7773ff7f-330d-4cdf-8552-a45c3cff7019"
                        data-animation-type="lottie"
                        data-src="/assets/68ab3db1916f2bb4da9390b7_Plus-to-minus.json"
                        data-loop="0"
                        data-direction="1"
                        data-autoplay="0"
                        data-renderer="svg"
                        data-default-duration="0"
                        data-duration="0.5"
                        data-loading="eager"
                        data-ix2-initial-state="0"
                      ></div>
                    </div>
                    <div className="faq-answer">
                      <p className="faq-para">
                        Yes. Sri Lanka is well worth visiting because of the remarkable variety of
                        things to do and see, from Sigiriya Rock to Yala National Park, and from the
                        tea plantations to the surf beaches of southern Sri Lanka. Sri Lanka
                        arguably has something for everyone.
                      </p>
                    </div>
                  </div>
                </div>
                <a
                  data-wf--button-03--variant="base"
                  data-w-id="34559677-dfd5-1be1-1f82-0af189093acf"
                  href="/contact"
                  className="button-03 w-inline-block"
                >
                  <div className="button-2-texts">
                    <div className="text-base">Contact Travel Expert</div>
                  </div>
                </a>
              </div>
            </div>
          </section>
          <section className="footer">
            <div className="container">
              <div className="wrapper footer-wrapper">
                <div className="footer-top">
                  <div data-w-id="2d53314d-f5c0-14d9-03b9-02c12d985549" className="footer-left">
                    <div className="footer-left-top">
                      <a
                        href="/"
                        aria-current="page"
                        className="footer-logo-link w-inline-block w--current"
                      >
                        <img
                          src="/assets/69e71a6f589fe83624cd3faf_travedise-logo.svg"
                          loading="lazy"
                          alt="Footer Logo"
                          className="footer-logo"
                        />
                      </a>
                      <p className="footer-para">
                        Explore the world with confidence, comfort & crafted experiences.
                      </p>
                    </div>
                  </div>
                  <div className="footer-right">
                    <div
                      data-w-id="2d53314d-f5c0-14d9-03b9-02c12d985565"
                      className="footer-pages-links"
                    >
                      <div className="pages-link-flex">
                        <a href="/" aria-current="page" className="page-link w--current">
                          Home
                        </a>
                        <a href="/about" className="page-link">
                          About
                        </a>
                        <a href="/packages" className="page-link">
                          Packages
                        </a>
                        <a href="/contact" className="page-link">
                          Contact
                        </a>
                        <a href="/faq" className="page-link">
                          FAQ
                        </a>
                      </div>
                    </div>
                    <div className="footer-social-links">
                      <a
                        href="https://www.facebook.com/profile.php?id=100076714071144"
                        target="_blank"
                        className="footer-social-link w-inline-block"
                      >
                        <div className="social-icon-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            viewBox="0 0 16 17"
                            fill="none"
                            className="footer-social-svg"
                          >
                            <path
                              d="M16 8.73657C16 12.7292 13.0707 16.0392 9.24667 16.6399V11.0646H11.106L11.46 8.75791H9.24667V7.26124C9.24667 6.62991 9.556 6.01524 10.5467 6.01524H11.5527V4.05124C11.5527 4.05124 10.6393 3.89524 9.76667 3.89524C7.944 3.89524 6.75333 4.99991 6.75333 6.99924V8.75724H4.72733V11.0639H6.75333V16.6392C2.93 16.0379 0 12.7286 0 8.73657C0 4.31857 3.582 0.736572 8 0.736572C12.418 0.736572 16 4.31791 16 8.73657Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                        <div>Facebook</div>
                      </a>
                      <a
                        href="https://www.instagram.com/travedise.lk?igsh=M3V5OWZpd2FnZGRk"
                        target="_blank"
                        className="footer-social-link w-inline-block"
                      >
                        <div className="social-icon-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100%"
                            viewBox="0 0 16 17"
                            fill="none"
                            className="footer-social-svg"
                          >
                            <path
                              d="M8 2.12932C10.136 2.12932 10.3893 2.13732 11.2327 2.17599C12.1047 2.21599 13.0027 2.41465 13.638 3.04999C14.2793 3.69132 14.472 4.58066 14.512 5.45532C14.5507 6.29866 14.5587 6.55199 14.5587 8.68799C14.5587 10.824 14.5507 11.0773 14.512 11.9207C14.4727 12.788 14.2693 13.6947 13.638 14.326C12.9967 14.9673 12.108 15.16 11.2327 15.2C10.3893 15.2387 10.136 15.2467 8 15.2467C5.864 15.2467 5.61067 15.2387 4.76733 15.2C3.90667 15.1607 2.988 14.9527 2.362 14.326C1.724 13.688 1.528 12.79 1.488 11.9207C1.44933 11.0773 1.44133 10.824 1.44133 8.68799C1.44133 6.55199 1.44933 6.29866 1.488 5.45532C1.52733 4.59132 1.73267 3.67932 2.362 3.04999C3.002 2.40999 3.89467 2.21599 4.76733 2.17599C5.61067 2.13732 5.864 2.12932 8 2.12932ZM8 0.687988C5.82733 0.687988 5.55467 0.697322 4.70133 0.735988C3.46467 0.792655 2.23667 1.13665 1.34267 2.03065C0.445333 2.92799 0.104667 4.15332 0.048 5.38932C0.00933333 6.24266 0 6.51532 0 8.68799C0 10.8607 0.00933333 11.1333 0.048 11.9867C0.104667 13.222 0.45 14.4533 1.34267 15.3453C2.23933 16.242 3.46667 16.5833 4.70133 16.64C5.55467 16.6787 5.82733 16.688 8 16.688C10.1727 16.688 10.4453 16.6787 11.2987 16.64C12.5347 16.5833 13.764 16.2387 14.6573 15.3453C15.5553 14.4473 15.8953 13.2227 15.952 11.9867C15.9907 11.1333 16 10.8607 16 8.68799C16 6.51532 15.9907 6.24266 15.952 5.38932C15.8953 4.15266 15.5507 2.92399 14.6573 2.03065C13.762 1.13532 12.5313 0.791988 11.2987 0.735988C10.4453 0.697322 10.1727 0.687988 8 0.687988Z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M7.99863 4.58008C5.72996 4.58008 3.89062 6.41941 3.89062 8.68808C3.89062 10.9567 5.72996 12.7961 7.99863 12.7961C10.2673 12.7961 12.1066 10.9567 12.1066 8.68808C12.1066 6.41941 10.2673 4.58008 7.99863 4.58008ZM7.99863 11.3547C6.52596 11.3547 5.33196 10.1607 5.33196 8.68808C5.33196 7.21541 6.52596 6.02141 7.99863 6.02141C9.47129 6.02141 10.6653 7.21541 10.6653 8.68808C10.6653 10.1607 9.47129 11.3547 7.99863 11.3547Z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M12.2725 5.37728C12.8027 5.37728 13.2325 4.94747 13.2325 4.41728C13.2325 3.88708 12.8027 3.45728 12.2725 3.45728C11.7423 3.45728 11.3125 3.88708 11.3125 4.41728C11.3125 4.94747 11.7423 5.37728 12.2725 5.37728Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </div>
                        <div>Instagram</div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="footer-bottom">
                  <div className="footer-copyright-block">
                    <p className="copyright-text">© Rights reserved by</p>
                    <p className="copyright-text white">Travedise 2026</p>
                  </div>
                  <div className="footer-copyright-block">
                    <p className="copyright-text">Design and developed by</p>
                    <p className="copyright-text white">Haux Studio</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <WebflowScripts pageId="69c38c90a6a389dfc58351db" scripts={WEBFLOW_SCRIPTS} />
    </>
  );
}
