import React, { useRef } from 'react';
import { useStoryEditor } from '../hooks/useStoryEditor';
import { Canvas } from '../components/studio/Canvas';
import { Controls } from '../components/studio/Controls';
import html2canvas from 'html2canvas';

export const StudioPage: React.FC = () => {
    const {
        elements,
        background,
        selectedId,
        selectedElement,
        setBackground,
        setSelectedId,
        addText,
        addEmoji,
        updateElement,
        deleteElement,
    } = useStoryEditor();

    const canvasRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!canvasRef.current) return;

        // Deselect everything before capture
        setSelectedId(null);

        // Wait for state update
        setTimeout(async () => {
            if (!canvasRef.current) return;

            try {
                const canvas = await html2canvas(canvasRef.current, {
                    scale: 2, // High resolution
                    useCORS: true,
                    backgroundColor: null,
                });

                const link = document.createElement('a');
                link.download = `storysnap-${Date.now()}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            } catch (error) {
                console.error('Export failed', error);
                alert('Failed to export story. Please try again.');
            }
        }, 100);
    };

    const handleSave = async () => {
        // Mock save functionality
        console.log('Saving story:', { elements, background });
        alert('Story saved! (Mock)');
    };

    return (
        <div className="flex flex-col md:flex-row h-full">
            {/* Controls Panel - Left on Desktop, Bottom on Mobile (handled by flex-order or similar if needed, but for now standard layout) */}
            <div className="order-2 md:order-1 h-1/2 md:h-full w-full md:w-auto">
                <Controls
                    onAddText={addText}
                    onAddEmoji={addEmoji}
                    onUpdateBackground={setBackground}
                    selectedElement={selectedElement}
                    onUpdateElement={updateElement}
                    onDeleteElement={deleteElement}
                    onDownload={handleDownload}
                    onSave={handleSave}
                />
            </div>

            {/* Canvas Area */}
            <div className="order-1 md:order-2 flex-1 bg-gray-100 flex items-center justify-center p-4 md:p-8 h-1/2 md:h-full overflow-hidden relative">
                <Canvas
                    elements={elements}
                    background={background}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    onUpdate={updateElement}
                    canvasRef={canvasRef}
                />
            </div>
        </div>
    );
};
