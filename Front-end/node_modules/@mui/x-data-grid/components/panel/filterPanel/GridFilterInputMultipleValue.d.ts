import * as React from 'react';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import { GridFilterItem } from '../../../models/gridFilterItem';
export declare type GridFilterInputMultipleValueProps = {
    item: GridFilterItem;
    applyValue: (value: GridFilterItem) => void;
    apiRef: any;
    focusElementRef?: React.Ref<any>;
    type?: 'text' | 'number';
} & Omit<AutocompleteProps<any[], true, false, true>, 'options' | 'renderInput'>;
declare function GridFilterInputMultipleValue(props: GridFilterInputMultipleValueProps): JSX.Element;
declare namespace GridFilterInputMultipleValue {
    var propTypes: any;
}
export { GridFilterInputMultipleValue };
