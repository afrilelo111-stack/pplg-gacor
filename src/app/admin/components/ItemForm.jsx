/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useRef, useEffect } from "react";
import { uploadImage } from "@/lib/uploadImage";
import { addItem, updateItem } from "@/app/admin/dashboard/actions";
import {
  UploadCloud,
  Image as ImageIcon,
  FileText,
  Check,
  X,
  AlertCircle,
} from "lucide-react";

export default function ItemForm({
  itemToEdit = null,
  onCancelEdit = () => {},
  onSuccess = () => {},
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const formRef = useRef(null);

  const isEditing = !!itemToEdit;

  useEffect(() => {
    if (isEditing && itemToEdit?.image_url) {
      setImagePreview(itemToEdit.image_url);
    } else {
      setImagePreview(null);
      formRef.current?.reset();
    }
  }, [itemToEdit, isEditing]);

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    const imageFile = formData.get("image");

    let finalImageUrl = isEditing
      ? itemToEdit.image_url
      : null;

    // Upload image
    if (imageFile && imageFile.size > 0) {
      try {
        finalImageUrl = await uploadImage(imageFile);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        return;
      }
    }

    if (!finalImageUrl) {
      setError("Gambar wajib diunggah.");
      setIsLoading(false);
      return;
    }

    const submitFormData = new FormData();

    submitFormData.set("imageUrl", finalImageUrl);

    submitFormData.set(
      "description",
      formData.get("description")
    );

    let result;

    try {
      if (isEditing) {
        result = await updateItem(
          itemToEdit.id,
          submitFormData
        );
      } else {
        result = await addItem(submitFormData);
      }
    } catch (err) {
      setError("Terjadi kesalahan: " + err.message);
      setIsLoading(false);
      return;
    }

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      if (onSuccess) onSuccess();

      if (!isEditing) {
        formRef.current?.reset();
        setImagePreview(null);
      } else {
        onCancelEdit();
      }

      setIsLoading(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/70 backdrop-blur-xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.25)] p-8 md:p-10 space-y-8"
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_1px_1px,_black_1px,_transparent_0)] bg-[size:24px_24px]" />

      {/* HEADER */}
      <div className="relative flex items-center justify-between pb-5 border-b border-slate-200/70">

        <div className="flex items-center gap-4">

          <div
            className={`relative p-4 rounded-2xl shadow-lg ${
              isEditing
                ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                : "bg-gradient-to-br from-indigo-500 to-blue-600 text-white"
            }`}
          >
            {isEditing ? (
              <ImageIcon size={22} />
            ) : (
              <UploadCloud size={22} />
            )}
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {isEditing
                ? "Edit Project"
                : "Create New Project"}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Upload and manage your showcase content
            </p>
          </div>

        </div>

      </div>

      {/* ERROR */}
      {error && (
        <div className="relative flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-sm font-semibold text-rose-600 animate-in fade-in duration-300">

          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
            <AlertCircle size={18} />
          </div>

          <p>{error}</p>

        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* IMAGE AREA */}
        <div className="lg:col-span-2 space-y-3">

          <label className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">
            Project Image
          </label>

          <div className="relative border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-3xl p-5 shadow-inner flex flex-col items-center justify-center min-h-[320px] overflow-hidden group hover:scale-[1.02] transition-all duration-300">

            {imagePreview ? (
              <div className="absolute inset-0 group/preview">

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover scale-105 group-hover/preview:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover/preview:opacity-100 transition-all duration-300 flex flex-col items-center justify-center text-center p-6">

                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-4 border border-white/20">
                    <UploadCloud
                      size={28}
                      className="text-white"
                    />
                  </div>

                  <p className="text-white font-bold text-sm">
                    Click to change image
                  </p>

                  <p className="text-slate-300 text-xs mt-1">
                    PNG, JPG, WEBP
                  </p>

                </div>
              </div>
            ) : (
              <div className="text-center relative z-10">

                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center mx-auto shadow-xl mb-5">
                  <UploadCloud size={36} />
                </div>

                <h4 className="text-lg font-black text-slate-900 mb-2">
                  Upload Your Image
                </h4>

                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Drag and drop your image here or click
                  to browse files from your device.
                </p>

              </div>
            )}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required={!isEditing}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

          </div>
        </div>

        {/* FORM AREA */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-6">

          <div className="space-y-3">

            <label className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">
              Project Description
            </label>

            <div className="relative group">

              <span className="absolute left-4 top-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                <FileText size={18} />
              </span>

              <textarea
                name="description"
                rows="10"
                required
                placeholder="Write detailed information about your project, technology used, goals, and important features..."
                defaultValue={
                  itemToEdit?.description || ""
                }
                className="w-full bg-white/80 backdrop-blur border border-slate-200 rounded-3xl pl-12 pr-5 py-5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800 placeholder-slate-400 resize-none shadow-sm"
              />

            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex items-center justify-end gap-3 pt-2">

            {isEditing && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-5 py-4 rounded-2xl transition-all duration-300 active:scale-95"
              >
                <X size={16} />
                <span>Cancel</span>
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`relative overflow-hidden inline-flex items-center gap-2 font-bold text-sm px-6 py-4 rounded-2xl shadow-xl transition-all duration-300 active:scale-95 text-white disabled:opacity-50 ${
                isEditing
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-105"
                  : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:scale-105"
              }`}
            >

              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>

                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>
                    {isEditing
                      ? "Save Changes"
                      : "Publish Project"}
                  </span>
                </>
              )}

            </button>

          </div>
        </div>

      </div>
    </form>
  );
}