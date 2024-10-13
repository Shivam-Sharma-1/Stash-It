'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Download } from 'lucide-react';
import shareAsset from '@/server/share-asset';

export default function DownloadButton({ cid, filename = 'download' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = await shareAsset(cid);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      setError('Failed to download file. Please try again.');
      console.error('Download error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center gap-2'>
      <Button
        variant='ghost'
        onClick={handleDownload}
        disabled={isLoading}
        className='w-full text-sm flex flex-row font-normal items-center justify-start hover:bg-secondary px-2 py-1.5 gap-2'
      >
        {isLoading ? (
          <>
            <Loader2 className='h-4 w-4 animate-spin' />
            Downloading...
          </>
        ) : (
          <>
            <Download className='h-4 w-4' />
            Download
          </>
        )}
      </Button>
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
}
