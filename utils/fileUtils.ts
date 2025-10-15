
export const fileToBase64 = (file: File): Promise<{ mimeType: string; data: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error('Failed to read file as data URL.'));
      }
      const result = reader.result;
      const [mimePart, dataPart] = result.split(';base64,');
      if (!mimePart || !dataPart) {
        return reject(new Error('Invalid data URL format.'));
      }
      const mimeType = mimePart.split(':')[1];
      if (!mimeType) {
        return reject(new Error('Could not determine MIME type from data URL.'));
      }
      resolve({ mimeType, data: dataPart });
    };
    reader.onerror = (error) => reject(error);
  });
};
