// flipper.config.ts
export function registerFlipperPlugins() {
  if (__DEV__) {
    import('react-native-flipper');
  }
}
