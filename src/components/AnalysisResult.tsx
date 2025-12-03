import React from 'react';
import type { AnalysisResult as AnalysisResultType } from '../types';
import { CheckCircle, XCircle, Award, Lightbulb, Cpu, Key, AlertTriangle } from 'lucide-react';

interface Props {
    data: AnalysisResultType;
}

export const AnalysisResult: React.FC<Props> = ({ data }) => {
    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in pb-10">

            {/* Üst Özet Kartı */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-8 items-center">
                {/* İnsan Puanı */}
                <div className="text-center">
                    <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-4 border-indigo-500 bg-indigo-50 text-indigo-700">
                        <div>
                            <span className="text-4xl font-bold">{data.score}</span>
                            <span className="block text-xs uppercase font-semibold">Genel Puan</span>
                        </div>
                    </div>
                </div>

                {/* Özet */}
                <div className="flex-1 space-y-3 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-800">Analiz Sonucu</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{data.summary}</p>
                </div>

                {/* ATS (Robot) Puanı */}
                <div className="text-center">
                    <div className="relative w-28 h-28 flex items-center justify-center rounded-full border-4 border-emerald-500 bg-emerald-50 text-emerald-700">
                        <div>
                            <span className="text-3xl font-bold">{data.atsScore}</span>
                            <span className="block text-[10px] uppercase font-semibold">ATS Uyumu</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* SOL KOLON: İnsan Gözüyle Analiz */}
                <div className="space-y-6">
                    <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Award className="text-indigo-500" /> İnsan Kaynakları Gözüyle
                    </h4>

                    {/* Güçlü Yönler */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                        <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" /> Güçlü Yönlerin
                        </h5>
                        <ul className="space-y-2">
                            {data.strengths.map((s, i) => (
                                <li key={i} className="text-sm text-gray-600 list-disc list-inside">{s}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Zayıf Yönler */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-400">
                        <h5 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <XCircle className="w-5 h-5 text-red-400" /> Geliştirilmesi Gerekenler
                        </h5>
                        <ul className="space-y-2">
                            {data.weaknesses.map((s, i) => (
                                <li key={i} className="text-sm text-gray-600 list-disc list-inside">{s}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Tavsiyeler */}
                    <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                        <h5 className="font-semibold text-indigo-900 mb-3 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5 text-indigo-600" /> Uzman Tavsiyeleri
                        </h5>
                        <div className="space-y-2">
                            {data.suggestions.map((s, i) => (
                                <p key={i} className="text-sm text-indigo-800">• {s}</p>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SAĞ KOLON: Robot (ATS) Gözüyle Analiz */}
                <div className="space-y-6">
                    <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Cpu className="text-emerald-500" /> Robot (ATS) Raporu
                    </h4>

                    {/* Anahtar Kelimeler */}
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl shadow-md">
                        <h5 className="font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                            <Key className="w-5 h-5" /> Tespit Edilen Yetenekler
                        </h5>
                        <div className="flex flex-wrap gap-2">
                            {data.keywordsFound.length > 0 ? data.keywordsFound.map((k, i) => (
                                <span key={i} className="px-3 py-1 bg-gray-700 rounded-full text-xs font-mono border border-gray-600">
                                    {k}
                                </span>
                            )) : <span className="text-gray-400 text-sm">Yeterli anahtar kelime bulunamadı.</span>}
                        </div>
                    </div>

                    {/* Eksik Kelimeler (Kritik!) */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-200">
                        <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-orange-500" /> Bu Kelimeler Eksik Olabilir!
                        </h5>
                        <p className="text-xs text-gray-500 mb-4">
                            Robotlar genellikle bu terimleri arar ama senin CV'nde bulamadık:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {data.missingKeywords.map((k, i) => (
                                <span key={i} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-medium">
                                    {k} ?
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Eksik Bölümler */}
                    {data.missingSections.length > 0 && (
                        <div className="bg-red-50 p-5 rounded-xl border border-red-100">
                            <h5 className="font-semibold text-red-700 mb-2">Eksik Bölümler</h5>
                            <ul className="space-y-1">
                                {data.missingSections.map((sec, i) => (
                                    <li key={i} className="text-sm text-red-600 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> {sec}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};