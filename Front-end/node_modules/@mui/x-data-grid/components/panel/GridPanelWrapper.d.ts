import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { MUIStyledCommonProps } from '@mui/system';
export interface GridPanelWrapperProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>, MUIStyledCommonProps<Theme> {
}
declare function GridPanelWrapper(props: GridPanelWrapperProps): JSX.Element;
export { GridPanelWrapper };
