import * as React from 'react';
import { ClickAwayListenerProps } from '@mui/material/ClickAwayListener';
import { GrowProps } from '@mui/material/Grow';
import { PopperProps } from '@mui/material/Popper';
declare type MenuPosition = 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top' | undefined;
export interface GridMenuProps extends Omit<PopperProps, 'onKeyDown'> {
    open: boolean;
    target: React.ReactNode;
    onClickAway: ClickAwayListenerProps['onClickAway'];
    position?: MenuPosition;
    onExited?: GrowProps['onExited'];
}
declare const GridMenu: {
    (props: GridMenuProps): JSX.Element;
    propTypes: any;
};
export { GridMenu };
