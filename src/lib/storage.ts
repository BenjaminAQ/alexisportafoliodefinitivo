// Storage helpers for uploading images and files to Firebase Storage.
// In preview mode (no Firebase), converts files to data URLs (base64) so
// uploads still work locally.

import { storage, db } from "./firebase";

export interface UploadedFile {
  url: string;       // download URL or data URL
  path: string;      // storage path or "data-url"
  name: string;      // original filename
  type: string;      // mime type
  size: number;      // bytes
}

/**
 * Upload an image/file. Returns a download URL that can be stored in Firestore.
 * - Firebase configured: uploads to gs://bucket/uploads/{uid}/{timestamp}-{name}
 * - Preview mode: returns a data URL (base64) — stored in localStorage.
 */
export async function uploadFile(
  file: File,
  uid: string,
  folder: string = "uploads"
): Promise<UploadedFile> {
  if (storage && db) {
    const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${folder}/${uid}/${Date.now()}-${safeName}`;
    const storageRef = ref(storage, path);
    const snap = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snap.ref);
    return {
      url,
      path,
      name: file.name,
      type: file.type,
      size: file.size,
    };
  }
  // Preview fallback: data URL
  const dataUrl = await fileToDataUrl(file);
  return {
    url: dataUrl,
    path: "data-url",
    name: file.name,
    type: file.type,
    size: file.size,
  };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Delete a file from storage (by path). No-op for data URLs.
 */
export async function deleteFile(path: string): Promise<void> {
  if (storage && path && path !== "data-url") {
    const { ref, deleteObject } = await import("firebase/storage");
    try {
      await deleteObject(ref(storage, path));
    } catch {
      // ignore — file may already be gone
    }
  }
}
