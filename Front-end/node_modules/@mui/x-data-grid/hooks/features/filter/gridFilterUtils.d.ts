import * as React from 'react';
import { GridFilterModel } from '../../../models';
import { GridApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridStateCommunity } from '../../../models/gridStateCommunity';
import { GridAggregatedFilterItemApplier } from './gridFilterState';
export declare const sanitizeFilterModel: (model: GridFilterModel, disableMultipleColumnsFiltering: boolean, apiRef: React.MutableRefObject<GridApiCommunity>) => GridFilterModel;
export declare const mergeStateWithFilterModel: (filterModel: GridFilterModel, disableMultipleColumnsFiltering: boolean, apiRef: React.MutableRefObject<GridApiCommunity>) => (state: GridStateCommunity) => GridStateCommunity;
/**
 * Generates a method to easily check if a row is matching the current filter model.
 * @param {GridFilterModel} filterModel The model with which we want to filter the rows.
 * @param {React.MutableRefObject<GridApiCommunity>} apiRef The API of the grid.
 * @returns {GridAggregatedFilterItemApplier | null} A method that checks if a row is matching the current filter model. If `null`, we consider that all the rows are matching the filters.
 */
export declare const buildAggregatedFilterApplier: (filterModel: GridFilterModel, apiRef: React.MutableRefObject<GridApiCommunity>) => GridAggregatedFilterItemApplier | null;
