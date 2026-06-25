'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import type { MotionValue, SpringOptions } from 'motion/react';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode, KeyboardEvent } from 'react';

interface DockItemProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    mouseX: MotionValue<number>;
    spring: SpringOptions;
    distance: number;
    magnification: number;
    baseItemSize: number;
    label?: string;
}

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize, label }: DockItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, (val: number) => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize
        };
        return val - rect.x - baseItemSize / 2;
    });

    const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
    const size = useSpring(targetSize, spring);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        }
    };

    return (
        <motion.div
            ref={ref}
            style={{
                width: size,
                height: size
            }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            className={`relative inline-flex items-center justify-center rounded-lg border-1 shadow-md ${className}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
            aria-label={label}
        >
            {Children.map(children, child => cloneElement(child as React.ReactElement<{ isHovered: MotionValue<number> }>, { isHovered }))}
        </motion.div>
    );
}

interface DockLabelProps {
    children?: ReactNode;
    className?: string;
    isHovered?: MotionValue<number>;
    [key: string]: unknown;
}

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isHovered) return;
        const unsubscribe = isHovered.on('change', (latest: number) => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -5 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${className} absolute -top-6 left-1/2 w-fit font-bold whitespace-pre rounded-md backdrop-blur-sm shadow-md px-2 py-0.5 text-xs text-theme`}
                    role="tooltip"
                    style={{ x: '-50%' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

interface DockIconProps {
    children?: ReactNode;
    className?: string;
    isHovered?: MotionValue<number>;
}

function DockIcon({ children, className = '' }: DockIconProps) {
    return <div className={`flex items-center justify-center text-theme ${className}`}>{children}</div>;
}

export interface DockItemConfig {
    icon: ReactNode;
    label: string;
    onClick?: () => void;
    className?: string;
}

interface DockProps {
    items: DockItemConfig[];
    className?: string;
    spring?: SpringOptions;
    magnification?: number;
    distance?: number;
    panelHeight?: number;
    dockHeight?: number;
    baseItemSize?: number;
}

export default function Dock({
    items,
    className = '',
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 50,
    distance = 200,
    panelHeight = 68,
    dockHeight = 256,
    baseItemSize = 50
}: DockProps) {
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxHeight = useMemo(
        () => Math.max(dockHeight, magnification + magnification / 2 + 4),
        [magnification, dockHeight]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    useSpring(heightRow, spring);

    return (
        <motion.div style={{ scrollbarWidth: 'none' }} className="mx-2 flex max-w-full items-center">
            <motion.div
                onMouseMove={({ pageX }) => {
                    isHovered.set(1);
                    mouseX.set(pageX);
                }}
                onMouseLeave={() => {
                    isHovered.set(0);
                    mouseX.set(Infinity);
                }}
                className={`${className} flex items-center w-fit gap-4 rounded-lg text-theme shadow-md border-1 py-2 px-4 mx-auto`}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        className={item.className}
                        mouseX={mouseX}
                        spring={spring}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                        label={item.label}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}
