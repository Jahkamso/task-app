import HomePage from "./home";
import Navbar from "./navbar";


export default function Home() {
  return (
    <main className="min-h-screen w-[100%] py-[3%] px-[5%] md:px-[10%]">
      <div className="flex flex-col gap-[100px] md:gap-[100px]">
        <Navbar />
        <HomePage />
      </div>
    </main>
  );
}
