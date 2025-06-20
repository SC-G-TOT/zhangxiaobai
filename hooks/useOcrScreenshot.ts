import { getImageFromClipboard, recognizeText } from '@/native-modules/Ocr';
import { useRef } from 'react';
import { PERMISSIONS } from 'react-native-permissions';
import ViewShot from 'react-native-view-shot';

type UseOcrScreenshotReturn = {
  viewRef: React.MutableRefObject<ViewShot | null>;
  captureAndRecognizeText: () => Promise<string[]>;
};

console.log('PERMISSIONS', PERMISSIONS);

export const useOcrScreenshot = (): UseOcrScreenshotReturn => {
  const viewRef = useRef<ViewShot | null>(null);

  const requestPermissions = async () => {
    // if (Platform.OS === 'android') {
    //   if (Platform.Version >= 33) {
    //     const result = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    //     );
    //     return result === PermissionsAndroid.RESULTS.GRANTED;
    //   } else {
    //     const result = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //     );
    //     return result === PermissionsAndroid.RESULTS.GRANTED;
    //   }
    // } else {
    //   const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    //   return result === RESULTS.GRANTED;
    // }
    return true;
  };

  const captureAndRecognizeText = async (): Promise<string[]> => {
    console.log('captureAndRecognizeText')
    const permissionGranted = await requestPermissions();
    if (!permissionGranted) {
      throw new Error('Permission denied');
    }

    // if (!viewRef.current) throw new Error('View ref not attached');

    // const uri = await captureRef(viewRef.current, {
    //   format: 'jpg',
    //   quality: 0.9,
    // });
    // const text = await Clipboard.getStringAsync();
    const imageUri = await getImageFromClipboard();
    console.log('imageUri', imageUri);
    console.log('imageUri', imageUri);
    const result = await recognizeText(imageUri);
    console.log('uri', result);
    return result.map(item => item.text);

  };

  return {
    viewRef,
    captureAndRecognizeText,
  };
};
