//
//  OCR.swift
//  OCR
//
//  Created by user on 2025/6/19.
//

import AppIntents

struct OCR: AppIntent {
    static var title: LocalizedStringResource { "OCR" }
  
    static var openAppWhenRun: Bool = true
    
    func perform() async throws -> some IntentResult {
        return .result()
    }
}
