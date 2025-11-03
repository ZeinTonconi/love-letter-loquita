import { motion } from "framer-motion";

interface Props {
  onOpen: () => void;
}

const EnvelopeView = ({ onOpen }: Props) => {
  return (
    <div
      className="
        fixed inset-0 
        flex items-center justify-center 
        w-screen h-screen 
        pointer-events-auto
      "
      onClick={onOpen}
      style={{ zIndex: 10, position: "fixed" }} // explicitly create stacking context
    >
      <motion.img
        src="/images/envelope.png"
        alt="Envelope"
        className="
          w-[55vw] min-w-[300px]
          h-auto object-contain 
          drop-shadow-2xl cursor-pointer
          relative z-10
        "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ zIndex: 10, position: "relative" }}
      />
    </div>
  );
};

export default EnvelopeView;
