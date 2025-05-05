"use client";
import { useState } from 'react';
import { FiUpload, FiTrash2, FiKey } from 'react-icons/fi';
import Image from 'next/image';

export default function GestionarCuenta() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    ciudad: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-[500px] h-full bg-white rounded-[50px] shadow-md p-8 mx-auto my-5 flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-3">
        <Image 
          src={profileImage || '/images/profileDefault.png'} 
          alt="Foto de perfil" 
          width={150}
          height={150}
          className="rounded-full object-cover"
        />
        <button 
          onClick={handleRemoveImage}
          className="bg-transparent text-red-500 border-none px-2 py-1 rounded text-sm cursor-pointer transition-colors hover:text-red-400"
        >
          Eliminar foto
        </button>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <label className="flex flex-col justify-center items-center w-full h-[70px] bg-white rounded-xl shadow-md cursor-pointer text-2xl text-purple-900 transition-colors hover:bg-gray-100 hover:text-purple-800">
          <FiUpload className="text-2xl" />
          <span className="text-sm mt-1 font-sans text-purple-900">Importar foto</span>
          <input 
            type="file" 
            id="cambiarFoto" 
            accept="image/*" 
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <input 
          type="text" 
          name="nombre" 
          placeholder="Nombre" 
          value={formData.nombre}
          onChange={handleInputChange}
          className="h-10 px-5 py-2 rounded-xl shadow-md text-sm border-none"
        />
        <input 
          type="text" 
          name="apellido" 
          placeholder="Apellido" 
          value={formData.apellido}
          onChange={handleInputChange}
          className="h-10 px-5 py-2 rounded-xl shadow-md text-sm border-none"
        />
        <input 
          type="email" 
          name="correo" 
          placeholder="Correo" 
          value={formData.correo}
          onChange={handleInputChange}
          className="h-10 px-5 py-2 rounded-xl shadow-md text-sm border-none"
        />
        <input 
          type="tel" 
          name="telefono" 
          placeholder="Teléfono" 
          value={formData.telefono}
          onChange={handleInputChange}
          className="h-10 px-5 py-2 rounded-xl shadow-md text-sm border-none"
        />
        <input 
          type="text" 
          name="ciudad" 
          placeholder="Ciudad de residencia" 
          value={formData.ciudad}
          onChange={handleInputChange}
          className="h-10 px-5 py-2 rounded-xl shadow-md text-sm border-none"
        />

        <button 
          type="submit" 
          className="bg-purple-900 text-white border-none py-3 rounded-full cursor-pointer text-base transition-colors hover:bg-purple-800"
        >
          Guardar cambios
        </button>
      </form>

      <div className="flex justify-start gap-4 mt-5 w-full">
        <button className="flex items-center gap-2 bg-transparent border-none text-purple-900 text-sm cursor-pointer transition-colors hover:text-purple-800">
          <FiTrash2 className="text-lg" />
          Eliminar cuenta
        </button>
        <button className="flex items-center gap-2 bg-transparent border-none text-purple-900 text-sm cursor-pointer transition-colors hover:text-purple-800">
          <FiKey className="text-lg" />
          Cambiar contraseña
        </button>
      </div>
    </div>
  );
}
