import React from 'react';
import Draggable from 'react-draggable';
import { StoryElement, BackgroundConfig } from '../../hooks/useStoryEditor';
import { clsx } from 'clsx';

interface CanvasProps {
    elements: StoryElement[];
    background: BackgroundConfig;
    selectedId: string | null;
    onSelect: (id: string | null) => void;
    onUpdate: (id: string, updates: Partial<StoryElement>) => void;
    canvasRef: React.RefObject<HTMLDivElement>;
}

export const Canvas: React.FC<CanvasProps> = ({
    elements,
    background,
    selectedId,
    onSelect,
    onUpdate,
    canvasRef,
}) => {
    const handleDragStop = (id: string, data: { x: number; y: number }) => {
        onUpdate(id, { x: data.x, y: data.y });
    };

    const getBackgroundStyle = () => {
        if (background.type === 'color') return { backgroundColor: background.value };
        if (background.type === 'gradient') return { backgroundImage: background.value };
        if (background.type === 'image') return { backgroundImage: `url(${background.value})`, backgroundSize: 'cover', backgroundPosition: 'center' };
        return {};
    };

    return (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 p-4 md:p-8 overflow-hidden">
            <div
                ref={canvasRef}
                className="relative bg-white shadow-2xl overflow-hidden transition-all duration-300"
                style={{
                    width: '100%',
                    maxWidth: '45vh', // Constrain width based on height to maintain aspect ratio roughly
                    aspectRatio: '9/16',
                    ...getBackgroundStyle(),
                }}
                onClick={() => onSelect(null)}
            >
                {elements.map((el) => (
                    <Draggable
                        key={el.id}
                        position={{ x: el.x, y: el.y }}
                        onStop={(_, data) => handleDragStop(el.id, data)}
                        onStart={() => onSelect(el.id)}
                        bounds="parent"
                    >
                        <div
                            className={clsx(
                                'absolute cursor-move transition-all duration-200 hover:opacity-90',
                                selectedId === el.id && 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-transparent rounded-lg'
                            )}
                            style={{ zIndex: el.zIndex }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect(el.id);
                            }}
                        >
                            {el.type === 'text' ? (
                                <div
                                    style={{
                                        fontFamily: el.fontFamily,
                                        fontSize: `${el.fontSize}px`,
                                        color: el.color,
                                        textAlign: el.align,
                                        fontWeight: el.bold ? 'bold' : 'normal',
                                        fontStyle: el.italic ? 'italic' : 'normal',
                                        textDecoration: el.underline ? 'underline' : 'none',
                                        textShadow: el.shadow ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
                                        whiteSpace: 'pre-wrap',
                                        minWidth: '100px',
                                    }}
                                >
                                    {el.content}
                                </div>
                            ) : (
                                <div
                                    style={{
                                        fontSize: `${40 * el.scale}px`,
                                        lineHeight: 1,
                                    }}
                                >
                                    {el.content}
                                </div>
                            )}
                        </div>
                    </Draggable>
                ))}
            </div>
        </div>
    );
};
