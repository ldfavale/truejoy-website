"use client"

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion"
import { type ReactNode } from "react"

export type ScrollVariant =
  | "fadeUp"
  | "fadeDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "rotateIn"
  | "blur"
  | "bounce"
  | "flip"
  | "pop"
  | "wobble"

const hidden = { opacity: 0 }

export const scrollVariants: Record<ScrollVariant, Variants> = {
  fadeUp: {
    hidden: { ...hidden, y: 56 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { ...hidden, y: -48 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { ...hidden, x: 72, rotate: 2 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
  slideRight: {
    hidden: { ...hidden, x: -72, rotate: -2 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
  scale: {
    hidden: { ...hidden, scale: 0.82 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    hidden: { ...hidden, scale: 0.6, rotate: -14 },
    visible: { opacity: 1, scale: 1, rotate: 0 },
  },
  blur: {
    hidden: { ...hidden, filter: "blur(12px)", scale: 1.05 },
    visible: { opacity: 1, filter: "blur(0px)", scale: 1 },
  },
  bounce: {
    hidden: { ...hidden, y: 80, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 380, damping: 22 },
    },
  },
  flip: {
    hidden: { ...hidden, rotateX: 75, scale: 0.92 },
    visible: { opacity: 1, rotateX: 0, scale: 1 },
  },
  pop: {
    hidden: { ...hidden, scale: 0.4 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 420, damping: 18 },
    },
  },
  wobble: {
    hidden: { ...hidden, rotate: -8, x: -24 },
    visible: {
      opacity: 1,
      rotate: 0,
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 14 },
    },
  },
}

const springTransitions: ScrollVariant[] = ["bounce", "pop", "wobble"]

type ScrollRevealProps = {
  children: ReactNode
  variant?: ScrollVariant
  delay?: number
  duration?: number
  className?: string
  as?: keyof typeof motion
  /** Animate when entering viewport (scroll) or on mount (hero) */
  mode?: "scroll" | "mount"
  viewportMargin?: string
} & Omit<HTMLMotionProps<"div">, "children" | "variants" | "initial" | "animate">

export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.75,
  className,
  as = "div",
  mode = "scroll",
  viewportMargin = "-60px",
  ...props
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion()
  const Component = motion[as as "div"] as typeof motion.div

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const isSpring = springTransitions.includes(variant)
  const transition = isSpring
    ? { delay }
  : { duration, delay, ease: [0.22, 1, 0.36, 1] as const }

  const motionProps =
    mode === "mount"
      ? {
          initial: "hidden" as const,
          animate: "visible" as const,
        }
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, margin: viewportMargin },
        }

  return (
    <Component
      className={className}
      variants={scrollVariants[variant]}
      transition={transition}
      style={{ perspective: variant === "flip" ? 800 : undefined }}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  )
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

type StaggerContainerProps = {
  children: ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0.08,
}: StaggerContainerProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = {
  children: ReactNode
  variant?: ScrollVariant
  className?: string
}

export function StaggerItem({
  children,
  variant = "fadeUp",
  className,
}: StaggerItemProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const isSpring = springTransitions.includes(variant)

  return (
    <motion.div
      className={className}
      variants={scrollVariants[variant]}
      transition={
        isSpring
          ? undefined
          : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  )
}

export { staggerContainer }
