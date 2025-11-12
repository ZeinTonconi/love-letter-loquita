import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { fetchLetters, type Letter } from "../api/letters";

const LetterOpened = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadLetters = async () => {
      try {
        const data = await fetchLetters();

        // Current time in Bolivia
        const today = new Date();
        const boliviaTime = new Date(
          today.toLocaleString("en-US", { timeZone: "America/La_Paz" })
        );

        // Only show letters up to today's date
        const availableLetters = data
          .filter((letter) => new Date(letter.date) <= boliviaTime)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        setLetters(availableLetters);
        setCurrentIndex(availableLetters.length - 1);
      } catch (err) {
        console.error("Error fetching letters:", err);
      }
    };

    loadLetters();
  }, []);

  // Scroll to top whenever letter changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < letters.length - 1 ? prev + 1 : prev));
  };

  const letter = letters[currentIndex];

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-BO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
          flex flex-col text-center
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
        {/* Header with date and navigation */}
        <div className="flex justify-between items-center w-full px-8 py-4 border-b border-[#3b2a1a]/30">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`text-[#3b2a1a] font-semibold px-4 py-2 rounded-lg border border-[#3b2a1a] 
              hover:bg-[#3b2a1a] hover:text-white transition text-sm md:text-base
              ${currentIndex === 0 ? "opacity-40 cursor-not-allowed" : ""}
            `}
          >
            ⬅️ Anterior
          </button>

          <p className="text-[#3b2a1a] text-lg md:text-xl font-medium">
            {letter ? formatDate(letter.date) : "—"}
          </p>

          <button
            onClick={handleNext}
            disabled={currentIndex === letters.length - 1}
            className={`text-[#3b2a1a] font-semibold px-4 py-2 rounded-lg border border-[#3b2a1a] 
              hover:bg-[#3b2a1a] hover:text-white transition text-sm md:text-base
              ${currentIndex === letters.length - 1 ? "opacity-40 cursor-not-allowed" : ""}
            `}
          >
            Siguiente ➡️
          </button>
        </div>

        {/* Letter content */}
        <div
          ref={contentRef}
          className="
            relative z-10 px-14 py-10
            md:px-10 md:py-8
            sm:px-6 sm:py-6
            text-[#3b2a1a] font-serif leading-relaxed
            overflow-y-auto max-h-[75%]
            scroll-smooth
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
                className="
                  italic text-2xl md:text-lg sm:text-base
                  text-[#5b4636] mt-6
                "
              >
                “{letter.quote}”
              </blockquote>
            </>
          ) : (
            <p className="text-2xl sm:text-lg text-gray-600 italic">
              Aún no hay cartas desbloqueadas... ❤️
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LetterOpened;
