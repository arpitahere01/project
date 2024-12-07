import { useState, useCallback } from 'react';
import { PuzzlePiece, NotificationState } from '../types/puzzle';
import { compareImages } from '../utils/imageComparison';

// Sample target images - in a real app, these would come from your backend
const TARGET_IMAGES = [
  'https://blonholiday.wordpress.com/wp-content/uploads/2018/01/nyatapola-temple-bhaktapur-nepal1.jpg',
  'https://www.bhaktapur.com/wp-content/uploads/2020/05/DSC00485.jpg',
  'https://www.bhaktapur.com/wp-content/uploads/2021/11/The-Chuma-ganesha-temple-scaled.jpg',
  'https://holeinthedonut.com/wp-content/uploads/2012/05/Nepal-Bhaktapur-Pottery-Square.jpg',
  'https://www.bhaktapur.com/wp-content/uploads/2020/04/chyasalin_mandap-1.jpg',
  'https://www.bhaktapur.com/wp-content/uploads/2020/03/55-windowpalace-1200x900.jpg',
  'https://www.bhaktapur.com/wp-content/uploads/2020/03/dattatreya-.jpg',
  'https://www.bhaktapur.com/wp-content/uploads/2021/01/Wodcarving-museum-bhaktapur.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/4/43/Na_Pukhu_-_Bhaktapur_-_02.jpg',
];

const GRID_SIZE = 9;

export const usePuzzle = () => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>(
    Array.from({ length: GRID_SIZE }, (_, i) => ({
      id: i,
      isFlipped: false,
      hint: '',
      targetImage: TARGET_IMAGES[i],
      isMatched: false,
    }))
  );
  
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationState>({
    message: '',
    isVisible: false,
  });

  const [counter, setCounter] = useState(0); // Counter state


  const showNotification = (message: string) => {
    setNotification({ message, isVisible: true });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>, pieceId: number) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file.name)
      const reader = new FileReader();
      reader.onload = async (e) => {
        const uploadedImage = e.target?.result as string;
        // console.log("uploaded image: ", uploadedImage)
        const piece = pieces.find(p => p.id === pieceId);
        // console.log("target Image: ", piece?.targetImage)

        
        if (piece?.targetImage) {
          const similarity = await compareImages(uploadedImage, piece.targetImage);
          const isMatch = similarity > 0.7; // 70% similarity threshold

          setPieces(prevPieces => 
            prevPieces.map(p => 
              p.id === pieceId 
                ? { ...p, isMatched: isMatch }
                : p
            )
          );

          if (isMatch) {
            showNotification('Image matches! Flip the card to see information.');
            handlePieceFlip(pieceId);
            setCounter((prevCounter) => prevCounter + 1);

          } else {
            showNotification('Images don\'t match. Try another image!');
          }
        }
      };
      reader.readAsDataURL(file);
    }
  }, [pieces]);

  const handlePieceFlip = useCallback((id: number) => {
    setPieces((prevPieces) => {
      return prevPieces.map((piece) => {
        if (piece.id === id && (piece.isMatched || !piece.targetImage)) {
          const newPiece = { ...piece, isFlipped: !piece.isFlipped };
          if (newPiece.hint && newPiece.isFlipped) {
            showNotification(newPiece.hint);
          }

          

          return newPiece;
        }
        return piece;
      });
    });
  }, []);

  const handleHintUpdate = useCallback((id: number, hint: string) => {
    setPieces((prevPieces) => 
      prevPieces.map((piece) =>
        piece.id === id ? { ...piece, hint } : piece
      )
    );
    showNotification('Hint updated successfully!');
  }, []);

  return {
    pieces,
    counter,
    backgroundImage,
    notification,
    handleImageUpload,
    handlePieceFlip,
    handleHintUpdate,
    hideNotification,
  };
};