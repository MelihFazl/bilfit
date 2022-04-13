import * as React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { GridRenderCellParams } from '../../models/params/gridCellParams';
import { GridColDef } from '../../models/colDef/gridColDef';
interface GridBooleanCellProps extends GridRenderCellParams, Omit<SvgIconProps, 'tabIndex' | 'id'> {
}
export declare const GridBooleanCell: React.MemoExoticComponent<(props: GridBooleanCellProps) => JSX.Element>;
export declare const renderBooleanCell: GridColDef['renderCell'];
export {};
