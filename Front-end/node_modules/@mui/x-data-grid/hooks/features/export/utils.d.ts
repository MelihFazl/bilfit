/// <reference types="react" />
import { GridApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridExportOptions } from '../../../models/gridExport';
import { GridStateColDef } from '../../../models/colDef/gridColDef';
interface GridGetColumnsToExportParams {
    /**
     * The API of the grid.
     */
    apiRef: React.MutableRefObject<GridApiCommunity>;
    options: GridExportOptions;
}
export declare const getColumnsToExport: ({ apiRef, options, }: GridGetColumnsToExportParams) => GridStateColDef[];
export {};
