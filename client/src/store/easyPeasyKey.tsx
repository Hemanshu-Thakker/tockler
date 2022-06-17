import { createTypedHooks } from 'easy-peasy';
import { KeywordStore } from './subStore';

const typedHooks = createTypedHooks<KeywordStore>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
