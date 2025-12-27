'use client'

import { motion, Variants } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, ElementType } from "react"
import { cn } from "@/lib/utils"

interface TimelineContentProps {
  children: React.ReactNode
  as?: ElementType
  animationNum?: number
  timelineRef?: React.RefObject<HTMLElement>
  customVariants?: Variants
  className?: string
}

export function TimelineContent({
  children,
  as: Component = "div",
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  ...props
}: TimelineContentProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const defaultVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  }

  const variants = customVariants || defaultVariants

  return (
    <motion.div
      ref={ref}
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
