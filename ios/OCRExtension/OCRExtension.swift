//
//  OCRExtension.swift
//  OCRExtension
//
//  Created by user on 2025/6/19.
//

import AppIntents

struct OCRExtension: AppIntent {
    static var title: LocalizedStringResource { "OCRExtension" }
    
    func perform() async throws -> some IntentResult {
        return .result()
    }
}
