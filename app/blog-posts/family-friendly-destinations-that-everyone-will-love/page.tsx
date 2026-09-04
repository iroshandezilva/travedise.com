import type { Metadata } from "next";

import { WebflowScripts, type ScriptSpec } from "@/components/webflow-scripts";

export const metadata: Metadata = {
  title:
    "Family-Friendly Destinations That Everyone Will Love - Tripvana Webflow HTML Website Template",
  description:
    "Traveling with family doesn’t have to be stressful. Discover safe, fun, and exciting.",
  alternates: { canonical: "/blog-posts/family-friendly-destinations-that-everyone-will-love" },
  openGraph: {
    title:
      "Family-Friendly Destinations That Everyone Will Love - Tripvana Webflow HTML Website Template",
    description:
      "Traveling with family doesn’t have to be stressful. Discover safe, fun, and exciting.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Family-Friendly Destinations That Everyone Will Love - Tripvana Webflow HTML Website Template",
    description:
      "Traveling with family doesn’t have to be stressful. Discover safe, fun, and exciting.",
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
    src: "/js/webflow.3990032a.6adf2d5518842a7c.js",
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

export default function FamilyFriendlyDestinationsThatEveryoneWillLovePage() {
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
                data-wf-page-id="69c38c90a6a389dfc58351e1"
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
                <a href="/" className="navbar-brand w-nav-brand">
                  <img
                    loading="lazy"
                    src="/assets/69e71a6f589fe83624cd3faf_travedise-logo.svg"
                    alt="Tripvana Logo"
                    className="tripvana-logo"
                  />
                </a>
                <nav role="navigation" className="nav-menu-wrapper w-nav-menu">
                  <div className="nav-menu transparent-nav-menu">
                    <a href="/" className="nav-link transparent-nav-link">
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
          <section className="blog-single-hero-section">
            <img
              src="/assets/placeholder.60f9b1840c.svg"
              loading="lazy"
              alt=""
              className="blog-banner w-dyn-bind-empty"
            />
            <div className="blog-overlay"></div>
            <div className="container hero-container">
              <div className="blog-single-hero-wrapper">
                <h2
                  data-w-id="e654d152-232e-6fdf-e780-a55523e1a7f7"
                  style={{ opacity: "0" }}
                  className="about-hero-title"
                >
                  Family-Friendly Destinations That Everyone Will Love
                </h2>
                <div className="blog-top-flex">
                  <div
                    data-w-id="ad4cc3ac-abb6-55ca-6a71-f908c79e993f"
                    style={{ opacity: "0" }}
                    className="blog-author-detail"
                  >
                    <img
                      src="/assets/69c38c90a6a389dfc58352e5_circle-user.png"
                      loading="lazy"
                      alt="Blog Author Icon"
                      className="blog-author-icon"
                    />
                    <div className="blog-author-name w-dyn-bind-empty"></div>
                  </div>
                  <div
                    data-w-id="e92d79e7-7add-f9df-3233-03c1ac53efe9"
                    style={{ opacity: "0" }}
                    className="blog-author-detail"
                  >
                    <img
                      src="/assets/69c38c90a6a389dfc58352e6_calendar-lines.png"
                      loading="lazy"
                      alt="Blog Author Icon"
                      className="blog-author-icon"
                    />
                    <div className="blog-author-name">07 Sep 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="blog-details-section">
            <div className="container">
              <div className="wrapper blog-details-wrapper">
                <div
                  data-w-id="0041d3ce-8161-7054-b482-105d649d214b"
                  style={{ opacity: "0" }}
                  className="blog-details-1 w-richtext"
                >
                  <p>
                    🌴 Beach Escapes
                    <br />
                    Relax on golden sandy beaches, swim in crystal-clear waters, enjoy whale
                    watching, surfing, snorkeling, and breathtaking sunsets along Sri Lanka’s
                    stunning coastline.
                  </p>
                  <p>
                    ‍<br />
                    🐘 Wildlife & Nature
                    <br />
                    Experience unforgettable safaris in national parks, spot elephants, leopards,
                    sloth bears, crocodiles, and exotic birds, while exploring lush rainforests and
                    scenic landscapes.
                  </p>
                  <p>
                    ‍<br />
                    🏞️ Hill Country & Adventure
                    <br />
                    Journey through misty mountains, tea plantations, waterfalls, and picturesque
                    train rides. Enjoy hiking, zip-lining, white-water rafting, and spectacular
                    viewpoints.
                  </p>
                  <p>
                    ‍<br />
                    👨‍👩‍👧‍👦 Culture, Heritage & Family Experiences
                    <br />
                    Explore ancient cities, UNESCO World Heritage sites, colourful festivals,
                    temples, botanical gardens, and authentic local villages. With friendly people,
                    short travel distances, and activities for all ages, Sri Lanka is the perfect
                    destination for families, couples, and groups alike.
                  </p>
                  <p>‍</p>
                </div>
                <div
                  data-w-id="9760c632-1da9-bff0-9881-ab22628a24d0"
                  style={{ opacity: "0" }}
                  className="blog-middle"
                >
                  <img
                    src="/assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka.jpeg"
                    loading="lazy"
                    alt="Blog Banner-1"
                    sizes="100vw"
                    srcSet="/assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka-p-500.jpeg 500w, /assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka-p-800.jpeg 800w, /assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka-p-1080.jpeg 1080w, /assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka-p-1600.jpeg 1600w, /assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka-p-2000.jpeg 2000w, /assets/6a420385a1934e03bfbdb694_AdobeStock_258768935-sri-lanka.jpeg 2293w"
                    className="blog-banner-1"
                  />
                  <div className="text-small">Tiger’s Nest Monastery</div>
                </div>
                <div
                  data-w-id="99dc3f14-f0f4-83ce-b904-0077dd1ea436"
                  style={{ opacity: "0" }}
                  className="blog-details-2 w-dyn-bind-empty w-richtext"
                ></div>
                <div
                  data-w-id="a7d9a68c-2cb1-8044-5886-c463d71a8ffe"
                  style={{ opacity: "0" }}
                  className="blog-card-detail"
                >
                  <img
                    src="/assets/6a30c7d75601d08b07505cb0_chathura-anuradha-subasinghe-isdvqf04MDk-unsplash-2.jpg"
                    loading="lazy"
                    alt="Card Image"
                    className="card-image"
                  />
                  <div className="card-desp">
                    <div className="card-top-flex">
                      <h6 className="white-text">Kandy Discovery Tour</h6>
                      <p className="discovery-paragraph">
                        Includes guided monastery visits, local experiences, and trekking.
                      </p>
                    </div>
                    <a
                      data-wf--button-03--variant="white"
                      data-w-id="34559677-dfd5-1be1-1f82-0af189093acf"
                      href="/contact"
                      className="button-03 w-variant-d15ab77a-0e25-2676-1e27-447d8f2ef644 w-inline-block"
                    >
                      <div className="button-2-texts">
                        <div className="text-base">From $1,699/Person</div>
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  data-w-id="0b0debae-92b7-e094-106b-8c256d831c41"
                  style={{ opacity: "0" }}
                  className="blog-details-3 w-dyn-bind-empty w-richtext"
                ></div>
                <div
                  data-w-id="9c872d30-3c75-f487-ddd2-9ae87fffc30c"
                  style={{ opacity: "0" }}
                  className="back-details-block"
                >
                  <a href="/blog" className="back-link w-inline-block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="arrow blog-arrow"
                    >
                      <path
                        d="M4.9992 12.0001C4.9972 12.0171 4.9982 11.9871 4.9992 12.0001V12.0001ZM18.4992 11.5001H6.0902C6.1642 11.2941 6.2852 11.1001 6.4522 10.9361L10.4002 6.89311C10.5932 6.69511 10.5892 6.37811 10.3912 6.18611C10.1942 5.99311 9.8782 5.99811 9.6842 6.19411L5.7432 10.2311C5.2642 10.7041 4.9992 11.3721 4.9992 12.0011C5.0062 12.6251 5.2462 13.2861 5.7152 13.7621L9.6382 17.8481C9.7362 17.9501 9.8672 18.0011 9.9992 18.0011C10.1242 18.0011 10.2492 17.9551 10.3452 17.8611C10.5442 17.6711 10.5512 17.3531 10.3602 17.1541L6.4322 13.0631C6.2702 12.8991 6.1532 12.7061 6.0832 12.5011H18.4992C18.7752 12.5011 18.9992 12.2771 18.9992 12.0011C18.9992 11.7251 18.7752 11.5011 18.4992 11.5011V11.5001Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <div>Back to Blog</div>
                  </a>
                  <div className="social-block">
                    <a
                      href="https://www.facebook.com/profile.php?id=100076714071144"
                      target="_blank"
                      className="social-link blog w-inline-block"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 16 17"
                        fill="none"
                        className="social-svg"
                      >
                        <g clipPath="url(#clip0_588_924)">
                          <path
                            d="M16 8.80542C16 12.7981 13.0707 16.1081 9.24667 16.7088V11.1334H11.106L11.46 8.82675H9.24667V7.33009C9.24667 6.69875 9.556 6.08409 10.5467 6.08409H11.5527V4.12009C11.5527 4.12009 10.6393 3.96409 9.76667 3.96409C7.944 3.96409 6.75333 5.06875 6.75333 7.06809V8.82609H4.72733V11.1328H6.75333V16.7081C2.93 16.1068 0 12.7974 0 8.80542C0 4.38742 3.582 0.80542 8 0.80542C12.418 0.80542 16 4.38675 16 8.80542Z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="footer">
            <div className="container">
              <div className="wrapper footer-wrapper">
                <div className="footer-top">
                  <div data-w-id="2d53314d-f5c0-14d9-03b9-02c12d985549" className="footer-left">
                    <div className="footer-left-top">
                      <a href="/" className="footer-logo-link w-inline-block">
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
                        <a href="/" className="page-link">
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
      <WebflowScripts pageId="69c38c90a6a389dfc58351e1" scripts={WEBFLOW_SCRIPTS} />
    </>
  );
}
