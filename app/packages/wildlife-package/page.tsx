import type { Metadata } from "next";

import { WebflowScripts, type ScriptSpec } from "@/components/webflow-scripts";

export const metadata: Metadata = {
  title: "Wildlife Package - Travedise - Your Next Adventure Starts Here",
  description: "Nature end to end, from gardens to leopard country.",
  alternates: { canonical: "/packages/wildlife-package" },
  openGraph: {
    title: "Wildlife Package - Travedise - Your Next Adventure Starts Here",
    description: "Nature end to end, from gardens to leopard country.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wildlife Package - Travedise - Your Next Adventure Starts Here",
    description: "Nature end to end, from gardens to leopard country.",
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
    src: "/js/webflow.d2a4261a.4f3e042a2bf23e9a.js",
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

export default function WildlifePackagePage() {
  return (
    <>
      <div className="page-wrapper">
        <div className="main-wrapper">
          <div className="gradient-body"></div>
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
                data-wf-page-id="69c38c90a6a389dfc58351e0"
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
            data-w-id="49d4ed15-5643-3524-b719-fccb972d9c29"
            data-animation="default"
            data-collapse="medium"
            data-duration="400"
            data-easing="ease"
            data-easing2="ease"
            role="banner"
            className="navbar w-nav"
          >
            <div className="container">
              <div className="navbar-wrapper main">
                <a href="/" className="navbar-brand w-nav-brand">
                  <img
                    loading="lazy"
                    src="/assets/6a90409b2572838714e11678_image-4-Vectorized-.svg"
                    alt="Travedise Logo"
                    className="tripvana-logo"
                  />
                </a>
                <nav role="navigation" className="nav-menu-wrapper w-nav-menu">
                  <div className="nav-menu">
                    <a href="/" className="nav-link">
                      Home
                    </a>
                    <a href="/about" className="nav-link">
                      About
                    </a>
                    <a href="/packages" className="nav-link">
                      Packages
                    </a>
                    <a href="/contact" className="nav-link">
                      Contact
                    </a>
                    <a href="/blog" className="nav-link">
                      Blog
                    </a>
                    <a
                      href="/contact"
                      data-w-id="49d4ed15-5643-3524-b719-fccb972d9c6b"
                      className="button-01 navbar-button-mob w-inline-block"
                    >
                      <div className="button-text-block">
                        <div className="button-text">Book Now</div>
                        <div className="button-text-02">Book Now</div>
                      </div>
                      <div className="button-icon-block">
                        <div className="button-arrow-block">
                          <div className="arrow-item">
                            <img
                              loading="lazy"
                              src="/assets/69c38c90a6a389dfc58351fc_Frame-2147223741.webp"
                              alt="Button Arrow"
                              className="button-arrow"
                            />
                          </div>
                          <div className="arrow-item-02">
                            <img
                              loading="lazy"
                              src="/assets/69c38c90a6a389dfc58351fc_Frame-2147223741.webp"
                              alt="Button Arrow"
                              className="button-arrow"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="hover-eliment"></div>
                    </a>
                  </div>
                </nav>
                <div className="nav-buttons-block">
                  <a
                    href="/contact"
                    data-w-id="49d4ed15-5643-3524-b719-fccb972d9c79"
                    className="button-01 navbar-button-desk w-inline-block"
                  >
                    <div className="button-text-block">
                      <div className="button-text">Book Now</div>
                      <div className="button-text-02">Book Now</div>
                    </div>
                    <div className="button-icon-block">
                      <div className="button-arrow-block">
                        <div className="arrow-item">
                          <img
                            loading="lazy"
                            src="/assets/69c38c90a6a389dfc58351ff_Frame-2147223741-2-.webp"
                            alt="Button Arrow"
                            className="button-arrow"
                          />
                        </div>
                        <div className="arrow-item-02">
                          <img
                            loading="lazy"
                            src="/assets/69c38c90a6a389dfc58351ff_Frame-2147223741-2-.webp"
                            alt="Button Arrow"
                            className="button-arrow"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="hover-eliment"></div>
                  </a>
                </div>
                <div className="menu-button w-nav-button">
                  <div
                    data-is-ix2-target="1"
                    className="hamburger-lottie"
                    data-w-id="49d4ed15-5643-3524-b719-fccb972d9c7b"
                    data-animation-type="lottie"
                    data-src="/assets/69c38c90a6a389dfc58351fd_Menu-Black-Hamburger.json"
                    data-loop="0"
                    data-direction="1"
                    data-autoplay="0"
                    data-renderer="svg"
                    data-default-duration="0"
                    data-duration="2.0020019204587935"
                    data-loading="eager"
                    data-ix2-initial-state="0"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <section className="packages-hero-section">
              <div className="container">
                <div className="wrapper packages-details-wrapper">
                  <a
                    data-w-id="684d3748-42c1-316f-2349-2da1378b5ef1"
                    style={{ opacity: "0" }}
                    href="/packages"
                    className="back-button w-inline-block"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="back-arrow"
                    >
                      <path
                        d="M15.8342 9.58333H5.22172L9.06922 5.73583L8.48005 5.14667L4.54922 9.0775C4.04089 9.58583 4.04089 10.4142 4.54922 10.9225L8.48089 14.8542L9.07005 14.265L5.22255 10.4175H15.8342V9.58417V9.58333Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <div>Back to Packages</div>
                  </a>
                  <div className="package-details">
                    <div className="package-left-details">
                      <h2
                        data-w-id="684d3748-42c1-316f-2349-2da1378b5ef8"
                        style={{ opacity: "0" }}
                        className="text-5xl"
                      >
                        Wildlife Package{" "}
                      </h2>
                      <div className="package-items-flex">
                        <div
                          data-w-id="684d3748-42c1-316f-2349-2da1378b5efa"
                          style={{ opacity: "0" }}
                          className="package-item-flex"
                        >
                          <div className="text-3xl gray description">
                            Nature end to end, from gardens to leopard country.
                          </div>
                        </div>
                      </div>
                      <div
                        data-w-id="684d3748-42c1-316f-2349-2da1378b5efc"
                        style={{ opacity: "0" }}
                        className="amenities-block"
                      >
                        <h5 className="inclusions-titile">Inclusions</h5>
                        <div className="amenities-lists">
                          <div className="amenities-list">
                            <img
                              src="/assets/6a67938bc3656fb06d574ae4_Amenities-Icon.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Accomodation</div>
                          </div>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a67938b9d12f58d5f661bff_Amenities-Icon-1.svg"
                              loading="lazy"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Activities</div>
                          </div>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a67938cce1a3e67fffa5461_Amenities-Icon-2.svg"
                              loading="lazy"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Meals</div>
                          </div>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a67938c15159e1def8e90f4_Amenities-Icon-3.svg"
                              loading="lazy"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Airport</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-w-id="684d3748-42c1-316f-2349-2da1378b5f10"
                      style={{ opacity: "0" }}
                      className="gallery-card"
                    >
                      <div className="main-image-wrap">
                        <div className="image-wrapper">
                          <div className="package-gallery-list-wrapper w-dyn-list">
                            <script
                              type="text/x-wf-template"
                              id="wf-template-684d3748-42c1-316f-2349-2da1378b5f14"
                              dangerouslySetInnerHTML={{
                                __html: `%3Cdiv%20role%3D%22listitem%22%20class%3D%22w-dyn-item%20w-dyn-repeater-item%22%3E%3Ca%20href%3D%22%23%22%20class%3D%22lightbox-thumbnil%20w-inline-block%20w-lightbox%22%3E%3Cimg%20src%3D%22%2Fassets%2F6a85d63ef68aae9b0e8e1026_geoff-brooks-3TwThGdEUZA-unsplash.jpg%22%20loading%3D%22lazy%22%20width%3D%22Auto%22%20alt%3D%22%22%20sizes%3D%22100vw%22%20srcset%3D%22%2Fassets%2F6a85d63ef68aae9b0e8e1026_geoff-brooks-3TwThGdEUZA-unsplash-p-500.jpg%20500w%2C%20%2Fassets%2F6a85d63ef68aae9b0e8e1026_geoff-brooks-3TwThGdEUZA-unsplash.jpg%20640w%22%20class%3D%22image-7%22%2F%3E%3Cscript%20type%3D%22application%2Fjson%22%20class%3D%22w-json%22%3E%7B%0A%20%20%22items%22%3A%20%5B%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%22url%22%3A%20%22%2Fassets%2F6a85d63ef68aae9b0e8e1026_geoff-brooks-3TwThGdEUZA-unsplash.jpg%22%2C%0A%20%20%20%20%20%20%22type%22%3A%20%22image%22%0A%20%20%20%20%7D%0A%20%20%5D%2C%0A%20%20%22group%22%3A%20%22%22%0A%7D%3C%2Fscript%3E%3C%2Fa%3E%3C%2Fdiv%3E`,
                              }}
                            />
                            <div role="list" className="hotizontal-wrapper w-dyn-items">
                              <div role="listitem" className="w-dyn-item w-dyn-repeater-item">
                                <a href="#" className="lightbox-thumbnil w-inline-block w-lightbox">
                                  <img
                                    src="/assets/6a85d63ef68aae9b0e8e1026_geoff-brooks-3TwThGdEUZA-unsplash.jpg"
                                    loading="lazy"
                                    width="Auto"
                                    alt=""
                                    sizes="100vw"
                                    srcSet="/assets/6a85d63ef68aae9b0e8e1026_geoff-brooks-3TwThGdEUZA-unsplash-p-500.jpg 500w, /assets/6a85d63ef68aae9b0e8e1026_geoff-brooks-3TwThGdEUZA-unsplash.jpg 640w"
                                    className="image-7"
                                  />
                                  <script
                                    type="application/json"
                                    className="w-json"
                                    dangerouslySetInnerHTML={{
                                      __html: `{
  "items": [
    {
      "url": "/assets/6a85d63ef68aae9b0e8e1026_geoff-brooks-3TwThGdEUZA-unsplash.jpg",
      "type": "image"
    }
  ],
  "group": ""
}`,
                                    }}
                                  />
                                </a>
                              </div>
                              <div role="listitem" className="w-dyn-item w-dyn-repeater-item">
                                <a href="#" className="lightbox-thumbnil w-inline-block w-lightbox">
                                  <img
                                    src="/assets/6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2.jpg"
                                    loading="lazy"
                                    width="Auto"
                                    alt=""
                                    sizes="100vw"
                                    srcSet="/assets/6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2-p-500.jpg 500w, /assets/6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2.jpg 640w"
                                    className="image-7"
                                  />
                                  <script
                                    type="application/json"
                                    className="w-json"
                                    dangerouslySetInnerHTML={{
                                      __html: `{
  "items": [
    {
      "url": "/assets/6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2.jpg",
      "type": "image"
    }
  ],
  "group": ""
}`,
                                    }}
                                  />
                                </a>
                              </div>
                              <div role="listitem" className="w-dyn-item w-dyn-repeater-item">
                                <a href="#" className="lightbox-thumbnil w-inline-block w-lightbox">
                                  <img
                                    src="/assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash.jpg"
                                    loading="lazy"
                                    width="Auto"
                                    alt=""
                                    sizes="100vw"
                                    srcSet="/assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash-p-500.jpg 500w, /assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash.jpg 640w"
                                    className="image-7"
                                  />
                                  <script
                                    type="application/json"
                                    className="w-json"
                                    dangerouslySetInnerHTML={{
                                      __html: `{
  "items": [
    {
      "url": "/assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash.jpg",
      "type": "image"
    }
  ],
  "group": ""
}`,
                                    }}
                                  />
                                </a>
                              </div>
                              <div role="listitem" className="w-dyn-item w-dyn-repeater-item">
                                <a href="#" className="lightbox-thumbnil w-inline-block w-lightbox">
                                  <img
                                    src="/assets/6a85cab5c4122ac2f546505a_heshan-weeramanthri-ytNk5s_4Wys-unsplash.jpg"
                                    loading="lazy"
                                    width="Auto"
                                    alt=""
                                    sizes="100vw"
                                    srcSet="/assets/6a85cab5c4122ac2f546505a_heshan-weeramanthri-ytNk5s_4Wys-unsplash-p-500.jpg 500w, /assets/6a85cab5c4122ac2f546505a_heshan-weeramanthri-ytNk5s_4Wys-unsplash.jpg 640w"
                                    className="image-7"
                                  />
                                  <script
                                    type="application/json"
                                    className="w-json"
                                    dangerouslySetInnerHTML={{
                                      __html: `{
  "items": [
    {
      "url": "/assets/6a85cab5c4122ac2f546505a_heshan-weeramanthri-ytNk5s_4Wys-unsplash.jpg",
      "type": "image"
    }
  ],
  "group": ""
}`,
                                    }}
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="w-dyn-hide w-dyn-empty">
                              <div>No items found.</div>
                            </div>
                          </div>
                        </div>
                        <a href="#" className="main-lightbox-wrapper w-inline-block w-lightbox">
                          <img
                            src="/assets/6a41db4b8d4186c694daefc8_protect-the-environment-on-your-sri-lanka-wildlife-safari-header.jpg"
                            loading="lazy"
                            style={{
                              backgroundImage:
                                "url(/assets/6a41db4b8d4186c694daefc8_protect-the-environment-on-your-sri-lanka-wildlife-safari-header.jpg)",
                            }}
                            alt=""
                            sizes="100vw"
                            srcSet="/assets/6a41db4b8d4186c694daefc8_protect-the-environment-on-your-sri-lanka-wildlife-safari-header-p-500.jpg 500w, /assets/6a41db4b8d4186c694daefc8_protect-the-environment-on-your-sri-lanka-wildlife-safari-header.jpg 750w"
                            className="image-3"
                          />
                          <script
                            type="application/json"
                            className="w-json"
                            dangerouslySetInnerHTML={{
                              __html: `{
  "items": [
    {
      "url": "/assets/6a85d63ef68aae9b0e8e1026_geoff-brooks-3TwThGdEUZA-unsplash.jpg",
      "type": "image"
    },
    {
      "url": "/assets/6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2.jpg",
      "type": "image"
    },
    {
      "url": "/assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash.jpg",
      "type": "image"
    },
    {
      "url": "/assets/6a85cab5c4122ac2f546505a_heshan-weeramanthri-ytNk5s_4Wys-unsplash.jpg",
      "type": "image"
    }
  ],
  "group": ""
}`,
                            }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="w-layout-blockcontainer container w-container">
                <div className="w-layout-vflex tour-details">
                  <div
                    data-w-id="684d3748-42c1-316f-2349-2da1378b5f24"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap gallery"
                  >
                    <div className="faq-question">
                      <div className="event-header">
                        <div className="overline-date">
                          <div className="amenities-list">
                            <img
                              src="/assets/6a31d42da3afddf46f0953fa_calendar-03.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Days 1–2 </div>
                          </div>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a31d49199f602fc31c3716f_location-01.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Sigiriya</div>
                          </div>
                        </div>
                        <h6 className="text-3xl black">Rock fortress and wildlife</h6>
                      </div>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="684d3748-42c1-316f-2349-2da1378b5f2f"
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
                    <div className="faq-answer full-width">
                      <div className="detail-wrapper">
                        <div className="left-col">
                          <p className="faq-para text-base">
                            Day one, the Temple of the Sacred Tooth Relic and a dance show. Day two:
                            giant trees, orchids and a treetop bat colony.
                          </p>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a67938bc3656fb06d574ae4_Amenities-Icon.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>You’ll stay at</div>
                          </div>
                          <div className="hotel-block">
                            <img
                              src="/assets/6a97db693e8b196e3ca74e68_jetwing-lake.jpg"
                              loading="lazy"
                              alt=""
                              className="hotel-thumbnail"
                            />
                            <div className="text-small hotel-name">Jetwing Lake</div>
                          </div>
                        </div>
                        <div className="light-col">
                          <div
                            data-w-id="684d3748-42c1-316f-2349-2da1378b5f3c"
                            style={{ opacity: "0" }}
                            className="slider-overflow"
                          >
                            <div
                              data-delay="4000"
                              data-animation="slide"
                              className="package-slider w-slider"
                              data-autoplay="true"
                              data-easing="ease"
                              data-hide-arrows="false"
                              data-disable-swipe="false"
                              data-autoplay-limit="0"
                              data-nav-spacing="3"
                              data-duration="500"
                              data-infinite="true"
                            >
                              <div className="package-slider w-slider-mask">
                                <div
                                  data-w-id="684d3748-42c1-316f-2349-2da1378b5f3f"
                                  className="slide w-slide"
                                >
                                  <div className="spacing-8px">
                                    <div className="collection-list-wrapper-2 w-dyn-list">
                                      <script
                                        type="text/x-wf-template"
                                        id="wf-template-684d3748-42c1-316f-2349-2da1378b5f42"
                                        dangerouslySetInnerHTML={{
                                          __html: `%3Cdiv%20role%3D%22listitem%22%20class%3D%22collection-item%20w-dyn-item%20w-dyn-repeater-item%20w-col%20w-col-6%22%3E%3Cimg%20src%3D%22%2Fassets%2F6a97dc9551f90341d964a424_209329-sigiriya-rock-fortress-sri-lanka.jpg%22%20loading%3D%22lazy%22%20alt%3D%22%22%20class%3D%22package-thumbnail%22%2F%3E%3C%2Fdiv%3E`,
                                        }}
                                      />
                                      <div
                                        role="list"
                                        className="collection-list-3 w-dyn-items w-row"
                                      >
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a97dc9551f90341d964a424_209329-sigiriya-rock-fortress-sri-lanka.jpg"
                                            loading="lazy"
                                            alt=""
                                            className="package-thumbnail"
                                          />
                                        </div>
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a97dc9a2011f106f35dfd8b_Sigiriya-4.jpg"
                                            loading="lazy"
                                            alt=""
                                            className="package-thumbnail"
                                          />
                                        </div>
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a97dca45af87a267af356ae_Minneriya-National-Park.jpg"
                                            loading="lazy"
                                            alt=""
                                            className="package-thumbnail"
                                          />
                                        </div>
                                      </div>
                                      <div className="w-dyn-hide w-dyn-empty">
                                        <div>No items found.</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="slide-nav w-slider-nav w-round w-num"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-w-id="684d3748-42c1-316f-2349-2da1378b5f53"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap gallery"
                  >
                    <div className="faq-question">
                      <div className="event-header">
                        <div className="overline-date">
                          <div className="amenities-list">
                            <img
                              src="/assets/6a31d42da3afddf46f0953fa_calendar-03.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Day 3 </div>
                          </div>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a31d49199f602fc31c3716f_location-01.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Kandy</div>
                          </div>
                        </div>
                        <h6 className="text-3xl black">The last kingdom in sri lanka</h6>
                      </div>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="684d3748-42c1-316f-2349-2da1378b5f5f"
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
                    <div className="faq-answer full-width">
                      <div className="detail-wrapper">
                        <div className="left-col">
                          <p
                            style={{
                              WebkitTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              MozTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              msTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              transform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                            }}
                            className="faq-para"
                          >
                            Discover Sri Lanka’s cultural heart with the Temple of the Sacred Tooth
                            Relic, scenic Kandy Lake, lush hills, and rich traditions.{" "}
                          </p>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a67938bc3656fb06d574ae4_Amenities-Icon.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>You’ll stay at</div>
                          </div>
                          <div className="hotel-block">
                            <img
                              src="/assets/6a97dd5991c3c6b5f19a4a98_Cinnamon-Citadel-Kandy-800x520-1.jpg"
                              loading="lazy"
                              alt=""
                              className="hotel-thumbnail"
                            />
                            <div>Cinnamon Kandy</div>
                          </div>
                        </div>
                        <div className="light-col">
                          <div
                            data-w-id="684d3748-42c1-316f-2349-2da1378b5f6c"
                            style={{ opacity: "0" }}
                            className="slider-overflow"
                          >
                            <div
                              data-delay="4000"
                              data-animation="slide"
                              className="package-slider w-slider"
                              data-autoplay="true"
                              data-easing="ease"
                              data-hide-arrows="false"
                              data-disable-swipe="false"
                              data-autoplay-limit="0"
                              data-nav-spacing="1"
                              data-duration="500"
                              data-infinite="true"
                            >
                              <div className="package-slider w-slider-mask">
                                <div
                                  data-w-id="684d3748-42c1-316f-2349-2da1378b5f6f"
                                  className="slide w-slide"
                                >
                                  <div className="spacing-8px">
                                    <div className="w-dyn-list">
                                      <script
                                        type="text/x-wf-template"
                                        id="wf-template-684d3748-42c1-316f-2349-2da1378b5f72"
                                        dangerouslySetInnerHTML={{
                                          __html: `%3Cdiv%20role%3D%22listitem%22%20class%3D%22collection-item%20w-dyn-item%20w-dyn-repeater-item%20w-col%20w-col-6%22%3E%3Cimg%20src%3D%22%2Fassets%2F6a97dd12dc2bb83ea205120f_a_realistic_high_detail_travel_photograph_of_kandy-2.jpeg%22%20loading%3D%22lazy%22%20alt%3D%22%22%20class%3D%22package-thumbnail%22%2F%3E%3C%2Fdiv%3E`,
                                        }}
                                      />
                                      <div
                                        role="list"
                                        className="collection-list-3 w-dyn-items w-row"
                                      >
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a97dd12dc2bb83ea205120f_a_realistic_high_detail_travel_photograph_of_kandy-2.jpeg"
                                            loading="lazy"
                                            alt=""
                                            className="package-thumbnail"
                                          />
                                        </div>
                                      </div>
                                      <div className="w-dyn-hide w-dyn-empty">
                                        <div>No items found.</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="slide-nav w-slider-nav w-round w-num"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-w-id="684d3748-42c1-316f-2349-2da1378b5f83"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap gallery"
                  >
                    <div className="faq-question">
                      <div className="event-header">
                        <div className="overline-date">
                          <div className="amenities-list">
                            <img
                              src="/assets/6a31d42da3afddf46f0953fa_calendar-03.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Day 4</div>
                          </div>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a31d49199f602fc31c3716f_location-01.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Ella</div>
                          </div>
                        </div>
                        <h6 className="text-3xl black">Where the Train Threads the Jungle</h6>
                      </div>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="684d3748-42c1-316f-2349-2da1378b5f8e"
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
                    <div className="faq-answer full-width">
                      <div className="detail-wrapper">
                        <div className="left-col">
                          <p
                            style={{
                              WebkitTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              MozTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              msTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              transform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                            }}
                            className="faq-para"
                          >
                            An active hill day: Little Adam’s Peak, the Nine Arches Bridge and
                            Ravana Falls, alive with birds and butterflies.
                          </p>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a67938bc3656fb06d574ae4_Amenities-Icon.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>You’ll stay at</div>
                          </div>
                          <div className="hotel-block">
                            <img
                              src="/assets/6a81fb7ea325af1ae46b6b37_Anasa_Wellness_Resort_logo.jpg"
                              loading="lazy"
                              alt=""
                              className="hotel-thumbnail"
                            />
                            <div>98 Acres Resort & Spa</div>
                          </div>
                        </div>
                        <div className="light-col">
                          <div
                            data-w-id="684d3748-42c1-316f-2349-2da1378b5f9b"
                            style={{ opacity: "0" }}
                            className="slider-overflow"
                          >
                            <div
                              data-delay="4000"
                              data-animation="slide"
                              className="package-slider w-slider"
                              data-autoplay="true"
                              data-easing="ease"
                              data-hide-arrows="false"
                              data-disable-swipe="false"
                              data-autoplay-limit="0"
                              data-nav-spacing="3"
                              data-duration="500"
                              data-infinite="true"
                            >
                              <div className="package-slider w-slider-mask">
                                <div
                                  data-w-id="684d3748-42c1-316f-2349-2da1378b5f9e"
                                  className="slide w-slide"
                                >
                                  <div className="spacing-8px">
                                    <div className="w-dyn-list">
                                      <script
                                        type="text/x-wf-template"
                                        id="wf-template-684d3748-42c1-316f-2349-2da1378b5fa1"
                                        dangerouslySetInnerHTML={{
                                          __html: `%3Cdiv%20role%3D%22listitem%22%20class%3D%22collection-item%20w-dyn-item%20w-dyn-repeater-item%20w-col%20w-col-6%22%3E%3Cimg%20src%3D%22%2Fassets%2F6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2.jpg%22%20loading%3D%22lazy%22%20alt%3D%22%22%20sizes%3D%22(max-width%3A%20767px)%2096vw%2C%20(max-width%3A%20991px)%20353px%2C%20459px%22%20srcset%3D%22%2Fassets%2F6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2-p-500.jpg%20500w%2C%20%2Fassets%2F6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2.jpg%20640w%22%20class%3D%22package-thumbnail%22%2F%3E%3C%2Fdiv%3E`,
                                        }}
                                      />
                                      <div
                                        role="list"
                                        className="collection-list-3 w-dyn-items w-row"
                                      >
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2.jpg"
                                            loading="lazy"
                                            alt=""
                                            sizes="(max-width: 767px) 96vw, (max-width: 991px) 353px, 459px"
                                            srcSet="/assets/6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2-p-500.jpg 500w, /assets/6a85ccb9e2f9e4f6f4c7cb3f_adam-vandermeer-IoNtLptRy0o-unsplash-2.jpg 640w"
                                            className="package-thumbnail"
                                          />
                                        </div>
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a85d552540f9e4ab4d3965d_matt-dany-KhVYyckCj_8-unsplash.jpg"
                                            loading="lazy"
                                            alt=""
                                            sizes="(max-width: 767px) 96vw, (max-width: 991px) 353px, 459px"
                                            srcSet="/assets/6a85d552540f9e4ab4d3965d_matt-dany-KhVYyckCj_8-unsplash-p-500.jpg 500w, /assets/6a85d552540f9e4ab4d3965d_matt-dany-KhVYyckCj_8-unsplash.jpg 640w"
                                            className="package-thumbnail"
                                          />
                                        </div>
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a85d55282af03360bc76fcf_praveen-maleesha-Qjbu8uEnyeo-unsplash.jpg"
                                            loading="lazy"
                                            alt=""
                                            sizes="(max-width: 767px) 96vw, (max-width: 991px) 353px, 459px"
                                            srcSet="/assets/6a85d55282af03360bc76fcf_praveen-maleesha-Qjbu8uEnyeo-unsplash-p-500.jpg 500w, /assets/6a85d55282af03360bc76fcf_praveen-maleesha-Qjbu8uEnyeo-unsplash.jpg 640w"
                                            className="package-thumbnail"
                                          />
                                        </div>
                                      </div>
                                      <div className="w-dyn-hide w-dyn-empty">
                                        <div>No items found.</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="slide-nav w-slider-nav w-round w-num"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-w-id="684d3748-42c1-316f-2349-2da1378b5fb2"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap gallery"
                  >
                    <div className="faq-question">
                      <div className="event-header">
                        <div className="overline-date">
                          <div className="amenities-list">
                            <img
                              src="/assets/6a31d42da3afddf46f0953fa_calendar-03.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Days 5–6 </div>
                          </div>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a31d49199f602fc31c3716f_location-01.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Yala</div>
                          </div>
                        </div>
                        <h6 className="text-3xl black">The Highest Leopard Density on Earth</h6>
                      </div>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="684d3748-42c1-316f-2349-2da1378b5fbd"
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
                    <div className="faq-answer full-width">
                      <div className="detail-wrapper">
                        <div className="left-col">
                          <p
                            style={{
                              WebkitTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              MozTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              msTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              transform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                            }}
                            className="faq-para"
                          >
                            The heart of the trip. Two days of safaris for leopards, elephants,
                            sloth bears and dazzling birdlife.
                          </p>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a67938bc3656fb06d574ae4_Amenities-Icon.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>You’ll stay at</div>
                          </div>
                          <div className="hotel-block">
                            <img
                              src="/assets/6a82193321e7807773ab692c_Double-Tree-by-Hilton.jpg"
                              loading="lazy"
                              alt=""
                              sizes="(max-width: 767px) 100vw, (max-width: 991px) 727px, 939px"
                              srcSet="/assets/6a82193321e7807773ab692c_Double-Tree-by-Hilton-p-500.jpg 500w, /assets/6a82193321e7807773ab692c_Double-Tree-by-Hilton-p-800.jpg 800w, /assets/6a82193321e7807773ab692c_Double-Tree-by-Hilton.jpg 1024w"
                              className="hotel-thumbnail"
                            />
                            <div>Double Tree by Hilton</div>
                          </div>
                        </div>
                        <div className="light-col">
                          <div
                            data-w-id="684d3748-42c1-316f-2349-2da1378b5fca"
                            style={{ opacity: "0" }}
                            className="slider-overflow"
                          >
                            <div
                              data-delay="4000"
                              data-animation="slide"
                              className="package-slider w-slider"
                              data-autoplay="true"
                              data-easing="ease"
                              data-hide-arrows="false"
                              data-disable-swipe="false"
                              data-autoplay-limit="0"
                              data-nav-spacing="3"
                              data-duration="500"
                              data-infinite="true"
                            >
                              <div className="package-slider w-slider-mask">
                                <div
                                  data-w-id="684d3748-42c1-316f-2349-2da1378b5fcd"
                                  className="slide w-slide"
                                >
                                  <div className="spacing-8px">
                                    <div className="w-dyn-list">
                                      <script
                                        type="text/x-wf-template"
                                        id="wf-template-684d3748-42c1-316f-2349-2da1378b5fd0"
                                        dangerouslySetInnerHTML={{
                                          __html: `%3Cdiv%20role%3D%22listitem%22%20class%3D%22collection-item%20w-dyn-item%20w-dyn-repeater-item%20w-col%20w-col-6%22%3E%3Cimg%20src%3D%22%2Fassets%2F6a85cac8651239f2620f7e4b_chanuka-nimsara-vJTKWsDIkQA-unsplash.jpg%22%20loading%3D%22lazy%22%20alt%3D%22%22%20sizes%3D%22(max-width%3A%20767px)%2096vw%2C%20(max-width%3A%20991px)%20353px%2C%20459px%22%20srcset%3D%22%2Fassets%2F6a85cac8651239f2620f7e4b_chanuka-nimsara-vJTKWsDIkQA-unsplash-p-500.jpg%20500w%2C%20%2Fassets%2F6a85cac8651239f2620f7e4b_chanuka-nimsara-vJTKWsDIkQA-unsplash.jpg%20640w%22%20class%3D%22package-thumbnail%22%2F%3E%3C%2Fdiv%3E`,
                                        }}
                                      />
                                      <div
                                        role="list"
                                        className="collection-list-3 w-dyn-items w-row"
                                      >
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a85cac8651239f2620f7e4b_chanuka-nimsara-vJTKWsDIkQA-unsplash.jpg"
                                            loading="lazy"
                                            alt=""
                                            sizes="(max-width: 767px) 96vw, (max-width: 991px) 353px, 459px"
                                            srcSet="/assets/6a85cac8651239f2620f7e4b_chanuka-nimsara-vJTKWsDIkQA-unsplash-p-500.jpg 500w, /assets/6a85cac8651239f2620f7e4b_chanuka-nimsara-vJTKWsDIkQA-unsplash.jpg 640w"
                                            className="package-thumbnail"
                                          />
                                        </div>
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a85cac8713ce401890787c4_mahesh-prabahath-J9H0_zTJerE-unsplash.jpg"
                                            loading="lazy"
                                            alt=""
                                            sizes="(max-width: 767px) 96vw, (max-width: 991px) 353px, 459px"
                                            srcSet="/assets/6a85cac8713ce401890787c4_mahesh-prabahath-J9H0_zTJerE-unsplash-p-500.jpg 500w, /assets/6a85cac8713ce401890787c4_mahesh-prabahath-J9H0_zTJerE-unsplash.jpg 640w"
                                            className="package-thumbnail"
                                          />
                                        </div>
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash.jpg"
                                            loading="lazy"
                                            alt=""
                                            sizes="(max-width: 767px) 96vw, (max-width: 991px) 353px, 459px"
                                            srcSet="/assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash-p-500.jpg 500w, /assets/6a85cac80bfd2279b9056d22_silver-ringvee-Za2tulPaa_M-unsplash.jpg 640w"
                                            className="package-thumbnail"
                                          />
                                        </div>
                                      </div>
                                      <div className="w-dyn-hide w-dyn-empty">
                                        <div>No items found.</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="slide-nav w-slider-nav w-round w-num"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-w-id="684d3748-42c1-316f-2349-2da1378b5fe1"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap gallery"
                  >
                    <div className="faq-question">
                      <div className="event-header">
                        <div className="overline-date">
                          <div className="amenities-list">
                            <img
                              src="/assets/6a31d42da3afddf46f0953fa_calendar-03.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Days 7–8</div>
                          </div>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a31d49199f602fc31c3716f_location-01.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Galle</div>
                          </div>
                        </div>
                        <h6 className="text-3xl black">Fort, Beach and Blue Whales</h6>
                      </div>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="684d3748-42c1-316f-2349-2da1378b5fec"
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
                    <div className="faq-answer full-width">
                      <div className="detail-wrapper">
                        <div className="left-col">
                          <p
                            style={{
                              WebkitTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              MozTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              msTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              transform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                            }}
                            className="faq-para"
                          >
                            Wind down at the fort and the beach. In season (Nov–Apr), add blue whale
                            watching off nearby Mirissa.
                          </p>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a67938bc3656fb06d574ae4_Amenities-Icon.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>You’ll stay at</div>
                          </div>
                          <div className="hotel-block">
                            <img
                              src="/assets/6a8207692602657800f43eea_Jetwing-Lighthouse.jpg"
                              loading="lazy"
                              alt=""
                              sizes="(max-width: 767px) 100vw, (max-width: 991px) 727px, 939px"
                              srcSet="/assets/6a8207692602657800f43eea_Jetwing-Lighthouse-p-500.jpg 500w, /assets/6a8207692602657800f43eea_Jetwing-Lighthouse-p-800.jpg 800w, /assets/6a8207692602657800f43eea_Jetwing-Lighthouse.jpg 1024w"
                              className="hotel-thumbnail"
                            />
                            <div>Jetwing Lighthouse</div>
                          </div>
                        </div>
                        <div className="light-col">
                          <div
                            data-w-id="684d3748-42c1-316f-2349-2da1378b5ff9"
                            style={{ opacity: "0" }}
                            className="slider-overflow"
                          >
                            <div
                              data-delay="4000"
                              data-animation="slide"
                              className="package-slider w-slider"
                              data-autoplay="true"
                              data-easing="ease"
                              data-hide-arrows="false"
                              data-disable-swipe="false"
                              data-autoplay-limit="0"
                              data-nav-spacing="3"
                              data-duration="500"
                              data-infinite="true"
                            >
                              <div className="package-slider w-slider-mask">
                                <div
                                  data-w-id="684d3748-42c1-316f-2349-2da1378b5ffc"
                                  className="slide w-slide"
                                >
                                  <div className="spacing-8px">
                                    <div className="w-dyn-list">
                                      <script
                                        type="text/x-wf-template"
                                        id="wf-template-684d3748-42c1-316f-2349-2da1378b5fff"
                                        dangerouslySetInnerHTML={{
                                          __html: `%3Cdiv%20role%3D%22listitem%22%20class%3D%22collection-item%20w-dyn-item%20w-dyn-repeater-item%20w-col%20w-col-6%22%3E%3Cimg%20src%3D%22%2Fassets%2F6a85cbb01b8277b4a2ab0b2b_hans-peter-traunig-PDI6nRWumto-unsplash.jpg%22%20loading%3D%22lazy%22%20alt%3D%22%22%20sizes%3D%22(max-width%3A%20767px)%2096vw%2C%20(max-width%3A%20991px)%20353px%2C%20459px%22%20srcset%3D%22%2Fassets%2F6a85cbb01b8277b4a2ab0b2b_hans-peter-traunig-PDI6nRWumto-unsplash-p-500.jpg%20500w%2C%20%2Fassets%2F6a85cbb01b8277b4a2ab0b2b_hans-peter-traunig-PDI6nRWumto-unsplash.jpg%20640w%22%20class%3D%22package-thumbnail%22%2F%3E%3C%2Fdiv%3E`,
                                        }}
                                      />
                                      <div
                                        role="list"
                                        className="collection-list-3 w-dyn-items w-row"
                                      >
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a85cbb01b8277b4a2ab0b2b_hans-peter-traunig-PDI6nRWumto-unsplash.jpg"
                                            loading="lazy"
                                            alt=""
                                            sizes="(max-width: 767px) 96vw, (max-width: 991px) 353px, 459px"
                                            srcSet="/assets/6a85cbb01b8277b4a2ab0b2b_hans-peter-traunig-PDI6nRWumto-unsplash-p-500.jpg 500w, /assets/6a85cbb01b8277b4a2ab0b2b_hans-peter-traunig-PDI6nRWumto-unsplash.jpg 640w"
                                            className="package-thumbnail"
                                          />
                                        </div>
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a85cbb0098812002ea3549a_polina-kneis-MYYdBGDS3AI-unsplash-2.jpg"
                                            loading="lazy"
                                            alt=""
                                            sizes="(max-width: 767px) 96vw, (max-width: 991px) 353px, 459px"
                                            srcSet="/assets/6a85cbb0098812002ea3549a_polina-kneis-MYYdBGDS3AI-unsplash-2-p-500.jpg 500w, /assets/6a85cbb0098812002ea3549a_polina-kneis-MYYdBGDS3AI-unsplash-2.jpg 640w"
                                            className="package-thumbnail"
                                          />
                                        </div>
                                        <div
                                          role="listitem"
                                          className="collection-item w-dyn-item w-dyn-repeater-item w-col w-col-6"
                                        >
                                          <img
                                            src="/assets/6a85cbb0f5891fc6f10f6ead_stanislav-rozhkov-mMm4RyQ0R_c-unsplash.jpg"
                                            loading="lazy"
                                            alt=""
                                            sizes="(max-width: 767px) 96vw, (max-width: 991px) 353px, 459px"
                                            srcSet="/assets/6a85cbb0f5891fc6f10f6ead_stanislav-rozhkov-mMm4RyQ0R_c-unsplash-p-500.jpg 500w, /assets/6a85cbb0f5891fc6f10f6ead_stanislav-rozhkov-mMm4RyQ0R_c-unsplash.jpg 640w"
                                            className="package-thumbnail"
                                          />
                                        </div>
                                      </div>
                                      <div className="w-dyn-hide w-dyn-empty">
                                        <div>No items found.</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="slide-nav w-slider-nav w-round w-num"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-w-id="684d3748-42c1-316f-2349-2da1378b6010"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap gallery"
                  >
                    <div className="faq-question">
                      <div className="event-header">
                        <div className="overline-date">
                          <div className="amenities-list">
                            <img
                              src="/assets/6a31d42da3afddf46f0953fa_calendar-03.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Day 9</div>
                          </div>
                          <div className="amenities-list">
                            <img
                              src="/assets/6a31d49199f602fc31c3716f_location-01.svg"
                              loading="lazy"
                              width="12"
                              alt="Amenities Icon"
                              className="amenities-icon"
                            />
                            <div>Airport</div>
                          </div>
                        </div>
                        <h6 className="text-3xl black">Home Bound</h6>
                      </div>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="684d3748-42c1-316f-2349-2da1378b601b"
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
                    <div className="faq-answer full-width">
                      <div className="detail-wrapper">
                        <div className="left-col">
                          <p
                            style={{
                              WebkitTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              MozTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              msTransform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                              transform:
                                "translate3d(0, -20px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                            }}
                            className="faq-para"
                          >
                            This morning you’ll be driven to the airport at Colombo to board your
                            flight home. Time to revel in the memories and plan your next trip.
                          </p>
                        </div>
                        <div className="light-col">
                          <div
                            data-w-id="684d3748-42c1-316f-2349-2da1378b6028"
                            style={{ opacity: "0" }}
                            className="slider-overflow"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
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
      <WebflowScripts pageId="69c38c90a6a389dfc58351e0" scripts={WEBFLOW_SCRIPTS} />
    </>
  );
}
