import { useDispatch, TypedUseSelectorHook, useSelector, useStore } from "react-redux";
import { AppDispatch, Appstore, RootState } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: ()=>Appstore=useStore;