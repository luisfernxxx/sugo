import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "motion/react";
import {
  ArrowUp,
  Gamepad2,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  MessageCircle,
  MessagesSquare,
  Radio,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
} from "lucide-react";
import { siteConfig } from "../config";
import { modalContent, navItems } from "./data";
import { useActiveSection } from "./hooks";
import Header from "./components/Header";
import { BenefitsSection, FAQSection, Footer, JoinSection, PlatformSection, RequirementsSection, TrainersSection } from "./components/Sections";
import { ActionButton, Modal, Toast } from "./components/UI";
import logo from "../assets/sugo-logo.png";

const modalIcons = { Gamepad2, GraduationCap, HandHeart, HeartHandshake, MessagesSquare, Radio, ShieldCheck, Smartphone, UserRoundCheck };
const sectionIds = ["inicio", ...navItems.map((item) => item.id).filter((id) => id !== "inicio"), "unete"];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [joinOpen, setJoinOpen] = useState(false);
  const [preferredTrainer, setPreferredTrainer] = useState("");
  const [trainerSelectionKey, setTrainerSelectionKey] = useState(0);
  const [toast, setToast] = useState("");
  const [showBackTop, setShowBackTop] = useState(false);
  const toastTimer = useRef(null);
  const activeSection = useActiveSection(sectionIds);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 720);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const notify = useCallback((message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 3300);
  }, []);

  const openInfo = (key) => {
    const content = modalContent[key];
    if (content) setInfo(content);
  };

  const openTrainer = (trainer) => {
    setInfo({
      icon: "UserRoundCheck",
      eyebrow: trainer.role,
      title: `Capacitadora ${trainer.name}`,
      text: trainer.text,
      trainer: trainer.name,
    });
  };

  const openJoin = (trainer = "") => {
    setPreferredTrainer(trainer);
    setTrainerSelectionKey((current) => current + 1);
    setJoinOpen(true);
  };

  const whatsappNumber = String(siteConfig.whatsappNumber || "").replace(/\D/g, "");
  const openWhatsapp = (message) => {
    if (!whatsappNumber || whatsappNumber === "51999999999") {
      notify("Configura tu número real de WhatsApp en config.js antes de publicar.");
      return false;
    }
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    return true;
  };

  const goToForm = () => {
    setJoinOpen(false);
    window.setTimeout(() => {
      document.getElementById("unete")?.scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => document.querySelector('#unete input')?.focus(), 700);
    }, 120);
  };

  const submitForm = (data) => {
    const message = [
      `Hola, quiero información para unirme a ${siteConfig.agencyName}.`,
      "",
      `Nombre o apodo: ${data.name}`,
      `Edad: ${data.age} años`,
      `País: ${data.country}`,
      `Mi WhatsApp: ${data.phone}`,
      `Experiencia: ${data.experience}`,
      `Capacitadora preferida: ${data.trainer}`,
      `Deseo aprender: ${data.message || "No especificado"}`,
      "",
      "Confirmo que soy mayor de 18 años.",
    ].join("\n");

    if (openWhatsapp(message)) notify("Tu mensaje está listo. Abrimos WhatsApp para continuar.");
  };

  const InfoIcon = info ? (modalIcons[info.icon] || Smartphone) : Smartphone;
  const modalOpen = Boolean(info) || joinOpen;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="scroll-progress-react" style={{ scaleX: smoothProgress }} aria-hidden="true" />

      <AnimatePresence>
        {loading && (
          <motion.div className="page-loader-react" role="status" aria-live="polite" exit={{ opacity: 0, visibility: "hidden" }} transition={{ duration: 0.55 }}>
            <motion.div initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <img src={logo} alt="SUGO" />
              <span><i />Preparando tu experiencia</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="site-content-react" inert={modalOpen} aria-hidden={modalOpen ? "true" : undefined}>
        <a className="skip-link-react" href="#contenido">Saltar al contenido</a>
        <Header activeSection={activeSection} openJoin={openJoin} notify={notify} />
        <main id="contenido">
          <PlatformSection openInfo={openInfo} />
          <BenefitsSection />
          <TrainersSection openJoin={openJoin} openTrainer={openTrainer} />
          <RequirementsSection notify={notify} openJoin={openJoin} />
          <FAQSection openJoin={openJoin} />
          <JoinSection preferredTrainer={preferredTrainer} trainerSelectionKey={trainerSelectionKey} submitForm={submitForm} notify={notify} />
        </main>
        <Footer agencyName={siteConfig.agencyName} />

        <motion.button className="floating-join-react" type="button" onClick={() => openJoin()} aria-label="Abrir opciones de inscripción" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}>
          <MessageCircle /><span>Únete</span><i />
        </motion.button>
        <AnimatePresence>{showBackTop && <motion.button className="back-top-react" type="button" aria-label="Volver arriba" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}><ArrowUp /></motion.button>}</AnimatePresence>
      </div>

      <Modal open={Boolean(info)} onClose={() => setInfo(null)} labelledBy="info-modal-title">
        {info && <div className="info-modal-content"><motion.span className="modal-icon-react" initial={{ rotate: -12, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }}><InfoIcon /></motion.span><small>{info.eyebrow}</small><h2 id="info-modal-title">{info.title}</h2><p>{info.text}</p><div className="modal-actions-react"><ActionButton onClick={() => { const trainer = info.trainer || ""; setInfo(null); openJoin(trainer); }}>Solicitar información</ActionButton><button type="button" onClick={() => setInfo(null)}>Cerrar</button></div></div>}
      </Modal>

      <Modal open={joinOpen} onClose={() => setJoinOpen(false)} labelledBy="join-modal-title">
        <div className="join-modal-content"><span className="join-modal-icon"><HeartHandshake /></span><small>ÉLITE DORADA</small><h2 id="join-modal-title">¿Lista para recibir información?</h2><p>Completa el formulario y prepararemos un mensaje personalizado para WhatsApp.</p>{preferredTrainer && <div className="preferred-trainer"><UserRoundCheck /><span><small>CAPACITADORA PREFERIDA</small><strong>{preferredTrainer}</strong></span></div>}<div className="modal-actions-react"><ActionButton onClick={goToForm}>Completar formulario</ActionButton><button type="button" onClick={() => openWhatsapp(siteConfig.quickMessage)}>Mensaje rápido</button></div></div>
      </Modal>

      <Toast message={toast} />
    </MotionConfig>
  );
}
