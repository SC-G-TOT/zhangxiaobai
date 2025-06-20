//
//  ScreenshotFetcher.swift
//  zhangxiaobai
//
//  Created by user on 2025/6/19.
//

import Foundation
import Photos
import UIKit

@objc(ScreenshotFetcher)
class ScreenshotFetcher: NSObject {
  @objc
  func getLatestScreenshotPath(_ resolve: @escaping RCTPromiseResolveBlock,
                              rejecter reject: @escaping RCTPromiseRejectBlock) {
    let options = PHFetchOptions()
    options.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]
    options.fetchLimit = 1

    let result = PHAsset.fetchAssets(with: .image, options: options)
    guard let asset = result.firstObject else {
      reject("NO_IMAGE", "No screenshot found", nil)
      return
    }

    let manager = PHImageManager.default()
    let requestOptions = PHImageRequestOptions()
    requestOptions.isSynchronous = true

    manager.requestImageDataAndOrientation(for: asset, options: requestOptions) { data, _, _, _ in
      if let data = data {
        let filePath = NSTemporaryDirectory() + "\(UUID().uuidString).jpg"
        FileManager.default.createFile(atPath: filePath, contents: data, attributes: nil)
        resolve(filePath)
      } else {
        reject("NO_DATA", "Failed to get image data", nil)
      }
    }
  }

  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
}

