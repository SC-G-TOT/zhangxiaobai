//
//  OcrRecognizer.swift
//  zhangxiaobai
//
//  Created by user on 2025/6/19.
//

import Vision
import UIKit

@objc(OcrRecognizer)
class OcrRecognizer: NSObject {
  @objc
  func recognizeTextFromImage(_ path: String,
                              resolver resolve: @escaping RCTPromiseResolveBlock,
                              rejecter reject: @escaping RCTPromiseRejectBlock) {
    guard let image = UIImage(contentsOfFile: path),
          let cgImage = image.cgImage else {
      reject("NO_IMAGE", "Image file not found", nil)
      return
    }

    let request = VNRecognizeTextRequest { request, error in
      guard error == nil else {
        reject("OCR_ERROR", error!.localizedDescription, nil)
        return
      }
      let observations = request.results as? [VNRecognizedTextObservation] ?? []
      let text = observations.compactMap { $0.topCandidates(1).first?.string }.joined(separator: "\n")
      resolve(text)
    }

    request.recognitionLevel = .accurate
    request.recognitionLanguages = ["zh-Hans", "en-US"]

    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    DispatchQueue.global(qos: .userInitiated).async {
      do {
        try handler.perform([request])
      } catch {
        reject("OCR_ERROR", error.localizedDescription, nil)
      }
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

