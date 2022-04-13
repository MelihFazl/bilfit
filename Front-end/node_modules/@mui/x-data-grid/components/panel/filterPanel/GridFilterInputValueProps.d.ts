import * as React from 'react';
import { GridFilterItem } from '../../../models/gridFilterItem';
export interface GridFilterInputValueProps {
    item: GridFilterItem;
    applyValue: (value: GridFilterItem) => void;
    apiRef: any;
    focusElementRef?: React.Ref<any>;
}
