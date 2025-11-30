import React, { useState } from 'react';
import { StoryElement, BackgroundConfig } from '../../hooks/useStoryEditor';
import { Type, Image as ImageIcon, Smile, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Trash2, Download, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';

interface ControlsProps {
    onAddText: () => void;
    onAddEmoji: (emoji: string) => void;
    onUpdateBackground: (bg: BackgroundConfig) => void;
    selectedElement: StoryElement | null;
    onUpdateElement: (id: string, updates: Partial<StoryElement>) => void;
    onDeleteElement: (id: string) => void;
    onDownload: () => void;
    onSave: () => void;
}

const FONTS = ['Inter', 'Roboto', 'Playfair Display', 'Montserrat', 'Lato', 'Merriweather'];
const COLORS = ['#ffffff', '#000000', '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'];
const GRADIENTS = [
    'linear-gradient(to bottom right, #4f46e5, #ec4899)',
    'linear-gradient(to bottom right, #22c1c3, #fdbb2d)',
    'linear-gradient(to bottom right, #833ab4, #fd1d1d, #fcb045)',
    'linear-gradient(to bottom right, #0093E9, #80D0C7)',
    'linear-gradient(to bottom right, #8EC5FC, #E0C3FC)',
    'linear-gradient(to bottom right, #D9AFD9, #97D9E1)',
];

const EMOJIS = ['😀', '😂', '😍', '😎', '🥳', '🔥', '✨', '💖', '👍', '🎉', '💯', '🚀', '🌈', '🍕', '☕', '🏖️'];

export const Controls: React.FC<ControlsProps> = ({
    onAddText,
    onAddEmoji,
    onUpdateBackground,
    selectedElement,
    onUpdateElement,
    onDeleteElement,
    onDownload,
    onSave,
}) => {
    const [activeTab, setActiveTab] = useState<'bg' | 'text' | 'emoji'>('text');

    return (
        <div className="w-full md:w-96 bg-white border-l border-gray-200 flex flex-col h-[50vh] md:h-full overflow-hidden shadow-xl z-20">
            {/* Top Actions */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <h2 className="font-bold text-gray-700">Studio</h2>
                <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={onSave} icon={<Save className="w-4 h-4" />}>
                        Save
                    </Button>
                    <Button size="sm" onClick={onDownload} icon={<Download className="w-4 h-4" />}>
                        Export
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('bg')}
                    className={clsx('flex-1 py-3 text-sm font-medium transition-colors', activeTab === 'bg' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-gray-500 hover:bg-gray-50')}
                >
                    Background
                </button>
                <button
                    onClick={() => setActiveTab('text')}
                    className={clsx('flex-1 py-3 text-sm font-medium transition-colors', activeTab === 'text' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-gray-500 hover:bg-gray-50')}
                >
                    Text
                </button>
                <button
                    onClick={() => setActiveTab('emoji')}
                    className={clsx('flex-1 py-3 text-sm font-medium transition-colors', activeTab === 'emoji' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' : 'text-gray-500 hover:bg-gray-50')}
                >
                    Emoji
                </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {activeTab === 'bg' && (
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-700">Gradients</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {GRADIENTS.map((grad, i) => (
                                <button
                                    key={i}
                                    className="h-20 rounded-lg shadow-sm hover:ring-2 hover:ring-indigo-500 transition-all"
                                    style={{ background: grad }}
                                    onClick={() => onUpdateBackground({ type: 'gradient', value: grad })}
                                />
                            ))}
                        </div>

                        <h3 className="text-sm font-medium text-gray-700 mt-6">Solid Colors</h3>
                        <div className="flex flex-wrap gap-2">
                            {COLORS.map((color) => (
                                <button
                                    key={color}
                                    className="w-10 h-10 rounded-full border border-gray-200 shadow-sm hover:scale-110 transition-transform"
                                    style={{ backgroundColor: color }}
                                    onClick={() => onUpdateBackground({ type: 'color', value: color })}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'text' && (
                    <div className="space-y-6">
                        <Button onClick={onAddText} className="w-full" icon={<Type className="w-4 h-4" />}>
                            Add Text
                        </Button>

                        {selectedElement?.type === 'text' ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                                    <label className="text-xs font-medium text-indigo-600 mb-1 block">Content</label>
                                    <textarea
                                        value={selectedElement.content}
                                        onChange={(e) => onUpdateElement(selectedElement.id, { content: e.target.value })}
                                        className="w-full p-2 rounded border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                                        rows={2}
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-500 mb-2 block">Font Family</label>
                                    <select
                                        value={selectedElement.fontFamily}
                                        onChange={(e) => onUpdateElement(selectedElement.id, { fontFamily: e.target.value })}
                                        className="w-full p-2 rounded border border-gray-200 text-sm"
                                    >
                                        {FONTS.map((font) => (
                                            <option key={font} value={font}>{font}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-500 mb-2 block">Size: {selectedElement.fontSize}px</label>
                                    <input
                                        type="range"
                                        min="12"
                                        max="120"
                                        value={selectedElement.fontSize}
                                        onChange={(e) => onUpdateElement(selectedElement.id, { fontSize: Number(e.target.value) })}
                                        className="w-full accent-indigo-600"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-500 mb-2 block">Color</label>
                                    <div className="flex flex-wrap gap-2">
                                        {COLORS.map((color) => (
                                            <button
                                                key={color}
                                                className={clsx(
                                                    "w-6 h-6 rounded-full border border-gray-200 transition-transform",
                                                    selectedElement.color === color ? "ring-2 ring-indigo-500 scale-110" : "hover:scale-110"
                                                )}
                                                style={{ backgroundColor: color }}
                                                onClick={() => onUpdateElement(selectedElement.id, { color })}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onUpdateElement(selectedElement.id, { align: 'left' })}
                                        className={clsx("p-2 rounded hover:bg-gray-100", selectedElement.align === 'left' && "bg-gray-200")}
                                    >
                                        <AlignLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onUpdateElement(selectedElement.id, { align: 'center' })}
                                        className={clsx("p-2 rounded hover:bg-gray-100", selectedElement.align === 'center' && "bg-gray-200")}
                                    >
                                        <AlignCenter className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onUpdateElement(selectedElement.id, { align: 'right' })}
                                        className={clsx("p-2 rounded hover:bg-gray-100", selectedElement.align === 'right' && "bg-gray-200")}
                                    >
                                        <AlignRight className="w-4 h-4" />
                                    </button>
                                    <div className="w-px bg-gray-200 mx-1" />
                                    <button
                                        onClick={() => onUpdateElement(selectedElement.id, { bold: !selectedElement.bold })}
                                        className={clsx("p-2 rounded hover:bg-gray-100", selectedElement.bold && "bg-gray-200")}
                                    >
                                        <Bold className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onUpdateElement(selectedElement.id, { italic: !selectedElement.italic })}
                                        className={clsx("p-2 rounded hover:bg-gray-100", selectedElement.italic && "bg-gray-200")}
                                    >
                                        <Italic className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onUpdateElement(selectedElement.id, { underline: !selectedElement.underline })}
                                        className={clsx("p-2 rounded hover:bg-gray-100", selectedElement.underline && "bg-gray-200")}
                                    >
                                        <Underline className="w-4 h-4" />
                                    </button>
                                </div>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="w-full mt-4"
                                    onClick={() => onDeleteElement(selectedElement.id)}
                                    icon={<Trash2 className="w-4 h-4" />}
                                >
                                    Delete Element
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400 text-sm">
                                Select a text element to edit properties
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'emoji' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-4 gap-4">
                            {EMOJIS.map((emoji) => (
                                <button
                                    key={emoji}
                                    onClick={() => onAddEmoji(emoji)}
                                    className="text-3xl hover:scale-125 transition-transform p-2"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>

                        {selectedElement?.type === 'emoji' && (
                            <div className="space-y-4 pt-4 border-t border-gray-200">
                                <h4 className="text-sm font-medium text-gray-700">Emoji Settings</h4>
                                <div>
                                    <label className="text-xs font-medium text-gray-500 mb-2 block">Scale: {selectedElement.scale.toFixed(1)}x</label>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="5"
                                        step="0.1"
                                        value={selectedElement.scale}
                                        onChange={(e) => onUpdateElement(selectedElement.id, { scale: Number(e.target.value) })}
                                        className="w-full accent-indigo-600"
                                    />
                                </div>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => onDeleteElement(selectedElement.id)}
                                    icon={<Trash2 className="w-4 h-4" />}
                                >
                                    Delete Emoji
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
