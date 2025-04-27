import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    return <div className="bg-white p-4 gap-8 flex flex-col justify-between items-center drop-shadow-2xl">
        <Link href={"#"}><Image className="size-8" src={"/menu.svg"} width={64} height={64} alt={""} /></Link>
        <div className="flex gap-4 flex-col h-full">
            <Link href={"#"}><Image className="size-8" src={"/search.svg"} width={64} height={64} alt={""} /></Link>
            <Link href={"#"}><Image className="size-8" src={"/home.svg"} width={64} height={64} alt={""} /></Link>
            <Link href={"#"}><Image className="size-8" src={"/plus-square.svg"} width={64} height={64} alt={""} /></Link>
            <Link href={"#"}><Image className="size-8" src={"/archive.svg"} width={64} height={64} alt={""} /></Link>
        </div>
        <Link href={"/"}><Image className="size-8" src={"/logout.svg"} width={64} height={64} alt={""} /></Link>
    </div>;
}
