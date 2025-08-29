import type { View } from "react-big-calendar"
import type { Theme } from "../../infrastructure/interfaces/theme.interface"
import { openModal, setCalendarView, setTaskView, setTheme } from "../store/ui/ui.slice"
import { useMeetlyDispatch, useMeetlySelector } from "./use-store"

export default function useUI() {
  const { modal, theme, calendarView, taskView } = useMeetlySelector((state) => state.ui)
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

  const handleSetCalendarView = (newView: View) => {
    dispatch(setCalendarView(newView))
  }

  const handleSetTaskView = (newView: "list" | "kanban") => {
    dispatch(setTaskView(newView))
  }

  return {
    modal,
    theme,
    calendarView,
    taskView,

    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    setTheme: handleSetTheme,
    setCalendarView: handleSetCalendarView,
    setTaskView: handleSetTaskView,
  }
}
