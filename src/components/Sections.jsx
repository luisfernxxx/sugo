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
import camilaImage from "../../assets/camila.webp";
import teamImage from "../../assets/equipo.webp";
import logo from "../../assets/sugo-logo.png";

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

const imageMap = { "ana.webp": anaImage, "valeria.webp": valeriaImage, "camila.webp": camilaImage };

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
  const ActiveIcon = iconMap[benefits[active].icon];

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

  return (
    <section className="benefits-react">
      <div className="benefits-word" aria-hidden="true">BENEFICIOS</div>
      <div className="wrap benefits-layout-react">
        <div className="benefits-copy-react">
          <SectionHeading light eyebrow="Lo que cambia cuando no avanzas sola" title="Una comunidad que suma en cada etapa." text="Selecciona un beneficio y descubre cómo se vive dentro de Élite Dorada." />
          <div className="benefit-selector" role="tablist" aria-label="Beneficios">
            {benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon];
              return <button id={`benefit-tab-${index}`} type="button" role="tab" aria-controls={`benefit-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} className={active === index ? "active" : ""} onClick={() => setActive(index)} onKeyDown={(event) => handleBenefitKey(event, index)} key={benefit.title}><span><Icon /></span>{benefit.title}<ArrowRight /></button>;
            })}
          </div>
        </div>

        <Reveal className="benefit-spotlight">
          <AnimatePresence mode="wait">
            <motion.div id={`benefit-panel-${active}`} role="tabpanel" aria-labelledby={`benefit-tab-${active}`} key={active} initial={{ opacity: 0, y: 20, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.38 }}>
              <span className="spotlight-icon"><ActiveIcon /></span>
              <small>BENEFICIO {String(active + 1).padStart(2, "0")}</small>
              <h3>{benefits[active].title}</h3>
              <p>{benefits[active].text}</p>
              <div className="spotlight-line"><i style={{ width: `${((active + 1) / benefits.length) * 100}%` }} /></div>
              <span className="spotlight-count">0{active + 1}<small>/0{benefits.length}</small></span>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

export function TrainersSection({ openJoin, openTrainer }) {
  return (
    <section className="trainers-react wrap" id="capacitadoras">
      <div className="trainers-heading-row">
        <SectionHeading eyebrow="Liderazgo que acompaña" title="Personas reales detrás de cada avance." text="Conoce a las capacitadoras que convertirán tus preguntas en pasos claros." />
        <Reveal className="trainer-heading-note"><UsersRound /><span><strong>3 perfiles</strong><small>Un mismo compromiso contigo</small></span></Reveal>
      </div>

      <div className="trainer-grid-react">
        {trainers.map((trainer, index) => (
          <Reveal className={`trainer-card-react trainer-${trainer.accent}`} delay={index * 0.1} key={trainer.name}>
            <div className="trainer-image-wrap">
              <img src={imageMap[trainer.image]} alt={`Capacitadora ${trainer.name}`} />
              <span className="trainer-number">0{index + 1}</span>
              <span className="trainer-availability"><i /> DISPONIBLE</span>
            </div>
            <div className="trainer-card-content">
              <small>{trainer.role}</small><h3>{trainer.name}</h3><p>{trainer.text}</p>
              <div>
                <button type="button" onClick={() => openTrainer(trainer)}>Conocer su función <ArrowRight /></button>
                <motion.button className="trainer-select" type="button" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => openJoin(trainer.name)} aria-label={`Elegir a ${trainer.name}`}><Check /></motion.button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function RequirementsSection({ notify }) {
  const [checked, setChecked] = useState([]);
  const [activeReason, setActiveReason] = useState(0);
  const progress = (checked.length / requirements.length) * 100;

  const toggleRequirement = (index) => {
    setChecked((current) => {
      const next = current.includes(index) ? current.filter((item) => item !== index) : [...current, index];
      if (next.length === requirements.length) window.setTimeout(() => notify("¡Excelente! Cumples con todos los requisitos principales."), 50);
      return next;
    });
  };

  return (
    <section className="requirements-react" id="requisitos">
      <div className="wrap">
        <SectionHeading align="center" eyebrow="Antes de comenzar" title="Todo lo que necesitas es más simple de lo que imaginas." text="No buscamos experiencia perfecta; buscamos disposición, responsabilidad y ganas de aprender." />
        <div className="requirements-layout-react">
          <Reveal className="profile-card-react">
            <span className="card-label">PERFIL DE INGRESO</span>
            <h3>¿Te identificas con nosotras?</h3><p>Este espacio está pensado para mujeres responsables, respetuosas y abiertas a aprender.</p>
            <div className="profile-badges">
              {[["18+", "Mayor de edad"], ["01", "Ganas de aprender"], ["02", "Actitud responsable"], ["03", "Trato respetuoso"]].map(([number, text]) => <div key={text}><strong>{number}</strong><span>{text}</span></div>)}
            </div>
            <div className="profile-seal"><UserRoundCheck /><span><small>NO NECESITAS</small><strong>Experiencia previa</strong></span></div>
          </Reveal>

          <Reveal className="checklist-card-react" delay={0.08}>
            <div className="checklist-heading"><span className="card-label">LISTA DE VERIFICACIÓN</span><strong>{checked.length}/{requirements.length}</strong></div>
            <h3>Requisitos para ingresar</h3>
            <div className="checklist-react">
              {requirements.map((item, index) => (
                <button type="button" aria-pressed={checked.includes(index)} className={checked.includes(index) ? "checked" : ""} onClick={() => toggleRequirement(index)} key={item}>
                  <span>{checked.includes(index) && <Check />}</span>{item}
                </button>
              ))}
            </div>
            <div className="checklist-progress"><div role="progressbar" aria-label="Progreso de requisitos" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)}><i style={{ width: `${progress}%` }} /></div><span><b>{Math.round(progress)}%</b> completado</span></div>
          </Reveal>

          <Reveal className="reasons-card-react" delay={0.16}>
            <span className="card-label">NUESTRA DIFERENCIA</span><h3>¿Por qué Élite Dorada?</h3>
            <div className="reason-tabs-react">
              {reasons.map((reason, index) => {
                const Icon = iconMap[reason.icon];
                return <button type="button" aria-pressed={activeReason === index} className={activeReason === index ? "active" : ""} onClick={() => setActiveReason(index)} key={reason.title}><Icon /><span><b>{reason.title}</b><small>{String(index + 1).padStart(2, "0")}</small></span></button>;
              })}
            </div>
            <AnimatePresence mode="wait"><motion.p key={activeReason} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>{reasons[activeReason].text}</motion.p></AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function FAQSection({ openJoin }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="faq-react" id="preguntas">
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

export function JoinSection({ preferredTrainer, submitForm, notify }) {
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
  }, [preferredTrainer]);

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
      <div className="join-glow" /><div className="wrap join-layout-react">
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
        <div className="footer-brand-react"><img src={logo} alt="SUGO" /><span><strong>{agencyName}</strong><small>Comunidad, orientación y crecimiento.</small></span></div>
        <div className="footer-nav-react"><small>EXPLORAR</small>{["beneficios", "capacitadoras", "requisitos", "preguntas", "unete"].map((id) => <button type="button" onClick={() => goTo(id)} key={id}>{id === "unete" ? "Únete" : id.charAt(0).toUpperCase() + id.slice(1)}</button>)}</div>
        <div className="footer-contact-react"><small>COMUNIDAD</small><p>Crecer juntas también significa avanzar con respeto y organización.</p><div><button type="button" onClick={() => goTo("capacitadoras")} aria-label="Ver capacitadoras"><UsersRound /></button><button type="button" onClick={() => goTo("preguntas")} aria-label="Ver preguntas frecuentes"><MessageCircle /></button><button type="button" onClick={() => goTo("unete")} aria-label="Solicitar información"><Heart /></button></div></div>
      </div>
      <div className="wrap footer-bottom-react"><span>© {new Date().getFullYear()} Élite Dorada</span><span>Diseñado para conectar personas reales.</span></div>
    </footer>
  );
}
