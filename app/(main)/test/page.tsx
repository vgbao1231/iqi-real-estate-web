'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function App() {
  const [image, setImage] = useState<null | string>(null);
  const [name, setName] = useState('');
  const [fontSize, setFontSize] = useState(48);
  const [relativePos, setRelativePos] = useState({ x: 50, y: 50 }); // Default to center
  const [exportedImage, setExportedImage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLibraryReady, setIsLibraryReady] = useState(false); // State to track library loading

  const previewRef = useRef(null);
  const fontSizes = [24, 36, 48, 60, 72, 96, 128];

  // Effect to load the html2canvas library script
  useEffect(() => {
    // Check if the script is already on the page
    if (window.html2canvas) {
      setIsLibraryReady(true);
      return;
    }

    const script = document.createElement('script');
    // Reverted to the reliable cdnjs URL for the standard html2canvas library (version 1.4.1)
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.async = true;

    // Set the library to ready state once the script is loaded
    script.onload = () => {
      setIsLibraryReady(true);
    };

    // Handle potential loading errors
    script.onerror = () => {
      console.error(
        'Failed to load the html2canvas library. Please check your internet connection and the script URL.'
      );
    };

    document.body.appendChild(script);

    // Cleanup function to remove the script if the component unmounts
    return () => {
      // It's generally safe to leave the script, but cleanup is good practice
      // document.body.removeChild(script);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to handle image upload by the user
  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setExportedImage(null);
      setName('');
      setImage(URL.createObjectURL(file));
      setRelativePos({ x: 50, y: 50 }); // Reset position to center for new image
    }
  };

  // **FIX:** Calculate and set the position as a percentage of the container's dimensions.
  const handlePositionClick = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top; // y position within the element.

    const { width, height } = rect;

    const relativeX = (x / width) * 100;
    const relativeY = (y / height) * 100;
    console.log(relativeX, relativeY);

    setRelativePos({ x: relativeX, y: relativeY });
  };

  // Function to export the div as a PNG image
  const handleExport = async () => {
    if (!previewRef.current || !window.html2canvas) {
      console.error('Preview element or html2canvas is not available.');
      return;
    }

    setIsLoading(true);

    try {
      await document.fonts.ready; // Wait for custom fonts to be loaded

      const canvas = await window.html2canvas(previewRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2, // Render at 2x resolution to fix positioning and improve quality
      });
      const dataUrl = canvas.toDataURL('image/png');
      setExportedImage(dataUrl);
    } catch (error) {
      console.error('Error exporting canvas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to trigger the download of the exported image
  const handleDownload = () => {
    if (!exportedImage) return;
    const link = document.createElement('a');
    link.href = exportedImage;
    link.download = 'thiep-moi.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to start over
  const handleReset = () => {
    setImage(null);
    setExportedImage(null);
    setName('');
    setFontSize(48);
  };

  // Render the final exported image with a download button
  if (exportedImage) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Thiệp của bạn đã sẵn sàng!
          </h2>
          <img
            src={exportedImage}
            alt="Exported Invitation"
            className="mx-auto rounded-lg border border-gray-200"
            style={{ maxWidth: '100%' }}
          />
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownload}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
            >
              Tải ảnh xuống
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-300"
            >
              Tạo thiệp khác
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render the main creation UI
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      {/* We need to load the Google Font for the name text */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        `}
      </style>
      <div className="w-full max-w-6xl bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Form Controls */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Tạo Thiệp Mời
              </h1>
              <p className="text-gray-500 mt-2">
                Tùy chỉnh thiệp mời của bạn một cách dễ dàng.
              </p>
            </div>

            {/* Step 1: Upload Image */}
            <div className="space-y-2">
              <label className="text-md font-semibold text-gray-700">
                Bước 1: Tải ảnh nền
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {image && (
              <>
                {/* Step 2: Add Name & Adjust Font Size */}
                <div className="space-y-2">
                  <label
                    htmlFor="nameInput"
                    className="text-md font-semibold text-gray-700"
                  >
                    Bước 2: Nhập tên & chọn cỡ chữ
                  </label>
                  <input
                    id="nameInput"
                    type="text"
                    placeholder="Nhập tên tại đây"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
                <div className="space-y-2">
                  <select
                    id="fontSizeSelect"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                  >
                    {fontSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}px
                      </option>
                    ))}
                  </select>
                </div>

                {/* Export Button */}
                <div className="pt-4">
                  <button
                    onClick={handleExport}
                    disabled={isLoading || !isLibraryReady || !name}
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : !isLibraryReady ? (
                      'Đang tải thư viện...'
                    ) : (
                      'Tạo thiệp mời'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Preview Area */}
          <div className="flex flex-col items-center justify-center">
            {image ? (
              <div>
                <p className="text-md font-semibold text-gray-700 mb-2 text-center">
                  Bước 3: Nhấp vào ảnh để chọn vị trí tên
                </p>
                <div
                  ref={previewRef}
                  className="relative w-full mx-auto border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-crosshair"
                  onClick={handlePositionClick}
                >
                  <img
                    src={image}
                    alt="Invitation background"
                    className="block w-full h-auto"
                  />
                  {name && (
                    <div
                      style={{
                        position: 'absolute',
                        // **FIX:** Use percentage for positioning
                        left: `${relativePos.x}%`,
                        top: `${relativePos.y}%`,
                        transform: 'translate(-50%, -50%)',
                        fontFamily: "'Great Vibes', cursive",
                        fontSize: `${fontSize}px`,
                        color: '#2c2c2c',
                        textShadow: '1px 1px 3px rgba(255,255,255,0.7)',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {name}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Xem trước thiệp mời
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Hãy tải ảnh nền lên để bắt đầu.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
