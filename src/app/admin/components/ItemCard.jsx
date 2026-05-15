// src/app/admin/components/ItemCard.jsx
'use client';
import Image from 'next/image';
import { useTransition } from 'react';

export default function ItemCard({ item, onEdit, onDelete }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
      <Image 
        src={item.image_url} 
        alt={item.description}
        width={400}
        height={192}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-gray-700 text-sm">{item.description}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Edit
          </button>
          <button
            onClick={() => startTransition(() => onDelete(item.id))}
            disabled={isPending}
            className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            {isPending ? 'Menghapus...' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  );
}