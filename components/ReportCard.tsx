'use client';

import { useState } from 'react';
import Image from 'next/image';
import { increaseImportance } from '@/components/services/reports';

interface Report {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  status: string;
  user: {
    name: string;
    profileImage?: string;
  };
  images: string[];
  likes: number;
  comments: number;
  isVerified?: boolean;
}

interface ReportCardProps {
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(report.likes);
  const handleLike = async () => {
    try {
      const success = await increaseImportance(report.id);
      if (success) {
        setLiked(!liked);
        setLikesCount(prev => liked ? prev - 1 : prev + 1);
      }
    } catch (error) {
      console.error('Error toggling importance:', error);
    }
  };

  if (report.images?.length > 0)
    console.log(report.images[0])

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={report.user.profileImage || '/profileDefault.png'}
              alt={report.user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold">{report.user.name}</span>
            <div className="flex items-center text-sm text-gray-600 space-x-2">
              <span>{report.category}</span>
              <span>•</span>
              <span>{report.location}</span>
              <span>•</span>
              <span>{report.status}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {report.isVerified && (
            <i className="bx bxs-badge-check text-blue-600 text-xl" />
          )}
          <button className="text-gray-600 hover:text-gray-800">
            <i className="bx bx-dots-horizontal-rounded text-xl" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-bold text-lg">{report.title}</h2>
        <p className="text-gray-700">{report.description}</p>
      </div>

      {report.images?.length > 0 && (
        <div className="relative w-full h-64">
          <Image
            src={`/${report.images[0].replace(/\\/g, '/')}`}

            alt={report.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex items-center text-gray-600 space-x-2">
        <i className="bx bx-heart text-red-500 text-xl" />
        <span>{likesCount}</span>
      </div>

      <div className="flex items-center justify-between border-t pt-3">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100 ${liked ? 'text-red-500' : 'text-gray-600'
            }`}
        >
          <i className={`bx ${liked ? 'bxs-heart' : 'bx-heart'} text-xl`} />
          <span>Me importa</span>
        </button>

        <button className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100">
          <i className="bx bx-message-dots text-xl" />
          <span>Comentar</span>
          {report.comments > 0 && (
            <span className="text-sm text-gray-500">({report.comments})</span>
          )}
        </button>
      </div>
    </div>
  );
}
