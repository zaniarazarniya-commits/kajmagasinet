"use client";

import { useId, useState, type FormEvent } from "react";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { useOpeningStatus, useTodayIso } from "@/components/ui/useOpeningStatus";
import { BOOKING_MAIL, CONTACT, HERO } from "@/lib/content";
import { SITE } from "@/lib/constants";
import { getHourRows } from "@/lib/hours";
import { cn } from "@/lib/utils";

export type OpeningHourOverride = { day: string; time: string };

/**
 * Boka bord & hitta hit.
 *
 * Formuläret skickar ingenting själv — det bygger ett mejl och öppnar gästens
 * e-postklient. `.formfoot` säger det rakt ut, och den texten måste stå kvar
 * tills en riktig bokningstjänst eller egen endpoint är på plats.
 */
export function BookingContact({
  openingHoursOverride,
}: {
  openingHoursOverride?: OpeningHourOverride[];
}) {
  const { t, lang } = useLanguage();
  const status = useOpeningStatus();
  const ids = useId();

  const today = useTodayIso();
  // Tomt värde betyder "inte valt än" — då gäller dagens datum.
  const [pickedDate, setPickedDate] = useState("");
  const date = pickedDate || today;
  const [time, setTime] = useState("18:00");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [requests, setRequests] = useState("");

  const hourRows = getHourRows(lang, status?.day ?? -1).map((row, i) => ({
    ...row,
    // Personalen kan ha skrivit avvikande tider i CMS:et; texten vinner,
    // men vilken rad som är "idag" räknas alltid ur lib/hours.ts.
    label: openingHoursOverride?.[i]?.day ?? row.label,
    time: openingHoursOverride?.[i]?.time ?? row.time,
  }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const l = BOOKING_MAIL.labels;
    const subject = `${t(BOOKING_MAIL.subject)} ${date} ${time} — ${guests} ${t(
      BOOKING_MAIL.guestsSuffix,
    )}`;
    const body = [
      t(BOOKING_MAIL.greeting),
      "",
      t(BOOKING_MAIL.intent),
      "",
      `${t(l.date)}: ${date}`,
      `${t(l.time)}: ${time}`,
      `${t(l.guests)}: ${guests}`,
      `${t(l.name)}: ${name}`,
      `${t(l.phone)}: ${phone}`,
      `${t(l.email)}: ${email || "—"}`,
      `${t(l.requests)}: ${requests || "—"}`,
      "",
      t(BOOKING_MAIL.thanks),
    ].join("\n");

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="contact section-y" id="kontakt">
      <div className="wrap">
        <Reveal className="sec-head" id="boka">
          <span className="kicker">{t(CONTACT.kicker)}</span>
          <h2>{t(CONTACT.heading)}</h2>
          <p className="lead dim">{t(CONTACT.lead)}</p>
        </Reveal>

        <div className="book-grid">
          <Reveal as="form" className="book" onSubmit={handleSubmit}>
            <h3>{t(CONTACT.formTitle)}</h3>
            <p className="fnote">{t(CONTACT.formNote)}</p>

            <div className="frow">
              <div className="f">
                <label htmlFor={`${ids}-date`}>
                  <Icon name="cal" />
                  <span>{t(CONTACT.date)}</span>
                </label>
                <input
                  id={`${ids}-date`}
                  type="date"
                  required
                  min={today || undefined}
                  value={date}
                  onChange={(e) => setPickedDate(e.target.value)}
                />
              </div>
              <div className="f">
                <label htmlFor={`${ids}-time`}>
                  <Icon name="clock" />
                  <span>{t(CONTACT.time)}</span>
                </label>
                <input
                  id={`${ids}-time`}
                  type="time"
                  step={900}
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="f">
              <label htmlFor={`${ids}-guests`}>
                <Icon name="people" />
                <span>{t(CONTACT.guests)}</span>
              </label>
              {/* 50 × 49 px träffyta — över 44 px-minimum för touch. */}
              <div className="guests">
                <button
                  type="button"
                  aria-label={t(CONTACT.fewerGuests)}
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                >
                  &minus;
                </button>
                <input
                  id={`${ids}-guests`}
                  type="number"
                  min={1}
                  max={40}
                  inputMode="numeric"
                  required
                  value={guests}
                  onChange={(e) =>
                    setGuests(Math.min(40, Math.max(1, Number(e.target.value) || 1)))
                  }
                />
                <button
                  type="button"
                  aria-label={t(CONTACT.moreGuests)}
                  onClick={() => setGuests((g) => Math.min(40, g + 1))}
                >
                  +
                </button>
              </div>
            </div>

            <div className="f">
              <label htmlFor={`${ids}-name`}>
                <Icon name="user" />
                <span>{t(CONTACT.name)}</span>
              </label>
              <input
                id={`${ids}-name`}
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="frow">
              <div className="f">
                <label htmlFor={`${ids}-phone`}>
                  <Icon name="phone" />
                  <span>{t(CONTACT.phone)}</span>
                </label>
                <input
                  id={`${ids}-phone`}
                  type="tel"
                  autoComplete="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="f">
                <label htmlFor={`${ids}-email`}>
                  <Icon name="mail" />
                  <span>{t(CONTACT.email)}</span>
                </label>
                <input
                  id={`${ids}-email`}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="f">
              <label htmlFor={`${ids}-requests`}>
                <Icon name="note" />
                <span>{t(CONTACT.requests)}</span>
              </label>
              <textarea
                id={`${ids}-requests`}
                placeholder={t(CONTACT.requestsPlaceholder)}
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-gold">
              <Icon name="mail" />
              <span>{t(CONTACT.submit)}</span>
            </button>

            <div className="formfoot">
              <Icon name="info" />
              <span>{t(CONTACT.formFoot)}</span>
            </div>

            {/* Sista minuten-bokningar hör inte hemma i ett mejlflöde. */}
            <div className="callnow">
              <Icon name="phone" />
              <div>
                <span>{t(CONTACT.callToday)}</span>
                <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="info-row">
              <div className="ic">
                <Icon name="pin" />
              </div>
              <div>
                <div className="lbl">{t(CONTACT.address)}</div>
                <span className="val">{SITE.address}</span>
              </div>
            </div>

            <div className="info-row">
              <div className="ic">
                <Icon name="mail" />
              </div>
              <div>
                <div className="lbl">{t(CONTACT.email)}</div>
                <a className="val" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </div>
            </div>

            <div className="info-row">
              <div className="ic">
                <Icon name="clock" />
              </div>
              <div style={{ flex: 1 }}>
                <div className="lbl">{t(CONTACT.openingHours)}</div>
                <div className="hours">
                  {hourRows.map((row) => (
                    <div
                      className={cn("h-row", row.today && "today")}
                      key={row.label}
                    >
                      <span>
                        {row.label}
                        {row.today && <span className="now">{t(HERO.today)}</span>}
                      </span>
                      <span>{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="map-card">
              <iframe
                title={t(CONTACT.mapTitle)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={SITE.mapEmbedUrl}
              />
              {/* Gästen ska inte behöva markera adressen själv. */}
              <a
                className="dirbtn"
                href={SITE.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(CONTACT.directionsAria)}
              >
                <Icon name="nav" />
                <span>{t(CONTACT.directions)}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
