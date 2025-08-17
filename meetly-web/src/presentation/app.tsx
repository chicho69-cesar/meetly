import { Provider } from "react-redux"
import { RouterProvider } from "react-router"

import { router } from "./router/app.routes"
import { store } from "./store/app.store"

export default function MeetlyApp() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
