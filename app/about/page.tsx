import type { Metadata } from "next";

import { WebflowScripts, type ScriptSpec } from "@/components/webflow-scripts";

export const metadata: Metadata = {
  title: "About - Travedise - Your Next Adventure Starts Here",
  description:
    "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About - Travedise - Your Next Adventure Starts Here",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Travedise - Your Next Adventure Starts Here",
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
    src: "/js/webflow.schunk.9dfb96661114d3db.js",
  },
  {
    src: "/js/webflow.b1edd913.4495fb0290916f3c.js",
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

export default function AboutPage() {
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
                data-wf-page-id="69c38c90a6a389dfc58351ed"
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
                    <a
                      href="/about"
                      aria-current="page"
                      className="nav-link transparent-nav-link w--current"
                    >
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
          <section className="about-hero-section">
            <div className="container hero-container">
              <div className="about-hero-wrapper">
                <h1
                  data-w-id="68220bf7-daa5-f3ce-96bb-0806eebe5da8"
                  style={{ opacity: "0" }}
                  className="text-6xl centre on-surface"
                >
                  We design tailor-made journeys  through Sri Lanka
                </h1>
                <div
                  data-w-id="f4bd9619-7422-706b-67fd-bd53ddfa4b76"
                  style={{ opacity: "0" }}
                  className="text-base on-surface centre _600"
                >
                  Want to see Sri Lanka through local eyes? Our specialists have spent years
                  building relationships across the island and discovering places most visitors
                  never find. They'll get to know exactly what you're looking for and design
                  something that's completely yours. Ready to start planning? Get in touch and let's
                  create your perfect Sri Lankan adventure.
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <div className="wrapper featured-stays-wrapper">
                <div className="tour-activities-top">
                  <div data-w-id="f7baa4bf-2549-35bc-ead3-45dd7f5c9eb4" style={{ opacity: "0" }}>
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
                      <div className="subtitle-text">Featured Stays</div>
                    </div>
                  </div>
                  <h2
                    data-w-id="f7baa4bf-2549-35bc-ead3-45dd7f5c9eb7"
                    style={{ opacity: "0" }}
                    className="center-align custom-font"
                  >
                    Stay where comfort meets character. Each hotel for its style, service, and sense
                    of place.
                  </h2>
                </div>
                <div
                  data-delay="4000"
                  data-animation="slide"
                  className="featured-stays-slider w-slider"
                  data-autoplay="true"
                  data-easing="ease"
                  style={{ opacity: "0" }}
                  data-hide-arrows="false"
                  data-disable-swipe="false"
                  data-w-id="c9a2811a-446c-d452-e786-77a42f293b65"
                  data-autoplay-limit="1"
                  data-nav-spacing="3"
                  data-duration="500"
                  data-infinite="true"
                >
                  <div className="featured-stays-mask w-slider-mask">
                    <div
                      data-w-id="c9a2811a-446c-d452-e786-77a42f293b67"
                      className="featured-stays-slide w-slide"
                    >
                      <div className="w-dyn-list">
                        <div role="list" className="w-dyn-items">
                          <div role="listitem" className="w-dyn-item">
                            <div
                              data-w-id="1acce5a6-6ab2-2ce8-d55b-a40965551262"
                              style={{
                                backgroundImage:
                                  "url(/assets/6a4694e684fc9300dae33f8b_dji_fly_20231005_135124_26_1696487241346_photo_743eb42946abdea5455b88162e9a8b39d0ef392b.jpg)",
                              }}
                              className="featured-stays-details-1"
                            >
                              <div className="featured-stays-short-detail">
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352ee_island-tropical-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">Jungle Views</div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352ef_bed-alt.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">
                                    Private Villas
                                  </div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352f0_swimmer-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">
                                    Attached Pool
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-w-id="a3f9416d-6378-38ac-8bc7-8111122145a2"
                      className="featured-stays-slide w-slide"
                    >
                      <div className="w-dyn-list">
                        <div role="list" className="w-dyn-items">
                          <div role="listitem" className="w-dyn-item">
                            <div
                              style={{
                                backgroundImage:
                                  "url(/assets/6a4693353db0afd077906b03_Exp-1920X656.jpg)",
                              }}
                              className="featured-stays-details-1"
                            >
                              <div className="featured-stays-short-detail">
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352ee_island-tropical-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">Ocean View</div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352ef_bed-alt.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">
                                    Private Rooms
                                  </div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352f0_swimmer-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">.</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-w-id="a2d66d17-53cc-846d-9efd-00203d76745e"
                      className="featured-stays-slide w-slide"
                    >
                      <div className="w-dyn-list">
                        <div role="list" className="w-dyn-items">
                          <div role="listitem" className="w-dyn-item">
                            <div
                              style={{
                                backgroundImage:
                                  "url(/assets/6a46912fd643365866c4ae37_b160707001-banner-size.jpg)",
                              }}
                              className="featured-stays-details-1"
                            >
                              <div className="featured-stays-short-detail">
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352ee_island-tropical-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">
                                    Lake & Mountain View
                                  </div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352ef_bed-alt.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">
                                    Private Rooms
                                  </div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352f0_swimmer-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">.</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-w-id="2b40d971-cc18-d4e7-2c69-bbbe525e6e16"
                      className="featured-stays-slide w-slide"
                    >
                      <div className="w-dyn-list">
                        <div role="list" className="w-dyn-items">
                          <div role="listitem" className="w-dyn-item">
                            <div
                              style={{
                                backgroundImage:
                                  "url(/assets/6a461dbef9544749a2e40601_Cape-Weligama-Aerial-View.webp)",
                              }}
                              className="featured-stays-details-1"
                            >
                              <div className="featured-stays-short-detail">
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352ee_island-tropical-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">Ocean View</div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352ef_bed-alt.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">Open Resort</div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352f0_swimmer-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">
                                    Infinity Pool
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-w-id="ae67b2a5-009d-833f-ccb6-699e2b232d44"
                      className="featured-stays-slide w-slide"
                    >
                      <div className="w-dyn-list">
                        <div role="list" className="w-dyn-items">
                          <div role="listitem" className="w-dyn-item">
                            <div
                              style={{
                                backgroundImage:
                                  "url(/assets/6a461b7f02b600abc153dc8c_1578123151385.jpeg)",
                              }}
                              className="featured-stays-details-1"
                            >
                              <div className="featured-stays-short-detail">
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352ee_island-tropical-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">Lake View</div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352ef_bed-alt.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">
                                    Private Rooms
                                  </div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352f0_swimmer-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">.</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-w-id="fdb8adcc-847b-14e3-0a07-37dae3db1760"
                      className="featured-stays-slide w-slide"
                    >
                      <div className="w-dyn-list">
                        <div role="list" className="w-dyn-items">
                          <div role="listitem" className="w-dyn-item">
                            <div
                              style={{
                                backgroundImage:
                                  "url(/assets/6a46163446b25f61e046cd05_jetwing-lighthouse-gallery-image-16.jpg)",
                              }}
                              className="featured-stays-details-1"
                            >
                              <div className="featured-stays-short-detail">
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352ee_island-tropical-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">Ocean View</div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352ef_bed-alt.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">
                                    Private Rooms
                                  </div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/69c38c90a6a389dfc58352f0_swimmer-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">..</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      data-w-id="c156e2d5-ac13-6218-7bf3-96513434c2a0"
                      className="featured-stays-slide w-slide"
                    >
                      <div className="w-dyn-list">
                        <div role="list" className="w-dyn-items">
                          <div role="listitem" className="w-dyn-item">
                            <div
                              style={{
                                backgroundImage:
                                  "url(/assets/6a46178ef3bce7c6d417fb2d_aadya-tea-bungalow.jpg)",
                              }}
                              className="featured-stays-details-1"
                            >
                              <div className="featured-stays-short-detail">
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/6a3d1158fc98902a45ad9479_69c38c90a6a389dfc58352ee_island-tropicalpct20-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">
                                    Mountain View
                                  </div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/6a3d1158fc98902a45ad9483_69c38c90a6a389dfc58352ef_bed-alt.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">
                                    Boutique Villa
                                  </div>
                                </div>
                                <div className="mountain-flex">
                                  <img
                                    src="/assets/6a3d1158fc98902a45ad9480_69c38c90a6a389dfc58352f0_swimmerpct20-1-.png"
                                    loading="lazy"
                                    alt="Mountain Icon"
                                    className="mountain-icon"
                                  />
                                  <div className="large-paragraph mountain-title">
                                    Attached Pool
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accommodations-left-arrow w-slider-arrow-left">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="accommodations-arrow"
                    >
                      <path
                        d="M13.5005 19C13.6235 19 13.7455 18.955 13.8415 18.865C14.0435 18.677 14.0535 18.36 13.8655 18.158L9.72347 13.728C9.25247 13.257 9.00047 12.648 9.00047 11.999C9.00047 11.35 9.25247 10.741 9.71147 10.282L13.8655 5.841C14.0535 5.639 14.0435 5.322 13.8415 5.134C13.6405 4.947 13.3235 4.955 13.1345 5.157L8.99247 9.587C8.35647 10.223 7.99947 11.083 7.99947 11.999C7.99947 12.915 8.35647 13.775 9.00347 14.423L13.1335 18.841C13.2325 18.946 13.3655 18.999 13.4985 18.999L13.5005 19Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="accommodations-right-arrow w-slider-arrow-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="accommodations-arrow"
                    >
                      <path
                        d="M10.4995 19C10.3765 19 10.2545 18.955 10.1585 18.865C9.95653 18.677 9.94653 18.36 10.1345 18.158L14.2765 13.728C14.7475 13.257 14.9995 12.648 14.9995 11.999C14.9995 11.35 14.7475 10.741 14.2885 10.282L10.1345 5.841C9.94653 5.639 9.95653 5.322 10.1585 5.134C10.3595 4.947 10.6765 4.955 10.8655 5.157L15.0075 9.587C15.6435 10.223 16.0005 11.083 16.0005 11.999C16.0005 12.915 15.6435 13.775 14.9965 14.423L10.8665 18.841C10.7675 18.946 10.6345 18.999 10.5015 18.999L10.4995 19Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="slide-nav-featured-stays w-slider-nav w-round w-num"></div>
                </div>
                <div
                  data-w-id="cdf74e8b-f5b6-2bde-a0ad-eb6ca310f60e"
                  style={{ opacity: "0" }}
                  className="featured-stays-slider-contents"
                >
                  <div
                    style={{ display: "block" }}
                    className="collection-list-wrapper accommodations-1 w-dyn-list"
                  >
                    <div role="list" className="w-dyn-items">
                      <div role="listitem" className="w-dyn-item">
                        <div className="featured-stays-slider-card">
                          <div className="featured-stays-top">
                            <div className="accommodation-slider-title">Hilton Yala Resort</div>
                            <p className="large-paragraph accommodations-para">
                              Luxury retreat offering elegant stays and easy access to wildlife
                              adventures in Yala.
                            </p>
                          </div>
                          <div className="featured-stays-bottom">
                            <div className="per-night-block">
                              <div>From</div>
                              <div>$320/night</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="collection-list-wrapper accommodations-2 w-dyn-list"
                  >
                    <div role="list" className="w-dyn-items">
                      <div role="listitem" className="w-dyn-item">
                        <div className="featured-stays-slider-card">
                          <div className="featured-stays-top">
                            <div className="accommodation-slider-title">
                              Jetwing Blue Hotel Negambo
                            </div>
                            <p className="large-paragraph accommodations-para">
                              Jetwing Blue is a beachfront hotel in Negombo, perfect for a relaxing
                              coastal stay.
                            </p>
                          </div>
                          <div className="featured-stays-bottom">
                            <div className="per-night-block">
                              <div>From</div>
                              <div>$320/night</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="collection-list-wrapper accommodations-3 w-dyn-list"
                  >
                    <div role="list" className="w-dyn-items">
                      <div role="listitem" className="w-dyn-item">
                        <div className="featured-stays-slider-card">
                          <div className="featured-stays-top">
                            <div className="accommodation-slider-title">Heritance Kandalama</div>
                            <p className="large-paragraph accommodations-para">
                              Heritance Kandalama is an iconic luxury hotel seamlessly built into
                              the surrounding rock and forest, offering breathtaking views of
                              Kandalama Lake and easy access to Sri Lanka’s Cultural Triangle.
                            </p>
                          </div>
                          <div className="featured-stays-bottom">
                            <div className="per-night-block">
                              <div>From</div>
                              <div>$320/night</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="collection-list-wrapper accommodations-4 w-dyn-list"
                  >
                    <div role="list" className="w-dyn-items">
                      <div role="listitem" className="w-dyn-item">
                        <div className="featured-stays-slider-card">
                          <div className="featured-stays-top">
                            <div className="accommodation-slider-title">Cape Weligama </div>
                            <p className="large-paragraph accommodations-para">
                              A luxury clifftop resort offering elegant villas, stunning ocean
                              views, world-class dining, and the perfect setting for a relaxing
                              coastal escape.
                            </p>
                          </div>
                          <div className="featured-stays-bottom">
                            <div className="per-night-block">
                              <div>From</div>
                              <div>$320/night</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="collection-list-wrapper accommodations-5 w-dyn-list"
                  >
                    <div role="list" className="w-dyn-items">
                      <div role="listitem" className="w-dyn-item">
                        <div className="featured-stays-slider-card">
                          <div className="featured-stays-top">
                            <div className="accommodation-slider-title">
                              Double Tree By Hilton Weerawila{" "}
                            </div>
                            <p className="large-paragraph accommodations-para">
                              A luxury lakeside retreat offering stylish rooms, exceptional
                              hospitality, and easy access to Sri Lanka’s wildlife and southern
                              attractions.
                            </p>
                          </div>
                          <div className="featured-stays-bottom">
                            <div className="per-night-block">
                              <div>From</div>
                              <div>$320/night</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="collection-list-wrapper accommodations-6 w-dyn-list"
                  >
                    <div role="list" className="w-dyn-items">
                      <div role="listitem" className="w-dyn-item">
                        <div className="featured-stays-slider-card">
                          <div className="featured-stays-top">
                            <div className="accommodation-slider-title">
                              Jetwing Lighthouse Hotel{" "}
                            </div>
                            <p className="large-paragraph accommodations-para">
                              Luxury beachfront resort with stunning beach views
                            </p>
                          </div>
                          <div className="featured-stays-bottom">
                            <div className="per-night-block">
                              <div>From</div>
                              <div>$320/night</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ display: "none" }}
                    className="collection-list-wrapper accommodations-7 w-dyn-list"
                  >
                    <div role="list" className="w-dyn-items">
                      <div role="listitem" className="w-dyn-item">
                        <div className="featured-stays-slider-card">
                          <div className="featured-stays-top">
                            <div className="accommodation-slider-title">Aadya Tea Bangalow </div>
                            <p className="large-paragraph accommodations-para">
                              a premium, 5-star luxury boutique property located on a rehabilitated
                              200-acre tea estate in Maskeliya (near Hatton), Sri Lanka. Nestled at
                              an elevation of 1,250 meters bordering the Sri Pada (Adam's Peak)
                              Wilderness Reserve, it offers an exclusive, secluded "up-country"
                              living experience.
                            </p>
                          </div>
                          <div className="featured-stays-bottom">
                            <div className="per-night-block">
                              <div>From</div>
                              <div>$320/night</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="about-section">
            <div className="container">
              <div className="wrapper about-wrapper">
                <div className="about-left">
                  <div data-w-id="fc6a4538-fd97-dece-bbae-52365f30353b" style={{ opacity: "0" }}>
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
                        About Tripvana
                      </div>
                    </div>
                  </div>
                  <h2
                    data-w-id="339a91f0-009d-dd65-f31b-d0b040c8e2a6"
                    style={{ opacity: "0" }}
                    className="white-text about-title"
                  >
                    More than a travel agency we’re your insider on the ground in Sri Lanka
                  </h2>
                  <div
                    data-w-id="90328050-6988-b642-666e-45763ed54d6b"
                    style={{ opacity: "0" }}
                    className="about-desp"
                  >
                    <p className="large-paragraph light-text">
                      Travedise was founded by Chamara after more than 20 years  working inside Sri
                      Lanka’s hospitality and travel industry. That experience shapes every journey
                      we build from which properties are genuinely worth the price, to which park to
                      visit and when, to the roads and routes that most itineraries miss entirely.
                    </p>
                    <p className="large-paragraph light-text">
                      We specialise in tailor-made journeys for couples and small groups who want to
                      see Sri Lanka properly. That means covering the four things that make this
                      country worth the trip: the heritage, the wildlife, the hill country, and the
                      coast — paced well enough to actually enjoy each one.
                    </p>
                  </div>
                  <div
                    data-w-id="ee6b35f7-ec83-5b68-e916-b9de1f4b87b8"
                    style={{ opacity: "0" }}
                    className="about-author-details"
                  >
                    <img
                      src="/assets/6a31b00d3b0c4342f7883cf2_About-Autthor-Icon.jpg"
                      loading="lazy"
                      alt="About Autthor Icon"
                      className="about-autthor-icon"
                    />
                    <div className="about-author-flex">
                      <div className="white-text about-author">Chamara</div>
                      <div className="about-author-designation">
                        Founder and Sri Lanka Travel Specialist
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  data-w-id="b642acc6-8841-e663-9250-c62919afb121"
                  style={{ opacity: "0" }}
                  className="about-right"
                >
                  <div
                    data-current="Tab 1"
                    data-easing="ease-in"
                    data-duration-in="0"
                    data-duration-out="0"
                    className="w-tabs"
                  >
                    <div className="tabs-menu w-tab-menu">
                      <a
                        data-w-tab="Tab 1"
                        className="faq-list-wrap about-faq-list-wrap w-inline-block w-tab-link w--current"
                      >
                        <div className="faq-question">
                          <div className="faq-ques about-faq-ques">Personalized Itineraries</div>
                        </div>
                        <div className="faq-answer about-faq-answer">
                          <p className="faq-para about-faq-para">
                            Every trip is custom-crafted around your interests, pace, and
                            preferences.
                          </p>
                        </div>
                      </a>
                      <a
                        data-w-tab="Tab 2"
                        className="faq-list-wrap about-faq-list-wrap w-inline-block w-tab-link"
                      >
                        <div className="faq-question">
                          <div className="faq-ques about-faq-ques">24/7 Customer  Support</div>
                        </div>
                        <div className="faq-answer about-faq-answer">
                          <p className="faq-para about-faq-para">
                            Round-the-clock personalized assistance to make your stay smooth,
                            comfortable, and worry-free.
                          </p>
                        </div>
                      </a>
                      <a
                        data-w-tab="Tab 3"
                        className="faq-list-wrap about-faq-list-wrap w-inline-block w-tab-link"
                      >
                        <div className="faq-question">
                          <div className="faq-ques about-faq-ques">Curated Destinations</div>
                        </div>
                        <div className="faq-answer about-faq-answer">
                          <p className="faq-para about-faq-para">
                            Handpicked exclusive locations offering unique experiences tailored to
                            your needs and desires.
                          </p>
                        </div>
                      </a>
                      <a
                        data-w-tab="Tab 4"
                        className="faq-list-wrap about-faq-list-wrap w-inline-block w-tab-link"
                      >
                        <div className="faq-question">
                          <div className="faq-ques about-faq-ques">Trusted Local Experts</div>
                        </div>
                        <div className="faq-answer about-faq-answer">
                          <p className="faq-para about-faq-para">
                            Knowledgeable friendly guides to help you explore
                            <br />
                            hidden gems, traditions, and authentic culture.
                          </p>
                        </div>
                      </a>
                    </div>
                    <div className="tabs-content w-tab-content">
                      <div data-w-tab="Tab 1" className="w-tab-pane w--tab-active"></div>
                      <div data-w-tab="Tab 2" className="w-tab-pane"></div>
                      <div data-w-tab="Tab 3" className="w-tab-pane"></div>
                      <div data-w-tab="Tab 4" className="w-tab-pane"></div>
                    </div>
                  </div>
                  <div className="about-tab-embed w-embed">
                    <style
                      dangerouslySetInnerHTML={{
                        __html: `
.w-tab-link.w--current .faq-answer.about-faq-answer{
display:flex !important;
}
`,
                      }}
                    />
                  </div>
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
                        <a href="/about" aria-current="page" className="page-link w--current">
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
      <WebflowScripts pageId="69c38c90a6a389dfc58351ed" scripts={WEBFLOW_SCRIPTS} />
    </>
  );
}
