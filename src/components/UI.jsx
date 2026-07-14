import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { useBodyLock, useEscape } from "../hooks";

const ease = [0.22, 1, 0.36, 1];

export function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease }}
    >
      {children}
    </Component>
  );
}

export function KineticHeadline({ children }) {
  const words = children.split(" ");
  return (
    <motion.h1 className="kinetic-title" initial="hidden" animate="visible" aria-label={children}>
      {words.map((word, wordIndex) => (
        <span className={`kinetic-word ${word.includes("SUGO") ? "accent-word" : ""}`} key={`${word}-${wordIndex}`}>
          {[...word].map((letter, letterIndex) => (
            <motion.span
              aria-hidden="true"
              className="kinetic-letter"
              key={`${letter}-${letterIndex}`}
              variants={{
                hidden: { y: "115%", opacity: 0, rotate: 4 },
                visible: { y: 0, opacity: 1, rotate: 0 },
              }}
              transition={{ duration: 0.72, delay: 0.12 + wordIndex * 0.055 + letterIndex * 0.018, ease }}
            >
              {letter}
            </motion.span>
          ))}
          <span aria-hidden="true">&nbsp;</span>
        </span>
      ))}
    </motion.h1>
  );
}

export function Eyebrow({ children, light = false }) {
  return <span className={`eyebrow ${light ? "eyebrow-light" : ""}`}><i />{children}</span>;
}

export function SectionHeading({ eyebrow, title, text, light = false, align = "left" }) {
  return (
    <Reveal className={`section-heading section-heading-${align} ${light ? "is-light" : ""}`}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

export function ActionButton({ children, variant = "primary", icon = true, className = "", ...props }) {
  return (
    <motion.button
      className={`action-button action-${variant} ${className}`}
      whileHover={{ y: -3, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      {...props}
    >
      <span>{children}</span>
      {icon && <ArrowRight aria-hidden="true" />}
    </motion.button>
  );
}

export function Modal({ open, onClose, children, labelledBy = "modal-title" }) {
  const panelRef = useRef(null);
  useBodyLock(open);
  useEscape(onClose, open);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const getFocusable = () => [...(panelRef.current?.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ) ?? [])];
    const timer = window.setTimeout(() => (getFocusable()[0] ?? panelRef.current)?.focus(), 40);
    const trapFocus = (event) => {
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", trapFocus);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            ref={panelRef}
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.97 }}
            transition={{ duration: 0.38, ease }}
          >
            <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar ventana"><X /></button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast"
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 14, x: "-50%" }}
        >
          <span className="toast-dot" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
