//
//  OcrIntentExtension.swift
//  OcrIntentExtension
//
//  Created by user on 2025/6/19.
//

import AppIntents
import UIKit
import Vision

struct OcrFromShortcutIntent: AppIntent {
    static var title: LocalizedStringResource = "自动截屏 + OCR + 打开 App"
    static var openAppWhenRun: Bool = true

    @Parameter(title: "屏幕截图")
    var screenshot: IntentFile

    func perform() async throws -> some IntentResult {
      let data = try Data(contentsOf: screenshot.fileURL!)
        guard let cgImage = UIImage(data: data)?.cgImage else {
            return .result()
        }

        // OCR
        var resultText = ""
        let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
        let request = VNRecognizeTextRequest { request, error in
            if let results = request.results as? [VNRecognizedTextObservation] {
                resultText = results
                    .compactMap { $0.topCandidates(1).first?.string }
                    .joined(separator: "\n")
            }
        }
        try handler.perform([request])

        // 保存识别结果（剪贴板 or App Group or UserDefaults）
        UIPasteboard.general.string = resultText

        // 或：写入 App Group
        let containerURL = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: "group.com.yourcompany.zhangxiaobai")!
        let resultPath = containerURL.appendingPathComponent("ocr-result.txt")
        try resultText.write(to: resultPath, atomically: true, encoding: .utf8)

        return .result()
    }
}



