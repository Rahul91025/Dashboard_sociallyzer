import React, { useState } from 'react';
import { Upload as UploadIcon } from 'lucide-react';
import Papa from 'papaparse';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <ErrorMessage message="Please sign in to upload data" />;
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('');

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          const { error } = await supabase
            .from('social_engagement')
            .insert(
              results.data.map((row: any) => ({
                post_type: row.post_type,
                likes: parseInt(row.likes) || 0,
                shares: parseInt(row.shares) || 0,
                comments: parseInt(row.comments) || 0,
                user_id: user.id
              }))
            );

          if (error) throw error;
          setMessage('Data uploaded successfully!');
        } catch (error: any) {
          console.error('Error:', error);
          setMessage(error.message || 'Error uploading data. Please try again.');
        } finally {
          setUploading(false);
        }
      },
      error: (error) => {
        console.error('Error:', error);
        setMessage('Error parsing CSV file. Please check the format.');
        setUploading(false);
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Data</h1>
      
      <div className="max-w-xl bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
          <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            Upload CSV File
          </p>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Drag and drop your CSV file here, or click to select
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            disabled={uploading}
          />
          <label
            htmlFor="file-upload"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
          >
            {uploading ? 'Uploading...' : 'Select File'}
          </label>
        </div>
        
        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}
        
        <div className="mt-6">
          <h3 className="font-medium text-gray-700 mb-2">CSV Format Requirements:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>File must be in CSV format</li>
            <li>Required columns: post_type, likes, shares, comments</li>
            <li>Numbers should be integers</li>
            <li>First row should be column headers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Upload;