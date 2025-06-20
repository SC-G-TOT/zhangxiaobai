import { NativeModules, Platform } from 'react-native';

const { OCRModule } = NativeModules;

interface IOSOcrResult {
  text: string;
  confidence: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export const recognizeText = async (imagePath: string): Promise<IOSOcrResult[]> => {
   try {
    // 在 iOS 上确保路径有 file:// 前缀
    let processedPath = imagePath;
    
    if (Platform.OS === 'ios' && !imagePath.startsWith('file://')) {
      // 处理特殊字符的编码
      const encodedPath = encodeURI(imagePath);
      processedPath = `file://${encodedPath}`;
    }
    
    const results = await OCRModule.recognizeText(processedPath);
    return results;
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error(`OCR failed`);
  }
};

export const getImageFromClipboard = (): Promise<string> => {
  return OCRModule.getImageFromClipboard();
};

export const getClipboardContent = (): Promise<string> => {
  return OCRModule.getClipboardContent();
};