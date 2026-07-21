import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cookie, Facebook, Instagram, Mail, Phone, X } from "lucide-react";
import { TikTokIcon, Wordmark } from "./Brand";
import { COOKIES_CONTENT, GDPR_CONTENT, TERMS_CONTENT } from "../content/legal";

/* ----------------------------------------------------------------- Modal */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-violet-950/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="paper-card flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-violet-900/10 px-6 py-4">
          <h3 className="font-display text-xl font-bold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Închide"
            className="rounded-full p-2 text-ink/60 transition hover:bg-violet-900/10 hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </motion.div>
    </motion.div>
  );
}

/* --------------------------------------------------------------- Cookies */
type CookiePrefs = { necessary: true; analytics: boolean };
const COOKIE_KEY = "cookie-consent";

function readPrefs(): CookiePrefs | null {
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function CookieSettings({ onClose }: { onClose: () => void }) {
  const [analytics, setAnalytics] = useState(() => readPrefs()?.analytics ?? false);

  const save = (value: boolean) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ necessary: true, analytics: value }));
    onClose();
  };

  return (
    <Modal title="Setări cookie-uri" onClose={onClose}>
      {COOKIES_CONTENT}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-violet-900/5 px-4 py-3">
          <div>
            <p className="text-sm font-semibold">Strict necesare</p>
            <p className="text-xs text-ink/60">Necesare funcționării site-ului.</p>
          </div>
          <span className="text-xs font-bold uppercase text-violet-700">Mereu active</span>
        </div>
        <label className="flex cursor-pointer items-center justify-between rounded-xl bg-violet-900/5 px-4 py-3">
          <span>
            <span className="block text-sm font-semibold">Analiză</span>
            <span className="block text-xs text-ink/60">Statistici anonime de utilizare.</span>
          </span>
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
            className="h-5 w-5 rounded border-violet-900/30 text-violet-700 focus:ring-violet-600"
          />
        </label>
      </div>
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button type="button" className="btn-ghost !border-violet-900/20 !text-ink" onClick={() => save(false)}>
          Doar necesare
        </button>
        <button type="button" className="btn-cta" onClick={() => save(analytics)}>
          Salvează preferințele
        </button>
      </div>
    </Modal>
  );
}

export function CookieBanner({ onOpenSettings }: { onOpenSettings: () => void }) {
  const [visible, setVisible] = useState(() => readPrefs() === null);
  if (!visible) return null;

  const accept = (analytics: boolean) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify({ necessary: true, analytics }));
    setVisible(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-3xl"
      role="region"
      aria-label="Consimțământ cookie-uri"
    >
      <div className="paper-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <Cookie className="h-8 w-8 shrink-0 text-violet-700" aria-hidden="true" />
        <p className="flex-1 text-sm text-ink/80">
          Folosim cookie-uri pentru funcționarea site-ului și, cu acordul tău, pentru statistici anonime. Poți schimba
          oricând opțiunea din subsolul paginii.
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full border border-violet-900/20 px-4 py-2 text-sm font-semibold transition hover:bg-violet-900/5"
            onClick={() => {
              setVisible(false);
              onOpenSettings();
            }}
          >
            Personalizează
          </button>
          <button
            type="button"
            className="rounded-full border border-violet-900/20 px-4 py-2 text-sm font-semibold transition hover:bg-violet-900/5"
            onClick={() => accept(false)}
          >
            Doar necesare
          </button>
          <button
            type="button"
            className="rounded-full bg-amber-400 px-4 py-2 text-sm font-bold text-violet-950 transition hover:bg-amber-300"
            onClick={() => accept(true)}
          >
            Accept toate
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- Footer */
type ModalKind = "terms" | "gdpr" | "cookies" | null;

export function Footer() {
  const [modal, setModal] = useState<ModalKind>(null);
  const close = () => setModal(null);

  return (
    <>
      <footer className="relative border-t border-white/10 bg-violet-950/60 px-5 pb-8 pt-14 backdrop-blur">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
              Consultanță fiscală și contabilitate cu experiență din 2007 — soluții personalizate și eficiente pentru
              succesul afacerii tale.
            </p>
            <div className="mt-6 flex items-center gap-3" aria-label="Rețele sociale (în curând)">
              {[
                { icon: <Instagram className="h-5 w-5" aria-hidden="true" />, label: "Instagram" },
                { icon: <Facebook className="h-5 w-5" aria-hidden="true" />, label: "Facebook" },
                { icon: <TikTokIcon />, label: "TikTok" },
              ].map(({ icon, label }) => (
                <span
                  key={label}
                  title={`${label} — în curând`}
                  aria-label={`${label} (în curând)`}
                  className="inline-flex h-10 w-10 cursor-default items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-amber-400 hover:text-amber-400"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          <div className="text-sm">
            <h4 className="mb-4 font-display font-bold text-white">Contact</h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <a href="tel:0722614766" className="inline-flex items-center gap-2 hover:text-amber-400">
                  <Phone className="h-4 w-4" aria-hidden="true" /> 0722 614 766
                </a>
              </li>
              <li>
                <a href="mailto:office.contabilteam@gmail.com" className="inline-flex items-center gap-2 hover:text-amber-400">
                  <Mail className="h-4 w-4" aria-hidden="true" /> office.contabilteam@gmail.com
                </a>
              </li>
            </ul>
            <ul className="mt-5 space-y-1 text-xs text-white/50">
              <li>CIF Consultant Fiscal — Gebaila Livia: 23127438</li>
              <li>CIF Perfect Team Invest: 36756529</li>
              <li>CIF Perfect Team Finance: 45985424</li>
            </ul>
          </div>

          <div className="text-sm">
            <h4 className="mb-4 font-display font-bold text-white">Informații legale</h4>
            <ul className="space-y-3 text-white/70">
              <li>
                <button type="button" className="hover:text-amber-400" onClick={() => setModal("terms")}>
                  Termeni și Condiții
                </button>
              </li>
              <li>
                <button type="button" className="hover:text-amber-400" onClick={() => setModal("gdpr")}>
                  Politica GDPR
                </button>
              </li>
              <li>
                <button type="button" className="hover:text-amber-400" onClick={() => setModal("cookies")}>
                  Setări cookie-uri
                </button>
              </li>
              <li>
                <a href="https://anpc.ro" target="_blank" rel="noreferrer" className="hover:text-amber-400">
                  ANPC — Protecția Consumatorilor
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8">
          <img src="/assets/CCF.png" alt="Camera Consultanților Fiscali" className="h-20 w-auto" />
          <img src="/assets/sigla-CECCAR.png" alt="CECCAR" className="h-20 w-auto" />
          <a href="https://anpc.ro" target="_blank" rel="noreferrer" aria-label="ANPC — anpc.ro">
            <img src="/assets/anpc.png" alt="ANPC — Autoritatea Națională pentru Protecția Consumatorilor" className="h-20 w-auto" />
          </a>
        </div>

        <p className="mt-8 text-center text-xs text-white/45">
          © {new Date().getFullYear()} Consultant Fiscal Gebaila Livia. Toate drepturile rezervate.
        </p>
      </footer>

      <CookieBanner onOpenSettings={() => setModal("cookies")} />

      <AnimatePresence>
        {modal === "terms" && (
          <Modal title="Termeni și Condiții" onClose={close}>
            {TERMS_CONTENT}
          </Modal>
        )}
        {modal === "gdpr" && (
          <Modal title="Politica GDPR" onClose={close}>
            {GDPR_CONTENT}
          </Modal>
        )}
        {modal === "cookies" && <CookieSettings onClose={close} />}
      </AnimatePresence>
    </>
  );
}
