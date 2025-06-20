//
//  OcrRecognizer.swift
//  zhangxiaobai
//
//  Created by user on 2025/6/19.
//

// OcrRecognizer.swift

import Foundation
import Vision
import UIKit

@objc public class OcrRecognizer: NSObject {
  @objc public static func recognizeTextFromImageAtPath(_ path: String, completion: @escaping (String?) -> Void) {
    guard let image = UIImage(contentsOfFile: path), let cgImage = image.cgImage else {
      completion(nil)
      return
    }

    let request = VNRecognizeTextRequest { request, error in
      if let err = error {
        print("OCR error: \(err)")
        completion(nil)
        return
      }

      let results = request.results as? [VNRecognizedTextObservation] ?? []
      let text = results.compactMap { $0.topCandidates(1).first?.string }.joined(separator: "\n")
      completion(text)
    }

    request.recognitionLevel = .accurate
    request.recognitionLanguages = ["zh-Hans", "en-US"]

    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    DispatchQueue.global(qos: .userInitiated).async {
      try? handler.perform([request])
    }
  }
}
