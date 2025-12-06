import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function FloatingHearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            opacity: 0,
          }}
          animate={{
            y: -100,
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
          }}
        >
          <Heart
            className="text-pink-300 fill-pink-300"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
