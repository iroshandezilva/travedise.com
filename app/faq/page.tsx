import type { Metadata } from "next";

import { WebflowScripts, type ScriptSpec } from "@/components/webflow-scripts";

export const metadata: Metadata = {
  title: "FAQ - Tripvana Webflow HTML Website Template",
  description:
    "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ - Tripvana Webflow HTML Website Template",
    description:
      "Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Tripvana Webflow HTML Website Template",
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

export default function FaqPage() {
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
                data-wf-page-id="69c38c90a6a389dfc58351ea"
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
                    alt="Tripvana Logo"
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
          <section className="accommodations-section">
            <div className="container">
              <div className="wrapper update-faq-wrapper">
                <div className="tour-activities-top faq">
                  <div data-w-id="da1fdbee-1531-6de4-f4a8-5aad49f68853" style={{ opacity: "0" }}>
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
                  <h2
                    data-w-id="da1fdbee-1531-6de4-f4a8-5aad49f68856"
                    style={{ opacity: "0" }}
                    className="center-align"
                  >
                    Everything you need to know was clearly answered.
                  </h2>
                </div>
                <div className="faq-all-lists">
                  <div
                    data-w-id="da1fdbee-1531-6de4-f4a8-5aad49f68859"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap faq"
                  >
                    <div className="faq-question">
                      <h6 className="faq-ques">
                        When is the best time of year to visit Sri Lanka?
                      </h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="da1fdbee-1531-6de4-f4a8-5aad49f6885d"
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
                    <div style={{ height: "0px" }} className="faq-answer">
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
                        Generally speaking, we think the best time to travel to Sri Lanka in terms
                        of weather, and to visit as many areas as possible, is late December to
                        April. However, there are huge benefits to travelling outside this period,
                        and we regard Sri Lanka as a year-round destination. Please see our Sri
                        Lanka Weather Guide for more information.
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="da1fdbee-1531-6de4-f4a8-5aad49f68861"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap faq"
                  >
                    <div className="faq-question">
                      <h6 className="faq-ques">How much time do you really need in Sri Lanka?</h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="da1fdbee-1531-6de4-f4a8-5aad49f68865"
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
                    <div style={{ height: "0px" }} className="faq-answer">
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
                        We would normally suggest a minimum of seven days. However, if you are
                        combining Sri Lanka with the Maldives, it is possible to take a shorter trip
                        and still get a taste of what Sri Lanka has to offer. For those short on
                        time, we can plan a trip that focuses on easy-to-access areas to avoid too
                        much travel. Our Sri Lanka specialists can help with this.
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="da1fdbee-1531-6de4-f4a8-5aad49f68869"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap faq"
                  >
                    <div className="faq-question">
                      <h6 className="faq-ques">How much does a trip cost to Sri Lanka?</h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="da1fdbee-1531-6de4-f4a8-5aad49f6886d"
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
                    <div style={{ height: "0px" }} className="faq-answer">
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
                  <div
                    data-w-id="da1fdbee-1531-6de4-f4a8-5aad49f68871"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap faq"
                  >
                    <div className="faq-question">
                      <h6 className="faq-ques">
                        What's the difference between a tailor-made tour of Sri Lanka and a standard
                        package holiday?
                      </h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="da1fdbee-1531-6de4-f4a8-5aad49f68875"
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
                    <div style={{ height: "0px" }} className="faq-answer">
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
                        A tailor-made holiday to Sri Lanka includes a private driver and is designed
                        completely around you. All of the accommodation is handpicked, and the route
                        is designed around your interests and weather patterns. A package holiday is
                        pre-designed on specific dates and in specific hotels.
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="2e6266f8-af6f-3b07-bf74-39f04b24f926"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap faq"
                  >
                    <div className="faq-question">
                      <h6 className="faq-ques">Is Sri Lanka an easy country to travel around?</h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="2e6266f8-af6f-3b07-bf74-39f04b24f92a"
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
                    <div style={{ height: "0px" }} className="faq-answer">
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
                        Sri Lanka is a very easy country to travel around with Red Dot, with your
                        own personal chauffeur-guide and car. This is by far the easiest, safest and
                        most convenient way to get around in comfort. We can also arrange helicopter
                        or light-aircraft flights, as well as train journeys.
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="ac42fdf6-06fe-9326-9308-d84b920b3ae4"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap faq"
                  >
                    <div className="faq-question">
                      <h6 className="faq-ques">Is Sri Lanka generally safe for travellers?</h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="ac42fdf6-06fe-9326-9308-d84b920b3ae8"
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
                    <div style={{ height: "0px" }} className="faq-answer">
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
                        Yes, Sri Lanka is generally considered safe, but as with all destinations we
                        recommend exercising the same caution you would at home. Be careful with
                        valuable belongings, and if something feels uncomfortable, trust your
                        instincts. Having a chauffeur-guide with you can add reassurance compared
                        with booking local transfers, buses or trains, and we provide 24-hour
                        support on the ground.
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="1e1e8973-3ce3-9e55-31e2-9f34b8977190"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap faq"
                  >
                    <div className="faq-question">
                      <h6 className="faq-ques">Do I need a visa?</h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="1e1e8973-3ce3-9e55-31e2-9f34b8977194"
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
                    <div style={{ height: "0px" }} className="faq-answer">
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
                        If you are travelling on a British passport, you need to obtain an
                        Electronic Travel Authorization (ETA) online before you travel. As of 25 May
                        2026, the tourist ETA is free for British passport holders for a stay of up
                        to 30 days. Visa rules and fees can change, so check the official ETA portal
                        and the UK Foreign Travel Advice website before departure. Please ask us if
                        you need more help.
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="09bc8886-65c2-e404-b57e-ecdba9c32507"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap faq"
                  >
                    <div className="faq-question">
                      <h6 className="faq-ques">
                        Is Sri Lanka a good place to travel with children?
                      </h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="09bc8886-65c2-e404-b57e-ecdba9c3250b"
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
                    <div style={{ height: "0px" }} className="faq-answer">
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
                        Sri Lanka is an exceptional option for children of all ages because of its
                        variety, manageable journey times and often-direct flights. Sri Lanka is
                        also a brilliant option for teenagers with many different interests and
                        personality types.
                      </p>
                    </div>
                  </div>
                  <div
                    data-w-id="52e73416-4e67-4b23-9640-e5a86c9e0033"
                    style={{ opacity: "0" }}
                    className="faq-list-wrap faq"
                  >
                    <div className="faq-question">
                      <h6 className="faq-ques">Is Sri Lanka really worth visiting?</h6>
                      <div
                        data-is-ix2-target="1"
                        className="lottie-animation"
                        data-w-id="52e73416-4e67-4b23-9640-e5a86c9e0037"
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
                    <div style={{ height: "0px" }} className="faq-answer">
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
                        <a href="/faq" aria-current="page" className="page-link w--current">
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
      <WebflowScripts pageId="69c38c90a6a389dfc58351ea" scripts={WEBFLOW_SCRIPTS} />
    </>
  );
}
