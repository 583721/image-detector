import React, { useState, useCallback } from 'react';
import { Upload, Image, Shield, Zap, Check, X, AlertTriangle, ChevronRight, Activity, Eye, Layers, Database, Cpu, FileSearch } from 'lucide-react';

const ImageOriginalityDetector = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [activeSection, setActiveSection] = useState('professional');
  const [isDragging, setIsDragging] = useState(false);

  // 模拟检测功能
  const analyzeImage = useCallback(async (file) => {
    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const generateScore = () => Math.floor(Math.random() * 40) + 60;
    const generateBoolean = () => Math.random() > 0.5;
    const generateValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const generateStatus = () => {
      const rand = Math.random();
      if (rand > 0.7) return 'pass';
      if (rand > 0.3) return 'warning';
      return 'fail';
    };
    
    const detectionResults = {
      overallScore: generateScore(),
      timestamp: new Date().toISOString(),
      fileName: file.name,
      fileSize: file.size,
      
      // 专业EXIF检测项目（14项）
      professionalExifTests: {
        exifFormatValidation: {
          status: generateStatus(),
          result: generateBoolean() ? "标准EXIF JPEG格式" : "非标准格式",
          details: "检测文件是否为标准 EXIF JPEG 格式"
        },
        exifInternalConsistency: {
          status: generateStatus(),
          result: generateBoolean() ? "数据一致" : "存在冲突",
          details: "EXIF 内部数据是否存在冲突"
        },
        exifExternalConsistency: {
          status: generateStatus(),
          result: generateBoolean() ? "参数匹配" : "参数不符",
          details: "EXIF 所描述的参数是否符合当前图像"
        },
        thirdPartySoftwareData: {
          status: generateStatus(),
          result: generateBoolean() ? "未检测到" : "检测到第三方数据",
          details: "照片中是否存在第三方软件所插入的数据"
        },
        manufacturerNoteIntegrity: {
          status: generateStatus(),
          result: generateBoolean() ? "完整且原始" : "不完整或已修改",
          details: "照片中是否存在厂商注释数据，如果存在，进一步检测其完整性和原始程度"
        },
        embeddedThumbnailConsistency: {
          status: generateStatus(),
          result: generateBoolean() ? "哈希一致" : "哈希不一致",
          details: "文件中全部可读的内嵌图的哈希特征是否一致"
        },
        compressionFingerprint: {
          status: generateStatus(),
          result: generateBoolean() ? "匹配原厂编码器" : "不匹配",
          details: "通过匹配来检测文件中的 JPEG 压缩指纹是否和原厂编码器产生的指纹一致"
        },
        mpfDataIntegrity: {
          status: generateBoolean() ? generateStatus() : 'na',
          result: generateBoolean() ? "MPF指针有效" : "不适用",
          details: "如果存在 MPF 数据，通过尝试提取 MPF 来检测 MPF 指针是否有效"
        },
        flashPixReadyData: {
          status: generateBoolean() ? generateStatus() : 'na',
          result: generateBoolean() ? "FLPX数据有效" : "不适用",
          details: "检测 FLPX 数据，仅适用于部分厂商"
        },
        appleArotData: {
          status: generateBoolean() ? generateStatus() : 'na',
          result: generateBoolean() ? "AROT记录匹配" : "不适用",
          details: "检测 AROT 记录与图像匹配程度，仅适用于苹果系列型号"
        },
        magicExifLegacyData: {
          status: generateStatus(),
          result: generateBoolean() ? "未检测到" : "检测到遗留数据",
          details: "老版本 MagicEXIF 元数据编辑器的遗留数据"
        },
        histogramIntegrity: {
          status: generateStatus(),
          result: generateBoolean() ? "分布正常" : "存在修改痕迹",
          details: "图像直方图分布是否有明显人为修改痕迹"
        },
        aspectRatioIntegrity: {
          status: generateStatus(),
          result: generateBoolean() ? "标准画幅比例" : "非标准比例（可能裁剪）",
          details: "图像长宽比是否为主流拍摄设备传感器画幅的常见比例"
        },
        imageSizeIntegrity: {
          status: generateStatus(),
          result: generateBoolean() ? "尺寸正常" : "尺寸过小",
          details: "检测图像尺寸是否过小"
        }
      },
      
      exifData: {
        hasExif: generateBoolean(),
        cameraModel: generateBoolean() ? "Canon EOS 5D Mark IV" : null,
        lens: generateBoolean() ? "EF 24-70mm f/2.8L II USM" : null,
        dateTime: generateBoolean() ? "2024-03-15 14:23:45" : null,
        gpsLocation: generateBoolean(),
        software: generateBoolean() ? "Adobe Photoshop" : null,
        colorSpace: generateBoolean() ? "sRGB" : null,
        whiteBalance: generateBoolean() ? "Auto" : null,
        exposureTime: generateBoolean() ? "1/125" : null,
        fNumber: generateBoolean() ? "f/2.8" : null,
        iso: generateBoolean() ? "400" : null,
        focalLength: generateBoolean() ? "50mm" : null,
        flash: generateBoolean() ? "No Flash" : null,
        orientation: generateBoolean() ? "Normal" : null,
        copyright: generateBoolean() ? "© 2024" : null
      },
      
      qualityAnalysis: {
        resolution: `${generateValue(1000, 8000)} x ${generateValue(1000, 6000)}`,
        bitDepth: generateValue(8, 16),
        compression: generateValue(70, 100),
        noiseLevel: generateValue(1, 10),
        sharpness: generateValue(60, 100),
        contrast: generateValue(50, 100),
        saturation: generateValue(50, 100),
        brightness: generateValue(40, 80),
        dynamicRange: generateValue(6, 14),
        colorAccuracy: generateValue(70, 100)
      },
      
      compressionAnalysis: {
        jpegQuality: generateValue(75, 100),
        compressionRatio: generateValue(2, 20),
        blockArtifacts: generateBoolean(),
        quantizationTables: generateBoolean() ? "Standard" : "Custom",
        huffmanTables: generateBoolean() ? "Optimized" : "Standard",
        progressiveEncoding: generateBoolean(),
        subsamplingRatio: "4:2:0",
        dctCoefficients: generateBoolean() ? "Modified" : "Original"
      },
      
      editingTraces: {
        resized: generateBoolean(),
        cropped: generateBoolean(),
        rotated: generateBoolean(),
        filtered: generateBoolean(),
        colorAdjusted: generateBoolean(),
        sharpened: generateBoolean(),
        blurred: generateBoolean(),
        watermarked: generateBoolean(),
        cloned: generateBoolean(),
        aiGenerated: generateBoolean()
      },
      
      fileProperties: {
        format: file.type,
        lastModified: new Date(file.lastModified).toISOString(),
        hasMetadata: generateBoolean(),
        hasColorProfile: generateBoolean(),
        hasThumbnail: generateBoolean(),
        hasLayers: false,
        hasAlphaChannel: generateBoolean()
      },
      
      advancedAnalysis: {
        errorLevelAnalysis: generateValue(0, 30),
        duplicateRegions: generateBoolean(),
        inconsistentLighting: generateBoolean(),
        shadowAnomaly: generateBoolean(),
        perspectiveIssues: generateBoolean(),
        edgeInconsistency: generateBoolean(),
        colorHistogramAnomaly: generateBoolean(),
        frequencyAnalysis: generateBoolean() ? "Normal" : "Suspicious",
        statisticalOutliers: generateBoolean(),
        deepfakeDetection: generateValue(0, 100) < 20
      }
    };
    
    setResults(detectionResults);
    setIsAnalyzing(false);
  }, []);

  const handleFileUpload = useCallback((e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      setFile(uploadedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(uploadedFile);
      analyzeImage(uploadedFile);
    }
  }, [analyzeImage]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(droppedFile);
      analyzeImage(droppedFile);
    }
  }, [analyzeImage]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-400 to-emerald-500';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pass': return <Check className="w-4 h-4 text-emerald-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'fail': return <X className="w-4 h-4 text-red-400" />;
      default: return <span className="w-4 h-4 inline-block" />;
    }
  };

  const sections = [
    { id: 'professional', name: '专业检测', icon: Shield, count: 14 },
    { id: 'exif', name: 'EXIF数据', icon: Database, count: 15 },
    { id: 'quality', name: '图像质量', icon: Eye, count: 10 },
    { id: 'compression', name: '压缩分析', icon: Layers, count: 8 },
    { id: 'editing', name: '编辑痕迹', icon: Activity, count: 10 },
    { id: 'advanced', name: '高级分析', icon: Cpu, count: 10 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <FileSearch className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">图片原图检测系统</h1>
                <p className="text-sm text-gray-500 mt-1">64项专业检测指标，深度分析图片真实性</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Area */}
        {!imageUrl && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
            <div
              className={`relative border-2 border-dashed rounded-xl p-16 text-center transition-all ${
                isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
            >
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <div className="p-4 bg-gray-100 rounded-full mb-4">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  拖拽图片到此处或点击上传
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  支持 JPG, PNG, GIF, BMP, WEBP 格式，最大 50MB
                </p>
                <button
                  onClick={() => document.getElementById('fileInput').click()}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                >
                  <Image className="w-5 h-5" />
                  <span>选择图片</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {imageUrl && results && (
          <div className="space-y-6">
            {/* Score Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Image Preview */}
                <div className="lg:col-span-1">
                  <div className="w-full max-w-[200px] mx-auto">
                    <div className="w-48 h-48 rounded-xl overflow-hidden bg-gray-100 shadow-sm mx-auto">
                      <img 
                        src={imageUrl} 
                        alt="Uploaded" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="text-sm">
                        <div className="text-gray-500">文件名</div>
                        <div className="text-gray-900 font-medium truncate">{results.fileName}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-500">文件大小</div>
                        <div className="text-gray-900 font-medium">{(results.fileSize / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-500">分辨率</div>
                        <div className="text-gray-900 font-medium">{results.qualityAnalysis.resolution}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setFile(null);
                        setImageUrl(null);
                        setResults(null);
                      }}
                      className="mt-4 w-full px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      重新检测
                    </button>
                  </div>
                </div>

                {/* Score Display */}
                <div className="lg:col-span-3 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-40 h-40 transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="72"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-gray-200"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="72"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${results.overallScore * 4.52} 452`}
                          className="transition-all duration-1000"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-gray-900">{results.overallScore}</span>
                        <span className="text-xs text-gray-500 mt-1">综合评分</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                        results.overallScore >= 80 ? 'bg-emerald-100 text-emerald-700' :
                        results.overallScore >= 60 ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {results.overallScore >= 80 ? '很可能是原图' :
                         results.overallScore >= 60 ? '可能经过轻微处理' :
                         '很可能不是原图'}
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-2xl font-semibold text-gray-900">
                          {Object.values(results.professionalExifTests).filter(t => t.status === 'pass').length}
                        </div>
                        <div className="text-sm text-gray-500">检测通过</div>
                      </div>
                      <div>
                        <div className="text-2xl font-semibold text-amber-600">
                          {Object.values(results.professionalExifTests).filter(t => t.status === 'warning').length}
                        </div>
                        <div className="text-sm text-gray-500">警告项</div>
                      </div>
                      <div>
                        <div className="text-2xl font-semibold text-red-600">
                          {Object.values(results.professionalExifTests).filter(t => t.status === 'fail').length}
                        </div>
                        <div className="text-sm text-gray-500">异常项</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detection Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`p-4 rounded-xl border transition-all ${
                    activeSection === section.id
                      ? 'bg-indigo-50 border-indigo-300'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <section.icon className={`w-6 h-6 mb-2 ${
                    activeSection === section.id ? 'text-indigo-600' : 'text-gray-400'
                  }`} />
                  <div className={`text-sm font-medium ${
                    activeSection === section.id ? 'text-indigo-900' : 'text-gray-700'
                  }`}>
                    {section.name}
                  </div>
                  <div className={`text-xs mt-1 ${
                    activeSection === section.id ? 'text-indigo-600' : 'text-gray-500'
                  }`}>
                    {section.count} 项检测
                  </div>
                </button>
              ))}
            </div>

            {/* Section Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              {activeSection === 'professional' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">专业EXIF检测</h3>
                  <div className="grid gap-4">
                    {Object.entries(results.professionalExifTests).map(([key, test]) => (
                      <div key={key} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {getStatusIcon(test.status)}
                              <h4 className="font-medium text-gray-900">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{test.details}</p>
                            <div className={`text-sm font-medium ${
                              test.status === 'pass' ? 'text-emerald-600' :
                              test.status === 'warning' ? 'text-amber-600' :
                              test.status === 'fail' ? 'text-red-600' :
                              'text-gray-400'
                            }`}>
                              结果：{test.result}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'exif' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">EXIF 元数据</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(results.exifData).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-sm text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className={`text-sm font-medium ${value ? 'text-gray-900' : 'text-gray-400'}`}>
                          {value || '未检测到'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'quality' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">图像质量分析</h3>
                  <div className="space-y-6">
                    {Object.entries(results.qualityAnalysis).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-sm font-medium text-gray-900">
                            {value}{typeof value === 'number' && key !== 'bitDepth' ? '%' : ''}
                          </span>
                        </div>
                        {typeof value === 'number' && key !== 'bitDepth' && (
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${Math.min(value, 100)}%` }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'compression' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">压缩分析</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(results.compressionAnalysis).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className="font-medium text-gray-900">
                          {typeof value === 'boolean' ? (
                            value ? <Check className="w-5 h-5 text-emerald-500" /> : <X className="w-5 h-5 text-red-500" />
                          ) : value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'editing' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">编辑痕迹检测</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(results.editingTraces).map(([key, value]) => (
                      <div key={key} className={`p-4 rounded-lg border ${
                        value ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          {value ? (
                            <X className="w-5 h-5 text-red-500" />
                          ) : (
                            <Check className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'advanced' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">高级分析</h3>
                  <div className="grid gap-4">
                    {Object.entries(results.advancedAnalysis).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className={`text-sm font-medium ${
                            typeof value === 'boolean' && value ? 'text-amber-600' : 'text-gray-900'
                          }`}>
                            {typeof value === 'boolean' ? (value ? '异常' : '正常') : value}
                          </span>
                        </div>
                        {key === 'errorLevelAnalysis' && (
                          <div className="mt-2 text-xs text-gray-500">
                            误差级别: {value < 10 ? '低' : value < 20 ? '中' : '高'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Loading */}
        {isAnalyzing && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <Zap className="w-8 h-8 text-indigo-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">正在分析图片</h3>
                <p className="text-sm text-gray-500 mb-6">正在运行 64 项专业检测...</p>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ImageOriginalityDetector;
