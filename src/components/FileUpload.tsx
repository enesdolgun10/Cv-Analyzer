import React, { useState, useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    isAnalyzing: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isAnalyzing }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Kabul edilen dosya tipleri
    const isValidFileType = (file: File) => {
        const validTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
            'application/msword' // .doc (eski word)
        ];
        return validTypes.includes(file.type);
    };

    const handleFile = (file: File) => {
        if (file && isValidFileType(file)) {
            setSelectedFile(file);
            onFileSelect(file);
        } else {
            alert("Lütfen sadece PDF veya Word (.docx) dosyası yükleyin!");
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className="w-full max-w-xl mx-auto mt-10">
            {!selectedFile ? (
                <div
                    className={`relative flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl transition-all cursor-pointer
            ${dragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        // Hem PDF hem Word uzantılarını kabul et
                        accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        onChange={handleChange}
                        disabled={isAnalyzing}
                    />

                    <div className="flex flex-col items-center gap-4 text-gray-500">
                        <div className="p-4 bg-white rounded-full shadow-sm">
                            <Upload className="w-8 h-8 text-indigo-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-medium text-gray-700">CV'nizi buraya sürükleyin</p>
                            <p className="text-sm">veya dosya seçmek için tıklayın</p>
                        </div>
                        <p className="text-xs text-gray-400">PDF, DOC veya DOCX (Max 5MB)</p>
                    </div>
                </div>
            ) : (
                <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-100 rounded-lg">
                                <FileText className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <p className="font-medium text-gray-800">{selectedFile.name}</p>
                                <p className="text-sm text-gray-500">
                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>

                        {!isAnalyzing && (
                            <button
                                onClick={removeFile}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};