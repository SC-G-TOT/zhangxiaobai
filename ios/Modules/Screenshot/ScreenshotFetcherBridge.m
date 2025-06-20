//
//  ScreenshotFetcherBridge.m
//  zhangxiaobai
//
//  Created by user on 2025/6/19.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ScreenshotFetcher, NSObject)
RCT_EXTERN_METHOD(getLatestScreenshotPath:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end

