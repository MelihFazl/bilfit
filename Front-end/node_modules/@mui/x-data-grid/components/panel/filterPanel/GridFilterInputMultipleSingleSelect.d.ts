import * as React from 'react';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import { GridFilterItem } from '../../../models/gridFilterItem';
import type { GridApiCommon } from '../../../models/api/gridApiCommon';
export declare type GridFilterInputMultipleSingleSelectProps = {
    item: GridFilterItem;
    applyValue: (value: GridFilterItem) => void;
    apiRef: React.MutableRefObject<GridApiCommon>;
    focusElementRef?: React.Ref<any>;
    type?: 'singleSelect';
} & Omit<AutocompleteProps<any[], true, false, true>, 'options' | 'renderInput'>;
declare function GridFilterInputMultipleSingleSelect(props: GridFilterInputMultipleSingleSelectProps): JSX.Element;
declare namespace GridFilterInputMultipleSingleSelect {
    var propTypes: any;
}
export { GridFilterInputMultipleSingleSelect };
