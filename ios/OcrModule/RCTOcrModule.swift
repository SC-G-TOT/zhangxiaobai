//
//  RCTOcrModule.swift
//  zhangxiaobai
//
//  Created by user on 2025/6/19.
//

import Foundation
import Vision
import UIKit

@objc(OcrModule)
class OcrModule: NSObject {

  @objc
  func recognizeText(_ imagePath: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
    guard let uiImage = UIImage(contentsOfFile: imagePath) else {
      rejecter("E_IMAGE", "无法加载图片", nil)
      return
    }

    guard let cgImage = uiImage.cgImage else {
      rejecter("E_IMAGE", "无法获取 CGImage", nil)
      return
    }

    let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    let request = VNRecognizeTextRequest { request, error in
      if let err = error {
        rejecter("E_OCR", "识别出错", err)
        return
      }

      let results = request.results as? [VNRecognizedTextObservation] ?? []
      let text = results
        .compactMap { $0.topCandidates(1).first?.string }
        .joined(separator: "\n")
      resolver(text)
    }

    request.recognitionLevel = .accurate
    request.recognitionLanguages = ["zh-Hans", "en-US"]

    DispatchQueue.global(qos: .userInitiated).async {
      do {
        try requestHandler.perform([request])
      } catch {
        rejecter("E_PROCESS", "处理失败", error)
      }
    }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

