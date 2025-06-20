//
//  RCTPasteboardImageModule.m
//  zhangxiaobai
//
//  Created by user on 2025/6/19.
//

#import "RCTPasteboardImageModule.h"
#import <UIKit/UIKit.h>

@implementation RCTPasteboardImageModule

RCT_EXPORT_MODULE(PasteboardImageModule);

RCT_EXPORT_METHOD(getImageFromClipboard:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
    UIImage *image = pasteboard.image;

    if (!image) {
      reject(@"NO_IMAGE", @"剪贴板中无图片", nil);
      return;
    }

    NSData *imageData = UIImageJPEGRepresentation(image, 0.9);
    if (!imageData) {
      reject(@"ENCODE_ERROR", @"图片转JPEG失败", nil);
      return;
    }

    NSString *fileName = [NSString stringWithFormat:@"%@.jpg", [[NSUUID UUID] UUIDString]];
    NSString *filePath = [NSTemporaryDirectory() stringByAppendingPathComponent:fileName];

    BOOL success = [imageData writeToFile:filePath atomically:YES];
    if (success) {
      resolve(filePath);
    } else {
      reject(@"WRITE_ERROR", @"图片写入失败", nil);
    }
  });
}

@end


