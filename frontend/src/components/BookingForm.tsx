import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarCheck, CheckCircle2, Loader2, PartyPopper } from "lucide-react";
import { appointmentAPI } from "../services/api";
import { DateField, SelectField } from "./fields";

const FIRME = ["Consultant Fiscal - Gebaila Livia", "Perfect Team Invest", "Perfect Team Finance"];

// slots 09:00–16:30, every 30 min
const ORE = Array.from({ length: 16 }, (_, i) => {
  const h = String(9 + Math.floor(i / 2)).padStart(2, "0");
  return `${h}:${i % 2 ? "30" : "00"}`;
});

const EMPTY = {
  firma_destinatie: "",
  nume: "",
  firma: "",
  email: "",
  telefon: "",
  data: "",
  ora: "",
  mesaj: "",
};

type Phase = "idle" | "sending" | "done";

export function BookingForm() {
  const [form, setForm] = useState(EMPTY);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const checkSlot = async (data: string, ora: string) => {
    if (!data || !ora) return true;
    try {
      const res = await appointmentAPI.checkAvailability({ date: data, time: ora });
      if (!res.data.available) {
        setError("Acest interval orar este deja rezervat. Vă rugăm să alegeți altul.");
        setForm((f) => ({ ...f, ora: "" }));
        return false;
      }
      setError("");
      return true;
    } catch {
      return true; // ponytail: availability check is advisory; the API re-validates on submit
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firma_destinatie || !form.data || !form.ora) {
      setError("Vă rugăm să alegeți firma, data și ora întâlnirii.");
      return;
    }
    if (form.telefon.replace(/\D/g, "").length < 10) {
      setError("Numărul de telefon trebuie să aibă cel puțin 10 cifre.");
      return;
    }
    setPhase("sending");
    setError("");
    try {
      await appointmentAPI.createAppointment({ ...form, telefon: form.telefon.replace(/\D/g, "") });
      setPhase("done");
    } catch (err: any) {
      setPhase("idle");
      const detail = err?.response?.data;
      setError(
        typeof detail === "object" && detail
          ? "Acest interval orar tocmai a fost rezervat sau datele sunt invalide. Verificați și încercați din nou."
          : "Nu am putut trimite programarea. Verificați conexiunea și încercați din nou."
      );
    }
  };

  return (
    <section id="programare" className="relative px-5 py-20">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="section-eyebrow justify-center">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Programare online
          </p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Programează o întâlnire</h2>
          <p className="mt-3 text-white/75">
            Alege firma, ziua și ora — primești confirmarea pe email în câteva minute.
          </p>
        </motion.div>

        <div className="paper-card relative overflow-hidden p-7 sm:p-10">
          <AnimatePresence mode="wait">
            {phase === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="flex flex-col items-center py-10 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, -8, 8, 0] }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-amber-400 text-violet-950"
                >
                  <PartyPopper className="h-10 w-10" aria-hidden="true" />
                </motion.span>
                <h3 className="font-display text-2xl font-bold">Programare trimisă!</h3>
                <p className="mt-3 max-w-md text-ink/75">
                  Mulțumim, {form.nume}! Am înregistrat întâlnirea la {form.firma_destinatie} pe{" "}
                  {form.data} la ora {form.ora}. Confirmarea sosește pe email. Te așteptăm cu drag!
                </p>
                <button
                  type="button"
                  className="btn-cta mt-8"
                  onClick={() => {
                    setForm(EMPTY);
                    setPhase("idle");
                    document.getElementById("acasa")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  Înapoi la început
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" exit={{ opacity: 0, y: -12 }} onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="firma_destinatie" className="field-label">Programare pentru</label>
                  <SelectField
                    id="firma_destinatie"
                    placeholder="Alegeți firma"
                    options={FIRME}
                    value={form.firma_destinatie}
                    onChange={(v) => setForm((f) => ({ ...f, firma_destinatie: v }))}
                  />
                </div>

                <div>
                  <label htmlFor="nume" className="field-label">Nume</label>
                  <input id="nume" required placeholder="Numele dumneavoastră" value={form.nume} onChange={set("nume")} className="field-input" />
                </div>
                <div>
                  <label htmlFor="firma" className="field-label">Numele firmei</label>
                  <input id="firma" required placeholder="Firma dumneavoastră" value={form.firma} onChange={set("firma")} className="field-input" />
                </div>

                <div>
                  <label htmlFor="email" className="field-label">Email</label>
                  <input id="email" type="email" required placeholder="nume@exemplu.ro" value={form.email} onChange={set("email")} className="field-input" />
                </div>
                <div>
                  <label htmlFor="telefon" className="field-label">Telefon</label>
                  <input
                    id="telefon"
                    type="tel"
                    required
                    inputMode="numeric"
                    minLength={10}
                    placeholder="07xx xxx xxx"
                    value={form.telefon}
                    onChange={(e) => setForm((f) => ({ ...f, telefon: e.target.value.replace(/[^0-9]/g, "") }))}
                    className="field-input"
                  />
                </div>

                <div>
                  <label htmlFor="data" className="field-label">Data întâlnirii</label>
                  <DateField
                    id="data"
                    value={form.data}
                    onChange={async (data) => {
                      setForm((f) => ({ ...f, data }));
                      await checkSlot(data, form.ora);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="ora" className="field-label">Ora întâlnirii</label>
                  <SelectField
                    id="ora"
                    placeholder="Alegeți o oră"
                    options={ORE}
                    value={form.ora}
                    onChange={async (ora) => {
                      setForm((f) => ({ ...f, ora }));
                      await checkSlot(form.data, ora);
                    }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="mesaj" className="field-label">Mesaj suplimentar (opțional)</label>
                  <textarea
                    id="mesaj"
                    rows={4}
                    placeholder="Descrieți pe scurt activitatea dumneavoastră"
                    value={form.mesaj}
                    onChange={set("mesaj")}
                    className="field-input"
                  />
                </div>

                {error && (
                  <p role="alert" className="sm:col-span-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                  </p>
                )}

                <div className="sm:col-span-2">
                  <button type="submit" disabled={phase === "sending"} className="btn-cta w-full disabled:opacity-70">
                    {phase === "sending" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                        Se trimite…
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                        Trimite programarea
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-xs text-ink/55">
                    Program: luni – vineri, 09:00 – 17:00. Datele sunt folosite doar pentru confirmarea programării.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
