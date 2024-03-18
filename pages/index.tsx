import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SiteHeader from "../components/SiteHeader";
import Link from "next/link";
import Head from "next/head";

export default function Home() {

  // Just for animation on scroll
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease", // Animation easing effect
      once: true, // Whether animation should happen only once
    });

    return () => {
      AOS.refresh(); // Clean up AOS when component unmounts
    };
  }, []);

  return (
    <>
      <Head>
        <title key="pagetitle">NextJS Headless Wordpress</title>
        <meta
          name="description"
          content="Headless Wordpress Site with NextJS front-end"
          key="metadescription"
        />
      </Head>
      <div className="min-h-screen bg-[url('/home-bg.webp')] relative bg-cover">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>

        <SiteHeader className="z-10 relative" />

        <main>
          <div className="min-h-[90vh] flex flex-col items-center justify-center z-10 relative">
            <h1
              className="text-3xl text-white font-extrabold sm:text-9xl flex flex-col items-center"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              Headless
              <span
                data-aos="fade-up"
                data-aos-duration="1500" // Adjust this value for slower fade
              >
                <strong className="font-extrabold text-[#063E67] sm:block">
                  Wordpress
                </strong>
              </span>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed text-white">
              This website is built with NextJS 14 on the front-end and Headless
              Wordpress + graphQL on the back-end.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded bg-[#063E67] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#21455c] focus:outline-none focus:ring active:bg-teal-900 sm:w-auto"
                href="/products"
              >
                Our products
              </Link>

              <Link
                className="block w-full rounded px-12 py-3 text-sm font-medium text-white shadow hover:text-[#063E67] focus:outline-none focus:ring active:text-teal-900 sm:w-auto"
                href="/about"
              >
                About us
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
