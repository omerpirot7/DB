import { useState } from 'react';
import apiClient from '../api/client';
import { useLanguage } from '../context/LanguageProvider';

export default function ImageUploader({ productId, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { t } = useLanguage();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    // Mock upload: we create a fake image record
    const newImage = {
      id: Date.now().toString(),
      product_id: productId,
      filename: file.name,
      url: URL.createObjectURL(file), // create temporary preview
      alt_text: 'Newly uploaded image',
      tags: ['user_upload'],
      uploaded_by: 'admin',
      created_at: new Date().toISOString()
    };

    try {
      await apiClient.post('/images', newImage);
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
      alert(t('mockUploadSuccess'));
    } catch (err) {
      console.error(err);
      alert(t('uploadFailed'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-md bg-gray-50">
      <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('uploadNewImageMock')}</h4>
      <form onSubmit={handleUpload} className="flex gap-2 items-center">
        <input 
          type="file" 
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
          className="text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
        <button 
          type="submit" 
          disabled={uploading || !file}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm disabled:bg-gray-400"
        >
          {uploading ? t('uploading') : t('upload')}
        </button>
      </form>
    </div>
  );
}