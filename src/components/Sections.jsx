import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
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

function FeaturePanel({ type, eyebrow, title, text, icon: HeaderIcon, items, onExplore }) {
  return (
    <Reveal className={`feature-panel-react feature-panel-${type}`}>
      <div className="feature-panel-index"><span>{type === "agency" ? "01" : "02"}</span><i /><small>{type === "agency" ? "AGENCIA" : "FAMILIA"}</small></div>
      <div className="feature-panel-header">
        <motion.span whileHover={{ rotate: 8, scale: 1.08 }}><HeaderIcon /></motion.span>
        <div><small>{eyebrow}</small><h3>{title}</h3></div>
      </div>
      <p className="feature-panel-copy">{text}</p>
      <div className="feature-card-grid">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon];
          return (
            <motion.article className="feature-card-react" whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 320, damping: 22 }} key={item.title}>
              <div className="feature-card-top"><span><Icon /></span><small>{item.number}</small></div>
              <h4>{item.title}</h4><p>{item.text}</p>
              <button type="button" onClick={() => onExplore(item.modal)}>Explorar <ArrowRight /></button>
            </motion.article>
          );
        })}
      </div>
    </Reveal>
  );
}

export function PlatformSection({ openInfo }) {
  return (
    <section className="platform-react" id="beneficios">
      <div className="platform-ambient ambient-left" /><div className="platform-ambient ambient-right" />
      <div className="wrap">
        <div className="platform-intro-react">
          <Reveal className="platform-intro-copy">
            <Eyebrow>Una experiencia con dirección</Eyebrow>
            <h2>Más que entrar a una app.<br /><span>Es saber cómo avanzar.</span></h2>
            <p>SUGO te conecta con nuevas experiencias. Élite Dorada añade la estructura, la orientación y la comunidad que transforman ese primer paso en una ruta clara.</p>
            <button className="editorial-link" type="button" onClick={() => openInfo("sugo")}>Entender cómo funciona <ArrowRight /></button>
          </Reveal>

          <Reveal className="platform-signature" delay={0.1}>
            <span className="signature-number">18+</span>
            <div><small>UNA COMUNIDAD DISEÑADA PARA</small><strong>Mujeres listas para aprender, participar y crecer acompañadas.</strong></div>
            <Sparkles />
          </Reveal>
        </div>

        <div className="feature-panels-react">
          <FeaturePanel
            type="agency"
            eyebrow="Tu guía dentro de la plataforma"
            title="Dirección y respaldo"
            text="El conocimiento y la estructura que necesitas para comenzar con confianza."
            icon={Building2}
            items={agencyFeatures}
            onExplore={openInfo}
          />
          <FeaturePanel
            type="family"
            eyebrow="Tu espacio para pertenecer"
            title="Conexión y comunidad"
            text="Un entorno dinámico para compartir, participar y avanzar junto a otras integrantes."
            icon={HeartHandshake}
            items={familyFeatures}
            onExplore={openInfo}
          />
        </div>

        <div className="journey-react">
          <SectionHeading eyebrow="El proceso" title="Una ruta simple. Un acompañamiento real." text="Cada etapa tiene un propósito y una persona dispuesta a orientarte." />
          <div className="journey-track">
            {[
              [Sparkles, "01", "Descubre", "Conoce la plataforma y resuelve tus primeras dudas."],
              [BookOpenCheck, "02", "Aprende", "Recibe una capacitación clara y práctica."],
              [HeartHandshake, "03", "Conecta", "Intégrate a la familia y participa en actividades."],
              [TrendingUp, "04", "Avanza", "Mejora con seguimiento y constancia."],
            ].map(([Icon, number, title, text], index) => (
              <Reveal className="journey-step" delay={index * 0.08} key={number}>
                <span className="journey-dot"><Icon /></span><small>{number}</small><h3>{title}</h3><p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
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
