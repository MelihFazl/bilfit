/// <reference types="react" />
import { SelectProps } from '@mui/material/Select';
import { GridRenderEditCellParams } from '../../models/params/gridCellParams';
import { GridColDef } from '../../models/colDef/gridColDef';
declare function GridEditSingleSelectCell(props: GridRenderEditCellParams & Omit<SelectProps, 'id'>): JSX.Element;
declare namespace GridEditSingleSelectCell {
    var propTypes: any;
}
export { GridEditSingleSelectCell };
export declare const renderEditSingleSelectCell: GridColDef['renderEditCell'];
