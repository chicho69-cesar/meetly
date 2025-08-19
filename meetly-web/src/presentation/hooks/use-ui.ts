import type { Theme } from "../../infrastructure/interfaces/theme.interface"
import { openModal, setTheme } from "../store/ui/ui.slice"
import { useMeetlyDispatch, useMeetlySelector } from "./use-store"

export default function useUI() {
  const { modal, theme } = useMeetlySelector((state) => state.ui)
  const dispatch = useMeetlyDispatch()

  const handleOpenModal = (modalType: "bell" | "settings" | "user") => {
    dispatch(openModal(modalType))
  }

  const handleCloseModal = () => {
    dispatch(openModal(null))
  }

  const handleSetTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme))
  }

  return {
    modal,
    theme,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    setTheme: handleSetTheme,
  }
}
