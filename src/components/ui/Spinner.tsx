import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SpinnerProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Spinner: React.FC<SpinnerProps> = ({ className, size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
    };

    return (
        <Loader2
            className={twMerge(
                'animate-spin text-current',
                sizeClasses[size],
                className
            )}
        />
    );
};
