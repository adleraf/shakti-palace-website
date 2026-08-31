import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Menu,
  X,
  MapPin,
  Phone,
} from "lucide-react";

import logo from "./assets/shakti-palace-logo.png";
import heroImage from "./assets/shakti-palace-hero.webp";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#20221f]">

      {/* ================= NAVBAR ================= */}

      <header className="absolute left-0 top-0 z-50 w-full">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">

          {/* ================= LOGO ================= */}

          <a
            href="#"
            className="rounded-xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src={logo}
              alt="Shakti Palace"
              className="h-12 w-auto object-contain sm:h-14"
            />
          </a>


          {/* ================= DESKTOP NAV ================= */}

          <div className="hidden items-center gap-1 rounded-full border border-white/25 bg-[#11140f]/90 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:flex">

            {/* ROOMS */}

            <a
              href="#rooms"
              className="rounded-full px-4 py-2 text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-all duration-300 hover:bg-white/15 hover:text-[#e3c88e]"
            >
              Rooms
            </a>


            {/* DINING */}

            <a
              href="#dining"
              className="rounded-full px-4 py-2 text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-all duration-300 hover:bg-white/15 hover:text-[#e3c88e]"
            >
              Dining
            </a>


            {/* GALLERY */}

            <a
              href="#gallery"
              className="rounded-full px-4 py-2 text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-all duration-300 hover:bg-white/15 hover:text-[#e3c88e]"
            >
              Gallery
            </a>


            {/* ABOUT */}

            <a
              href="#about"
              className="rounded-full px-4 py-2 text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-all duration-300 hover:bg-white/15 hover:text-[#e3c88e]"
            >
              About
            </a>


            {/* LOCATION */}

            <a
              href="#location"
              className="rounded-full px-4 py-2 text-sm font-semibold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] transition-all duration-300 hover:bg-white/15 hover:text-[#e3c88e]"
            >
              Location
            </a>


            {/* BOOK NOW */}

            <button className="ml-1 flex items-center gap-2 rounded-full bg-[#b28b4d] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#9e793f] hover:shadow-lg">
              Book now
              <ArrowUpRight size={16} />
            </button>

          </div>


          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full bg-white p-3 text-[#20221f] shadow-lg lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </nav>


        {/* ================= MOBILE MENU ================= */}

        {menuOpen && (
          <div className="mx-4 rounded-2xl bg-[#20221f]/95 p-7 text-white shadow-2xl backdrop-blur-xl lg:hidden">

            <div className="flex flex-col gap-6">

              <a
                href="#rooms"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl"
              >
                Rooms
              </a>

              <a
                href="#dining"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl"
              >
                Dining
              </a>

              <a
                href="#gallery"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl"
              >
                Gallery
              </a>

              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl"
              >
                About
              </a>

              <a
                href="#location"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl"
              >
                Location
              </a>

              <button className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#b28b4d] px-6 py-4 font-semibold">
                Book your stay
                <ArrowUpRight size={17} />
              </button>

            </div>

          </div>
        )}

      </header>


      {/* ================= HERO ================= */}

      <section className="relative min-h-[760px] h-screen overflow-hidden">

        <img
          src={heroImage}
          alt="Shakti Palace, Ponda Goa"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />


        {/* DARK OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/10" />


        {/* BOTTOM FADE */}

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/40 to-transparent" />


        {/* HERO CONTENT */}

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-end px-6 pb-36 lg:px-10 lg:pb-40">

          <div className="max-w-3xl">

            <div className="mb-7 flex items-center gap-4">

              <span className="h-px w-10 bg-[#d9bd87]" />

              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e4cfaa]">
                Ponda · Goa
              </p>

            </div>


            <h1 className="max-w-3xl font-serif text-6xl font-medium leading-[0.9] tracking-[-0.025em] text-white sm:text-7xl md:text-8xl lg:text-[112px]">

              A place to stay,

              <br />

              <span className="italic text-[#e3c88e]">
                dine & unwind.
              </span>

            </h1>


            <p className="mt-8 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              Comfortable stays, welcoming hospitality and
              memorable dining in the heart of Ponda, Goa.
            </p>


            <div className="mt-9 flex flex-wrap gap-4">

              {/* EXPLORE ROOMS */}

              <a
                href="#rooms"
                className="group flex items-center gap-3 rounded-full bg-[#b28b4d] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#9e793f] hover:shadow-xl"
              >
                Explore rooms

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>


              {/* DISCOVER */}

              <a
                href="#about"
                className="flex items-center gap-3 rounded-full border border-white/40 bg-white/5 px-7 py-4 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#20221f]"
              >
                Discover Shakti Palace
              </a>

            </div>

          </div>

        </div>


        {/* SCROLL */}

        <div className="absolute bottom-8 left-6 z-20 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-white/70 lg:left-10">

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30">
            <ChevronDown size={15} />
          </div>

          <span>Scroll to explore</span>

        </div>

      </section>


      {/* ================= AVAILABILITY ================= */}

      <section className="relative z-30 mx-auto -mt-16 max-w-[1280px] px-5">

        <div className="grid overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:grid-cols-4">

          <div className="flex items-center gap-4 border-b border-black/10 p-6 md:border-b-0 md:border-r">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3ead9] text-[#a27b3e]">
              <CalendarDays size={20} />
            </div>

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.18em]">
                Check availability
              </p>

              <p className="mt-1 text-xs text-black/50">
                Find your perfect stay
              </p>

            </div>

          </div>


          {/* CHECK IN */}

          <button className="flex flex-col items-start justify-center border-b border-black/10 p-6 text-left transition-colors hover:bg-[#faf8f3] md:border-b-0 md:border-r">

            <span className="text-xs uppercase tracking-widest text-black/40">
              Check in
            </span>

            <span className="mt-2 font-serif text-xl">
              Select date
            </span>

          </button>


          {/* CHECK OUT */}

          <button className="flex flex-col items-start justify-center border-b border-black/10 p-6 text-left transition-colors hover:bg-[#faf8f3] md:border-b-0 md:border-r">

            <span className="text-xs uppercase tracking-widest text-black/40">
              Check out
            </span>

            <span className="mt-2 font-serif text-xl">
              Select date
            </span>

          </button>


          {/* SEARCH */}

          <button className="flex items-center justify-center gap-3 bg-[#20221f] p-6 font-semibold text-white transition-colors hover:bg-[#353832]">

            Search rooms

            <ArrowUpRight size={18} />

          </button>

        </div>

      </section>


      {/* ================= LOCATION ================= */}

      <section
        id="location"
        className="mx-auto max-w-[1280px] px-6 py-28 lg:px-10 lg:py-36"
      >

        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">

          {/* LOCATION INFORMATION */}

          <div>

            <div className="flex items-center gap-3">

              <MapPin
                size={17}
                className="text-[#a27b3e]"
              />

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a27b3e]">
                Find us
              </p>

            </div>


            <h2 className="mt-6 font-serif text-5xl font-medium leading-[0.95] sm:text-6xl lg:text-7xl">

              Right in the

              <br />

              <span className="italic text-[#a27b3e]">
                heart of Ponda.
              </span>

            </h2>


            <p className="mt-7 max-w-md text-base leading-8 text-black/60 sm:text-lg">
              Visit Shakti Palace in the heart of Ponda,
              Goa — convenient for guests exploring the
              town and surrounding areas.
            </p>


            {/* ADDRESS CARD */}

            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6">

              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3ead9] text-[#a27b3e]">
                  <MapPin size={18} />
                </div>

                <div>

                  <p className="font-semibold">
                    Shakti Palace
                  </p>

                  <p className="mt-2 text-sm leading-6 text-black/50">
                    Super Market Complex
                    <br />
                    Near Saraswat Bank
                    <br />
                    Ponda, Goa 403401
                  </p>

                </div>

              </div>

            </div>


            {/* ================= ACTIONS ================= */}

            <div className="mt-6 flex flex-wrap gap-3">

              {/* DIRECTIONS */}

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Hotel+Shakti+Palace,+Super+Market+Complex,+Ponda,+Goa+403401"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[#b28b4d] px-7 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9e793f] hover:shadow-xl"
              >

                Get directions

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </a>


              {/* PHONE */}

              <a
                href="tel:+917875968565"
                className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white px-6 py-4 text-sm font-semibold text-[#20221f] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b28b4d] hover:shadow-lg"
              >

                <Phone size={16} />

                +91 78759 68565

              </a>

            </div>

          </div>


          {/* ================= MAP ================= */}

          <div className="relative h-[420px] overflow-hidden rounded-[28px] bg-[#e9e4d9] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

            <iframe
              title="Shakti Palace location on Google Maps"
              src="https://www.google.com/maps?q=Hotel+Shakti+Palace,+Super+Market+Complex,+Ponda,+Goa+403401&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />


            {/* MAP LABEL */}

            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-white/95 px-5 py-3 text-sm font-semibold text-[#20221f] shadow-lg backdrop-blur-md">

              <span className="h-2.5 w-2.5 rounded-full bg-[#b28b4d]" />

              Shakti Palace · Ponda

            </div>

          </div>

        </div>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="mx-auto max-w-[1280px] px-6 py-32 lg:px-10 lg:py-44"
      >

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a27b3e]">
          Welcome to Shakti Palace
        </p>


        <div className="mt-7 grid gap-10 lg:grid-cols-2 lg:gap-20">

          <h2 className="font-serif text-5xl font-medium leading-[0.95] sm:text-6xl lg:text-7xl">

            Your stay begins

            <br />

            <span className="italic text-[#a27b3e]">
              here.
            </span>

          </h2>


          <div className="flex items-end">

            <p className="max-w-xl text-base leading-8 text-black/60 sm:text-lg">
              Discover a comfortable place to stay, enjoy
              good food and experience the warmth of Goa
              from Ponda.
            </p>

          </div>

        </div>

      </section>


      {/* ================= TEMPORARY SECTIONS ================= */}

      <section
        id="rooms"
        className="flex h-32 items-center justify-center bg-[#20221f] text-white"
      >

        <p className="font-serif text-3xl italic">
          Rooms coming next
        </p>

      </section>


      <section id="dining" className="h-1" />

      <section id="gallery" className="h-1" />

    </main>
  );
}

export default App;