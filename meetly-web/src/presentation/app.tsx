import { Provider } from "react-redux"
import { RouterProvider } from "react-router"
import { Toaster } from "sonner"

import { router } from "./router/app.routes"
import { store } from "./store/app.store"

export default function MeetlyApp() {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </Provider>
  )
}
