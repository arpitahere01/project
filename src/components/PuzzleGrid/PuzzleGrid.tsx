import React, {useState} from 'react';
import PuzzlePiece from './PuzzlePiece';
import Notification from '../Notification/Notification';
import { Certificate } from '../Certificate';
import { usePuzzle } from '../../hooks/usePuzzle';

const PuzzleGrid: React.FC = () => {
  const {
    pieces,
    counter,
    notification,
    handleImageUpload,
    handlePieceFlip,
    handleHintUpdate,
    hideNotification,
  } = usePuzzle();

  const [showCertificate, setShowCertificate] = useState(false); // Track whether to show certificate

  // Function to handle closing the certificate modal
  const handleCloseCertificate = () => {
    setShowCertificate(false); // Close the certificate
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <h2 className="text-2xl font-bold text-gray-800">Memory Puzzle Grid</h2>
      <p className="text-gray-600 text-center max-w-md">
        Upload images that match the target images. When you find a match, 
        the piece will flip and you can add information about the place!
      </p>

      {counter === 9 && !showCertificate && (
        <button
          onClick={() => setShowCertificate(true)} // Show the certificate when counter is 9
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
        >
          Show Certificate
        </button>
      )}

{showCertificate && <Certificate onClose={handleCloseCertificate} />} {/* Pass the onClose function */}

      
      <div className="grid grid-cols-3 gap-2 bg-gray-200 p-2 rounded-lg">
        {pieces.map((piece) => (
          <div key={piece.id} className="w-[200px] h-[200px]">
            <PuzzlePiece
              pieceId={piece.id}
              isFlipped={piece.isFlipped}
              hint={piece.hint}
              targetImage={piece.targetImage}
              isMatched={piece.isMatched}
              backgroundImage={null}
              onFlip={() => handlePieceFlip(piece.id)}
              onHintUpdate={(hint) => handleHintUpdate(piece.id, hint)}
              onImageUpload={handleImageUpload}
              backgroundPosition=""
            />
          </div>
        ))}
      </div>

      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
};

export default PuzzleGrid;