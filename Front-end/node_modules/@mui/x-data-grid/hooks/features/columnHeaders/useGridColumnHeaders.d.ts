import * as React from 'react';
import { GridRenderContext } from '../../../models/params/gridScrollParams';
interface UseGridColumnHeadersProps {
    innerRef?: React.Ref<HTMLDivElement>;
    minColumnIndex?: number;
}
export declare const useGridColumnHeaders: (props: UseGridColumnHeadersProps) => {
    renderContext: GridRenderContext | null;
    getColumns: (params?: {
        renderContext: GridRenderContext | null;
        minFirstColumn?: number | undefined;
        maxLastColumn?: number | undefined;
    } | undefined, other?: {}) => JSX.Element[] | null;
    isDragging: boolean;
    updateInnerPosition: (nextRenderContext: GridRenderContext) => void;
    getRootProps: (other?: {}) => {
        style: {
            minHeight: number;
            maxHeight: number;
            lineHeight: string;
        };
    };
    getInnerProps: () => {
        ref: React.Ref<HTMLDivElement>;
        'aria-rowindex': number;
        role: string;
    };
};
export {};
