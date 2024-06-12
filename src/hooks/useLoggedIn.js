import { useEffect } from "react"
// import getCookieValue from "../getCookieValue"
import { useDispatch, useSelector } from "react-redux"
import { authSlice } from "../redux/slices/authSlice"

export default function useLoggedIn() {
  const { loggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (loggedIn) {
      return true
    } else {
      dispatch(authSlice.actions.refreshAuth())
    }
  }, [loggedIn])
}
