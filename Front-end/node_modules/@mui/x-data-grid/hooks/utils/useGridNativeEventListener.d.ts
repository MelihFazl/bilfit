import * as React from 'react';
import { GridApiCommon } from '../../models';
export declare const useGridNativeEventListener: <Api extends GridApiCommon, E extends Event>(apiRef: React.MutableRefObject<Api>, ref: React.MutableRefObject<HTMLDivElement | null> | (() => Element | undefined | null), eventName: string, handler?: ((event: E) => any) | undefined, options?: AddEventListenerOptions | undefined) => void;
