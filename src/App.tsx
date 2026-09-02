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

import room1 from "./assets/room-1.webp";
import room2 from "./assets/room-2.webp";
import room3 from "./assets/room-3.webp";
import room4 from "./assets/room-4.webp";

function App() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");

  const [guests, setGuests] = useState(2);

  const [selectedRooms, setSelectedRooms] = useState(1);

  const [guestMenuOpen, setGuestMenuOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const rooms = [
    {
      name: "Deluxe Room",
      image: room1,
      description:
        "A comfortable and welcoming room designed for a relaxing stay.",
    },
    {
      name: "Premium Room",
      image: room2,
      description:
        "A spacious room offering extra comfort for your stay in Ponda.",
    },
    {
      name: "Family Room",
      image: room3,
      description:
        "A convenient option for families and guests travelling together.",
    },
    {
      name: "Executive Room",
      image: room4,
      description:
        "A refined and comfortable space for a relaxed experience.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-[#20221f]">

      {/* ================= NAVBAR ================= */}

      <header className="absolute left-0 top-0 z-50 w-full">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">

          <a
            href="#"
            className="rounded-xl bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src={logo}
              alt="Shakti Palace"
              className="h-12 w-auto object-contain sm:h-14"
            />
          </a>

          {/* DESKTOP NAV */}

          <div className="hidden items-center gap-1 rounded-full border border-white/25 bg-[#11140f]/90 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:flex">

  <a
    href="#rooms"
    className="rounded-full px-4 py-2 text-sm font-semibold !text-[#b28b4d] transition-all duration-300 hover:bg-white/10 hover:!text-white"
  >
    Rooms
  </a>

  <a
    href="#dining"
    className="rounded-full px-4 py-2 text-sm font-semibold !text-[#b28b4d] transition-all duration-300 hover:bg-white/10 hover:!text-white"
  >
    Dining
  </a>

  <a
    href="#gallery"
    className="rounded-full px-4 py-2 text-sm font-semibold !text-[#b28b4d] transition-all duration-300 hover:bg-white/10 hover:!text-white"
  >
    Gallery
  </a>

  <a
    href="#about"
    className="rounded-full px-4 py-2 text-sm font-semibold !text-[#b28b4d] transition-all duration-300 hover:bg-white/10 hover:!text-white"
  >
    About
  </a>

  <a
    href="#location"
    className="rounded-full px-4 py-2 text-sm font-semibold !text-[#b28b4d] transition-all duration-300 hover:bg-white/10 hover:!text-white"
  >
    Location
  </a>

  <a
    href="#booking"
    className="ml-1 flex items-center gap-2 rounded-full bg-[#b28b4d] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#9e793f] hover:shadow-lg"
  >
    Book now
    <ArrowUpRight size={16} />
  </a>

</div>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full bg-white p-3 text-[#20221f] shadow-lg lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </nav>

        {/* MOBILE MENU */}

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

              <a
                href="#booking"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#b28b4d] px-6 py-4 font-semibold"
              >
                Book your stay
                <ArrowUpRight size={17} />
              </a>

            </div>

          </div>
        )}

      </header>


      {/* ================= HERO ================= */}

    

      <section className="relative aspect-[1899/882] w-full overflow-hidden bg-[#171914]">

        <img
          src={heroImage}
          alt="Shakti Palace, Ponda Goa"
          className="absolute inset-0 h-full w-full object-fill"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />

        <div className="absolute inset-0 z-10">

          <div className="mx-auto flex h-full max-w-[1400px] items-center px-6 pt-24 lg:px-10 lg:pt-20">

            <div className="max-w-2xl">

              <div className="mb-5 flex items-center gap-4 sm:mb-7">

             
              </div>

              <h1 className="font-serif text-[clamp(42px,6.5vw,100px)] font-medium leading-[0.9] tracking-[-0.025em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)]">

                A place to stay,

                <br />

                <span className="italic text-[#e3c88e]">
                  dine & unwind.
                </span>

              </h1>

              <p className="mt-5 max-w-lg text-sm leading-6 text-white/85 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] sm:mt-7 sm:text-base sm:leading-7 lg:text-lg">
                Comfortable stays, welcoming hospitality and
                memorable dining in the heart of Ponda, Goa.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">

                <a
                  href="#rooms"
                  className="group flex items-center gap-3 rounded-full bg-[#b28b4d] px-6 py-3.5 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9e793f] hover:shadow-2xl sm:px-7 sm:py-4"
                >
                  Explore rooms

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>

                <a
                  href="#about"
                  className="flex items-center gap-3 rounded-full border border-white/50 bg-black/20 px-6 py-3.5 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#20221f] sm:px-7 sm:py-4"
                >
                  Discover Shakti Palace
                </a>

              </div>

            </div>

          </div>

        </div>

        <div className="absolute bottom-6 left-6 z-20 hidden items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-white/75 drop-shadow-md lg:left-10 lg:flex">

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/10 backdrop-blur-sm">
            <ChevronDown size={15} />
          </div>

          <span>Scroll to explore</span>

        </div>

      </section>


      {/* ================= BOOKING ================= */}

     <div className="mx-auto flex w-full max-w-[1480px] overflow-visible rounded-[22px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

  {/* Check Availability */}
  <div className="flex min-w-[330px] flex-1 items-center gap-5 px-7 py-6">
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f5ecdc]">
      <CalendarDays
        size={23}
        className="text-[#b28b4d]"
      />
    </div>

    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#20221f]">
        Check availability
      </p>

      <p className="mt-1 text-sm text-black/45">
        Find your perfect stay
      </p>
    </div>
  </div>


  {/* Check In */}
  <div className="flex min-w-[230px] flex-1 flex-col justify-center border-l border-black/10 px-7 py-6">

    <span className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
      Check in
    </span>

    <div className="mt-2 flex items-center justify-between">
      <input
        type="date"
        min={today}
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="w-full bg-transparent text-base font-medium text-black outline-none"
      />

      {/*<CalendarDays
        size={20}
        className="ml-3 shrink-0 text-black"
      />*/}

    </div>

  </div>


  {/* Check Out */}
  <div className="flex min-w-[230px] flex-1 flex-col justify-center border-l border-black/10 px-7 py-6">

    <span className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
      Check out
    </span>

    <div className="mt-2 flex items-center justify-between">
      <input
        type="date"
        min={checkIn || today}
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="w-full bg-transparent text-base font-medium text-black outline-none"
      />

      {/*<CalendarDays
        size={20}
        className="ml-3 shrink-0 text-black"
      />*/}
    </div>

  </div>


  {/* Rooms & Guests */}
  <div className="relative flex min-w-[280px] flex-1 flex-col justify-center border-l border-black/10 px-7 py-6">

    <span className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
      Rooms & Guests
    </span>

    <button
      type="button"
      onClick={() => setGuestMenuOpen(!guestMenuOpen)}
      className="mt-2 flex w-full items-center justify-between text-left text-base font-medium text-black"
    >

      <span>
        {selectedRooms}{" "}
        {selectedRooms === 1 ? "Room" : "Rooms"}

        <span className="mx-2 text-black/25">
          ·
        </span>

        {guests}{" "}
        {guests === 1 ? "Guest" : "Guests"}
      </span>

      <ChevronDown
        size={18}
        className={`transition-transform duration-200 ${
          guestMenuOpen ? "rotate-180" : ""
        }`}
      />

    </button>


    {/* Guest / Room Dropdown */}
    {guestMenuOpen && (
      <div className="absolute bottom-auto left-4 right-4 top-[calc(100%+10px)] z-[100] rounded-2xl border border-black/10 bg-white p-5 shadow-2xl">

        {/* Rooms */}
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold text-black">
              Rooms
            </p>

            <p className="mt-1 text-xs text-black/40">
              How many rooms?
            </p>
          </div>

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() =>
                setSelectedRooms(
                  Math.max(1, selectedRooms - 1)
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-lg hover:bg-black/5"
            >
              −
            </button>

            <span className="w-6 text-center text-sm font-semibold">
              {selectedRooms}
            </span>

            <button
              type="button"
              onClick={() =>
                setSelectedRooms(selectedRooms + 1)
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-lg hover:bg-black/5"
            >
              +
            </button>

          </div>

        </div>


        {/* Guests */}
        <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5">

          <div>
            <p className="text-sm font-semibold text-black">
              Guests
            </p>

            <p className="mt-1 text-xs text-black/40">
              Adults & children
            </p>
          </div>

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() =>
                setGuests(
                  Math.max(1, guests - 1)
                )
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-lg hover:bg-black/5"
            >
              −
            </button>

            <span className="w-6 text-center text-sm font-semibold">
              {guests}
            </span>

            <button
              type="button"
              onClick={() =>
                setGuests(guests + 1)
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-lg hover:bg-black/5"
            >
              +
            </button>

          </div>

        </div>


        <button
          type="button"
          onClick={() => setGuestMenuOpen(false)}
          className="mt-5 w-full rounded-xl bg-[#b28b4d] py-3 text-sm font-semibold text-white transition hover:bg-[#9e793f]"
        >
          Done
        </button>

      </div>
    )}

  </div>


  {/* SEARCH ROOMS — SEPARATE RIGHT SIDE */}
<button
  type="button"
  onClick={() => {
    if (!checkIn || !checkOut) {
      alert("Please select your check-in and check-out dates.");
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    alert(
      `Searching for ${selectedRooms} ${
        selectedRooms === 1 ? "room" : "rooms"
      } for ${guests} ${
        guests === 1 ? "guest" : "guests"
      } from ${checkIn} to ${checkOut}.`
    );
  }}
  className="flex min-w-[210px] items-center justify-center gap-3 rounded-r-[22px] bg-[#20221f] px-8 text-base font-semibold text-white transition hover:bg-[#171916]"
>
  Search rooms
  <ArrowUpRight size={19} />
</button>
</div>

      {/* ================= LOCATION ================= */}

      <section
        id="location"
        className="mx-auto max-w-[1280px] scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36"
      >

        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">

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

            <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">

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

            <div className="mt-6 flex flex-wrap gap-3">

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

              <a
                href="tel:+917875968565"
                className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white px-6 py-4 text-sm font-semibold text-[#20221f] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b28b4d] hover:shadow-lg"
              >

                <Phone size={16} />

                +91 78759 68565

              </a>

            </div>

          </div>

          <div className="relative h-[420px] overflow-hidden rounded-[28px] bg-[#e9e4d9] shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

            <iframe
              title="Shakti Palace location on Google Maps"
              src="https://www.google.com/maps?q=Hotel+Shakti+Palace,+Super+Market+Complex,+Ponda,+Goa+403401&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

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
        className="mx-auto max-w-[1280px] scroll-mt-24 px-6 py-32 lg:px-10 lg:py-44"
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


      {/* ================= ROOMS ================= */}

      <section
        id="rooms"
        className="scroll-mt-24 bg-[#20221f] px-6 py-24 text-white sm:py-32"
      >

        <div className="mx-auto max-w-[1280px]">

          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e3c88e]">
                Stay with us
              </p>

              <h2 className="mt-4 font-serif text-5xl font-medium leading-none sm:text-6xl lg:text-7xl">
                Rooms & stays
              </h2>

            </div>

            <p className="max-w-md text-sm leading-6 text-white/55 sm:text-right">
              Comfortable spaces designed to make your
              stay in Ponda relaxing and memorable.
            </p>

          </div>


          {/* ROOM CARDS */}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {rooms.map((room) => (

              <article
                key={room.name}
                className="group overflow-hidden rounded-2xl bg-white/5 shadow-xl"
              >

                {/* IMAGE */}

                <div className="relative aspect-[4/3] overflow-hidden">

                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

                </div>


                {/* CONTENT */}

                <div className="p-6">

                  <h3 className="font-serif text-2xl">
                    {room.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/55">
                    {room.description}
                  </p>

                  <a
                    href="#booking"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#e3c88e] transition-colors hover:text-white"
                  >
                    Check availability

                    <ArrowUpRight size={16} />

                  </a>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* ================= DINING ================= */}

      <section
        id="dining"
        className="flex min-h-[300px] scroll-mt-24 items-center justify-center bg-[#f7f3ea] px-6"
      >

        <div className="text-center">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a27b3e]">
            Shakti Palace
          </p>

          <p className="mt-4 font-serif text-4xl italic sm:text-5xl">
            Dining coming next
          </p>

        </div>

      </section>


      {/* ================= GALLERY ================= */}

      <section
        id="gallery"
        className="flex min-h-[300px] scroll-mt-24 items-center justify-center bg-[#20221f] px-6 text-white"
      >

        <div className="text-center">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e3c88e]">
            Explore
          </p>

          <p className="mt-4 font-serif text-4xl italic sm:text-5xl">
            Gallery coming next
          </p>

        </div>

      </section>

    </main>
  );
}

export default App;