import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { animate, stagger } from "animejs";
import { CalendarCheck, Menu, X } from "lucide-react";
import { Logo, Streaks, Wordmark } from "./components/Brand";
import { Contact, Despre, Hero, Preturi, Servicii } from "./components/Sections";
import { BookingForm } from "./components/BookingForm";
import { Footer } from "./components/Footer";
import { scrollToId } from "./lib/utils";

const NAV_LINKS = [
  ["acasa", "Acasă"],
  ["despre", "Despre"],
  ["servicii", "Servicii"],
  ["preturi", "Prețuri"],
  ["contact", "Contact"],
] as const;

/* ------------------------------------------------------------ Loader */
function Loader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    animate(ref.current.querySelectorAll(".loader-bar"), {
      scaleY: [0.35, 1, 0.35],
      duration: 900,
      delay: stagger(140),
      loop: true,
      ease: "inOutSine",
    });
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
      style={{
        background:
          "radial-gradient(120% 120% at 0% 0%, #b01fd4 0%, #7c28ce 32%, #4c1d95 62%, #1e0a4e 100%)",
      }}
      aria-label="Se încarcă"
      role="status"
    >
      <Logo size={72} />
      <div ref={ref} className="flex h-10 items-end gap-1.5" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="loader-bar block h-10 w-2.5 origin-bottom rounded-full bg-amber-400" />
        ))}
      </div>
      <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
        Punem cifrele în ordine…
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------ Navbar */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Closing the menu animates its collapse, which cancels an in-flight smooth
  // scroll — so close first and start scrolling after the animation ends.
  const goFromMenu = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 320);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-all ${
        scrolled ? "bg-violet-950/80 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5" aria-label="Navigație principală">
        <a href="/" onClick={(e) => scrollToId(e, "acasa")} aria-label="Către începutul paginii">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => scrollToId(e, id)}
                className="text-sm font-semibold text-white/85 transition hover:text-amber-400"
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a href="#programare" onClick={(e) => scrollToId(e, "programare")} className="btn-cta !px-5 !py-2.5 !text-sm">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Programează o întâlnire
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="rounded-xl border border-white/20 p-2.5 text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-violet-950/95 px-5 backdrop-blur-md lg:hidden"
          >
            {NAV_LINKS.map(([id, label]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => goFromMenu(e, id)}
                  className="block border-b border-white/5 py-4 font-semibold text-white/85"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a href="#programare" onClick={(e) => goFromMenu(e, "programare")} className="btn-cta w-full">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Programează o întâlnire
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

/* --------------------------------------------------------------- App */
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Streaks />
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

      <div className="relative">
        <Navbar />
        <main>
          <Hero />
          <Despre />
          <Servicii />
          <Preturi />
          <BookingForm />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
