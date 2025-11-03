import { motion } from "framer-motion";
import type { Letter } from "../api/letters";

interface Props {
  letter: Letter;
}

const LetterView = ({ letter }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="max-w-2xl mx-auto text-center text-gold"
    >
      <h2 className="text-2xl font-serif text-amber-300 mb-2">{letter.title}</h2>
      {letter.quote && (
        <p className="italic text-sm text-gray-400 mb-4">“{letter.quote}”</p>
      )}
      <p className="text-lg text-gray-200 leading-relaxed">{letter.content}</p>
    </motion.div>
  );
};

export default LetterView;
