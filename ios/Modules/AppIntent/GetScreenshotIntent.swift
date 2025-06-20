//
//  GetScreenshotIntent.swift
//  zhangxiaobai
//
//  Created by user on 2025/6/19.
//

import AppIntents

struct GetScreenshotIntent: AppIntent {
  @available(iOS 16, *)
  static var title: LocalizedStringResource = "OCR 屏幕截图"
    static var openAppWhenRun = true

  @available(iOS 16.0, *)
  func perform() async throws -> some IntentResult {
        return .result()
    }
}

