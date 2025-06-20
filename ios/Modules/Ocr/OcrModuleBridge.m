//
//  OcrModuleBridge.m
//  zhangxiaobai
//
//  Created by user on 2025/6/19.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(OcrRecognizer, NSObject)
RCT_EXTERN_METHOD(recognizeTextFromImage:(NSString *)path
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end

