import React from 'react';
import { toPng } from 'html-to-image';
import { Award } from 'lucide-react';

interface CertificateProps {
  onClose: () => void;
}

export function Certificate({ onClose }: CertificateProps) {
  const certificateRef = React.useRef<HTMLDivElement>(null);

  const downloadCertificate = async () => {
    if (certificateRef.current) {
      const dataUrl = await toPng(certificateRef.current);
      const link = document.createElement('a');
      link.download = 'puzzle-completion-certificate.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div ref={certificateRef} className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg border-8 border-double border-gold">
          <div className="text-center">
            <Award className="w-16 h-16 mx-auto text-gold mb-4" />
            <h2 className="text-3xl font-bold mb-4">Certificate of Completion</h2>
            <p className="text-lg mb-2">This certifies that</p>
            <p className="text-2xl font-bold mb-4">Roots and Riddles</p>
            <p className="text-lg mb-8"> level 1 has successfully completed </p>
            <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={downloadCertificate}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Download Certificate
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}