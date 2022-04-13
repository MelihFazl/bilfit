import * as React from 'react';
import { GridRenderEditCellParams } from '../../models/params/gridCellParams';
import { GridColDef } from '../../models/colDef/gridColDef';
export declare function GridEditBooleanCell(props: GridRenderEditCellParams & Omit<React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, 'id'>): JSX.Element;
export declare const renderEditBooleanCell: GridColDef['renderEditCell'];
