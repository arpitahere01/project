export const compareImages = async (
  uploadedImage: string,
  targetImage: string
): Promise<number> => {
  return new Promise((resolve) => {
    const img1 = new Image();
    const img2 = new Image();
    let loadedImages = 0;

    // Allow cross-origin requests if the server supports it
    img1.crossOrigin = 'Anonymous';
    img2.crossOrigin = 'Anonymous';

    const onLoad = () => {
      loadedImages++;
      if (loadedImages === 2) {
        const canvas1 = document.createElement('canvas');
        const canvas2 = document.createElement('canvas');
        const ctx1 = canvas1.getContext('2d')!;
        const ctx2 = canvas2.getContext('2d')!;

        // Normalize sizes
        const size = 50; // Small size for quick comparison
        canvas1.width = canvas2.width = size;
        canvas1.height = canvas2.height = size;

        ctx1.drawImage(img1, 0, 0, size, size);
        ctx2.drawImage(img2, 0, 0, size, size);

        const data1 = ctx1.getImageData(0, 0, size, size).data;
        const data2 = ctx2.getImageData(0, 0, size, size).data;

        let matchingPixels = 0;
        const totalPixels = data1.length;

        for (let i = 0; i < totalPixels; i += 4) {
          const r1 = data1[i];
          const g1 = data1[i + 1];
          const b1 = data1[i + 2];
          const r2 = data2[i];
          const g2 = data2[i + 1];
          const b2 = data2[i + 2];

          const colorDiff = Math.sqrt(
            Math.pow(r1 - r2, 2) +
            Math.pow(g1 - g2, 2) +
            Math.pow(b1 - b2, 2)
          );

          if (colorDiff < 128) { // Threshold for similarity
            matchingPixels++;
          }
        }

        const similarity = matchingPixels / (totalPixels / 4);
        resolve(similarity);
      }
    };

    img1.onload = onLoad;
    img2.onload = onLoad;
    img1.src = uploadedImage;
    img2.src = targetImage;
  });
};