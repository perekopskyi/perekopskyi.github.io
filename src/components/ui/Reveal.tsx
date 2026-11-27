import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Fades content in when it scrolls into view.
 *
 * It always renders a motion.div so the prerendered HTML and the first client
 * render match during hydration. MotionConfig reducedMotion="user" (App.tsx)
 * drops the vertical movement for people who ask for reduced motion, and a
 * <noscript> style in index.html keeps the content visible without JavaScript.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      data-reveal=""
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
