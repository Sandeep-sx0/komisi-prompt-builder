import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

const IMAGES_TO_PRELOAD = [
  "/backgrounds/bg-16.webp",
  "/backgrounds/bg-3.png",
  "/backgrounds/bg-10.png",
  "/backgrounds/bg-18.webp",
  "/backgrounds/bg-14.jpg.jpeg",
]

const Preloader = () => {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let loaded = 0
    const total = IMAGES_TO_PRELOAD.length

    const onLoad = () => {
      loaded++
      setProgress(Math.round((loaded / total) * 100))
      if (loaded >= total) {
        setTimeout(() => setDone(true), 300)
      }
    }

    IMAGES_TO_PRELOAD.forEach((src) => {
      const img = new Image()
      ;(img as any).fetchPriority = "high"
      img.onload = onLoad
      img.onerror = onLoad
      img.src = src
    })

    const timeout = setTimeout(() => setDone(true), 5000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: "-0.04em",
              color: "#000000",
            }}
          >
            komisi
          </span>

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 2,
              backgroundColor: "rgba(0,0,0,0.08)",
            }}
          >
            <motion.div
              style={{
                height: "100%",
              backgroundColor: "#000000",

              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
