import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Calendar, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
  "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
];
const WEEKDAYS = ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"];

function useClickOutside(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

const triggerCls =
  "field-input flex items-center justify-between gap-2 text-left aria-expanded:border-violet-600 aria-expanded:ring-1 aria-expanded:ring-violet-600";

const panelMotion = {
  initial: { opacity: 0, y: -6, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.98 },
  transition: { duration: 0.15 },
} as const;

/* ------------------------------------------------- custom select (listbox) */
export function SelectField({
  id,
  value,
  placeholder,
  options,
  onChange,
}: {
  id: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={triggerCls}
      >
        <span className={value ? "" : "text-ink/35"}>{value || placeholder}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-violet-700 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            {...panelMotion}
            role="listbox"
            aria-labelledby={id}
            className="absolute z-30 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-violet-900/10 bg-white p-1.5 shadow-xl"
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={opt === value}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    opt === value ? "bg-violet-900 font-semibold text-amber-400" : "hover:bg-violet-900/5"
                  }`}
                >
                  {opt}
                  {opt === value && <Check className="h-4 w-4" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------- calendar (date) */
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function DateField({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string; // yyyy-mm-dd or ""
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [month, setMonth] = useState(() => {
    const base = value ? new Date(value) : today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const ref = useClickOutside(() => setOpen(false));

  const firstWeekday = (month.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const canGoBack = month > new Date(today.getFullYear(), today.getMonth(), 1);

  const display = value
    ? `${Number(value.slice(8))} ${MONTHS[Number(value.slice(5, 7)) - 1]} ${value.slice(0, 4)}`
    : "Alegeți data";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        id={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={triggerCls}
      >
        <span className={value ? "" : "text-ink/35"}>{display}</span>
        <Calendar className="h-4 w-4 shrink-0 text-violet-700" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            {...panelMotion}
            role="dialog"
            aria-label="Alegeți data întâlnirii"
            className="absolute z-30 mt-2 w-full min-w-[280px] rounded-xl border border-violet-900/10 bg-white p-3 shadow-xl"
          >
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                aria-label="Luna precedentă"
                disabled={!canGoBack}
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                className="rounded-lg p-1.5 text-violet-700 transition hover:bg-violet-900/5 disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <p className="font-display text-sm font-bold capitalize">
                {MONTHS[month.getMonth()]} {month.getFullYear()}
              </p>
              <button
                type="button"
                aria-label="Luna următoare"
                onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                className="rounded-lg p-1.5 text-violet-700 transition hover:bg-violet-900/5"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {WEEKDAYS.map((d) => (
                <span key={d} className="py-1 text-xs font-semibold text-ink/45">
                  {d}
                </span>
              ))}
              {Array.from({ length: firstWeekday }, (_, i) => (
                <span key={`pad-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const d = new Date(month.getFullYear(), month.getMonth(), i + 1);
                const weekend = d.getDay() === 0 || d.getDay() === 6;
                const disabled = weekend || d < today;
                const selected = value === iso(d);
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={disabled}
                    aria-label={`${i + 1} ${MONTHS[month.getMonth()]} ${month.getFullYear()}`}
                    onClick={() => {
                      onChange(iso(d));
                      setOpen(false);
                    }}
                    className={`rounded-lg py-1.5 text-sm transition ${
                      selected
                        ? "bg-violet-900 font-bold text-amber-400"
                        : disabled
                        ? "text-ink/25"
                        : "font-medium hover:bg-amber-400/30"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 border-t border-violet-900/10 pt-2 text-center text-xs text-ink/50">
              Doar zile lucrătoare, luni – vineri
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
