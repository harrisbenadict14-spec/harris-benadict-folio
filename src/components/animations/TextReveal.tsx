import { motion } from "framer-motion";

/**
 * Split text into individual characters/words that animate in with stagger.
 * mode="chars" animates each character, mode="words" animates each word.
 */
export const SplitTextReveal = ({
  text,
  mode = "chars",
  className = "",
  delay = 0,
  staggerDelay = 0.03,
}: {
  text: string;
  mode?: "chars" | "words";
  className?: string;
  delay?: number;
  staggerDelay?: number;
}) => {
  const items = mode === "chars" ? text.split("") : text.split(" ");

  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: staggerDelay, delayChildren: delay } },
      }}
      className={className}
      aria-label={text}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 40, rotateX: -90 },
            show: {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className="inline-block"
          style={{ transformOrigin: "bottom" }}
        >
          {item === " " || mode === "words" ? (
            <>
              {item}
              {mode === "words" && i < items.length - 1 ? "\u00A0" : ""}
            </>
          ) : (
            item
          )}
        </motion.span>
      ))}
    </motion.span>
  );
};

/**
 * Typewriter effect — types out text character by character.
 */
export const TypewriterText = ({
  text,
  className = "",
  delay = 0,
  speed = 0.04,
  cursor = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  cursor?: boolean;
}) => {
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: speed, delayChildren: delay } },
      }}
      className={className}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1 },
          }}
          className="inline"
        >
          {char}
        </motion.span>
      ))}
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[2px] h-[1em] bg-foreground/60 ml-0.5 align-middle"
        />
      )}
    </motion.span>
  );
};

/**
 * Glitch text effect — randomly offsets text with color channels.
 */
export const GlitchText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Cyan offset layer */}
      <motion.span
        animate={{
          x: [0, -2, 3, -1, 0],
          y: [0, 1, -1, 2, 0],
          opacity: [0, 0.7, 0, 0.5, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        className="absolute inset-0 text-[hsl(180,80%,60%)] mix-blend-screen"
        aria-hidden
      >
        {text}
      </motion.span>
      {/* Red offset layer */}
      <motion.span
        animate={{
          x: [0, 2, -3, 1, 0],
          y: [0, -1, 1, -2, 0],
          opacity: [0, 0.5, 0, 0.7, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: 0.1 }}
        className="absolute inset-0 text-[hsl(0,80%,60%)] mix-blend-screen"
        aria-hidden
      >
        {text}
      </motion.span>
      {/* Main text with clip glitch */}
      <motion.span
        animate={{
          skewX: [0, 0, -2, 0, 3, 0],
        }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 4 }}
      >
        {text}
      </motion.span>
    </span>
  );
};
