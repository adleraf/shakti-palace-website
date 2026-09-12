import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Menu,
  X,
  MapPin,
  Phone,
  UserRound,
  BedDouble,
  UtensilsCrossed,
  MapPinned,
  Clock,
  Star,
  Sparkles,
  Navigation,
  Compass,
  Car,
  Coffee,
  ShieldCheck,
  ChefHat,
} from "lucide-react";

import logo from "./assets/shakti-palace-logo.png";
import heroImage from "./assets/shakti-palace-hero.webp";

import room1 from "./assets/room-1.webp";
import room2 from "./assets/room-2.webp";
import room3 from "./assets/room-3.webp";
import room4 from "./assets/room-4.webp";

import type { Variants } from "framer-motion";

/* ── Animation variants ── */

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ── Scroll-reveal wrapper ── */

function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function App() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [checkIn, setCheckIn] = useState("");

  const [checkOut, setCheckOut] = useState("");
  const [showAvailability, setShowAvailability] = useState(false);

  type CalendarField = "checkIn" | "checkOut";

  const [calendarOpen, setCalendarOpen] = useState<CalendarField | null>(null);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
const formatDate = (value: string) => {
  if (!value) return "dd-mm-yyyy";

  const [year, month, day] = value.split("-");
  return `${day}-${month}-${year}`;
};

  const [guests, setGuests] = useState(2);

  const [selectedRooms, setSelectedRooms] = useState(1);

  const [guestMenuOpen, setGuestMenuOpen] = useState(false);

 

  const getLocalDateValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = getLocalDateValue(new Date());

  const openCalendar = (field: CalendarField) => {
    if (field === "checkOut" && !checkIn) return;

    const value = field === "checkIn" ? checkIn : checkOut;
    const baseDate = value ? new Date(`${value}T00:00:00`) : new Date();

    setCalendarMonth(
      new Date(baseDate.getFullYear(), baseDate.getMonth(), 1)
    );
    setCalendarOpen((current) => (current === field ? null : field));
  };

  const selectCalendarDate = (field: CalendarField, day: number) => {
    const selected = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day
    );
    const value = getLocalDateValue(selected);

    if (field === "checkIn") {
      if (value < today) return;
      setCheckIn(value);

      if (checkOut && checkOut < value) {
        setCheckOut("");
      }
    } else {
      if (!checkIn || value <= checkIn) return;
      setCheckOut(value);
    }

    setCalendarOpen(null);
  };

  const moveCalendarMonth = (offset: number) => {
    setCalendarMonth((current) =>
      new Date(current.getFullYear(), current.getMonth() + offset, 1)
    );
  };

  const calendarMonthLabel = calendarMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const daysInCurrentMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfCurrentMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
    1
  ).getDay();

  const calendarDays = [
    ...Array(firstDayOfCurrentMonth).fill(null),
    ...Array.from({ length: daysInCurrentMonth }, (_, index) => index + 1),
  ];

  const renderCalendarPicker = (field: CalendarField) => {
    if (calendarOpen !== field) return null;

    const selectedValue = field === "checkIn" ? checkIn : checkOut;
    const minValue = field === "checkIn" ? today : checkIn;

    // On mobile, checkout calendar should align right so it doesn't overflow
    const positionClass = field === "checkOut"
      ? "absolute right-0 top-[calc(100%+8px)] z-[200] w-[260px] max-w-[calc(100vw-32px)] lg:left-0 lg:right-auto"
      : "absolute left-0 top-[calc(100%+8px)] z-[200] w-[260px] max-w-[calc(100vw-32px)]";

    return (
      <div className={`${positionClass} rounded-2xl border border-black/10 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.18)]`}>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => moveCalendarMonth(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-lg text-[#20221f] transition-colors duration-150 hover:bg-black/5"
            aria-label="Previous month"
          >
            ‹
          </button>

          <span className="text-sm font-semibold text-[#20221f]">
            {calendarMonthLabel}
          </span>

          <button
            type="button"
            onClick={() => moveCalendarMonth(1)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-lg text-[#20221f] transition-colors duration-150 hover:bg-black/5"
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-black/40">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dayName, index) => (
            <span key={`${dayName}-${index}`} className="py-1">
              {dayName}
            </span>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1 text-center">
          {calendarDays.map((day, index) => {
            if (!day) return <span key={`empty-${index}`} className="h-8" />;

            const value = getLocalDateValue(
              new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day)
            );
            const isSelected = selectedValue === value;
            const isDisabled = Boolean(minValue && value < minValue);

            return (
              <button
                key={value}
                type="button"
                disabled={isDisabled}
                onClick={() => selectCalendarDate(field, day)}
                className={`h-8 rounded-lg text-xs font-medium transition-colors duration-100 ${
                  isSelected
                    ? "bg-[#b28b4d] text-white"
                    : isDisabled
                      ? "cursor-not-allowed text-black/20"
                      : "text-[#20221f] hover:bg-[#f3ead9]"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const [attractionCategory, setAttractionCategory] = useState<string>("All");

  const attractionCategories = [
    "All",
    "Temples & Heritage",
    "Nature & Spices",
    "Adventure & Safari",
  ];

  const attractions = [
    {
      name: "Shri Shantadurga Temple",
      category: "Temples & Heritage",
      time: "6 mins",
      distance: "3.5 km",
      badge: "Most Sacred",
      description:
        "One of Goa's most revered Hindu temples dedicated to the goddess of peace, nestled in Kavlem foothills with rare Indo-Portuguese pagoda architecture.",
      highlights: ["Deepstambha Lamp Tower", "Sacred Temple Lake", "Peaceful Foothills"],
      mapQuery: "Shri+Shanta+Durga+Temple+Kavlem+Goa",
    },
    {
      name: "Shri Mangeshi Temple",
      category: "Temples & Heritage",
      time: "10 mins",
      distance: "7.0 km",
      badge: "Iconic Landmark",
      description:
        "World-renowned 400-year-old Shiva temple in Priol famous for its majestic seven-storey octagonal lamp tower and illuminated festivals.",
      highlights: ["7-Storey Deepstambha", "Sacred Water Tank", "Intricate Wood Carvings"],
      mapQuery: "Mangueshi+Temple+Priol+Goa",
    },
    {
      name: "Sahakari Spice Farm",
      category: "Nature & Spices",
      time: "5 mins",
      distance: "2.5 km",
      badge: "Top Experience",
      description:
        "Walk through fragrant vanilla, cardamom, and cinnamon plantations. Enjoy a warm garland welcome, herbal drink, and traditional Goan buffet lunch.",
      highlights: ["Aromatic Guided Tour", "Authentic Goan Buffet", "Herbal Spice Bazaar"],
      mapQuery: "Sahakari+Spice+Farm+Ponda+Goa",
    },
    {
      name: "Safa Shahouri Masjid",
      category: "Temples & Heritage",
      time: "3 mins",
      distance: "1.2 km",
      badge: "16th Century",
      description:
        "Built in 1560 by Ibrahim Adil Shah of Bijapur, this historic single-chamber stone mosque features pointed arches and an ancient rectangular masonry tank.",
      highlights: ["Adil Shahi Architecture", "Ancient Masonry Tank", "National Heritage Site"],
      mapQuery: "Safa+Masjid+Ponda+Goa",
    },
    {
      name: "Bondla Wildlife Sanctuary",
      category: "Nature & Spices",
      time: "25 mins",
      distance: "18 km",
      badge: "Ecotourism",
      description:
        "Lush rainforest sanctuary in the Western Ghats foothills with a botanical rose garden, mini zoological park, deer safari, and serene nature trails.",
      highlights: ["Botanical Gardens", "Deer Safari & Zoo", "Forest Canopy Trek"],
      mapQuery: "Bondla+Wildlife+Sanctuary+Goa",
    },
    {
      name: "Dudhsagar Waterfalls Gateway",
      category: "Adventure & Safari",
      time: "40 mins",
      distance: "32 km",
      badge: "Must Visit",
      description:
        "Ponda is the premier hub to embark on the famous Dudhsagar 4x4 jungle jeep safari through Bhagwan Mahavir Wildlife Sanctuary to India's 5th tallest waterfall.",
      highlights: ["4x4 Jungle Jeep Safari", "Milky 310m Cascade", "Mollem National Park"],
      mapQuery: "Dudhsagar+Waterfalls+Goa",
    },
  ];

  const travelHubs = [
    { title: "Madgaon Railway Station", time: "28 mins", distance: "17 km", tag: "Rail Junction" },
    { title: "Panaji Capital City", time: "32 mins", distance: "28 km", tag: "City Center" },
    { title: "Dabolim Airport (GOI)", time: "38 mins", distance: "29 km", tag: "Airport" },
    { title: "Colva & Benaulim Beaches", time: "38 mins", distance: "24 km", tag: "Beaches" },
    { title: "Mopa Airport (GOX)", time: "65 mins", distance: "58 km", tag: "North Airport" },
  ];

  const hotelHubPerks = [
    {
      icon: <Car size={22} />,
      title: "Front Desk Taxi & Tour Desk",
      description: "Our staff arranges trusted local cabs, temple circuit tours, and station/airport transfers directly from our doorstep.",
    },
    {
      icon: <BedDouble size={22} />,
      title: "Spotless AC Rooms & Fresh Linens",
      description: "Return from humid sightseeing to cool air-conditioned comfort, clean linens, hot showers, and a peaceful night's rest.",
    },
    {
      icon: <UtensilsCrossed size={22} />,
      title: "In-House Goan & Indian Dining",
      description: "Enjoy hot fish thalis, fresh rotis, or breakfast before leaving in the morning, with 24/7 in-room tea & coffee service.",
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Safe On-Site Parking & 24/7 Desk",
      description: "Free secure parking for cars and rental bikes, with round-the-clock front desk assistance for late check-ins.",
    },
  ];

  const rooms = [
    {
      name: "Deluxe Room",
      image: room1,
      description:
        "A restful, beautifully appointed room featuring crisp linens, air-conditioning, and essential amenities for a comfortable Ponda stay.",
      amenities: ["AC", "Free Wi-Fi", "Hot Shower", "LED TV"],
      badge: "Popular Choice",
    },
    {
      name: "Premium Room",
      image: room2,
      description:
        "Spacious and quiet with upgraded wooden furnishings, ample wardrobe space, and dedicated seating area for extra relaxation.",
      amenities: ["AC", "Free Wi-Fi", "Room Service", "Work Desk"],
      badge: "Extra Spacious",
    },
    {
      name: "Family Room",
      image: room3,
      description:
        "Generously sized accommodation tailored for families and groups travelling together, with comfortable bedding and ensuite bath.",
      amenities: ["Multiple Beds", "AC", "Daily Housekeeping", "LED TV"],
      badge: "Family Friendly",
    },
    {
      name: "Executive Room",
      image: room4,
      description:
        "Our finest accommodation featuring refined decor, premium bedding, ambient lighting, and dedicated in-room dining service.",
      amenities: ["King Bed", "Fast Wi-Fi", "In-Room Dining", "Hot Shower"],
      badge: "Premium Stay",
    },
  ];

  return (
    <>
      <style>{`
        .shakti-brand {
          font-family: 'Cormorant Garamond', Georgia, serif;
          color: #e3c88e;
        }
      `}</style>

      <main className="min-h-screen bg-[#f7f3ea] text-[#20221f]">

      {/* ================= NAVBAR ================= */}

      <header className="absolute left-0 top-0 z-50 w-full">
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">

          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <a
              href="#"
              className="shrink-0 rounded-xl bg-white/95 px-3 py-2 shadow-lg backdrop-blur-md transition-transform duration-150 hover:scale-[1.02]"
            >
              <img
                src={logo}
                alt="Shakti Palace"
                className="h-12 w-auto object-contain sm:h-14"
              />
            </a>

            <div className="shakti-brand min-w-0 leading-none">
              <span className="block text-[8px] font-semibold uppercase tracking-[0.24em] sm:text-[9px] lg:text-[10px]">
                Hotel
              </span>
              <span className="mt-1 block whitespace-nowrap text-[17px] font-semibold tracking-[0.05em] sm:text-[20px] lg:text-[24px]">
                SHAKTI PALACE
              </span>
            </div>
          </div>

          {/* DESKTOP NAV */}

          <div className="hidden items-center gap-1 rounded-full border border-white/25 bg-[#11140f]/90 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:flex">

  <a
    href="#rooms"
    className="rounded-full px-4 py-2 text-sm font-semibold !text-[#b28b4d] transition-all duration-150 hover:bg-white/10 hover:!text-white"
  >
    Rooms
  </a>

  <a
    href="#explore"
    className="rounded-full px-4 py-2 text-sm font-semibold !text-[#b28b4d] transition-all duration-150 hover:bg-white/10 hover:!text-white"
  >
    Explore
  </a>

  <a
    href="#about"
    className="rounded-full px-4 py-2 text-sm font-semibold !text-[#b28b4d] transition-all duration-150 hover:bg-white/10 hover:!text-white"
  >
    About
  </a>

  <a
    href="#location"
    className="rounded-full px-4 py-2 text-sm font-semibold !text-[#b28b4d] transition-all duration-150 hover:bg-white/10 hover:!text-white"
  >
    Location
  </a>

  <a
    href="#dining"
    className="rounded-full px-4 py-2 text-sm font-semibold !text-[#b28b4d] transition-all duration-150 hover:bg-white/10 hover:!text-white"
  >
    Dining
  </a>

  <a
    href="#booking"
    className="ml-1 flex items-center gap-2 rounded-full bg-[#b28b4d] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:bg-[#9e793f] hover:shadow-lg"
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
                href="#explore"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl"
              >
                Explore
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
                href="#dining"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl"
              >
                Dining
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

    

      <section className="relative min-h-[560px] w-full overflow-hidden bg-[#171914] sm:min-h-[620px] lg:aspect-[1899/882] lg:min-h-0">

        <img
          src={heroImage}
          alt="Shakti Palace, Ponda Goa"
          className="absolute inset-0 h-full w-full object-fill"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />

        <div className="absolute inset-0 z-10">

          <div className="mx-auto flex h-full max-w-[1400px] items-center px-5 pt-28 sm:px-6 sm:pt-32 lg:px-10 lg:pt-20">

            <motion.div
              className="max-w-2xl"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >

              {/* Google Reviews & Social Proof Floating Badge */}
              <motion.div
                variants={staggerChild}
                className="mb-4 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs text-white shadow-xl backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:border-[#e3c88e]/60 sm:mb-6"
              >
                <div className="flex items-center gap-0.5 text-[#facc15]">
                  <Star size={13} className="fill-[#facc15]" />
                  <Star size={13} className="fill-[#facc15]" />
                  <Star size={13} className="fill-[#facc15]" />
                  <Star size={13} className="fill-[#facc15]" />
                  <Star size={13} className="fill-[#facc15]/60" />
                </div>
                <span className="font-semibold text-[#e3c88e]">4.2 / 5</span>
                <span className="text-white/40">·</span>
                <span className="font-medium text-white/90">500+ Verified Guests</span>
                <span className="hidden text-white/40 sm:inline">·</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  24/7 Front Desk
                </span>
              </motion.div>

              <motion.h1
                variants={staggerChild}
                className="max-w-[350px] font-serif text-[clamp(40px,10vw,100px)] font-medium leading-[0.92] tracking-[-0.025em] text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)] sm:max-w-xl lg:max-w-2xl"
              >
                A place to stay,
                <br />
                <span className="italic text-[#e3c88e]">
                  dine & unwind.
                </span>
              </motion.h1>

              <motion.p
                variants={staggerChild}
                className="mt-5 max-w-[340px] text-sm leading-6 text-white/85 drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)] sm:mt-7 sm:max-w-lg sm:text-base sm:leading-7 lg:text-lg"
              >
                Comfortable stays, welcoming hospitality and
                memorable dining in the heart of Ponda, Goa.
              </motion.p>

              <motion.div variants={staggerChild} className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">

                <a
                  href="#rooms"
                  className="group flex items-center gap-3 rounded-full bg-[#b28b4d] px-6 py-3.5 text-sm font-semibold text-white shadow-xl transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#9e793f] hover:shadow-2xl sm:px-7 sm:py-4"
                >
                  Explore rooms
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
                <a
                  href="#about"
                  className="group flex items-center gap-3 rounded-full border border-[#e3c88e]/80 bg-black/20 px-6 py-3.5 text-sm font-medium shadow-lg backdrop-blur-sm transition-all duration-150 hover:bg-white sm:px-7 sm:py-4"
                >
                  <span className="text-[#e3c88e] transition-colors duration-150 group-hover:text-[#20221f]">
                    Discover Shakti Palace
                  </span>
                </a>
              </motion.div>

            </motion.div>

          </div>

        </div>

        <div className="absolute bottom-6 left-6 z-20 hidden items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-white/75 drop-shadow-md lg:left-10 lg:flex">

          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/10 backdrop-blur-sm">
            <ChevronDown size={15} />
          </div>

          <span>Scroll to explore</span>

        </div>

        <div className="absolute bottom-6 right-6 z-20 hidden items-center gap-3 rounded-full border border-white/20 bg-black/45 px-4 py-2 text-xs text-white/90 shadow-xl backdrop-blur-md sm:flex">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b28b4d] text-[11px] font-bold text-white">
            ★
          </span>
          <span>"Spacious rooms & peaceful central location in Ponda"</span>
          <span className="text-[11px] text-[#e3c88e]">― Google Review</span>
        </div>

      </section>


      {/* ================= BOOKING ================= */}
      <section id="booking" className="relative z-30">
        <div className="mx-auto -mt-14 w-full max-w-[1480px] lg:-mt-[58px]">
          {/* Mobile / tablet booking card */}
          <div className="mx-auto w-[calc(100%-32px)] max-w-[380px] overflow-visible rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] lg:hidden" style={{ position: 'relative' }}>
            {/* Check Availability */}
            <div className="flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f5ecdc]">
                <CalendarDays size={23} className="text-[#b28b4d]" />
              </div>

              <div className="min-w-0">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#20221f] sm:text-sm">
                  Check availability
                </p>
                <p className="mt-1 text-sm text-black/45">
                  Find your perfect stay
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 border-t border-black/10">

              {/* Check-in */}
              <div className="relative min-w-0 border-r border-black/10 px-4 py-3 sm:px-5">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.13em] text-[#a27b3e] sm:text-xs">
                  Check-in
                </span>

                <button
                  type="button"
                  onClick={() => openCalendar("checkIn")}
                  className="mt-2 flex h-12 w-full items-center overflow-hidden rounded-xl border border-black/10 bg-white px-3 text-left"
                >
                  <CalendarDays size={17} className="mr-3 shrink-0 text-[#b28b4d]" />
                  <span className={`truncate text-[13px] ${checkIn ? "text-[#20221f]" : "text-black/45"}`}>
                    {formatDate(checkIn)}
                  </span>
                </button>

                {renderCalendarPicker("checkIn")}
              </div>

              {/* Check-out */}
              <div className="relative min-w-0 px-4 py-3 sm:px-5">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.13em] text-[#a27b3e] sm:text-xs">
                  Check-out
                </span>

                <button
                  type="button"
                  disabled={!checkIn}
                  onClick={() => openCalendar("checkOut")}
                  className={`mt-2 flex h-12 w-full items-center overflow-hidden rounded-xl border border-black/10 bg-white px-3 text-left disabled:cursor-not-allowed ${!checkIn ? "opacity-50" : ""}`}
                >
                  <CalendarDays size={17} className="mr-3 shrink-0 text-[#b28b4d]" />
                  <span className={`truncate text-[13px] ${checkOut ? "text-[#20221f]" : "text-black/45"}`}>
                    {formatDate(checkOut)}
                  </span>
                </button>

                {renderCalendarPicker("checkOut")}
              </div>

            </div>

            {/* Rooms & Guests */}
            <div className="relative border-t border-black/10 px-4 py-4 sm:px-5">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.13em] text-[#a27b3e] sm:text-xs">
                Guests & rooms
              </span>

              <button
                type="button"
                onClick={() => setGuestMenuOpen(!guestMenuOpen)}
                className="mt-2 flex h-12 w-full items-center justify-between rounded-xl border border-black/10 bg-white px-4 text-left text-sm font-medium text-black"
              >
                <span className="flex min-w-0 items-center gap-3 truncate">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f3ead9]">
                    <UserRound size={17} className="text-[#a27b3e]" />
                  </span>
                  <span className="truncate">
                    {guests} {guests === 1 ? "Guest" : "Guests"}
                    <span className="mx-1.5 text-black/25">·</span>
                    {selectedRooms}{" "}
                    {selectedRooms === 1 ? "Room" : "Rooms"}
                  </span>
                </span>

                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-200 ${
                    guestMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {guestMenuOpen && (
                <div className="absolute bottom-auto left-4 right-4 top-[calc(100%+8px)] z-[100] rounded-2xl border border-black/10 bg-white p-4 shadow-2xl sm:left-5 sm:right-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-black">Rooms</p>
                      <p className="mt-1 text-xs text-black/40">
                        How many rooms?
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedRooms(Math.max(1, selectedRooms - 1))
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
                        onClick={() => setSelectedRooms(selectedRooms + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-lg hover:bg-black/5"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-5">
                    <div>
                      <p className="text-sm font-semibold text-black">Guests</p>
                      <p className="mt-1 text-xs text-black/40">
                        Adults & children
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-lg hover:bg-black/5"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">
                        {guests}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests(guests + 1)}
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

            {/* Search */}
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

               setShowAvailability(true);

setTimeout(() => {
  document
    .getElementById("availability-results")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
}, 50);
              }}
              className="flex min-h-14 w-full items-center justify-center gap-3 rounded-b-[24px] bg-[#b28b4d] px-6 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#9e793f]"
            >
              Check availability
              <ArrowUpRight size={18} />
            </button>
          </div>

          {/* Desktop booking bar — original structure/dimensions preserved */}
          <div className="hidden w-full overflow-visible rounded-[22px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] lg:flex">
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
            <div className="relative flex min-w-[230px] flex-1 flex-col justify-center border-l border-black/10 px-7 py-6">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                Check in
              </span>

              <button
                type="button"
                onClick={() => openCalendar("checkIn")}
                className="mt-2 flex h-8 w-full items-center text-left"
              >
                <CalendarDays size={20} className="mr-3 shrink-0 text-[#b28b4d]" />
                <span className={`text-base font-medium ${checkIn ? "text-[#20221f]" : "text-black/45"}`}>
                  {formatDate(checkIn)}
                </span>
              </button>

              {renderCalendarPicker("checkIn")}
            </div>

            {/* Check Out */}
            <div className="relative flex min-w-[230px] flex-1 flex-col justify-center border-l border-black/10 px-7 py-6">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                Check out
              </span>

              <button
                type="button"
                disabled={!checkIn}
                onClick={() => openCalendar("checkOut")}
                className={`mt-2 flex h-8 w-full items-center text-left disabled:cursor-not-allowed ${!checkIn ? "opacity-50" : ""}`}
              >
                <CalendarDays size={20} className="mr-3 shrink-0 text-[#b28b4d]" />
                <span className={`text-base font-medium ${checkOut ? "text-[#20221f]" : "text-black/45"}`}>
                  {formatDate(checkOut)}
                </span>
              </button>

              {renderCalendarPicker("checkOut")}
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

                  <span className="mx-2 text-black/25">·</span>

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
{/* SEARCH ROOMS */}
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

    setShowAvailability(true);

    setTimeout(() => {
      document
        .getElementById("availability-results")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  }}
  className="flex min-w-[210px] items-center justify-center gap-3 rounded-r-[22px] bg-[#b28b4d] px-8 text-base font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#9e793f]"
>
  Check availability

  <ArrowUpRight
    size={19}
    className="text-white"
  />
</button>
          </div>
        </div>
      </section>
{showAvailability && (
  <section
    id="availability-results"
    className="mx-auto w-[calc(100%-32px)] max-w-[1000px] py-10 sm:py-14"
  >
    <div className="rounded-[28px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-8">

      <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27b3e]">
        Available rooms
      </p>

      <h2 className="mt-3 font-serif text-4xl font-medium leading-none sm:text-5xl">
        Choose your room
      </h2>

      <p className="mt-3 text-sm text-black/50">
        {formatDate(checkIn)} → {formatDate(checkOut)} · {guests}{" "}
        {guests === 1 ? "Guest" : "Guests"} · {selectedRooms}{" "}
        {selectedRooms === 1 ? "Room" : "Rooms"}
      </p>

      <div className="mt-8 grid gap-4">
        {rooms.map((room) => (
          <div
            key={room.name}
            className="flex flex-col gap-5 rounded-2xl border border-black/10 p-4 sm:flex-row sm:items-center"
          >
            <img
              src={room.image}
              alt={room.name}
              className="h-44 w-full rounded-xl object-cover sm:h-28 sm:w-44"
            />

            <div className="min-w-0 flex-1">
              <h3 className="font-serif text-2xl">
                {room.name}
              </h3>

              <p className="mt-2 text-sm leading-6 text-black/50">
                {room.description}
              </p>
            </div>

            <button
              type="button"
              className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#b28b4d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9e793f]"
            >
              Select room
              <ArrowUpRight size={17} />
            </button>
          </div>
        ))}
      </div>

    </div>
  </section>
)}


      {/* ================= LOCATION ================= */}

      <section
        id="location"
        className="mx-auto max-w-[1280px] scroll-mt-24 px-6 py-28 lg:px-10 lg:py-36"
      >

        <ScrollReveal>
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
                className="group inline-flex items-center gap-3 rounded-full bg-[#b28b4d] px-7 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#9e793f] hover:shadow-xl"
              >
                Get directions

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </a>

              <a
                href="tel:+917875968565"
                className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white px-6 py-4 text-sm font-semibold text-[#20221f] transition-all duration-150 hover:-translate-y-0.5 hover:border-[#b28b4d] hover:shadow-lg"
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
        </ScrollReveal>

      </section>


      {/* ================= EXPLORE & HOTEL BASE ================= */}

      <section
        id="explore"
        className="scroll-mt-24 border-t border-black/8 bg-[#f2ecdf] px-6 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-[1280px]">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2.5">
                  <Compass size={17} className="text-[#a27b3e]" />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a27b3e]">
                    Hotel Shakti Palace · The Strategic Base
                  </p>
                </div>
                <h2 className="mt-4 font-serif text-5xl font-medium leading-none sm:text-6xl lg:text-7xl">
                  Stay Central.
                  <br />
                  <span className="italic text-[#a27b3e]">Explore Goa with Ease.</span>
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-black/60 sm:text-right">
                Skip coastal gridlock. Shakti Palace places you at Goa's geographic crossroads —
                unwind in clean AC comfort, enjoy in-house dining, and take effortless day trips.
              </p>
            </div>

            {/* Hotel Advantages as your Travel Base */}
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {hotelHubPerks.map((perk) => (
                <div
                  key={perk.title}
                  className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f3ead9] text-[#a27b3e]">
                    {perk.icon}
                  </div>
                  <h4 className="mt-4 font-serif text-lg font-semibold text-[#20221f]">
                    {perk.title}
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-black/60">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Sights Header & Filter Tabs */}
            <div className="mt-16 flex flex-col justify-between gap-6 border-t border-black/10 pt-12 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a27b3e]">
                  Short Excursions From Our Lobby
                </p>
                <h3 className="mt-2 font-serif text-3xl font-medium text-[#20221f] sm:text-4xl">
                  Day Trips Within Minutes of Your Room
                </h3>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {attractionCategories.map((cat) => {
                  const count =
                    cat === "All"
                      ? attractions.length
                      : attractions.filter((a) => a.category === cat).length;
                  const isActive = attractionCategory === cat;

                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setAttractionCategory(cat)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? "bg-[#b28b4d] text-white shadow-md shadow-[#b28b4d]/25"
                          : "border border-black/10 bg-white/80 text-[#20221f] hover:bg-white hover:border-[#b28b4d]/40"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                          isActive ? "bg-black/20 text-white" : "bg-black/5 text-black/50"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Attraction Cards Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {attractions
              .filter(
                (item) =>
                  attractionCategory === "All" || item.category === attractionCategory
              )
              .map((item, index) => (
                <ScrollReveal key={item.name} delay={index * 0.07}>
                  <article className="group flex h-full flex-col justify-between rounded-2xl border border-black/8 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#b28b4d]/40 hover:shadow-xl">
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-[#f3ead9] px-3 py-1 text-[11px] font-semibold text-[#a27b3e]">
                          {item.badge}
                        </span>

                        <div className="flex items-center gap-1.5 rounded-full bg-[#f7f3ea] px-2.5 py-1 text-xs font-semibold text-[#a27b3e]">
                          <Car size={13} />
                          <span>{item.time} from hotel</span>
                        </div>
                      </div>

                      <h3 className="mt-5 font-serif text-2xl font-semibold text-[#20221f] transition-colors duration-150 group-hover:text-[#a27b3e]">
                        {item.name}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-black/60">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#f7f3ea] px-2.5 py-1 text-[11px] font-medium text-black/70"
                          >
                            <Sparkles size={11} className="text-[#b28b4d]" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-7 flex items-center justify-between border-t border-black/6 pt-5">
                      <a
                        href={`https://www.google.com/maps/dir/Hotel+Shakti+Palace,+Super+Market+Complex,+Ponda,+Goa+403401/${encodeURIComponent(
                          item.mapQuery
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#b28b4d] transition-colors hover:text-[#20221f]"
                      >
                        <Navigation size={13} />
                        Route from Hotel
                        <ArrowUpRight size={14} />
                      </a>

                      <a
                        href="tel:+917875968565"
                        className="text-[11px] font-medium text-black/50 hover:text-[#a27b3e]"
                      >
                        Ask desk for taxi
                      </a>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
          </div>

          {/* Travel Hubs Transit Strip */}
          <ScrollReveal delay={0.2}>
            <div className="mt-14 rounded-3xl border border-black/8 bg-white/70 p-6 shadow-sm backdrop-blur-md sm:p-8">
              <div className="flex flex-col justify-between gap-4 border-b border-black/8 pb-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3ead9] text-[#a27b3e]">
                    <Navigation size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-[#20221f]">
                      Goa Transit Times from Hotel Shakti Palace
                    </h4>
                    <p className="text-xs text-black/55">
                      Avoid coastal congestion — direct highway access to all major transit points
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Hotel+Shakti+Palace,+Super+Market+Complex,+Ponda,+Goa+403401"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-[#a27b3e] hover:underline sm:self-auto"
                >
                  Open in Google Maps
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {travelHubs.map((hub) => (
                  <div
                    key={hub.title}
                    className="rounded-2xl border border-black/6 bg-white p-4 shadow-sm"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a27b3e]">
                      {hub.tag}
                    </span>
                    <p className="mt-1 text-xs font-semibold text-[#20221f]">
                      {hub.title}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="font-bold text-[#b28b4d]">{hub.time}</span>
                      <span className="text-black/40">{hub.distance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="mx-auto max-w-[1280px] scroll-mt-24 px-6 py-32 lg:px-10 lg:py-44"
      >

        <ScrollReveal>
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
        </ScrollReveal>

        {/* ── Highlights ── */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {[
            {
              icon: <BedDouble size={24} />,
              title: "Comfortable Rooms",
              text: "Well-furnished rooms designed for a relaxing and restful stay in Ponda.",
            },
            {
              icon: <UtensilsCrossed size={24} />,
              title: "Restaurant",
              text: "Savour authentic Goan and multi-cuisine dishes prepared with fresh ingredients.",
            },
            {
              icon: <MapPinned size={24} />,
              title: "Central Location",
              text: "Steps away from Ponda's markets, temples and key landmarks.",
            },
            {
              icon: <Clock size={24} />,
              title: "24/7 Service",
              text: "Round-the-clock front desk, room service and assistance for every guest.",
            },
          ].map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.1}>
              <div className="group rounded-2xl border border-black/8 bg-white p-7 shadow-sm transition-shadow duration-200 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3ead9] text-[#a27b3e] transition-colors duration-200 group-hover:bg-[#b28b4d] group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-[#20221f]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-black/50">
                  {item.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </section>


      {/* ================= ROOMS ================= */}

      <section
        id="rooms"
        className="scroll-mt-24 bg-[#20221f] px-6 py-24 text-white sm:py-32"
      >

        <div className="mx-auto max-w-[1280px]">

          <ScrollReveal>
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
          </ScrollReveal>

          {/* ROOM CARDS */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((room, index) => (
              <ScrollReveal key={room.name} delay={index * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/5 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
                  {/* IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    {/* Room Badge */}
                    <span className="absolute left-3 top-3 rounded-full bg-[#b28b4d] px-3 py-1 text-[11px] font-semibold tracking-wide text-white shadow-md">
                      {room.badge}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-serif text-2xl font-medium text-white">
                      {room.name}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-white/60">
                      {room.description}
                    </p>

                    {/* Amenities pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {room.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/75"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-1 items-end justify-between border-t border-white/10 pt-4">
                      <a
                        href="#booking"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#e3c88e] transition-colors hover:text-white"
                      >
                        Check availability
                        <ArrowUpRight size={15} />
                      </a>

                      <a
                        href="tel:+917875968565"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-[#b28b4d] hover:text-white"
                        title="Call Reception to Book"
                      >
                        <Phone size={13} />
                      </a>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </section>


      {/* ================= DINING ================= */}

      <section
        id="dining"
        className="scroll-mt-24 bg-[#f7f3ea] px-6 py-24 sm:py-32"
      >
        <div className="mx-auto max-w-[1280px]">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-2">
                  <ChefHat size={18} className="text-[#a27b3e]" />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a27b3e]">
                    In-House Dining & Room Service
                  </p>
                </div>
                <h2 className="mt-4 font-serif text-5xl font-medium leading-none sm:text-6xl lg:text-7xl">
                  Flavours of Goa
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-black/60 sm:text-right">
                Enjoy home-style Goan coastal curries, fresh seafood, and comforting
                North & South Indian dishes prepared fresh in our hotel kitchen.
              </p>
            </div>
          </ScrollReveal>

          {/* Culinary Highlights */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                tag: "Coastal Specialties",
                title: "Goan Fish Thalis & Seafood",
                text: "Crisp kingfish rava fry, authentic Goan fish curry with steamed rice, coastal prawn masala, and seasonal catch prepared with local kokum and spices.",
                icon: <UtensilsCrossed size={22} />,
                features: ["Fresh Local Catch", "Coconut & Kokum Curries", "Traditional Thali"],
              },
              {
                tag: "Homestyle Classics",
                title: "North & South Indian Favorites",
                text: "Rich paneer butter masala, comforting dal tadka, piping-hot tandoori rotis, aromatic chicken biryanis, and warm vegetarian preparations.",
                icon: <ChefHat size={22} />,
                features: ["Pure Veg Options", "Freshly Cooked to Order", "Comfort Meals"],
              },
              {
                tag: "24/7 Room Service",
                title: "Morning Breakfast & In-Room Dining",
                text: "Start your morning with hot Goan poee, poha, eggs to order, and steaming masala chai or filter coffee delivered straight to your bedside.",
                icon: <Coffee size={22} />,
                features: ["Bedside Service", "Morning Breakfast", "Hot Tea & Coffee 24/7"],
              },
            ].map((dish, index) => (
              <ScrollReveal key={dish.title} delay={index * 0.09}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-black/8 bg-white p-8 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#b28b4d]/40 hover:shadow-xl">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#f3ead9] px-3 py-1 text-[11px] font-semibold text-[#a27b3e]">
                        {dish.tag}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3ead9] text-[#a27b3e]">
                        {dish.icon}
                      </div>
                    </div>

                    <h3 className="mt-5 font-serif text-2xl font-semibold text-[#20221f]">
                      {dish.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-black/60">
                      {dish.text}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {dish.features.map((feat) => (
                        <span
                          key={feat}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#f7f3ea] px-2.5 py-1 text-[11px] font-medium text-black/70"
                        >
                          <Sparkles size={11} className="text-[#b28b4d]" />
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 border-t border-black/6 pt-5">
                    <a
                      href="tel:+917875968565"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#b28b4d] transition-colors hover:text-[#20221f]"
                    >
                      <Phone size={13} />
                      Order in-room dining: +91 78759 68565
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Dining Times Strip */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-black/8 bg-white px-7 py-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3ead9] text-[#a27b3e]">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#20221f]">
                    Kitchen Hours
                  </h4>
                  <p className="text-xs text-black/55">
                    Breakfast: 7:30 AM – 10:30 AM · Lunch: 12:30 PM – 3:30 PM · Dinner: 7:30 PM – 10:30 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#a27b3e]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Tea, Coffee & Drinking Water available 24/7 at Reception</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ================= GALLERY ================= */}

      <section
        id="gallery"
        className="scroll-mt-24 bg-[#20221f] px-6 py-24 text-white sm:py-32"
      >
        <div className="mx-auto max-w-[1280px]">
          <ScrollReveal>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#e3c88e]">
                  Visual Tour
                </p>
                <h2 className="mt-4 font-serif text-5xl font-medium leading-none sm:text-6xl lg:text-7xl">
                  Moments at Shakti Palace
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-white/55 sm:text-right">
                A glimpse into our comfortable rooms, warm hospitality, and relaxed atmosphere in Ponda.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { img: heroImage, title: "Hotel Exterior & Entrance", desc: "Conveniently situated in Ponda Super Market Complex" },
              { img: room1, title: "Deluxe Bedroom", desc: "Crisp linen, ambient lighting, and cooling AC" },
              { img: room2, title: "Premium Living Space", desc: "Spacious quarters with comfortable seating" },
              { img: room3, title: "Family Accommodations", desc: "Ample room for families visiting Goa temples & attractions" },
              { img: room4, title: "Executive Suite", desc: "Refined comfort for relaxing after a long day" },
              { img: heroImage, title: "Welcoming Front Porch", desc: "24/7 reception desk and vehicle parking" },
            ].map((photo, index) => (
              <ScrollReveal key={`${photo.title}-${index}`} delay={index * 0.07}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 shadow-xl">
                  <img
                    src={photo.img}
                    alt={photo.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-200 group-hover:opacity-90" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <h4 className="font-serif text-xl font-semibold text-white">
                      {photo.title}
                    </h4>
                    <p className="mt-1 text-xs text-white/70">
                      {photo.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Quick Reservation Callout */}
          <ScrollReveal delay={0.2}>
            <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center sm:flex-row sm:text-left">
              <div>
                <h3 className="font-serif text-3xl font-medium text-white sm:text-4xl">
                  Ready to book your stay in Ponda?
                </h3>
                <p className="mt-2 text-sm text-white/60">
                  Best rates guaranteed when booking directly with our front desk.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <a
                  href="#booking"
                  className="inline-flex items-center gap-2 rounded-full bg-[#b28b4d] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#9e793f]"
                >
                  Book your stay
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href="tel:+917875968565"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/20"
                >
                  <Phone size={15} />
                  +91 78759 68565
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-black/10 bg-[#20221f] px-6 py-8 text-center">
        <p className="text-sm text-white/50">
          © 2026 Shakti Palace. All rights reserved.
        </p>
      </footer>

    </main>
    </>
  );
}

export default App;