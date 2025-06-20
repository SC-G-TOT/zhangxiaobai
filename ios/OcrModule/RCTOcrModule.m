//
//  RCTOcrModule.m
//  zhangxiaobai
//
//  Created by user on 2025/6/19.
//

// RCTOcrModule.m

#import "RCTOcrModule.h"
#import <Vision/Vision.h>
#import <UIKit/UIKit.h>
#import <MobileCoreServices/MobileCoreServices.h>

@implementation RCTOcrModule

RCT_EXPORT_MODULE(OCRModule);

// 获取剪贴板内容（文本或图片）
RCT_REMAP_METHOD(getClipboardContent,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];

  if (pasteboard.string != nil) {
    // 返回文本
    resolve(@{ @"type": @"text", @"content": pasteboard.string });
    return;
  }

  if (pasteboard.image != nil) {
    // 返回图片的 base64 字符串
    UIImage *image = pasteboard.image;
    NSData *imageData = UIImagePNGRepresentation(image);
    NSString *base64String = [imageData base64EncodedStringWithOptions:0];
    resolve(@{ @"type": @"image", @"content": base64String });
    return;
  }

  // 其他格式暂时不支持
  resolve(@{ @"type": @"empty", @"content": @"" });
}


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

RCT_REMAP_METHOD(recognizeText,
                 imagePath:(NSString *)imagePath
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject) {
    
    // 1. 将字符串路径转换为正确的文件URL
    NSURL *imageURL;
    if ([imagePath hasPrefix:@"file://"]) {
        imageURL = [NSURL URLWithString:imagePath];
    } else {
        // 处理没有file://前缀的路径
        imageURL = [NSURL fileURLWithPath:imagePath];
    }
    
    // 2. 验证URL有效性
    if (!imageURL || !imageURL.scheme) {
        reject(@"INVALID_URL", @"Provided image path is invalid", nil);
        return;
    }
    
    // 3. 特殊处理：移除可能的URL编码
    NSString *decodedPath = [imageURL.absoluteString stringByRemovingPercentEncoding];
    if (decodedPath) {
        imageURL = [NSURL URLWithString:decodedPath];
    }
    
    // 4. 检查文件是否存在
    if (![[NSFileManager defaultManager] fileExistsAtPath:imageURL.path]) {
        reject(@"FILE_NOT_FOUND", [NSString stringWithFormat:@"File not found at path: %@", imagePath], nil);
        return;
    }
    
    // 5. 加载图片
    UIImage *image;
    if ([imageURL.scheme isEqualToString:@"file"]) {
        // 处理本地文件
        image = [UIImage imageWithContentsOfFile:imageURL.path];
    } else {
        // 处理其他类型的URL（如assets-library）
        NSData *imageData = [NSData dataWithContentsOfURL:imageURL];
        image = [UIImage imageWithData:imageData];
    }
    
    if (!image) {
        reject(@"IMAGE_LOAD_FAILED", @"Could not load image from provided path", nil);
        return;
    }
    
    // 6. 优化：缩放大尺寸图片
    image = [self scaledImage:image maxDimension:2048];
    
    // 7. 创建CGImage
    CGImageRef cgImage = image.CGImage;
    if (!cgImage) {
        reject(@"IMAGE_CONVERSION_FAILED", @"Failed to convert image to CGImage", nil);
        return;
    }
    
    // 8. 创建Vision请求
    VNImageRequestHandler *handler = [[VNImageRequestHandler alloc] initWithCGImage:cgImage options:@{}];
    VNRecognizeTextRequest *request = [[VNRecognizeTextRequest alloc] initWithCompletionHandler:^(VNRequest * _Nonnull request, NSError * _Nullable error) {
        if (error) {
            reject(@"OCR_FAILED", error.localizedDescription, error);
            return;
        }
        
        NSArray *results = [self processOCRResults:request.results];
        resolve(results);
    }];
    
    // 9. 设置识别参数
    request.recognitionLevel = VNRequestTextRecognitionLevelAccurate;
    request.usesLanguageCorrection = YES;
    request.recognitionLanguages = @[@"zh-Hans", @"en-US"]; // 中英文识别
    
    // 10. 执行请求（后台线程）
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSError *error;
        [handler performRequests:@[request] error:&error];
        if (error) {
            reject(@"OCR_PERFORM_FAILED", error.localizedDescription, error);
        }
    });
}

#pragma mark - Helper Methods

// 图片缩放方法
- (UIImage *)scaledImage:(UIImage *)image maxDimension:(CGFloat)maxDimension {
    CGFloat originalWidth = image.size.width;
    CGFloat originalHeight = image.size.height;
    
    if (MAX(originalWidth, originalHeight) <= maxDimension) {
        return image;
    }
    
    CGFloat ratio = maxDimension / MAX(originalWidth, originalHeight);
    CGSize newSize = CGSizeMake(originalWidth * ratio, originalHeight * ratio);
    
    UIGraphicsBeginImageContextWithOptions(newSize, YES, 1.0);
    [image drawInRect:CGRectMake(0, 0, newSize.width, newSize.height)];
    UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    return newImage;
}

// 处理OCR结果
- (NSArray *)processOCRResults:(NSArray *)results {
    NSMutableArray *textResults = [NSMutableArray array];
    
    for (id observation in results) {
        if ([observation isKindOfClass:[VNRecognizedTextObservation class]]) {
            VNRecognizedTextObservation *textObservation = observation;
            VNRecognizedText *topCandidate = [textObservation topCandidates:1].firstObject;
            if (topCandidate) {
                CGRect boundingBox = textObservation.boundingBox;
                
                [textResults addObject:@{
                    @"text": topCandidate.string,
                    @"confidence": @(topCandidate.confidence),
                    @"boundingBox": @{
                        @"x": @(boundingBox.origin.x),
                        @"y": @(boundingBox.origin.y),
                        @"width": @(boundingBox.size.width),
                        @"height": @(boundingBox.size.height)
                    }
                }];
            }
        }
    }
    
    return textResults;
}

@end

