import { useSelector as useReduxSelector, TypedUseSelectorHook, useDispatch} from "react-redux"
import { AppDispatch, RootState } from "./store"

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector; //从store剥离出
export const useAppDispatch = () =>useDispatch<AppDispatch>();