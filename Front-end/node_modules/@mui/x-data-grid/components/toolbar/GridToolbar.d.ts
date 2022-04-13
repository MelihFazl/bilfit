import * as React from 'react';
import { GridToolbarContainerProps } from '../containers/GridToolbarContainer';
import { GridToolbarExportProps } from './GridToolbarExport';
export interface GridToolbarProps extends GridToolbarContainerProps, Pick<GridToolbarExportProps, 'csvOptions' | 'printOptions'> {
}
declare const GridToolbar: React.ForwardRefExoticComponent<GridToolbarProps & React.RefAttributes<HTMLDivElement>>;
export { GridToolbar };
