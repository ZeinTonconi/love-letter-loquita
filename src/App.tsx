import { useState } from "react";
import ImageBackground from "./components/ImageBackground";
import EnvelopeView from "./components/EnvelopeView";
import LetterOpened from "./components/LetterOpened";

function App() {
  const [opened, setOpened] = useState(false);
  const allImages = [
    "/images/img1.png",
    "/images/img2.png",
    "/images/img3.png",
    "/images/img4.png",
    "/images/img5.png",
    "/images/img6.png",
    "/images/img7.png",
  ]
  const images = allImages.sort(() => Math.random() - 0.5).slice(0,5)

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Background always behind */}
      <div className="absolute inset-0 z-0">
        <ImageBackground images={images} />
      </div>

      {/* Envelope or letter centered above */}
      {opened ? (
        <LetterOpened />
      ) : (
        <EnvelopeView onOpen={() => setOpened(true)} />
      )}
    </div>
  );
}

export default App;
