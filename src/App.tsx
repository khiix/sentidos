import { useState, useRef, useEffect } from 'react';
import { Heart, Music, Play, Pause } from 'lucide-react';
import { motion } from 'motion/react';
import { Gallery } from './components/Gallery';
import { FloatingHearts } from './components/FloatingHearts';
import { TimelineMoments } from './components/TimelineMoments';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (e) {
      console.warn('No se pudo reproducir la canción automáticamente:', e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 relative overflow-hidden">
      <FloatingHearts />
      
      {/* Header con control de música */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-8 right-8 z-50"
      >
        <button
          onClick={toggleMusic}
          className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-pink-200"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-pink-600" />
          ) : (
            <Play className="w-6 h-6 text-pink-600" />
          )}
        </button>
      </motion.div>

      {/* Audio element - Cambia el src con tu canción */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        onLoadedMetadata={() => {
          if (audioRef.current) audioRef.current.volume = 0.5;
        }}
      >
        <source src="/audio/mi-cancion.mp3" type="audio/mpeg" />
        {/* Formato alternativo */}
        <source src="/audio/mi-cancion.ogg" type="audio/ogg" />
      </audio>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center px-4 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <Heart className="w-16 h-16 text-pink-500 mx-auto fill-pink-500 animate-pulse" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-pink-600 mb-6"
          >
            Sentido del oido, vista y extra de amor
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-gray-700 max-w-2xl mx-auto mb-8"
          >
            Cada momento contigo es un regalo. Eres la razón por la que sonrío cada día, 
            la luz que ilumina mi camino y el amor que llena mi corazón. Desde que llegaste 
            a mi vida, todo tiene más sentido y más color.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center justify-center gap-2 text-pink-500"
          >
            <Heart className="w-5 h-5 fill-pink-500" />
            <Music className="w-5 h-5" />
            <Heart className="w-5 h-5 fill-pink-500" />
          </motion.div>
        </div>
      </motion.section>

      {/* Galería de fotos */}
      <Gallery />

      {/* Timeline de momentos con frases románticas */}
      <TimelineMoments />

      {/* Sección de mensaje romántico */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border-2 border-pink-100"
          >
            <h2 className="text-pink-600 text-center mb-8">
              Para Ti, Mi Amor
            </h2>
            
            <div className="space-y-6 text-gray-700 text-center">
              <p>
                Eres mi persona favorita, mi mejor amiga, mi compañera de aventuras. 
                Contigo he descubierto lo que significa amar de verdad.
              </p>
              
              <p>
                Gracias por cada sonrisa, cada abrazo, cada momento compartido. 
                Gracias por ser tú, por ser perfecta con tus imperfecciones, 
                por amarme como soy.
              </p>
              
              <div className="pt-6">
                <Heart className="w-12 h-12 text-pink-500 mx-auto fill-pink-500" />
                <p className="mt-4 text-pink-600 italic">
                  Te amo hoy, mañana y siempre
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-pink-400"
        >
          <Heart className="w-8 h-8 mx-auto mb-4 fill-pink-400" />
          <p>Hecho con amor ♡</p>
          <p>Pos dara: se que no pega la cancion pero nos gusta valeeeeee!</p>
        </motion.div>
      </footer>
    </div>
  );
}