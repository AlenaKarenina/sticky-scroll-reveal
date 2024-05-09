import { useState } from 'react'
import { useMotionValueEvent, useScroll, motion } from 'framer-motion'
import '../../App.css'

export const StickyScroll = ({
  content,
}: {
  content: {
    title: string
    description: string
  }[]
}) => {

  const [activeCard, setActiveCard] = useState(0)

  //const elementRef = useRef<never>(null)

  const { scrollYProgress } = useScroll(
    /*{
      container: elementRef,
      offset: ["start start", "end start"],
    }*/
  )

  const cardLength = content.length

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength)

    cardsBreakpoints.forEach((breakpoint, index) => {
      if (latest > breakpoint - 0.2 && latest <= breakpoint) {
        setActiveCard(() => index)
      }
    })
  })

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ]

  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ]

  return (
    <motion.div
      whileInView={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="flex justify-center items-start relative space-x-10"
      //ref={elementRef}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl" style={{ paddingBottom: '160px' }}>
          {content.map(({ title, description }, index) => (
            <div key={title + index} className="my-20" style={{ minHeight: '100vh' }}>
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: activeCard === index ? 1 : 0.1,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: activeCard === index ? 1 : 0.1,
                }}
                className="text-kg text-slate-300 max-w-sm mt-10"
              >
                {description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        whileInView={{
          background: linearGradients[activeCard % linearGradients.length],
        }}
        className="lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden"
      ></motion.div>
    </motion.div>
  )
}