
export interface PuzzlePiece {
  
  id: number;
  isFlipped: boolean;
  hint: string;
  targetImage: string | null;
  isMatched: boolean;
}

export interface NotificationState {
  message: string;
  isVisible: boolean;
}

export type GridPosition = 0 | 1 | 2;
export type GridCoordinate = [GridPosition, GridPosition];

export interface ImageMatchResult {
  isMatch: boolean;
  similarity: number;
}