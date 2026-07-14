import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, Check, Heart, Menu, MessageCircle, Sparkles, X } from "lucide-react";
import { navItems } from "../data";
import { ActionButton, KineticHeadline } from "./UI";
import PhoneDemo from "./PhoneDemo";
import agencyLogo from "../../assets/elite-dorada-logo.png";

const ticker = ["CAPACITACIÓN DESDE CERO", "COMUNIDAD ACTIVA", "ACOMPAÑAMIENTO REAL", "MUJERES +18", "CRECIMIENTO EN EQUIPO"];

export default function Header({ activeSection, openJoin, notify }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeWithEscape = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    };
    document.addEventListener("keydown", closeWithEscape);
    return () => document.removeEventListener("keydown", closeWithEscape);
  }, [menuOpen]);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className="hero-shell" id="inicio">
      <div className="hero-mesh mesh-one" /><div className="hero-mesh mesh-two" /><div className="hero-grid" />
      <motion.img
        className="hero-brand-watermark"
        src={agencyLogo}
        alt=""
        aria-hidden="true"
        draggable="false"
        width="608"
        height="720"
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 0.06, scale: 1, y: 0 }}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <nav className="top-nav wrap" aria-label="Navegación principal">
        <button className="brand-button" type="button" onClick={() => goTo("inicio")} aria-label="Élite Dorada — ir al inicio">
          <img src={agencyLogo} alt="" width="608" height="720" />
          <span><strong>Élite Dorada</strong><small>Agencia & Familia</small></span>
        </button>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <button className={activeSection === item.id ? "active" : ""} type="button" onClick={() => goTo(item.id)} key={item.id}>{item.label}</button>
          ))}
        </div>

        <motion.button className="nav-cta" type="button" onClick={() => openJoin()} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
          <MessageCircle /><span>Quiero unirme</span>
        </motion.button>
        <button ref={menuButtonRef} className="menu-toggle" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Navegación móvil" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            {navItems.map((item) => <button type="button" onClick={() => goTo(item.id)} key={item.id}>{item.label}<ArrowDownRight /></button>)}
            <button className="mobile-join" type="button" onClick={() => { openJoin(); setMenuOpen(false); }}>Quiero unirme <Heart /></button>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="hero-content wrap">
        <div className="hero-copy-react">
          <motion.div className="hero-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <Sparkles /><span>Comunidad exclusiva para mujeres mayores de 18 años</span>
          </motion.div>

          <KineticHeadline>Tu historia en SUGO empieza acompañada</KineticHeadline>

          <motion.p className="hero-lead" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.6 }}>
            Aprende, conecta y crece dentro de una agencia organizada y una familia que está presente desde el primer día.
          </motion.p>

          <motion.div className="hero-actions-react" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.82, duration: 0.6 }}>
            <ActionButton onClick={() => openJoin()}><MessageCircle /> Unirme por WhatsApp</ActionButton>
            <ActionButton variant="ghost" onClick={() => goTo("beneficios")}>Descubrir la experiencia</ActionButton>
          </motion.div>

          <motion.div className="hero-proof-react" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            {["Capacitación desde cero", "Acompañamiento humano", "Ambiente respetuoso"].map((item) => <span key={item}><Check />{item}</span>)}
          </motion.div>

          <motion.div className="hero-metrics" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.08 }}>
            <div><strong>01</strong><span>Ruta clara<br />para comenzar</span></div>
            <div><strong>03</strong><span>Capacitadoras<br />para orientarte</span></div>
            <div><strong>100%</strong><span>Enfoque en<br />comunidad</span></div>
          </motion.div>
        </div>

        <PhoneDemo notify={notify} openJoin={() => openJoin()} />
      </div>

      <div className="hero-ticker" aria-hidden="true">
        <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }}>
          {[...ticker, ...ticker].map((item, index) => <span key={`${item}-${index}`}>{item}<Sparkles /></span>)}
        </motion.div>
      </div>
    </header>
  );
}
