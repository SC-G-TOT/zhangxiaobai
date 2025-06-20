//
//  OcrModule.m
//  zhangxiaobai
//
//  Created by user on 2025/6/19.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(OcrModule, NSObject)

RCT_EXTERN_METHOD(recognizeText:(NSString *)imagePath
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end

