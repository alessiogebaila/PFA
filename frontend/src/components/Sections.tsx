import React from "react";
import { motion } from "motion/react";
import {
  Award,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck,
  FileCheck2,
  Landmark,
  LineChart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { scrollToId } from "../lib/utils";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function SectionHeading({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) {
  return (
    <motion.div {...reveal} className="mb-10 max-w-2xl">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className={`font-display text-3xl font-bold sm:text-4xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ Hero */
export function Hero() {
  return (
    <section id="acasa" className="relative px-5 pb-24 pt-36 sm:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <p className="section-eyebrow">
            <Award className="h-4 w-4" aria-hidden="true" /> Experiență din 2007
          </p>
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Cifrele tale, în ordine.
            <span className="block text-amber-400">Liniștea ta, garantată.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Consultanță fiscală și contabilitate pentru persoane fizice și juridice: declarații, optimizare fiscală,
            SPV, eFactura și reprezentare în fața organelor de control — totul într-un singur loc.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#programare" onClick={(e) => scrollToId(e, "programare")} className="btn-cta">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Programează o întâlnire
            </a>
            <a href="#servicii" onClick={(e) => scrollToId(e, "servicii")} className="btn-ghost">
              Vezi serviciile
            </a>
          </div>
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {[
              ["18+", "ani de experiență"],
              ["3", "firme partenere"],
              ["100%", "conformitate ANAF"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-3xl font-bold text-amber-400">{value}</dd>
                <dd className="text-sm text-white/70">{label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-amber-400/20 blur-2xl" aria-hidden="true" />
          <img
            src="/assets/birou.jpeg"
            alt="Biroul nostru — Șoseaua Alexandriei nr. 9, București"
            className="relative w-full rounded-[1.75rem] border-4 border-white/15 object-cover shadow-2xl"
            loading="eager"
          />
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-amber-400 px-5 py-3 font-display font-bold text-violet-950 shadow-xl">
            Te așteptăm la birou
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Despre */
const ENTITIES = [
  {
    icon: Landmark,
    name: "Consultant Fiscal — Gebaila Livia",
    text: "Consultant fiscal cu experiență din 2007, oferind servicii complete de consultanță și contabilitate: interpretarea obligațiilor fiscale, optimizarea costurilor și respectarea tuturor reglementărilor în vigoare.",
    points: ["Consultanță impozite și taxe", "Declarații fiscale", "Planificare și optimizare fiscală"],
  },
  {
    icon: TrendingUp,
    name: "Perfect Team Invest",
    text: "Companie dedicată serviciilor de investiții și consultanță financiară — soluții personalizate pentru dezvoltarea și protejarea capitalului dumneavoastră.",
    points: ["Investiții imobiliare", "Administrare portofolii", "Analiză proiecte de investiții"],
  },
  {
    icon: Calculator,
    name: "Perfect Team Finance",
    text: "Servicii complete de contabilitate și gestiune financiară pentru companii de toate dimensiunile, cu o abordare profesională și personalizată. Membru CECCAR.",
    points: ["Contabilitate primară și financiară", "Bilanțuri și raportări", "Salarizare și administrare personal"],
  },
];

export function Despre() {
  return (
    <section id="despre" className="relative px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading light eyebrow="Cine suntem" title="O echipă, trei specializări" />
        <div className="grid gap-6 md:grid-cols-3">
          {ENTITIES.map(({ icon: Icon, name, text, points }, i) => (
            <motion.article
              key={name}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.12 }}
              className="paper-card flex flex-col p-7"
            >
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-900 text-amber-400">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl font-bold">{name}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/75">{text}</p>
              <ul className="mt-5 space-y-2 border-t border-violet-900/10 pt-5 text-sm font-medium">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-700" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Servicii */
const SERVICES = [
  {
    icon: ShieldCheck,
    title: "Consultanță fiscală",
    items: [
      ["Consultanță fiscală", "Servicii complete de consultanță fiscală."],
      ["Impozite și taxe", "Optimizarea impozitelor și taxelor pentru persoane fizice și juridice."],
      ["Domeniul chiriilor", "Fiscalitatea legată de proprietăți și contracte de închiriere."],
    ],
  },
  {
    icon: Briefcase,
    title: "Consultanță în afaceri",
    items: [
      ["Achiziții și imobilizări", "Optimizarea achizițiilor și administrarea imobilizărilor."],
      ["Optimizare afaceri", "Consultanță personalizată pentru eficiența proceselor de business."],
    ],
  },
  {
    icon: Building2,
    title: "Servicii ANAF",
    items: [
      ["Creare cod EORI", "Codul EORI necesar activităților vamale și comerciale internaționale."],
      ["SPV, ANAF și DITL", "Creare cont SPV și depunerea documentelor pe platformele oficiale."],
      ["eFactura / Facturare SPV", "Utilizarea sistemului eFactura și managementul facturilor prin SPV."],
    ],
  },
  {
    icon: LineChart,
    title: "Reprezentare",
    items: [
      ["Organe de control", "Reprezentare în fața autorităților de control, cu respectarea drepturilor tale."],
    ],
  },
];

export function Servicii() {
  return (
    <section id="servicii" className="relative px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading light eyebrow="Servicii" title="Tot ce are nevoie afacerea ta, fiscal și contabil" />
        <div className="grid gap-6 sm:grid-cols-2">
          {SERVICES.map(({ icon: Icon, title, items }, i) => (
            <motion.article
              key={title}
              {...reveal}
              transition={{ ...reveal.transition, delay: (i % 2) * 0.12 }}
              className="paper-card p-7"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-violet-950">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-bold">{title}</h3>
              </div>
              <dl className="space-y-4">
                {items.map(([term, desc]) => (
                  <div key={term}>
                    <dt className="font-semibold">{term}</dt>
                    <dd className="text-sm leading-relaxed text-ink/70">{desc}</dd>
                  </div>
                ))}
              </dl>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Prețuri */
const PRICE_GROUPS = [
  {
    title: "Tarife activitate",
    rows: [
      ["Consultanță", "200 lei/oră"],
      ["PFA activitate mică", "de la 150 lei/lună"],
      ["PFA activitate medie", "300 lei/lună"],
      ["PFA activitate mare", "1000 lei/lună"],
    ],
  },
  {
    title: "Tarife variabile",
    rows: [
      ["Depunere declarație unică", "de la 100 lei"],
      ["Creare cont SPV (PF/PJ)", "la cerere"],
      ["Depunere online contracte închiriere", "la cerere"],
      ["Declarare mijloace fixe DITL", "la cerere"],
    ],
  },
  {
    title: "Alte servicii",
    rows: [
      ["Închiriere sediu social", "de la 20 €/lună"],
      ["Reglare situație ANAF (declarații/plăți)", "200 lei"],
    ],
  },
];

export function Preturi() {
  return (
    <section id="preturi" className="relative px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading light eyebrow="Prețuri" title="Tarife transparente, stabilite de la început" />
        <div className="grid gap-6 md:grid-cols-3">
          {PRICE_GROUPS.map(({ title, rows }, i) => (
            <motion.article
              key={title}
              {...reveal}
              transition={{ ...reveal.transition, delay: i * 0.12 }}
              className="paper-card p-7"
            >
              <h3 className="mb-5 font-display text-lg font-bold">{title}</h3>
              <dl className="divide-y divide-violet-900/10">
                {rows.map(([service, price]) => (
                  <div key={service} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-sm text-ink/80">{service}</dt>
                    <dd className="whitespace-nowrap font-display font-bold text-violet-800">{price}</dd>
                  </div>
                ))}
              </dl>
            </motion.article>
          ))}
        </div>
        <motion.p {...reveal} className="mt-8 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm text-white/80 backdrop-blur">
          Tarifele variabile se negociază în funcție de mărimea activității (mică, medie sau mare) și se stabilesc încă
          de la începutul colaborării.
        </motion.p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Contact */
export function Contact() {
  return (
    <section id="contact" className="relative px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading light eyebrow="Contact" title="Vino să ne cunoaștem" />
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div {...reveal} className="paper-card space-y-5 p-8">
            <a href="tel:0722614766" className="flex items-center gap-4 font-semibold hover:text-violet-700">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-900 text-amber-400">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              0722 614 766
            </a>
            <a href="mailto:office.contabilteam@gmail.com" className="flex items-center gap-4 font-semibold hover:text-violet-700">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-900 text-amber-400">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              office.contabilteam@gmail.com
            </a>
            <a
              href="https://maps.app.goo.gl/wgLL3gaSANhtG2CJ9"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 font-semibold hover:text-violet-700"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-900 text-amber-400">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              Șoseaua Alexandriei nr. 9, bloc 4, scara H, parter, apt. 71, București
            </a>
            <div className="border-t border-violet-900/10 pt-5 text-sm text-ink/70">
              <p><strong>CIF Consultant Fiscal — Gebaila Livia:</strong> 23127438</p>
              <p><strong>CIF Perfect Team Invest:</strong> 36756529</p>
              <p><strong>CIF Perfect Team Finance:</strong> 45985424</p>
            </div>
          </motion.div>
          <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="paper-card overflow-hidden">
            <iframe
              title="Harta biroului — Șoseaua Alexandriei nr. 9, București"
              src="https://www.openstreetmap.org/export/embed.html?bbox=26.0534%2C44.4005%2C26.0654%2C44.4066&layer=mapnik&marker=44.403532%2C26.059423"
              className="h-full min-h-[320px] w-full border-0"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
