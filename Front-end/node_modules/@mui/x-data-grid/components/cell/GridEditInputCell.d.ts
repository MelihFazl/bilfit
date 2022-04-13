/// <reference types="react" />
import { InputBaseProps } from '@mui/material/InputBase';
import { GridRenderEditCellParams } from '../../models/params/gridCellParams';
import { GridColDef } from '../../models/colDef/gridColDef';
interface GridEditInputCellProps {
    debounceMs?: number;
}
declare function GridEditInputCell(props: GridEditInputCellProps & GridRenderEditCellParams & Omit<InputBaseProps, 'id'>): JSX.Element;
declare namespace GridEditInputCell {
    var propTypes: any;
}
export { GridEditInputCell };
export declare const renderEditInputCell: GridColDef['renderEditCell'];
