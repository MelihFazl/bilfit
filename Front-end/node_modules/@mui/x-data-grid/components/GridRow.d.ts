import * as React from 'react';
import { GridRowId, GridRowModel } from '../models/gridRows';
import { GridEditRowsModel } from '../models/gridEditRowModel';
import { GridStateColDef } from '../models/colDef/gridColDef';
import { GridCellIdentifier } from '../hooks/features/focus/gridFocusState';
export interface GridRowProps {
    rowId: GridRowId;
    selected: boolean;
    index: number;
    rowHeight: number;
    containerWidth: number;
    row: GridRowModel;
    firstColumnToRender: number;
    lastColumnToRender: number;
    visibleColumns: GridStateColDef[];
    renderedColumns: GridStateColDef[];
    cellFocus: GridCellIdentifier | null;
    cellTabIndex: GridCellIdentifier | null;
    editRowsState: GridEditRowsModel;
    isLastVisible?: boolean;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}
declare function GridRow(props: React.HTMLAttributes<HTMLDivElement> & GridRowProps): JSX.Element;
declare namespace GridRow {
    var propTypes: any;
}
export { GridRow };
