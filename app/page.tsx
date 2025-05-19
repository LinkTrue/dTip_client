"use client";
import Script from "next/script";
import Link from "next/link";

const testimonials: { title: string, occupation: string, body: string }[] = [
  { title: "Alex", occupation: "Content Creator", body: "My fans love the simplicity of dTip. It’s one link to all my payment methods!" },
  { title: "Priya", occupation: "NGO Volunteer", body: "No fees, no friction. We saw an increase in donations." },
  { title: "Dan", occupation: "Freelancer", body: "Finally, a simple way to share all my payment addresses. My clients appreciate the convenience." },
  { title: "Maria", occupation: "Activist", body: "dTip helps me receive support securely from anywhere. Highly recommended!" },
  { title: "Ben", occupation: "Supporter", body: "I can now support my favorite creators with just one click. Super easy and transparent." },
]

const cta = <Link
  className="
mt-4 bg-yellow-400 hover:bg-yellow-500 
text-black font-bold py-3 px-8 
rounded-lg text-lg shadow-lg transition
"
  href={"/start"}
>
  Claim My dTip Link
</Link>

const LandingPage = () => {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      <Script id="crisp-chat" strategy="afterInteractive">
        {`
          window.$crisp=[];
          window.CRISP_WEBSITE_ID="93fda1e3-5302-4589-bb05-d8b8c79aa382";
          (function(){
            var d = document;
            var s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = 1;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `}
      </Script>

      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-yellow-100 via-white to-blue-100 rounded-xl shadow-lg p-8">
        <div className="max-w-md space-y-6">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">
            Your Payment Identity.
            <br /> In One Link.
          </h1>
          <p className="text-gray-700 text-md md:text-lg italic">
            dTip aggregates all your payment methods—crypto, cards, PayPal, stores, socials—into one powerful, fee-free link anyone can use to support you.
          </p>
          <div>
            {cta}
          </div>
        </div>
        <div className="w-full max-w-2xl aspect-video">
          {/* Video */}
          <video
            className="w-full h-full rounded-lg shadow-lg"
            controls
            autoPlay={false}
          >
            <source
              src="https://res.cloudinary.com/dzsl4lu0d/video/upload/v1747585061/iofussmoppylstc5pwjh.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Audience */}
      <section>
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start text-center lg:text-left">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">WHO USES dTip</h3>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Supporter', desc: 'Send crypto or cash instantly—no account needed' },
                { label: 'Creator', desc: 'Share one link to receive tips, payments, or donations with zero platform fees.' },
                { label: 'NGOs', desc: 'Collect donations transparently across crypto and traditional methods in one place.' },
                { label: 'Activists & help seekers', desc: 'Accept global support securely, without relying on third-party platforms.' },
                { label: 'Freelancers', desc: 'Aggregate all your payment options—wallets, cards, invoices—in a single link.' },
              ].map(({ label, desc }) => (
                <div key={label} className="bg-orange-100 rounded-lg p-4 flex flex-col items-center shadow hover:shadow-lg transition">
                  <span className="mt-2 font-medium">{label}</span>
                  <span className="text-xs text-gray-600 mt-1">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h3 className="text-2xl font-bold mb-6 text-yellow-600 flex items-center gap-2">
            <svg className="w-7 h-7 text-yellow-400 inline-block" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            WHY USE dTip?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {[
              { label: "💸 No platform fees - You keep 100% of what you receive" },
              { label: "🔒 Secure by design - Powered by smart contracts" },
              { label: "🔗 Works everywhere - No app to install, no signups needed" },
              { label: "🌍 Supports any cause - From creators to NGOs to freelancers" },
              { label: "💡 Open source - Transparent and community-driven" },
            ].map(({ label }) => (
              <div
                key={label}
                className="flex flex-col items-center bg-white rounded-xl shadow hover:shadow-lg transition p-4 border border-yellow-100"
              >
                <span className="font-medium text-sm text-gray-800">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Testimonials</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={`testimonials_${i}`}
              className="bg-gray-50 shadow-md rounded-lg p-6 flex flex-col items-start justify-between h-full border-l-4 border-yellow-400"
            >
              <div className="flex items-center mb-3">
                <img src={`images/avatars/${t.title.toLocaleLowerCase()}.jpg`} alt={`${t.title} ${t.occupation}`} className="w-10 h-10 rounded-full mr-3 border-2 border-yellow-300" />
                <span className="text-sm font-semibold text-gray-900">{t.title} - {t.occupation}</span>
              </div>
              <p className="text-gray-700 text-base italic">
                <span className="font-bold text-yellow-600">“</span>{t.body}<span className="font-bold text-yellow-600">”</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Profile */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-xs rounded-lg">
          <h3 className="text-xl md:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 drop-shadow-lg flex items-center gap-3 animate-pulse">
            <svg className="w-8 h-8 text-yellow-400 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Get your free dTip link under <span className="underline decoration-wavy decoration-pink-500">a minute</span>
          </h3>
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center">
            <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow animate-float hover-effect">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-200 rounded-full mb-6">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                Connect
              </h2>
              <p className="text-base md:text-md text-gray-600 text-center">
                YOUR crypto wallet to own your profile
              </p>
            </div>

            {/* Horizontal Arrow between Step 1 and Step 2 */}
            <div className="hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <div className="block md:hidden w-full text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow animate-float2 hover-effect">
              <div className="w-16 h-16 flex items-center justify-center bg-green-200 rounded-full mb-6">
                <span className="text-3xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                Create
              </h3>
              <p className="text-base md:text-lg text-gray-600 text-center">
                Put all your payment options in one place
              </p>
            </div>

            {/* Horizontal Arrow between Step 2 and Step 3 */}
            <div className="hidden md:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <div className="block md:hidden w-full text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-500 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center p-8 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-shadow animate-float3 hover-effect">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-200 rounded-full mb-6">
                <span className="text-3xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                Share
              </h3>
              <p className="text-base md:text-lg text-gray-600 text-center">
                your dTip link to get tips, donations, or payments
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center">
        {cta}
      </div>

    </main>
  );
};

export default LandingPage;
