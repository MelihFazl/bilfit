/// <reference types="react" />
import { SxProps, Theme } from '@mui/material/styles';
import { GridFilterFormProps } from './GridFilterForm';
export interface GridFilterPanelProps extends Pick<GridFilterFormProps, 'linkOperators' | 'columnsSort'> {
    sx?: SxProps<Theme>;
    filterFormProps?: Pick<GridFilterFormProps, 'columnsSort' | 'deleteIconProps' | 'linkOperatorInputProps' | 'operatorInputProps' | 'columnInputProps' | 'valueInputProps'>;
}
declare function GridFilterPanel(props: GridFilterPanelProps): JSX.Element;
declare namespace GridFilterPanel {
    var propTypes: any;
}
export { GridFilterPanel };
