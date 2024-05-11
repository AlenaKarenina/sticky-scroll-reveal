import { ReactNode, useState } from 'react'
import { useMotionValueEvent, useScroll, motion } from 'framer-motion'
import '../../App.css'

export const StickyScroll = ({
  content
}: {
  content: {
    title: string
    description: string
    src: string
    content?: ReactNode
  }[]
}) => {

  const [activeCard, setActiveCard] = useState(0)

  const { scrollYProgress } = useScroll()

  const cardLength = content.length

  /*useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength)

    cardsBreakpoints.forEach((breakpoint, index) => {
      if (latest > breakpoint - 0.2 && latest <= breakpoint) {
        setActiveCard(() => index)
      }
    })
  })*/

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength)

    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint)
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index
        }
        return acc
      },
      0
    )
    setActiveCard(closestBreakpointIndex)
  })

  return (
    <motion.div
      className="flex justify-center items-start relative space-x-10"
    >
      <motion.div
        className="lg:block rounded-md bg-white sticky overflow-hidden"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          height: '75vh',
          width: '500px'
        }}
      >
        {content.map(({ src }, index) => (
          <motion.img
            className='image'
            src={src}
            key={index}
            initial={{
              opacity: 0,
              zIndex: -1
            }}
            animate={{
              opacity: activeCard === index ? 1 : 0,
              zIndex: activeCard === index ? 1 : -1,
            }}
          />
        ))}
        {/*{content[activeCard].content ?? null}*/}
      </motion.div>
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl" style={{ paddingBottom: '100px', paddingTop: '100px' }}>
          {content.map(({ title, description }, index) => (
            <div key={title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold"
              >
                {title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg max-w-sm mt-10"
              >
                {description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}