
import { useState } from 'react';
import { Map } from '@/components/maps/Map';
import axios from 'axios';
import { Geocoder } from './maps/GeoCoder';

interface ReportForm {
  title: string;
  description: string;
  categories: string[];
  images: File[];
  location: string;
  latitude?: number;
  longitude?: number;
}

const ReportPage: React.FC = () => {
  const [form, setForm] = useState<ReportForm>({
    title: '',
    description: '',
    categories: [],
    images: [],
    location: '',
  });

  const handleSelectCoords = (coords: { latitude: number; longitude: number }) => {
    setForm(f => ({ ...f, latitude: coords.latitude, longitude: coords.longitude }));
  };

  const handleGeocoderResult = (data: { location: string; latitude: number; longitude: number }) => {
    setForm(f => ({
      ...f,
      location: data.location,
      latitude: data.latitude,
      longitude: data.longitude,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files) {
        setForm(f => ({ ...f, images: e.target.files ? Array.from(e.target.files) : [] }));
      }
    }
  };

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createReport = async () => {
    setError(null);
    setSuccess(null);
    const { title, description, location } = form;
    if (!title || !description || !location) {
      setError('Por favor completa todos los campos obligatorios.');
      return;
    }
    try {
      const fd = new FormData();
      const { title, description, categories, images, location } = form;
      fd.append('report', JSON.stringify({ title, description, categories, location }));
      images.forEach((file) => fd.append('images', file));
      const res = await axios.post('/reports', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Reporte creado exitosamente.');
      console.log('Created:', res.data);
    } catch (err: unknown) {
      const error = err as Error;
      if ('response' in error) {
        setError(error?.message || 'Error al crear el reporte');
      } else {
        setError(error.message || 'Error al crear el reporte');
      }
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Crear Reporte</h1>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}

      <input
        type="text"
        placeholder="Título"
        value={form.title}
        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        className="border p-2 w-full"
      />

      <textarea
        placeholder="Descripción"
        value={form.description}
        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        className="border p-2 w-full"
      />

      <input type="file" multiple onChange={handleFileChange} />

      <Geocoder onResult={handleGeocoderResult} />

      <Map onSelect={handleSelectCoords} />

      <button
        onClick={createReport}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Enviar Reporte
      </button>
    </div>
  );
};

export default ReportPage;
