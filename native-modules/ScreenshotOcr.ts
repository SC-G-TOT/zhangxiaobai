// import { NativeModules } from 'react-native';

// const { OCRModule,ScreenshotModule} = NativeModules;
// const {getLatestScreenshotPath} = ScreenshotModule;
// const {recognizeTextFromImage} = OCRModule;

// export async function runOCR() {
//   try {
//         const path = await getLatestScreenshotPath();
//         console.log('path', path);
//         const text = await recognizeTextFromImage(path);
//         console.log('text', text);
//         return text;
//       } catch (e) {
//         return Promise.reject(e);
//       }
// }
