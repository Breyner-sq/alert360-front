"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
    const [notifications, setNotifications] = useState(false);
    const pathname = usePathname()
    console.log(pathname)
    return <div className={`bg-white py-4 px-8 ${pathname === "/" ? "rounded-full mx-3 mt-3" : ""} border-b-2 border-[#eeeeee] flex justify-between items-center`}>
        <Link className="flex size-8" href={pathname === "/" ? "/app" : "/"} >
            <Image src={"/favicon-dark.svg"} width={64} height={64} alt={""} />
        </Link>
        {pathname === "/" && <div className="flex items-center gap-8">
            <Link href={"#"}>Regístrate</Link>
            <Link href={"#"}>Inicia sesión</Link>
            <Link href={"#"}>Nosotros</Link>
            <Link href={"#"}>Contáctanos</Link>
        </div>}
        {pathname === "/app" && <div className="flex items-center gap-4">
            <Link href={"#"} onClick={() => {
                setNotifications(!notifications)
            }}><Image className="size-8" src={notifications ? "/bell-unread.svg" : "/bell.svg"} width={64} height={64} alt={""} /></Link>
            <Link href={"#"}><Image className="size-8" src={"/user.svg"} width={64} height={64} alt={""} /></Link>
        </div>}
    </div>;
}