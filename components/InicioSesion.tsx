"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const modes = [
  { texto: "INICIA SESIÓN", modo: "signin" },
  { texto: "CREAR CUENTA", modo: "signup" },
]

export default function InicioSesion() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  return (
    <div className="bg-secondary w-full max-w-[32rem] rounded-3xl flex flex-col p-10 gap-4">
      <div className="flex justify-center">
        {modes.map((m) => (
          <Link
            key={m.modo}
            className="text-white font-bold text-lg relative cursor-pointer px-2"
            href={{ pathname: "/auth", query: { mode: m.modo } }}
            replace
          >
            {m.texto}
            {mode === m.modo && (
              <motion.span
                layout
                layoutId="activeLink"
                transition={{
                  type: "spring",
                  bounce: 0,
                }}
                className="absolute bottom-0 left-0 rounded-full h-1 w-full bg-terciary z-[10]"
              />
            )}
          </Link>
        ))}
      </div>
      <div className="flex-1">
        {mode === "signin" && <Login />}
        {mode === "signup" && <Signup />}
      </div>
    </div>
  );
}

function FormularioContenedor({ mode, children }: { mode: string; children: React.ReactNode }) {
  return <form className="w-full gap-3 flex flex-col h-56" onSubmit={(e) => {
    e.preventDefault();
    alert(mode);
  }}>
    <div className="flex flex-col flex-1 gap-2 h-full overflow-y-auto scrollbar-thumb-terciary">
      {children}
    </div>
    <div className="flex flex-col gap-2">
      {mode === "login" && <Link href={"#"} className="text-terciary text-end mt-2 underline">¿Olvidaste tu contraseña?</Link>}
      <button className="button-terciary">{mode === "login" ? "Iniciar sesión" : "Crear cuenta"}</button>
    </div>
  </form>;
}

function Login() {
  return <FormularioContenedor mode="login">
    <input type="email" placeholder="Correo electrónico" />
    <input type="password" placeholder="Contraseña" />
  </FormularioContenedor>;
}

function Signup() {
  return <FormularioContenedor mode="signup">
    <input type="text" placeholder="Nombre(s)" />
    <input type="text" placeholder="Apellido(s)" />
    <input type="text" placeholder="Telefono" />
    <input type="text" placeholder="Ciudad" />
    <input type="email" placeholder="Correo electrónico" />
    <input type="password" placeholder="Contraseña" />
    <input type="password" placeholder="Confirma tu contraseña" />
  </FormularioContenedor>;
}
