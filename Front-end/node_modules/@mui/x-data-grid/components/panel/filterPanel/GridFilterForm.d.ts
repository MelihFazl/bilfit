import * as React from 'react';
import { GridFilterItem, GridLinkOperator } from '../../../models/gridFilterItem';
export interface GridFilterFormProps {
    item: GridFilterItem;
    hasMultipleFilters: boolean;
    showMultiFilterOperators?: boolean;
    multiFilterOperator?: GridLinkOperator;
    disableMultiFilterOperator?: boolean;
    focusElementRef?: React.Ref<any>;
    applyFilterChanges: (item: GridFilterItem) => void;
    applyMultiFilterOperatorChanges: (operator: GridLinkOperator) => void;
    deleteFilter: (item: GridFilterItem) => void;
    linkOperators?: GridLinkOperator[];
    columnsSort?: 'asc' | 'desc';
    deleteIconProps?: any;
    linkOperatorInputProps?: any;
    operatorInputProps?: any;
    columnInputProps?: any;
    valueInputProps?: any;
}
declare function GridFilterForm(props: GridFilterFormProps): JSX.Element;
declare namespace GridFilterForm {
    var propTypes: any;
}
export { GridFilterForm };
