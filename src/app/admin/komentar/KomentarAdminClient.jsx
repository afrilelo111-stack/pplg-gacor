'use client';

import { useState } from 'react';
import { deleteKomentar, updateKomentar } from './actions';
import Navbar from '../components/Navbar';

export default function KomentarClient({ initialKomentar = [], error = null }) {
  const [komentar, setKomentar] = useState(initialKomentar);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [message, setMessage] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm('Yakin hapus komentar ini?')) return;
    const result = await deleteKomentar(id);
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setKomentar(komentar.filter(k => k.id !== id));
      setMessage({ type: 'success', text: 'Komentar dihapus' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEdit = (k) => {
    setEditingId(k.id);
    setEditText(k.isi);
  };

  const handleSave = async (id) => {
    const formData = new FormData();
    formData.set('isi', editText);
    const result = await updateKomentar(id, formData);
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setKomentar(komentar.map(k => k.id === id ? { ...k, isi: editText } : k));
      setEditingId(null);
      setMessage({ type: 'success', text: 'Komentar diperbarui' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Manajemen Komentar</h1>

        {error && (
          <div className="mb-4 p-2 rounded bg-red-100 text-red-700">
            Error: {error}
          </div>
        )}

        {message && (
          <div className={`mb-4 p-2 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}

        {komentar.length === 0 ? (
          <p className="text-gray-500">Belum ada komentar.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">ID</th>
                  <th className="py-2 px-4 border">Nama</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Komentar</th>
                  <th className="py-2 px-4 border">Tanggal</th>
                  <th className="py-2 px-4 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {komentar.map((k) => (
                  <tr key={k.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border text-center">{k.id}</td>
                    <td className="py-2 px-4 border">{k.nama}</td>
                    <td className="py-2 px-4 border">{k.email || '-'}</td>
                    <td className="py-2 px-4 border">
                      {editingId === k.id ? (
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full border rounded p-1"
                          rows="2"
                        />
                      ) : (
                        k.isi
                      )}
                    </td>
                    <td className="py-2 px-4 border text-sm">
                      {new Date(k.created_at).toLocaleString('id-ID')}
                    </td>
                    <td className="py-2 px-4 border text-center space-x-2">
                      {editingId === k.id ? (
                        <>
                          <button
                            onClick={() => handleSave(k.id)}
                            className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Batal
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(k)}
                            className="bg-indigo-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(k.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                          >
                            Hapus
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}