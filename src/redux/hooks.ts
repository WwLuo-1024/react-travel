import { useSelector as useReduxSelector, TypedUseSelectorHook} from "react-redux"
import { RootState } from "./store"

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector; //从store剥离出