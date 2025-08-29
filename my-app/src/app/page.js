import Image from "next/image";
import Navbar from "./components/Navbar";
import Input from "./components/Input";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="sm:w-[640px] w-full m-auto p-4">
      <div className="flex flex-col gap-5">
        <Navbar />
        <h1 className="text-center text-5xl font-mono">Badvice</h1>
        <p className="text-center" style={{ color: "#b3b3b3" }}>
          Because sometimes you need advice that's brutally honest
        </p>
        <Input />
        <Footer />
      </div>
    </div>
  );
}
