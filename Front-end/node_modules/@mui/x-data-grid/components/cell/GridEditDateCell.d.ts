/// <reference types="react" />
import { InputBaseProps } from '@mui/material/InputBase';
import { GridRenderEditCellParams } from '../../models/params/gridCellParams';
import { GridColDef } from '../../models/colDef/gridColDef';
export declare function GridEditDateCell(props: GridRenderEditCellParams & Omit<InputBaseProps, 'id'>): JSX.Element;
export declare const renderEditDateCell: GridColDef['renderEditCell'];
