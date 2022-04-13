import * as React from 'react';
import { IconButtonProps } from '@mui/material/IconButton';
import { MenuItemProps } from '@mui/material/MenuItem';
export declare type GridActionsCellItemProps = {
    label: string;
    icon?: React.ReactElement;
} & (({
    showInMenu?: false;
    icon: React.ReactElement;
} & IconButtonProps) | ({
    showInMenu: true;
} & MenuItemProps));
declare const GridActionsCellItem: {
    (props: GridActionsCellItemProps): JSX.Element;
    propTypes: any;
};
export { GridActionsCellItem };
