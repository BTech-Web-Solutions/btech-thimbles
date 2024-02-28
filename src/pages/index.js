import { useEffect, useState } from "react";
import img0 from "../../public/assets/img0.jpg";
import img1 from "../../public/assets/img1.jpg";
import img2 from "../../public/assets/img2.jpg";
import img3 from "../../public/assets/img3.jpg";

export default function Home() {
  const [signal, setSignal] = useState("---");
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [finished, setFinished] = useState(false);
  const [randomImage, setRandomImage] = useState(img0.src); // State to hold the random image

  const beforeRun = (e) => {
    setRandomImage(img0.src); // Reset randomImage state to img0
    setSignal("---"); // Reset signal state
    setIsAnalyzing(true);
    setTimeout(() => {
      e.target.classList.remove("bg-[#ff0000]");
    }, 1000);

    setTimeout(() => {
      setIsAnalyzing(false);
      setFinished(true); // Set finished to true to trigger image change
    }, 2000);

    if (isRunning === true) {
      e.target.classList.add("bg-[#af7d20]");
    }
  };

  const randomImg = () => {
    const imgs = [img1, img2, img3];
    const random = Math.floor(Math.random() * imgs.length);
    return imgs[random].src;
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);

      if (counter === 0) {
        setIsRunning(false);
      }

      return () => clearInterval(interval);
    }
  }, [counter, isRunning]);

  useEffect(() => {
    const btn = document.querySelector("button");

    if (isAnalyzing) {
      btn.classList.add("bg-[#ff0000]");
      btn.innerHTML = "Analisando...";

      setTimeout(() => {
        btn.classList.remove("bg-[#ff0000]");
        btn.classList.add("bg-[#f59e07]");
        btn.innerHTML = "Sinal Encontrado!";
      }, 1000);
    }
  }, [isAnalyzing]);

  // Update random image when finished changes
  useEffect(() => {
    if (finished) {
      const random = randomImg();
      setRandomImage(random); // Update randomImage state with the new random image

      switch (random) {
        case img1.src:
          setSignal("Primeiro Copo");
          break;
        case img2.src:
          setSignal("Segundo Copo");
          break;
        case img3.src:
          setSignal("Terceiro Copo");
          break;
        default:
          setSignal("---");
          break;
      }

      setCounter(10); // Reset counter to 10
      setIsRunning(true); // Start the countdown
      setFinished(false); // Reset finished state
    }
  }, [finished]);

  return (
    <main className="mx-auto">
      <div className="p-5 text-5xl flex flex-col items-center gap-5">
        <h1>Thimbles</h1>
        <img
          src={randomImage} // Use randomImage state here
          alt="Thimbles"
          className="h-[350px] rounded-xl"
        />

        <div className="bg-[#2e1708] w-[100%] flex flex-col items-center rounded-xl p-2 shadow-lg">
          <h1 className="text-[#FF5733] font-medium text-sm">SINAL</h1>
          <h2 className="text-white font-medium text-2xl">{signal}</h2>
        </div>

        <button
          className={`${
            isRunning === false ? "bg-[#309009]" : "bg-[#af7d20] text-zinc-400"
          } w-[100%] p-2 text-2xl font-medium rounded-xl flex justify-center items-center gap-2 cursor-pointer`}
          onClick={beforeRun}
        >
          {isRunning
            ? `${counter} ${counter === 1 ? "segundo" : "segundos"}`
            : "Gerar Sinal"}
        </button>
        <iframe
          id="frame"
          src="https://saturnobet.com/game/evoplay-thimbles?r=AFILIADO-CODIGO"
          className="iframe-perestop"
        />
      </div>
    </main>
  );
}
