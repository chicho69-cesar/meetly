import type { Theme } from "../../infrastructure/interfaces/theme.interface"
import { openModal, setTaskView, setTheme } from "../store/ui/ui.slice"
import { useMeetlyDispatch, useMeetlySelector } from "./use-store"

export default function useUI() {
  const { modal, theme, taskView } = useMeetlySelector((state) => state.ui)
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

  const handleSetTaskView = (newView: "list" | "kanban") => {
    dispatch(setTaskView(newView))
  }

  return {
    modal,
    theme,
    taskView,

    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    setTheme: handleSetTheme,
    setTaskView: handleSetTaskView,
  }
}
