/// <reference types="react" />
import { GridRenderCellParams } from '../../models/params/gridCellParams';
import { GridMenuProps } from '../menu/GridMenu';
declare type GridActionsCellProps = Pick<GridRenderCellParams, 'colDef' | 'id' | 'api' | 'hasFocus'> & Pick<GridMenuProps, 'position'>;
declare const GridActionsCell: {
    (props: GridActionsCellProps): JSX.Element;
    propTypes: any;
};
export { GridActionsCell };
export declare const renderActionsCell: (params: GridRenderCellParams) => JSX.Element;
