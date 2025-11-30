import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type StoryElement =
    | {
        id: string;
        type: "text";
        content: string;
        x: number;
        y: number;
        fontFamily: string;
        fontSize: number;
        color: string;
        align: "left" | "center" | "right";
        bold: boolean;
        italic: boolean;
        underline: boolean;
        shadow: boolean;
        zIndex: number;
    }
    | {
        id: string;
        type: "emoji";
        content: string;
        x: number;
        y: number;
        scale: number;
        zIndex: number;
    };

export type BackgroundConfig = {
    type: "gradient" | "image" | "color";
    value: string;
    id?: string;
};

const DEFAULT_BACKGROUND: BackgroundConfig = {
    type: "gradient",
    value: "linear-gradient(to bottom right, #4f46e5, #ec4899)",
};

export const useStoryEditor = () => {
    const [elements, setElements] = useState<StoryElement[]>([]);
    const [background, setBackground] = useState<BackgroundConfig>(DEFAULT_BACKGROUND);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const addText = useCallback(() => {
        const newElement: StoryElement = {
            id: uuidv4(),
            type: "text",
            content: "Double click to edit",
            x: 100,
            y: 300,
            fontFamily: "Inter",
            fontSize: 24,
            color: "#ffffff",
            align: "center",
            bold: false,
            italic: false,
            underline: false,
            shadow: true,
            zIndex: elements.length + 1,
        };
        setElements((prev) => [...prev, newElement]);
        setSelectedId(newElement.id);
    }, [elements.length]);

    const addEmoji = useCallback((emoji: string) => {
        const newElement: StoryElement = {
            id: uuidv4(),
            type: "emoji",
            content: emoji,
            x: 150,
            y: 350,
            scale: 1,
            zIndex: elements.length + 1,
        };
        setElements((prev) => [...prev, newElement]);
        setSelectedId(newElement.id);
    }, [elements.length]);

    const updateElement = useCallback((id: string, updates: Partial<StoryElement>) => {
        setElements((prev) =>
            prev.map((el) => (el.id === id ? { ...el, ...updates } as StoryElement : el))
        );
    }, []);

    const deleteElement = useCallback((id: string) => {
        setElements((prev) => prev.filter((el) => el.id !== id));
        if (selectedId === id) setSelectedId(null);
    }, [selectedId]);

    const selectedElement = elements.find((el) => el.id === selectedId) || null;

    return {
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
        setElements,
    };
};
