import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux"
import type { AppDispatch, RootState } from "../store/app.store"

export const useMeetlySelector: TypedUseSelectorHook<RootState> = useSelector
export const useMeetlyDispatch: () => AppDispatch = useDispatch
