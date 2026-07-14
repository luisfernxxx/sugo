import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CalendarHeart,
  Check,
  ChevronDown,
  CircleCheck,
  Gamepad2,
  GraduationCap,
  HandHeart,
  Heart,
  HeartHandshake,
  MessageCircle,
  MessagesSquare,
  MousePointer2,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { agencyFeatures, benefits, countries, familyFeatures, faqs, reasons, requirements, trainers } from "../data";
import { ActionButton, Eyebrow, Reveal, SectionHeading } from "./UI";
import anaImage from "../../assets/ana.webp";
import valeriaImage from "../../assets/valeria.webp";
import eliteTrainerImage from "../../assets/capacitadora-elite-dorada.png";
import teamImage from "../../assets/equipo.webp";
import agencyLogo from "../../assets/elite-dorada-logo.png";

const iconMap = {
  BadgeCheck,
  BookOpenCheck,
  CalendarHeart,
  Gamepad2,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  MessagesSquare,
  Radio,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
};

const imageMap = {
  "ana.webp": anaImage,
  "valeria.webp": valeriaImage,
  "capacitadora-elite-dorada.png": eliteTrainerImage,
};

function BrandWatermark({ className = "" }) {
  return (
    <img
      className={`brand-watermark ${className}`}
      src={agencyLogo}
      alt=""
      aria-hidden="true"
      draggable="false"
      width="608"
      height="720"
      loading="lazy"
      decoding="async"
    />
  );
}

const benefitDetails = [
  {
    label: "Aterrizaje guiado",
    outcome: "Llegas sabiendo qué hacer y cuál es tu siguiente paso.",
    signals: ["Registro claro", "Primer recorrido"],
  },
  {
    label: "Ritmo sostenible",
    outcome: "Aprendes con orden, sin sentir que tienes que dominarlo todo de inmediato.",
    signals: ["Explicaciones simples", "Avance a tu ritmo"],
  },
  {
    label: "Presencia activa",
    outcome: "Siempre encuentras una nueva oportunidad para participar y practicar.",
    signals: ["Agenda continua", "Experiencias en vivo"],
  },
  {
    label: "Confianza compartida",
    outcome: "Participas dentro de acuerdos claros que cuidan a toda la comunidad.",
    signals: ["Normas visibles", "Espacio cuidado"],
  },
  {
    label: "Crecimiento en red",
    outcome: "Cada logro se vuelve más fácil de sostener cuando avanzas acompañada.",
    signals: ["Apoyo cercano", "Logros compartidos"],
  },
];

const trainerDetails = [
  {
    promise: "Tus primeros pasos, sin sentirte perdida.",
    quote: "Primero entendemos dónde estás; después construimos una ruta sencilla para comenzar.",
    skills: ["Registro guiado", "Configuración", "Primer recorrido"],
  },
  {
    promise: "Participar con naturalidad también se aprende.",
    quote: "Te muestro cómo entrar, conversar y disfrutar cada dinámica con confianza.",
    skills: ["Salas en vivo", "Eventos", "Dinámicas"],
  },
  {
    promise: "Una ruta clara para que no pierdas el impulso.",
    quote: "Estoy para resolver lo que aparezca y ayudarte a reconocer cada avance.",
    skills: ["Seguimiento", "Resolución de dudas", "Progreso"],
  },
];

const requirementIcons = [BadgeCheck, Radio, UserRoundCheck, GraduationCap, ShieldCheck, UsersRound];

const reasonDetails = [
  {
    eyebrow: "Guía humana",
    outcome: "Nunca tienes que descubrir cada paso por tu cuenta.",
    highlights: ["Ingreso guiado", "Primeras experiencias"],
  },
  {
    eyebrow: "Red de apoyo",
    outcome: "Participas dentro de un equipo que comparte acuerdos y objetivos.",
    highlights: ["Organización", "Convivencia respetuosa"],
  },
  {
    eyebrow: "Progreso sostenible",
    outcome: "Construyes seguridad y nuevas habilidades sin avanzar bajo presión.",
    highlights: ["Aprendizaje gradual", "Seguimiento continuo"],
  },
];

const platformTracks = [
  {
    id: "agency",
    number: "01",
    label: "Agencia",
    shortTitle: "Dirección",
    eyebrow: "Tu guía dentro de la plataforma",
    title: "Dirección y respaldo",
    text: "El conocimiento, la estructura y el seguimiento que necesitas para comenzar con confianza.",
    icon: Building2,
    items: agencyFeatures,
    promises: ["Ruta organizada", "Orientación práctica", "Soporte humano"],
  },
  {
    id: "family",
    number: "02",
    label: "Familia",
    shortTitle: "Comunidad",
    eyebrow: "Tu espacio para pertenecer",
    title: "Conexión y comunidad",
    text: "Un entorno dinámico para compartir, participar y avanzar junto a otras integrantes.",
    icon: HeartHandshake,
    items: familyFeatures,
    promises: ["Conexiones reales", "Actividades compartidas", "Apoyo respetuoso"],
  },
];

const platformFeatureMeta = {
  capacitacion: { kicker: "Aprendizaje guiado", signal: "Desde cero", points: ["Funciones esenciales", "Práctica progresiva"] },
  acompanamiento: { kicker: "Soporte humano", signal: "Siempre cerca", points: ["Dudas resueltas", "Seguimiento real"] },
  organizacion: { kicker: "Proceso confiable", signal: "Ruta clara", points: ["Reglas simples", "Comunicación constante"] },
  salas: { kicker: "Participación activa", signal: "En vivo", points: ["Encuentros internos", "Nuevas conexiones"] },
  juegos: { kicker: "Integración del equipo", signal: "Experiencias", points: ["Retos compartidos", "Dinámicas internas"] },
  apoyo: { kicker: "Comunidad presente", signal: "Juntas", points: ["Respeto mutuo", "Motivación cercana"] },
};

const platformJourney = [
  [Sparkles, "01", "Descubre", "Conoce la plataforma"],
  [BookOpenCheck, "02", "Aprende", "Avanza paso a paso"],
  [HeartHandshake, "03", "Conecta", "Intégrate a la familia"],
  [TrendingUp, "04", "Avanza", "Crece con seguimiento"],
];

function PlatformExperience({ activeTrack, setActiveTrack, openInfo }) {
  const [activeFeature, setActiveFeature] = useState(0);
  const consoleRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const trackIndex = platformTracks.findIndex((item) => item.id === activeTrack);
  const track = platformTracks[trackIndex];
  const TrackIcon = track.icon;
  const feature = track.items[activeFeature];
  const FeatureIcon = iconMap[feature.icon];
  const meta = platformFeatureMeta[feature.modal];

  const selectTrack = (index) => {
    setActiveTrack(platformTracks[index].id);
    setActiveFeature(0);
  };

  const handleTrackKey = (event, index) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home"
      ? 0
      : event.key === "End"
        ? platformTracks.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + platformTracks.length) % platformTracks.length;
    selectTrack(next);
    window.requestAnimationFrame(() => document.getElementById(`platform-track-${platformTracks[next].id}`)?.focus());
  };

  const handleFeatureKey = (event, index) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const next = event.key === "Home"
      ? 0
      : event.key === "End"
        ? track.items.length - 1
        : (index + (forward ? 1 : -1) + track.items.length) % track.items.length;
    setActiveFeature(next);
    window.requestAnimationFrame(() => document.getElementById(`platform-feature-${track.id}-${next}`)?.focus());
  };

  const updatePointer = (event) => {
    if (reduceMotion || event.pointerType === "touch" || !consoleRef.current) return;
    const rect = consoleRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    consoleRef.current.style.setProperty("--pointer-x", `${x * 100}%`);
    consoleRef.current.style.setProperty("--pointer-y", `${y * 100}%`);
    consoleRef.current.style.setProperty("--tilt-x", `${(0.5 - y) * 2.2}deg`);
    consoleRef.current.style.setProperty("--tilt-y", `${(x - 0.5) * 2.2}deg`);
  };

  const resetPointer = () => {
    if (!consoleRef.current) return;
    consoleRef.current.style.setProperty("--pointer-x", "50%");
    consoleRef.current.style.setProperty("--pointer-y", "35%");
    consoleRef.current.style.setProperty("--tilt-x", "0deg");
    consoleRef.current.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <Reveal className="platform-console-reveal">
      <div
        ref={consoleRef}
        className={`platform-experience-console is-${track.id}`}
        onPointerMove={updatePointer}
        onPointerLeave={resetPointer}
      >
        <div className="platform-console-glow" aria-hidden="true" />
        <div className="platform-console-grid" aria-hidden="true" />

        <div className="platform-console-toolbar">
          <div className="platform-console-label"><span><MousePointer2 /></span><div><small>EXPERIENCIA INTERACTIVA</small><strong>Explora tu acompañamiento</strong></div></div>

          <div className="platform-track-tabs" role="tablist" aria-label="Explorar agencia y familia">
            {platformTracks.map((item, index) => {
              const TrackIcon = item.icon;
              const selected = item.id === track.id;
              return (
                <button
                  id={`platform-track-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`platform-track-panel-${item.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTrack(index)}
                  onKeyDown={(event) => handleTrackKey(event, index)}
                  key={item.id}
                >
                  {selected && <motion.i className="platform-track-active" layoutId="platform-track-active" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span><TrackIcon /></span><div><small>{item.number} · {item.label}</small><strong>{item.shortTitle}</strong></div>
                </button>
              );
            })}
          </div>

          <div className="platform-console-status"><i /><span>Interactivo</span></div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            id={`platform-track-panel-${track.id}`}
            className="platform-console-body"
            role="tabpanel"
            aria-labelledby={`platform-track-${track.id}`}
            key={track.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, pointerEvents: "none" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <section className="platform-track-summary">
              <span className="platform-track-number">{track.number}</span>
              <motion.span className="platform-track-icon" initial={{ scale: 0.82, rotate: -8 }} animate={{ scale: 1, rotate: 0 }}><TrackIcon /></motion.span>
              <small>{track.eyebrow}</small>
              <h3>{track.title}</h3>
              <p>{track.text}</p>
              <div className="platform-track-promises">{track.promises.map((promise) => <span key={promise}><CircleCheck />{promise}</span>)}</div>
            </section>

            <div className="platform-feature-rail" role="tablist" aria-label={`Opciones de ${track.label}`} aria-orientation="vertical">
              <div className="platform-feature-rail-title"><span>ELIGE UNA RUTA</span><small>{String(activeFeature + 1).padStart(2, "0")} / 03</small></div>
              {track.items.map((item, index) => {
                const ItemIcon = iconMap[item.icon];
                const selected = index === activeFeature;
                return (
                  <button
                    id={`platform-feature-${track.id}-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`platform-feature-panel-${track.id}-${index}`}
                    tabIndex={selected ? 0 : -1}
                    className={selected ? "active" : ""}
                    onClick={() => setActiveFeature(index)}
                    onFocus={() => setActiveFeature(index)}
                    onPointerEnter={(event) => event.pointerType === "mouse" && setActiveFeature(index)}
                    onKeyDown={(event) => handleFeatureKey(event, index)}
                    key={item.title}
                  >
                    {selected && <motion.i className="platform-feature-active" layoutId={`platform-feature-active-${track.id}`} />}
                    <span className="platform-feature-number">{item.number}</span>
                    <span className="platform-feature-icon"><ItemIcon /></span>
                    <span className="platform-feature-name"><small>{platformFeatureMeta[item.modal].signal}</small><strong>{item.title}</strong></span>
                    <ArrowRight />
                  </button>
                );
              })}
            </div>

            <div className="platform-feature-stage-tilt">
              <AnimatePresence initial={false}>
                <motion.article
                  id={`platform-feature-panel-${track.id}-${activeFeature}`}
                  className="platform-feature-stage"
                  role="tabpanel"
                  aria-labelledby={`platform-feature-${track.id}-${activeFeature}`}
                  key={`${track.id}-${feature.modal}`}
                  initial={{ opacity: 0, x: 22, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -18, scale: 0.985 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="platform-stage-top"><span><i /> DETALLE ACTIVO</span><small>{feature.number} / 03</small></div>
                  <div className="platform-stage-symbol"><i /><i /><motion.span initial={{ rotate: -10, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}><FeatureIcon /></motion.span></div>
                  <div className="platform-stage-copy">
                    <small>{track.label} · {meta.kicker}</small>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                    <ul>{meta.points.map((point) => <li key={point}><CircleCheck />{point}</li>)}</ul>
                    <button type="button" onClick={() => openInfo(feature.modal)} aria-label={`Explorar ${feature.title}`}>Explorar esta opción <ArrowUpRight /></button>
                  </div>
                  <div className="platform-stage-progress"><span style={{ width: `${((activeFeature + 1) / track.items.length) * 100}%` }} /></div>
                </motion.article>
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="platform-console-journey">
          <div className="platform-journey-heading"><small>UNA RUTA COMPLETA</small><strong>De descubrir a avanzar, siempre acompañada.</strong></div>
          <div className="platform-journey-steps">
            <div className="platform-journey-line" aria-hidden="true"><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} /></div>
            <ol>
              {platformJourney.map(([Icon, number, title, text], index) => (
                <motion.li initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + index * 0.09 }} key={number}>
                  <span><Icon /></span><div><small>{number}</small><strong>{title}</strong><p>{text}</p></div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function PlatformSection({ openInfo }) {
  const [activeTrack, setActiveTrack] = useState("agency");

  return (
    <section className="platform-react" id="beneficios" aria-labelledby="platform-title">
      <div className="platform-ambient ambient-left" /><div className="platform-ambient ambient-right" />
      <BrandWatermark className="brand-watermark-platform is-light" />
      <div className="wrap">
        <div className="platform-intro-react">
          <Reveal className="platform-intro-copy">
            <Eyebrow>Una experiencia con dirección</Eyebrow>
            <h2 id="platform-title"><span>Más que entrar a una app.</span><strong>Es saber cómo avanzar.</strong></h2>
            <p>SUGO te conecta con nuevas experiencias. Élite Dorada añade la estructura, la orientación y la comunidad que transforman ese primer paso en una ruta clara.</p>
            <button className="editorial-link" type="button" onClick={() => openInfo("sugo")}>Entender cómo funciona <ArrowRight /></button>
          </Reveal>

          <Reveal className="platform-manifesto-card" delay={0.1}>
            <div className="platform-manifesto-head"><span>18+</span><div><small>COMUNIDAD PARA MUJERES</small><strong>Un espacio adulto, organizado y acompañado.</strong></div><i /></div>
            <div className="platform-manifesto-flow">
              <motion.div whileHover={{ y: -4 }}><span><Building2 /></span><div><small>AGENCIA</small><strong>Te orienta</strong></div></motion.div>
              <ArrowRight />
              <motion.div whileHover={{ y: -4 }}><span><HeartHandshake /></span><div><small>FAMILIA</small><strong>Te conecta</strong></div></motion.div>
            </div>
            <p><Sparkles /> Dos formas de acompañarte. Una sola experiencia para avanzar.</p>
          </Reveal>
        </div>

        <PlatformExperience activeTrack={activeTrack} setActiveTrack={setActiveTrack} openInfo={openInfo} />
      </div>
    </section>
  );
}

export function BenefitsSection() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const ActiveIcon = iconMap[benefits[active].icon];
  const activeDetail = benefitDetails[active];

  const handleBenefitKey = (event, index) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const next = event.key === "Home"
      ? 0
      : event.key === "End"
        ? benefits.length - 1
        : (index + (forward ? 1 : -1) + benefits.length) % benefits.length;
    setActive(next);
    window.requestAnimationFrame(() => document.getElementById(`benefit-tab-${next}`)?.focus());
  };

  const handleBenefitPointer = (event) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--benefit-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--benefit-y", `${y * 100}%`);
    event.currentTarget.style.setProperty("--benefit-rotate-x", `${(0.5 - y) * 1.5}deg`);
    event.currentTarget.style.setProperty("--benefit-rotate-y", `${(x - 0.5) * 1.5}deg`);
  };

  const resetBenefitPointer = (event) => {
    event.currentTarget.style.setProperty("--benefit-rotate-x", "0deg");
    event.currentTarget.style.setProperty("--benefit-rotate-y", "0deg");
  };

  return (
    <section className="benefits-react benefits-experience" id="beneficios-comunidad" aria-labelledby="benefits-experience-title">
      <div className="benefits-word" aria-hidden="true">BENEFICIOS</div>
      <div className="benefit-orb benefit-orb-a" aria-hidden="true" />
      <div className="benefit-orb benefit-orb-b" aria-hidden="true" />
      <BrandWatermark className="brand-watermark-benefits is-dark" />

      <div className="wrap">
        <div className="benefits-heading-v2">
          <Reveal className="benefits-heading-copy">
            <Eyebrow light>Lo que cambia cuando no avanzas sola</Eyebrow>
            <h2 id="benefits-experience-title">Una comunidad que convierte cada etapa en <span>impulso.</span></h2>
            <p>No son beneficios aislados. Es una ruta de apoyo que comienza contigo y crece a medida que participas.</p>
          </Reveal>
          <Reveal className="benefits-signal-card" delay={0.08}>
            <span>05</span>
            <div><small>CAPAS DE ACOMPAÑAMIENTO</small><strong>Una experiencia conectada de principio a fin.</strong></div>
            <i><Sparkles /></i>
          </Reveal>
        </div>

        <Reveal className="benefit-command-react" delay={0.08}>
          <div className="benefit-command-surface" onPointerMove={handleBenefitPointer} onPointerLeave={resetBenefitPointer}>
            <div className="benefit-command-glow" aria-hidden="true" />
            <header className="benefit-command-toolbar">
              <span className="benefit-live"><i /> RECORRIDO ACTIVO</span>
              <span className="benefit-command-hint"><MousePointer2 /> Elige una etapa para explorarla</span>
              <strong>{String(active + 1).padStart(2, "0")} <small>/ {String(benefits.length).padStart(2, "0")}</small></strong>
            </header>

            <div className="benefit-command-body">
              <div className="benefit-selector-v2" role="tablist" aria-label="Beneficios de la comunidad">
                <span className="benefit-selector-label">TU RUTA DE APOYO</span>
                {benefits.map((benefit, index) => {
                  const Icon = iconMap[benefit.icon];
                  const selected = active === index;
                  return (
                    <button
                      id={`benefit-tab-${index}`}
                      type="button"
                      role="tab"
                      aria-controls="benefit-panel-active"
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      className={selected ? "active" : ""}
                      onClick={() => setActive(index)}
                      onPointerEnter={(event) => event.pointerType === "mouse" && setActive(index)}
                      onKeyDown={(event) => handleBenefitKey(event, index)}
                      key={benefit.title}
                    >
                      {selected && <motion.i className="benefit-selector-active" layoutId="benefit-selector-active" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      <span><Icon /></span>
                      <div><strong>{benefit.title}</strong><small>{benefitDetails[index].label}</small></div>
                      <ArrowRight />
                    </button>
                  );
                })}
              </div>

              <div className="benefit-stage-tilt">
                  <motion.article
                    id="benefit-panel-active"
                    role="tabpanel"
                    aria-labelledby={`benefit-tab-${active}`}
                    tabIndex={0}
                    className="benefit-stage-v2"
                    key={active}
                    initial={{ opacity: 0, x: 24, scale: 0.985 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="benefit-stage-number" aria-hidden="true">{String(active + 1).padStart(2, "0")}</span>
                    <div className="benefit-stage-top">
                      <motion.span className="benefit-stage-icon" initial={{ rotate: -8, scale: 0.85 }} animate={{ rotate: 0, scale: 1 }}><ActiveIcon /></motion.span>
                      <span className="benefit-stage-status"><i /> APOYO DISPONIBLE</span>
                    </div>
                    <div className="benefit-stage-copy-v2">
                      <small>ETAPA {String(active + 1).padStart(2, "0")} · {activeDetail.label}</small>
                      <h3>{benefits[active].title}</h3>
                      <p>{benefits[active].text}</p>
                    </div>
                    <div className="benefit-stage-signals">
                      {activeDetail.signals.map((signal) => <span key={signal}><CircleCheck />{signal}</span>)}
                    </div>
                    <div className="benefit-outcome">
                      <BadgeCheck />
                      <div><small>LO QUE CAMBIA PARA TI</small><strong>{activeDetail.outcome}</strong></div>
                    </div>
                    <button className="benefit-team-link" type="button" onClick={() => document.getElementById("capacitadoras")?.scrollIntoView({ behavior: "smooth" })}>Conocer quién te acompaña <ArrowUpRight /></button>
                  </motion.article>
              </div>
            </div>

            <div className="benefit-route-v2" aria-label="Progreso por las cinco etapas">
              <div className="benefit-route-line"><motion.i animate={{ width: `${((active + 1) / benefits.length) * 100}%` }} transition={{ duration: reduceMotion ? 0 : 0.42 }} /></div>
              {benefitDetails.map((detail, index) => (
                <button className={index === active ? "active" : index < active ? "complete" : ""} type="button" onClick={() => setActive(index)} aria-label={`Ver ${benefits[index].title}`} key={detail.label}>
                  <i>{index < active ? <Check /> : String(index + 1).padStart(2, "0")}</i>
                  <span><small>ETAPA {String(index + 1).padStart(2, "0")}</small><strong>{detail.label}</strong></span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function TrainersSection({ openJoin, openTrainer }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const trainer = trainers[active];
  const detail = trainerDetails[active];

  const handleTrainerKey = (event, index) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const next = event.key === "Home"
      ? 0
      : event.key === "End"
        ? trainers.length - 1
        : (index + (forward ? 1 : -1) + trainers.length) % trainers.length;
    setActive(next);
    window.requestAnimationFrame(() => document.getElementById(`trainer-tab-${next}`)?.focus());
  };

  const handleTrainerPointer = (event) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--trainer-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--trainer-y", `${y * 100}%`);
  };

  return (
    <section className="trainers-react trainers-experience" id="capacitadoras" aria-labelledby="trainers-title">
      <div className="trainer-ambient trainer-ambient-a" aria-hidden="true" />
      <div className="trainer-ambient trainer-ambient-b" aria-hidden="true" />
      <BrandWatermark className="brand-watermark-trainers is-light" />
      <div className="wrap">
        <div className="trainers-heading-row-v2">
          <Reveal className="trainers-heading-copy-v2">
            <Eyebrow>Liderazgo que acompaña</Eyebrow>
            <h2 id="trainers-title">Personas reales detrás de <span>cada avance.</span></h2>
            <p>No hablas con un sistema automático. Conoces a la persona que puede orientarte según el momento de tu proceso.</p>
          </Reveal>
          <Reveal className="trainer-heading-note-v2" delay={0.08}>
            <span>{String(trainers.length).padStart(2, "0")}</span>
            <div><small>PERFILES ESPECIALIZADOS</small><strong>Un mismo compromiso contigo.</strong></div>
            <i><UsersRound /></i>
          </Reveal>
        </div>

        <Reveal className="trainer-studio-wrap" delay={0.08}>
          <div className={`trainer-studio-v2 trainer-accent-${trainer.accent}`} onPointerMove={handleTrainerPointer}>
            <div className="trainer-studio-glow" aria-hidden="true" />
            <header className="trainer-studio-toolbar">
              <span><i /> EQUIPO CONECTADO</span>
              <div><strong>Estudio de acompañamiento</strong><small>ÉLITE DORADA · SUGO</small></div>
              <span>PERFIL {String(active + 1).padStart(2, "0")} / {String(trainers.length).padStart(2, "0")}</span>
            </header>

            <div className="trainer-studio-main">
              <div className="trainer-portrait-stage-v2">
                <div className="trainer-portrait-grid" aria-hidden="true" />
                <AnimatePresence initial={false}>
                  <motion.div className={`trainer-portrait-v2 ${trainer.imageKind === "cutout" ? "is-cutout" : ""}`} key={trainer.name} initial={{ opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.018 }} transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}>
                    <img src={imageMap[trainer.image]} alt={`Retrato de la capacitadora ${trainer.name}`} width={trainer.imageWidth || 700} height={trainer.imageHeight || 720} loading="lazy" decoding="async" />
                  </motion.div>
                </AnimatePresence>
                <span className="trainer-portrait-number">{String(active + 1).padStart(2, "0")}</span>
                <span className="trainer-portrait-availability"><i /> PERFIL ACTIVO</span>
                <div className="trainer-portrait-caption"><small>ÁREA PRINCIPAL</small><strong>{trainer.role}</strong></div>
              </div>

              <div className="trainer-profile-console">
                <div className="trainer-tabs-v2" role="tablist" aria-label="Seleccionar capacitadora">
                  {trainers.map((item, index) => {
                    const selected = active === index;
                    return (
                      <button id={`trainer-tab-${index}`} type="button" role="tab" aria-selected={selected} aria-controls="trainer-panel-active" tabIndex={selected ? 0 : -1} className={selected ? "active" : ""} onClick={() => setActive(index)} onKeyDown={(event) => handleTrainerKey(event, index)} key={item.name}>
                        {selected && <motion.i className="trainer-tab-active" layoutId="trainer-tab-active" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                        <img className={item.imageKind === "cutout" ? "is-cutout" : ""} src={imageMap[item.image]} alt="" width={item.imageWidth || 52} height={item.imageHeight || 52} loading="lazy" decoding="async" />
                        <span><small>{String(index + 1).padStart(2, "0")} · {item.role}</small><strong>{item.name}</strong></span>
                        <ArrowRight />
                      </button>
                    );
                  })}
                </div>

                <motion.article id="trainer-panel-active" role="tabpanel" aria-labelledby={`trainer-tab-${active}`} tabIndex={0} className="trainer-profile-v2" key={trainer.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}>
                  <small>{trainer.role} · PERFIL {String(active + 1).padStart(2, "0")}</small>
                  <h3>{detail.promise}</h3>
                  <p>{trainer.text}</p>
                  <blockquote><Sparkles /><span>“{detail.quote}”</span></blockquote>
                  <div className="trainer-skills-v2">{detail.skills.map((skill) => <span key={skill}><CircleCheck />{skill}</span>)}</div>
                  <div className="trainer-actions-v2">
                    <motion.button type="button" onClick={() => openJoin(trainer.name)} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>Elegir a {trainer.name} <ArrowRight /></motion.button>
                    <button type="button" onClick={() => openTrainer(trainer)}>Conocer su función <ArrowUpRight /></button>
                  </div>
                </motion.article>
              </div>
            </div>

            <footer className="trainer-studio-footer">
              {[
                [MessageCircle, "Respuesta humana", "Dudas atendidas con claridad"],
                [TrendingUp, "Ruta progresiva", "Pasos acordes a tu momento"],
                [HeartHandshake, "Apoyo continuo", "Acompañamiento que permanece"],
              ].map(([Icon, title, text], index) => (
                <div key={title}><span><Icon /></span><div><small>0{index + 1}</small><strong>{title}</strong><p>{text}</p></div></div>
              ))}
            </footer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function RequirementsSection({ notify, openJoin }) {
  const [checked, setChecked] = useState([]);
  const [activeReason, setActiveReason] = useState(0);
  const reduceMotion = useReducedMotion();
  const wasComplete = useRef(false);
  const progress = requirements.length ? (checked.length / requirements.length) * 100 : 0;
  const isComplete = requirements.length > 0 && checked.length === requirements.length;
  const ActiveReasonIcon = iconMap[reasons[activeReason].icon];
  const activeReasonDetail = reasonDetails[activeReason];

  const toggleRequirement = (index) => {
    setChecked((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);
  };

  useEffect(() => {
    if (isComplete && !wasComplete.current) notify("¡Excelente! Revisaste todos los puntos principales.");
    wasComplete.current = isComplete;
  }, [isComplete, notify]);

  const handleReasonKey = (event, index) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const next = event.key === "Home"
      ? 0
      : event.key === "End"
        ? reasons.length - 1
        : (index + (forward ? 1 : -1) + reasons.length) % reasons.length;
    setActiveReason(next);
    window.requestAnimationFrame(() => document.getElementById(`reason-tab-${next}`)?.focus());
  };

  const handleRequirementsPointer = (event) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--requirements-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    event.currentTarget.style.setProperty("--requirements-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  };

  const profileQualities = [
    [Heart, "18+", "Mayor de edad"],
    [BookOpenCheck, "Aprender", "Actitud abierta"],
    [ShieldCheck, "Responsable", "Compromiso personal"],
    [HeartHandshake, "Respeto", "Convivencia sana"],
  ];

  const progressMessage = isComplete
    ? "Revisaste todos los puntos. Ya puedes conversar con la agencia."
    : checked.length
      ? `Has revisado ${checked.length} de ${requirements.length} puntos esenciales.`
      : "Marca cada punto que ya tienes preparado.";

  return (
    <section className="requirements-react requirements-experience" id="requisitos" aria-labelledby="requirements-title">
      <div className="requirements-ambient requirements-ambient-a" aria-hidden="true" />
      <div className="requirements-ambient requirements-ambient-b" aria-hidden="true" />
      <BrandWatermark className="brand-watermark-requirements is-light" />
      <div className="wrap">
        <div className="requirements-heading-v2">
          <Reveal className="requirements-heading-copy-v2">
            <Eyebrow>Antes de comenzar · Paso 03</Eyebrow>
            <h2 id="requirements-title">Tu punto de partida, claro desde el <span>primer vistazo.</span></h2>
            <p>Revisa los puntos esenciales y descubre el acompañamiento disponible antes de iniciar. No necesitas experiencia previa.</p>
          </Reveal>
          <Reveal className="requirements-summary-v2" delay={0.08}>
            <div className="requirements-summary-ring" style={{ "--requirements-progress": `${progress * 3.6}deg` }} aria-hidden="true"><span>{checked.length}<small>/{requirements.length}</small></span></div>
            <div><small>PUNTOS REVISADOS</small><strong>{isComplete ? "Tu preparación está completa." : "Avanza a tu propio ritmo."}</strong><span><i /> Sin experiencia previa</span></div>
            <Sparkles />
          </Reveal>
        </div>

        <Reveal className="requirements-console-wrap" delay={0.08}>
          <div className={`requirements-console-v2 ${isComplete ? "is-complete" : ""}`} onPointerMove={handleRequirementsPointer}>
            <div className="requirements-console-glow" aria-hidden="true" />
            <header className="requirements-toolbar-v2">
              <span><i /> AUTODIAGNÓSTICO PRIVADO</span>
              <div><strong>Centro de preparación</strong><small>ÉLITE DORADA · INGRESO</small></div>
              <button type="button" onClick={() => setChecked([])} disabled={!checked.length}>Reiniciar <span>{String(checked.length).padStart(2, "0")}/{String(requirements.length).padStart(2, "0")}</span></button>
            </header>

            <div className="requirements-grid-v2">
              <section className="requirements-checklist-v2" aria-labelledby="requirements-checklist-title">
                <div className="requirements-card-top-v2">
                  <span><small>01</small><b>LISTA PRINCIPAL</b></span>
                  <div className="requirements-progress-ring" style={{ "--requirements-progress": `${progress * 3.6}deg` }}><strong>{Math.round(progress)}%</strong></div>
                </div>
                <h3 id="requirements-checklist-title">Comprueba tu preparación</h3>
                <p>Selecciona únicamente los puntos que ya tienes listos. Esta revisión es orientativa.</p>
                <div className="requirements-check-grid">
                  {requirements.map((item, index) => {
                    const Icon = requirementIcons[index];
                    const selected = checked.includes(index);
                    return (
                      <label className={selected ? "checked" : ""} key={item}>
                        <input type="checkbox" checked={selected} onChange={() => toggleRequirement(index)} />
                        <span className="requirement-checkmark">{selected && <motion.span initial={{ scale: reduceMotion ? 1 : 0.72, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}><Check /></motion.span>}</span>
                        <span className="requirement-check-icon"><Icon /></span>
                        <span><small>PUNTO {String(index + 1).padStart(2, "0")}</small><strong>{item}</strong></span>
                      </label>
                    );
                  })}
                </div>
                <div className="requirements-progress-v2">
                  <div role="progressbar" aria-label="Progreso de requisitos" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)} aria-valuetext={`${checked.length} de ${requirements.length} puntos revisados`}><motion.i animate={{ scaleX: progress / 100 }} transition={{ duration: reduceMotion ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }} /></div>
                  <span><b>{checked.length} de {requirements.length}</b> puntos revisados</span>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div className={`requirements-state-v2 ${isComplete ? "complete" : ""}`} role="status" aria-live="polite" key={isComplete ? "complete" : checked.length ? "progress" : "empty"} initial={{ opacity: 0, y: reduceMotion ? 0 : 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <span>{isComplete ? <BadgeCheck /> : <TrendingUp />}</span><div><small>{isComplete ? "REVISIÓN COMPLETA" : "TU AVANCE"}</small><strong>{progressMessage}</strong></div>
                  </motion.div>
                </AnimatePresence>
                <button className="requirements-contact-v2" type="button" onClick={() => openJoin()}>Hablar con la agencia <ArrowRight /></button>
              </section>

              <section className="requirements-profile-v2" aria-labelledby="requirements-profile-title">
                <div className="requirements-card-top-v2"><span><small>02</small><b>PERFIL DE INGRESO</b></span><UserRoundCheck /></div>
                <h3 id="requirements-profile-title">Lo importante no está en tu experiencia.</h3>
                <p>Buscamos disposición, responsabilidad y una forma respetuosa de crecer con otras personas.</p>
                <div className="requirements-qualities-v2">
                  {profileQualities.map(([Icon, title, text]) => <div key={title}><span><Icon /></span><div><strong>{title}</strong><small>{text}</small></div></div>)}
                </div>
                <div className="requirements-no-experience"><span><GraduationCap /></span><div><small>NO ES UN REQUISITO</small><strong>Tener experiencia previa</strong></div><BadgeCheck /></div>
              </section>

              <section className="requirements-reasons-v2" aria-labelledby="requirements-reasons-title">
                <div className="requirements-card-top-v2"><span><small>03</small><b>NUESTRA DIFERENCIA</b></span><HeartHandshake /></div>
                <h3 id="requirements-reasons-title">Lo que encuentras al ingresar</h3>
                <div className="requirements-reason-tabs" role="tablist" aria-label="Razones para elegir Élite Dorada">
                  {reasons.map((reason, index) => {
                    const Icon = iconMap[reason.icon];
                    const selected = activeReason === index;
                    return <button id={`reason-tab-${index}`} type="button" role="tab" aria-selected={selected} aria-controls="reason-panel-active" tabIndex={selected ? 0 : -1} className={selected ? "active" : ""} onClick={() => setActiveReason(index)} onKeyDown={(event) => handleReasonKey(event, index)} key={reason.title}>{selected && <motion.i layoutId="requirement-reason-active" className="requirement-reason-active" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}<span><Icon /></span><small>0{index + 1}</small></button>;
                  })}
                </div>
                <motion.article id="reason-panel-active" role="tabpanel" aria-labelledby={`reason-tab-${activeReason}`} tabIndex={0} className="requirements-reason-panel" key={activeReason} initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.28 }}>
                  <span className="requirements-reason-icon"><ActiveReasonIcon /></span>
                  <small>{activeReasonDetail.eyebrow} · 0{activeReason + 1}</small>
                  <h4>{reasons[activeReason].title}</h4>
                  <p>{reasons[activeReason].text}</p>
                  <div className="requirements-reason-highlights">{activeReasonDetail.highlights.map((item) => <span key={item}><CircleCheck />{item}</span>)}</div>
                  <div className="requirements-reason-outcome"><BadgeCheck /><div><small>LO QUE SIGNIFICA PARA TI</small><strong>{activeReasonDetail.outcome}</strong></div></div>
                </motion.article>
              </section>
            </div>

            <footer className="requirements-footer-v2">
              <span><ShieldCheck /> Autoevaluación orientativa</span>
              <p>No enviamos ni guardamos tus selecciones. Esta lista solo te ayuda a conocer el punto de partida.</p>
              <div><i className={checked.length > 0 ? "active" : ""}>01</i><span /><i className={isComplete ? "active" : ""}>02</i><span /><i className={activeReason >= 0 ? "active" : ""}>03</i></div>
            </footer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FAQSection({ openJoin }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="faq-react" id="preguntas">
      <BrandWatermark className="brand-watermark-faq is-dark" />
      <div className="wrap faq-layout-react">
        <div className="faq-intro-react">
          <SectionHeading light eyebrow="Preguntas frecuentes" title="Claridad antes de dar el primer paso." text="Lo importante es que tomes una decisión informada y con expectativas reales." />
          <ActionButton variant="light" onClick={() => openJoin()}>Hablar con la agencia</ActionButton>
          <div className="faq-decoration"><MessageCircle /><span>¿Tienes otra pregunta?</span></div>
        </div>
        <Reveal className="faq-list-react">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article className={isOpen ? "open" : ""} key={faq.question}>
                <button id={`faq-button-${index}`} type="button" aria-expanded={isOpen} aria-controls={`faq-panel-${index}`} onClick={() => setOpenIndex(isOpen ? -1 : index)}><span>0{index + 1}</span><strong>{faq.question}</strong><motion.i animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown /></motion.i></button>
                <AnimatePresence initial={false}>{isOpen && <motion.div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-button-${index}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{faq.answer}</p></motion.div>}</AnimatePresence>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

const initialForm = { name: "", age: "", country: "", phone: "", experience: "Sin experiencia", trainer: "Cualquiera", message: "", consent: false };

export function JoinSection({ preferredTrainer, trainerSelectionKey, submitForm, notify }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const fieldRefs = useRef({});

  const selectedTrainer = form.trainer;
  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };
  const captureField = (field) => (node) => { fieldRefs.current[field] = node; };

  useEffect(() => {
    setForm((current) => ({ ...current, trainer: preferredTrainer || "Cualquiera" }));
  }, [preferredTrainer, trainerSelectionKey]);

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = "Escribe al menos dos caracteres.";
    const age = Number(form.age);
    if (!age || age < 18 || age > 99) next.age = "Debes tener entre 18 y 99 años.";
    if (!form.country) next.country = "Selecciona tu país.";
    if (form.phone.replace(/\D/g, "").length < 8) next.phone = "Escribe un número válido.";
    if (!form.consent) next.consent = "Debes confirmar que eres mayor de edad.";
    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) window.requestAnimationFrame(() => fieldRefs.current[firstInvalid]?.focus());
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      notify("Revisa los campos marcados antes de continuar.");
      return;
    }
    submitForm({ ...form, trainer: selectedTrainer });
  };

  const clear = () => { setForm(initialForm); setErrors({}); notify("Formulario limpiado."); };

  return (
    <section className="join-react" id="unete">
      <div className="join-glow" />
      <BrandWatermark className="brand-watermark-join is-dark" />
      <div className="wrap join-layout-react">
        <Reveal className="join-story-react">
          <Eyebrow light>Tu siguiente capítulo</Eyebrow>
          <h2>Empieza con una conversación.</h2>
          <p>Cuéntanos un poco sobre ti y prepararemos un mensaje para que solicites información directamente por WhatsApp.</p>
          <div className="join-image-react"><img src={teamImage} alt="Equipo de la Agencia y Familia Élite Dorada" /><span><UsersRound /><b>Una comunidad<br />lista para recibirte</b></span></div>
          <ul><li><CircleCheck /> Orientación inicial</li><li><CircleCheck /> Capacitación paso a paso</li><li><CircleCheck /> Integración a la familia</li></ul>
        </Reveal>

        <Reveal className="join-form-shell" delay={0.1}>
          <div className="form-top"><span><small>SOLICITUD DE INFORMACIÓN</small><strong>Hablemos de tu ingreso</strong></span><i>01</i></div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid-react">
              <label className={errors.name ? "invalid" : ""} htmlFor="join-name"><span>Nombre o apodo *</span><input ref={captureField("name")} id="join-name" name="name" autoComplete="name" maxLength="50" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "join-name-error" : undefined} value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="¿Cómo te llamamos?" />{errors.name && <small id="join-name-error">{errors.name}</small>}</label>
              <label className={errors.age ? "invalid" : ""} htmlFor="join-age"><span>Edad *</span><input ref={captureField("age")} id="join-age" name="age" type="number" inputMode="numeric" min="18" max="99" required aria-invalid={Boolean(errors.age)} aria-describedby={errors.age ? "join-age-error" : undefined} value={form.age} onChange={(e) => update("age", e.target.value)} placeholder="18+" />{errors.age && <small id="join-age-error">{errors.age}</small>}</label>
              <label className={errors.country ? "invalid" : ""} htmlFor="join-country"><span>País *</span><select ref={captureField("country")} id="join-country" name="country" autoComplete="country-name" required aria-invalid={Boolean(errors.country)} aria-describedby={errors.country ? "join-country-error" : undefined} value={form.country} onChange={(e) => update("country", e.target.value)}><option value="">Selecciona tu país</option>{countries.map((country) => <option key={country}>{country}</option>)}</select>{errors.country && <small id="join-country-error">{errors.country}</small>}</label>
              <label className={errors.phone ? "invalid" : ""} htmlFor="join-phone"><span>Número de WhatsApp *</span><input ref={captureField("phone")} id="join-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength="20" required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "join-phone-error" : undefined} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Código + número" />{errors.phone && <small id="join-phone-error">{errors.phone}</small>}</label>
              <label htmlFor="join-experience"><span>Experiencia en SUGO</span><select id="join-experience" name="experience" value={form.experience} onChange={(e) => update("experience", e.target.value)}><option>Sin experiencia</option><option>Ya tengo una cuenta</option><option>He participado antes</option></select></label>
              <label htmlFor="join-trainer"><span>Capacitadora preferida</span><select id="join-trainer" name="trainer" value={selectedTrainer} onChange={(e) => update("trainer", e.target.value)}><option>Cualquiera</option>{trainers.map((trainer) => <option key={trainer.name}>{trainer.name}</option>)}</select></label>
              <label className="field-wide" htmlFor="join-message"><span>¿Qué deseas aprender?</span><textarea id="join-message" name="message" maxLength="240" value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Cuéntanos qué te interesa conocer..." /><i aria-hidden="true">{form.message.length}/240</i></label>
            </div>
            <label className={`form-consent ${errors.consent ? "invalid" : ""}`} htmlFor="join-consent"><input ref={captureField("consent")} id="join-consent" name="consent" type="checkbox" required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "join-consent-error" : undefined} checked={form.consent} onChange={(e) => update("consent", e.target.checked)} /><span><Check /></span><p>Confirmo que soy mayor de 18 años y acepto recibir información por WhatsApp.</p></label>
            {errors.consent && <small id="join-consent-error" className="consent-error">{errors.consent}</small>}
            <div className="form-actions-react"><ActionButton type="submit"><Send /> Preparar mensaje</ActionButton><button type="button" onClick={clear}>Limpiar formulario</button></div>
            <p className="form-legal"><ShieldCheck /> No prometemos ingresos fijos. La participación está sujeta a las reglas oficiales de SUGO.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer({ agencyName }) {
  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="footer-react">
      <div className="wrap footer-main-react">
        <div className="footer-brand-react"><img src={agencyLogo} alt="" width="608" height="720" loading="lazy" decoding="async" /><span><strong>{agencyName}</strong><small>Comunidad, orientación y crecimiento.</small></span></div>
        <div className="footer-nav-react"><small>EXPLORAR</small>{["beneficios", "capacitadoras", "requisitos", "preguntas", "unete"].map((id) => <button type="button" onClick={() => goTo(id)} key={id}>{id === "unete" ? "Únete" : id.charAt(0).toUpperCase() + id.slice(1)}</button>)}</div>
        <div className="footer-contact-react"><small>COMUNIDAD</small><p>Crecer juntas también significa avanzar con respeto y organización.</p><div><button type="button" onClick={() => goTo("capacitadoras")} aria-label="Ver capacitadoras"><UsersRound /></button><button type="button" onClick={() => goTo("preguntas")} aria-label="Ver preguntas frecuentes"><MessageCircle /></button><button type="button" onClick={() => goTo("unete")} aria-label="Solicitar información"><Heart /></button></div></div>
      </div>
      <div className="wrap footer-bottom-react"><span>© {new Date().getFullYear()} Élite Dorada</span><span>Diseñado para conectar personas reales.</span></div>
    </footer>
  );
}
