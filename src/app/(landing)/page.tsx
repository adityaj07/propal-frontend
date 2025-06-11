import BackgroundImage from "./_components/BackgroundImage";
import Hero from "./_components/Hero";


export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center lg:p-16 -mt-24 ">
        <BackgroundImage />
        <div className="w-[98%] md:w-[80%] lg:w-[60%] mx-auto mb-20">
          <Hero />
        </div>
      </main>
    </>
  );
}
