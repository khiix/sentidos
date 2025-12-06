import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface Moment {
  image: string;
  text: string;
}

const moments: Moment[] = [
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+1',
    text: 'Eres la razón por la que creo en el amor verdadero'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+2',
    text: 'Cada día a tu lado es una nueva aventura que quiero vivir'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+3',
    text: 'Tu sonrisa ilumina mis días más oscuros'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+4',
    text: 'Contigo he encontrado mi hogar, mi paz, mi todo'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+5',
    text: 'Eres el sueño que nunca supe que tenía hasta que te conocí'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+6',
    text: 'Me haces querer ser mejor persona cada día'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+7',
    text: 'Tu amor es el regalo más hermoso que la vida me ha dado'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+8',
    text: 'Eres mi persona favorita en todo el universo'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+9',
    text: 'Contigo el tiempo se detiene y todo cobra sentido'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+10',
    text: 'Cada momento contigo es un recuerdo que guardo en mi corazón'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+11',
    text: 'Eres la melodía que mi corazón canta cada día'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+12',
    text: 'Tu risa es mi canción favorita'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+13',
    text: 'Gracias por amarme tal como soy'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+14',
    text: 'Eres mi compañera perfecta en esta vida'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+15',
    text: 'Contigo he aprendido lo que significa amar sin condiciones'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+16',
    text: 'Eres mi refugio en los días difíciles'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+17',
    text: 'Nuestras caras de mongolo son lo mejor'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+18',
    text: 'Me haces sentir especial cada día'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+19',
    text: 'Eres la estrella que guía mi camino'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+20',
    text: 'Contigo todo es más bonito y más fácil'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+21',
    text: 'Eres mi presente y mi futuro'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+22',
    text: 'Tu amor me hace invencible'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+23',
    text: 'Cada día te amo más que ayer pero menos que mañana'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+24',
    text: 'Eres mi sueño hecho realidad'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+25',
    text: 'Siempre tirando facha'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+26',
    text: 'Contigo he descubierto la verdadera felicidad'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+27',
    text: 'Eres el amor de mi vida y mi mejor amiga'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+28',
    text: 'Tu presencia hace todo más hermoso'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+29',
    text: 'Eres mi inspiración y mi motivación'
  },
  {
    image: 'https://via.placeholder.com/400x400/ff69b4/ffffff?text=Foto+30',
    text: 'Te amo más allá de las palabras, te amo con el alma'
  }
];

export function TimelineMoments() {
  const [localImages, setLocalImages] = useState<string[]>([]);
  const [specialMap, setSpecialMap] = useState<Record<number, string>>({});

  useEffect(() => {
    try {
      const modules = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' }) as Record<string, string>;
      const imgs = Object.values(modules || {});
      if (imgs.length > 0) {
        setLocalImages(imgs);
        // detectar imágenes llamadas penul / ult y mapearlas a los índices 28 y 29
        const found = imgs.map((u) => ({ u, name: (u.split('/').pop() || '').toLowerCase() }));
        const map: Record<number, string> = {};
        const penul = found.find((x) => x.name.includes('penul'));
        const ult = found.find((x) => x.name.includes('ult'));
        if (penul) map[28] = penul.u;
        if (ult) map[29] = ult.u;
        if (Object.keys(map).length > 0) setSpecialMap(map);
      }
    } catch (e) {
      try {
        const mods = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true }) as Record<string, any>;
        const imgs = Object.values(mods)
          .map((m) => (typeof m === 'string' ? m : m.default))
          .filter(Boolean);
        if (imgs.length > 0) {
          setLocalImages(imgs as string[]);
          const found = (imgs as string[]).map((u) => ({ u, name: (u.split('/').pop() || '').toLowerCase() }));
          const map: Record<number, string> = {};
          const penul = found.find((x) => x.name.includes('penul'));
          const ult = found.find((x) => x.name.includes('ult'));
          if (penul) map[28] = penul.u;
          if (ult) map[29] = ult.u;
          if (Object.keys(map).length > 0) setSpecialMap(map);
        }
      } catch (err) {
        console.warn('No se pudieron cargar imágenes locales para TimelineMoments:', err);
      }
    }
  }, []);

  return (
    <section className="py-20 px-4 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-pink-600 mb-16"
        >
          Nuestra Historia de Amor
        </motion.h2>

        <div className="space-y-12">
          {moments.map((moment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-8 items-center`}
            >
              {/* Imagen */}
              <div className="w-full md:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-2xl shadow-xl aspect-square"
                >
                  <img
                    src={(() => {
                      // Usar sólo las imágenes a partir de la 3ª (índice 2).
                      // Si no hay suficientes imágenes locales, no reutilizamos
                      // las dos destacadas: usamos el placeholder original.
                      const available = localImages.length > 2 ? localImages.slice(2) : [];
                      if (available.length === 0) return moment.image;
                      return available[index % available.length];
                    })()}
                    alt={`Momento ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
                  </div>
                </motion.div>
              </div>

              {/* Texto */}
              <div className="w-full md:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 border-pink-100"
                >
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-pink-500 fill-pink-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 italic leading-relaxed">
                      {moment.text}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
