import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

// Photos remotas por defecto (fallback)
const remotePhotos = [
  {
    url: 'https://images.unsplash.com/photo-1514846528774-8de9d4a07023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMGxvdmV8ZW58MXx8fHwxNzY0OTg5ODIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Nuestros momentos especiales'
  },
  {
    url: 'https://images.unsplash.com/photo-1597241612345-a3964d7022ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB0b2dldGhlciUyMGhhcHB5fGVufDF8fHx8MTc2NDk1OTIxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Felices juntos'
  },
  {
    url: 'https://images.unsplash.com/photo-1578680034138-b2ee53f2cc50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3ZlJTIwaGVhcnQlMjByb21hbnRpY3xlbnwxfHx8fDE3NjUwMzg0MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Amor verdadero'
  },
  {
    url: 'https://images.unsplash.com/photo-1752154424950-6ed25cfa7ee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzdW5zZXQlMjB0b2dldGhlcnxlbnwxfHx8fDE3NjUwNTMxMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    caption: 'Atardeceres contigo'
  }
];

export function Gallery() {
  const [photos, setPhotos] = useState<Array<{ url: string; caption?: string }>>(remotePhotos);
  const [localImageUrls, setLocalImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const filenameToCaption = (url: string) => {
      try {
        const last = url.split('/').pop() || url;
        const name = last.split('?')[0];
        const noExt = name.replace(/\.[^/.]+$/, '');
        const cleaned = noExt.replace(/[-_]+/g, ' ').trim();
        return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
      } catch {
        return '';
      }
    };

    // Cargar imágenes locales desde src/assets/images usando Vite (import.meta.glob)
    try {
      const modules = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true, as: 'url' }) as Record<string, string>;
      const urls = Object.values(modules || {});
      const local = urls.map((url) => ({ url, caption: filenameToCaption(url) }));
      if (urls.length > 0) {
        setLocalImageUrls(urls);
        // dejamos photos como fallback o para mostrar alternativas
        setPhotos(local.slice(0, 6));
      }
    } catch (e) {
      // Si la build/versión de Vite no soporta "as: 'url'", intenta una alternativa
      try {
        // import.meta.glob con eager true devolverá módulos; extraemos el default
        const mods = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true }) as Record<string, any>;
        const urls = Object.values(mods)
          .map((m) => (typeof m === 'string' ? m : m.default))
          .filter(Boolean) as string[];
        const local = urls.map((url) => ({ url, caption: filenameToCaption(url) }));
        if (urls.length > 0) {
          setLocalImageUrls(urls);
          setPhotos(local.slice(0, 6));
        }
      } catch (err) {
        // no hacemos nada, usamos el fallback remoto
        console.warn('No se pudieron cargar imágenes locales automáticamente:', err);
      }
    }
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-pink-600 mb-12"
        >
          Nuestros Recuerdos
        </motion.h2>

        {localImageUrls.length >= 2 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localImageUrls.slice(0, 2).map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative overflow-hidden rounded-3xl shadow-2xl h-96"
              >
                <img
                  src={url}
                  alt={photos[i]?.caption ?? `Foto destacada ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                className="relative group overflow-hidden rounded-2xl shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden bg-pink-100">
                  <img
                    src={photo.url}
                    alt={photo.caption ?? `foto-${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white text-center">{photo.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-600 italic"
        >
          {/* Reemplaza estas fotos con las tuyas propias */}
          Cada foto cuenta una historia de nuestro amor
        </motion.p>
      </div>
    </section>
  );
}
