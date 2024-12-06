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

  const handleHintSubmit = () => {
    onHintUpdate(tempHint);
    setIsEditing(false);
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageUpload(e, pieceId);
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
               <p className="text-center text-gray-700">{hint || 'Add information about this place'}</p>
               

                {/* make a component that component will receive data dynamically about matched iamge thus that component will then
                show the data what you send */}
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