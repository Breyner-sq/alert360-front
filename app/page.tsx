import Image from "next/image";
import InicioSesion from "@/components/InicioSesion";
export default function Home() {
  return (
    <div className="w-full flex items-center justify-center min-h-screen h-screen">
      <div className="2xl:max-w-8xl md:flex-row flex-col p-4 w-full h-full flex items-center justify-center gap-8 min-h-screen">
        <Image
          className="select-none max-md:basis-1/2 md:size-[20rem] lg:size-[26rem] xl:size-[30rem] p-8"
          src="/logo.svg"
          alt="Alert360 logo"
          width={360}
          height={38}
          priority
        />
        <InicioSesion />
      </div>
    </div>
  );
}
