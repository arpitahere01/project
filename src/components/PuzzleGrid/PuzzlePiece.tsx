import React, { useState } from 'react';
import { Edit2, Upload, Check } from 'lucide-react';

interface PuzzlePieceProps {
  isFlipped: boolean;
  hint: string;
  backgroundImage: string | null;
  backgroundPosition: string;
  onFlip: () => void;
  onHintUpdate: (hint: string) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>, pieceId: number) => void;
  pieceId: number;
  isMatched: boolean;
  targetImage: string | null;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  isFlipped,
  hint,
  targetImage,
  onFlip,
  onHintUpdate,
  onImageUpload,
  pieceId,
  isMatched,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempHint, setTempHint] = useState(hint);

  // Predefined information based on pieceId
  const predefinedInfo: { [key: number]: string } = {
    1: 'National Art Museum One of the best acquisition hubs of medieval as well as the lichhavi art and history ',
    2: 'Chuma Ganesh  the very first Ganesh temple of Bhaktapur. It is said that the rats of that area beyond their nature scared the cats. ',
     3: 'Pottery square  T square full of  pottery works. It also owns several shrines like the Ganesh shrine, Vishnu temple, etc. ',
      4: 'Chyasalin Mandap A pavilion ; not a temple. There is a Hindu concept that one should not live in front of the glorious deity.', 
      5: '55 Window Palace with its 55 windows stands as a testament to its intricate and unparalleled craftsmanship',
       6: ' Dattatraya temple Oldest square among four charming squares of bhaktapur.',
       7: ' Wood carving museum At once, it used to be the pujari math of Tachupal Chowk but now it is considered one of the significant museums of  Bhaktapur.',
       8: '   Naḥ pukhu was believed to have built in a single night by a wizard in 1168, hence it is also called Guhya pukhu, meaning secretive pond.',
        // 9: 'Information about place 9',
  };

  const handleHintSubmit = () => {
    onHintUpdate(tempHint);
    setIsEditing(false);
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageUpload(e, pieceId);

    // Automatically set hint based on predefined information
    if (predefinedInfo[pieceId]) {
      onHintUpdate(predefinedInfo[pieceId]);
    }
  };

  return (
    <div className="relative w-full h-full perspective-1000">
      <div
        className={`w-full h-full transition-transform duration-700 transform-style-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => !isEditing && onFlip()}
      >
        {/* Front side (Image Upload) */}
        <div
          className="absolute w-full h-full backface-hidden rounded-lg shadow-md overflow-hidden"
          style={{
            backgroundImage: targetImage ? `url(${targetImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {!isMatched && (
            <label className="w-full h-full flex flex-col items-center justify-center bg-gray-100/80 hover:bg-gray-200/80 transition-colors cursor-pointer group">
              <Upload size={24} className="text-gray-400 group-hover:text-gray-600 mb-2" />
              <p className="text-gray-500 group-hover:text-gray-700 text-sm">Upload matching image</p>
              <input
                type="file"
                className="hidden"
                capture="user"
                accept="image/*"
                onChange={handleImageInputChange}
                onClick={(e) => e.stopPropagation()}
              />
            </label>
          )}
          {isMatched && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
              <Check className="text-green-600" size={32} />
            </div>
          )}
        </div>

        {/* Back side (Hint) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-lg shadow-md p-4 flex items-center justify-center">
          <div className="relative w-full h-full">
            {isEditing ? (
              <div className="w-full h-full flex flex-col">
                <textarea
                  className="w-full h-full p-2 resize-none border rounded"
                  value={tempHint}
                  onChange={(e) => setTempHint(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  placeholder="Enter information about this place..."
                />
                <button
                  className="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHintSubmit();
                  }}
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <p className="text-center text-gray-700">{hint || 'Nyatapola Temple a five-storeyed ancient temple with 5 Ganesha, 5 tiers, 5 plinths, 33 steps, 108 struts, and  360 battens. '}</p>
                <button
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  <Edit2 size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuzzlePiece;
