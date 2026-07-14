import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import {
  Bell,
  CalendarDays,
  ChevronRight,
  Compass,
  Gamepad2,
  Heart,
  Home,
  MessageCircle,
  Mic2,
  Mouse,
  Music2,
  Plus,
  Radio,
  Search,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import logo from "../../assets/sugo-logo.png";

const tabs = ["Salas", "Amigas", "Siguiendo"];

const rooms = [
  { icon: MessageCircle, title: "Café y charla", members: "1.2K conectadas", color: "lavender" },
  { icon: Music2, title: "Música y amigas", members: "953 conectadas", color: "cyan" },
  { icon: Heart, title: "Noche de chicas", members: "768 conectadas", color: "pink" },
];

const friends = [
  { initials: "AN", name: "Ana", status: "Capacitadora · En línea", color: "cyan" },
  { initials: "VA", name: "Valeria", status: "En una sala de música", color: "violet" },
  { initials: "CA", name: "Camila", status: "Disponible para ayudarte", color: "pink" },
];

const following = [
  { icon: Radio, title: "Conversación abierta", time: "Hoy · 7:30 p. m." },
  { icon: CalendarDays, title: "Capacitación inicial", time: "Mañana · 6:00 p. m." },
  { icon: Gamepad2, title: "Dinámica de integración", time: "Viernes · 8:00 p. m." },
];

function RoomsPanel({ notify }) {
  return (
    <div className="phone-panel-inner">
      <div className="phone-welcome">
        <div><small>BIENVENIDA A SUGO</small><strong>Tu espacio para conectar</strong><p>Descubre conversaciones y nuevas amigas.</p></div>
        <motion.span animate={{ rotate: [0, 8, -5, 0] }} transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2 }}><Sparkles /></motion.span>
      </div>

      <div className="phone-shortcuts">
        {[
          [MessageCircle, "Chat"], [Mic2, "Salas"], [CalendarDays, "Eventos"], [Gamepad2, "Juegos"], [UsersRound, "Familia"],
        ].map(([Icon, label]) => (
          <button type="button" key={label} onClick={() => notify(`${label}: función disponible dentro de SUGO.`)}>
            <span><Icon /></span><small>{label}</small>
          </button>
        ))}
      </div>

      <div className="phone-list-title"><strong>Salas populares</strong><button type="button" onClick={() => notify("Esta es una demostración visual de la plataforma.")}>Ver todas <ChevronRight /></button></div>
      <div className="room-list-react">
        {rooms.map(({ icon: Icon, title, members, color }) => (
          <motion.button type="button" whileHover={{ x: 3 }} key={title} onClick={() => notify(`Abriste la sala ${title}.`)}>
            <span className={`phone-item-icon ${color}`}><Icon /></span>
            <span><b>{title}</b><small>{members}</small></span>
            <i><Radio /></i>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function FriendsPanel({ openJoin }) {
  return (
    <div className="phone-panel-inner">
      <div className="phone-panel-heading"><span><UsersRound /></span><div><small>TU RED</small><strong>Personas para avanzar contigo</strong></div></div>
      <div className="friend-list">
        {friends.map((friend, index) => (
          <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }} key={friend.name}>
            <span className={`friend-avatar ${friend.color}`}>{friend.initials}<i /></span>
            <span><b>{friend.name}</b><small>{friend.status}</small></span>
            <MessageCircle />
          </motion.div>
        ))}
      </div>
      <div className="phone-callout"><Heart /><div><strong>Una comunidad que responde</strong><p>Conoce al equipo que te acompañará desde el primer día.</p></div></div>
      <button className="phone-primary-action" type="button" onClick={openJoin}>Conocer al equipo <ChevronRight /></button>
    </div>
  );
}

function FollowingPanel({ notify }) {
  return (
    <div className="phone-panel-inner">
      <div className="phone-panel-heading"><span><Star /></span><div><small>TU AGENDA</small><strong>No te pierdas lo que te inspira</strong></div></div>
      <div className="following-list">
        {following.map(({ icon: Icon, title, time }, index) => (
          <motion.button type="button" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} key={title} onClick={() => notify(`Recordatorio activado para ${title}.`)}>
            <span><Icon /></span><span><b>{title}</b><small>{time}</small></span><Bell />
          </motion.button>
        ))}
      </div>
      <div className="phone-progress-card"><div><small>PARTICIPACIÓN SEMANAL</small><strong>Tu comunidad está activa</strong></div><b>82%</b><span><i /></span></div>
    </div>
  );
}

export default function PhoneDemo({ notify, openJoin }) {
  const shellRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(1);
  const wheelLocked = useRef(false);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 140, damping: 20 });
  const springY = useSpring(pointerY, { stiffness: 140, damping: 20 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);

  const changeTab = (next) => {
    if (next < 0 || next >= tabs.length || next === activeTab) return false;
    setDirection(next > activeTab ? 1 : -1);
    setActiveTab(next);
    return true;
  };

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return undefined;

    const onWheel = (event) => {
      if (event.ctrlKey || Math.abs(event.deltaY) < 8) return;
      const next = activeTab + (event.deltaY > 0 ? 1 : -1);
      if (next < 0 || next >= tabs.length) return;
      event.preventDefault();
      if (wheelLocked.current) return;
      wheelLocked.current = true;
      changeTab(next);
      window.setTimeout(() => { wheelLocked.current = false; }, 520);
    };

    shell.addEventListener("wheel", onWheel, { passive: false });
    return () => shell.removeEventListener("wheel", onWheel);
  }, [activeTab]);

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => { pointerX.set(0); pointerY.set(0); };

  const handleTabKey = (event, index) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home"
      ? 0
      : event.key === "End"
        ? tabs.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    changeTab(next);
    window.requestAnimationFrame(() => document.getElementById(`phone-tab-${next}`)?.focus());
  };

  return (
    <motion.div className="phone-stage" initial={{ opacity: 0, x: 45, rotate: 2 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.9, delay: 0.4 }} onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <div className="phone-orbit orbit-a" /><div className="phone-orbit orbit-b" />
      <motion.div className="phone-floating-badge badge-live" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}><Radio /><span><small>EN VIVO</small><b>12 salas activas</b></span></motion.div>
      <motion.div className="phone-floating-badge badge-team" animate={{ y: [0, 8, 0] }} transition={{ duration: 4.6, repeat: Infinity }}><UsersRound /><span><small>COMUNIDAD</small><b>Siempre acompañada</b></span></motion.div>

      <motion.div ref={shellRef} className="react-phone-shell" style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}>
        <div className="react-phone-notch"><span /></div>
        <div className="react-phone-screen">
          <div className="react-phone-status"><strong>9:41</strong><span>● ◔ ▰</span></div>
          <div className="react-app-header"><img src={logo} alt="SUGO" /><span><Search /><Bell /></span></div>
          <div className="react-app-tabs" role="tablist" aria-label="Pantallas de la demostración">
            {tabs.map((tab, index) => (
              <button
                id={`phone-tab-${index}`}
                type="button"
                role="tab"
                aria-controls={`phone-panel-${index}`}
                aria-selected={activeTab === index}
                tabIndex={activeTab === index ? 0 : -1}
                className={activeTab === index ? "active" : ""}
                onClick={() => changeTab(index)}
                onKeyDown={(event) => handleTabKey(event, index)}
                key={tab}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="react-phone-content">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                id={`phone-panel-${activeTab}`}
                className="phone-panel"
                key={activeTab}
                role="tabpanel"
                aria-labelledby={`phone-tab-${activeTab}`}
                custom={direction}
                initial={(dir) => ({ opacity: 0, y: dir > 0 ? 24 : -24, filter: "blur(5px)" })}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={(dir) => ({ opacity: 0, y: dir > 0 ? -18 : 18, filter: "blur(4px)" })}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeTab === 0 && <RoomsPanel notify={notify} />}
                {activeTab === 1 && <FriendsPanel openJoin={openJoin} />}
                {activeTab === 2 && <FollowingPanel notify={notify} />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="react-phone-nav">
            <button type="button" className="active" onClick={() => notify("Estás en Inicio.")}><Home /><small>Inicio</small></button>
            <button type="button" onClick={() => notify("Explora nuevas salas y actividades.")}><Compass /><small>Explorar</small></button>
            <motion.button type="button" className="phone-main-action" aria-label="Abrir opciones para unirme" whileTap={{ scale: 0.9 }} onClick={openJoin}><Plus /></motion.button>
            <button type="button" onClick={() => notify("No tienes mensajes nuevos en esta demostración.")}><MessageCircle /><small>Mensajes</small></button>
            <button type="button" onClick={() => notify("Completa tu perfil cuando ingreses a la agencia.")}><Heart /><small>Perfil</small></button>
          </div>
        </div>
      </motion.div>

      <div className="wheel-hint"><Mouse /><span>Usa la rueda sobre el teléfono</span><i>{activeTab + 1}/3</i></div>
    </motion.div>
  );
}
