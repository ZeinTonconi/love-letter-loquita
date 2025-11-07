import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchLetters, type Letter } from "../api/letters";

// 📅 Fecha de inicio (en Bolivia)
const startDate = new Date("2025-11-03T00:00:00-04:00");

const LetterOpened = () => {
  const [letter, setLetter] = useState<Letter | null>(null);

  // 🕓 Obtener "fecha actual" en horario de Bolivia (UTC-4)
  const getBoliviaDate = () => {
    const now = new Date();
    // Convertir a UTC y restar 4 horas para obtener la hora boliviana
    const boliviaOffsetMs = -4 * 60 * 60 * 1000;
    const boliviaTime = new Date(now.getTime() + boliviaOffsetMs);
    return new Date(boliviaTime.toDateString()); // solo la fecha (sin horas)
  };

  useEffect(() => {
    const loadLetter = async () => {
      try {
        const letters = await fetchLetters();
        if (letters.length > 0) {
          const today = getBoliviaDate();

          const diffDays = Math.floor(
            (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          const index = Math.max(0, diffDays % letters.length);
          setLetter(letters[index]);
        }
      } catch (err) {
        console.error("Error fetching letters:", err);
      }
    };

    loadLetter();
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center pointer-events-auto"
      style={{ zIndex: 10 }}
    >
      <motion.div
        className="
          relative 
          bg-[url('/images/paper-texture.png')] bg-cover bg-center
          drop-shadow-2xl rounded-2xl overflow-hidden
          flex flex-col items-center justify-center text-center
          w-[55vw] max-w-[950px] aspect-[4/3]
          xl:w-[55vw] xl:max-w-[950px]
          lg:w-[60vw] lg:max-w-[900px]
          md:w-[70vw] md:aspect-[4/3]
          sm:w-[85vw] sm:aspect-[3/4]
        "
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div
          className="
            relative z-10 px-14 py-12
            md:px-10 md:py-8
            sm:px-6 sm:py-6
            text-[#3b2a1a] font-serif leading-relaxed
            overflow-y-auto max-h-[75%]
          "
        >
          {letter ? (
            <>
              <h2 className="text-5xl font-bold mb-6 sm:text-3xl md:text-4xl leading-tight">
                {letter.title}
              </h2>

              <p
                className="
                  text-2xl md:text-xl sm:text-lg 
                  mb-8 whitespace-pre-line
                  leading-relaxed sm:leading-normal
                "
              >
                {letter.content}
              </p>

              <blockquote
                className="italic text-2xl md:text-lg sm:text-base text-[#5b4636] mt-6"
              >
                “{letter.quote}”
              </blockquote>
            </>
          ) : (
            <p className="text-2xl sm:text-lg text-gray-600 italic">
              Cargando tu carta de amor...
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LetterOpened;
