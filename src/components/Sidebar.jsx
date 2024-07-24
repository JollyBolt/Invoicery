import { Link, useLocation } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { HiMenuAlt2 } from "../assets/index"
import { navLinks } from "../constants"
import { useNavigate } from "react-router-dom"
import { IoSunnyOutline, IoMoonOutline, IoPowerOutline } from "../assets/index"
import { themeSlice } from "../redux/slices/themeSlice"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../redux/slices/userSlice"

function Sidebar() {
  const [open, setOpen] = useState(false)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.user)
  const { loggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    async function getUserData() {
      if (loggedIn) {
        await dispatch(getProfile())
        // console.log(user)
      }
    }
    getUserData()
  }, [loggedIn])

  const checkActive = (href) => {
    const n = href.length
    // Check if the pathname starts with the link's href
    if (pathname.startsWith(href)) {
      // If the pathname is longer than the link's href and the character after the link's href is a '/', then the link is considered active.
      if (pathname.length > n && pathname[n] === "/") return true

      // If the pathname is exactly the same length as the link's href, then the link is considered active.
      if (pathname.length == n) return true
    }
    return false
  }

  //dark mode code
  const system = window.matchMedia("(prefers-color-scheme:dark)")
  const [dark, setDark] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : system.matches
        ? "dark"
        : "light",
  )
  const { toggleTheme } = themeSlice.actions

  const toggleDark = () => {
    dispatch(toggleTheme())
    if (dark !== "dark") {
      setDark("dark")
    } else {
      setDark("light")
    }
  }

  useEffect(() => {
    switch (dark) {
      case "dark":
        document.body.classList.add("dark")
        localStorage.setItem("theme", "dark")
        break
      case "light":
        document.body.classList.remove("dark")
        localStorage.setItem("theme", "light")
    }
  }, [dark])

  return (
    <div>
      <nav id="nav" className="fixed top-0 z-50">
        <div
          className={`flex h-screen flex-col justify-between bg-background p-2 shadow-lg ${dark === "light" && "shadow- slate-300"} transition-[colors_0s,transform_0.5s] delay-[25ms] ${
            open ? "w-[230px]" : "w-[56px]"
          }`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div>
            <div className="relative mt-4 flex flex-col justify-between gap-4">
              <div className="flex gap-3.5 overflow-hidden text-nowrap px-2">
                <div className="flex w-6 shrink-0 -skew-x-12 justify-center border border-primary text-2xl font-extrabold uppercase text-primary">
                  I{" "}
                </div>
                <h2
                  style={{
                    transitionDelay: `${2}00ms`,
                    color: `hsl(var(--primary))`,
                  }}
                  className={`inline whitespace-pre text-2xl font-black uppercase text-transparent duration-500 ${
                    !open && "translate-x-28 overflow-hidden opacity-0"
                  }`}
                >
                  Invoicery
                </h2>
              </div>

              <div className="flex flex-col justify-between gap-y-4 overflow-hidden">
                {navLinks?.map((menu, i) => {
                  const isActive = checkActive(menu.link)
                  return (
                    <Link
                      to={menu?.link}
                      key={i}
                      className={` ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-slate-500 hover:text-foreground"
                      } group flex items-center gap-3.5 rounded-md p-2 text-sm font-medium`}
                    >
                      <div>
                        <menu.icon size={24} />
                      </div>
                      <h2
                        className={`text-md overflow-hidden whitespace-pre [transition:transform_.3s_cubic-bezier(0.4,0,0.2,1),color_0s] ${
                          open ? "translate-x-0 opacity-100" : "translate-x-24"
                        }`}
                      >
                        {menu?.name}
                      </h2>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 overflow-hidden border-t border-gray-500 pt-2">
            <div
              onClick={toggleDark}
              className={`transition-[border-radius] hover:cursor-pointer hover:bg-secondaryBtnHover ${
                open ? "rounded-rounded delay-0" : "rounded-[50%] delay-300"
              } duration-400 flex items-center gap-3.5 p-2 ease-linear`}
            >
              {dark === "light" ? (
                <IoSunnyOutline
                  size={24}
                  className="shrink-0 text-foreground"
                />
              ) : (
                <IoMoonOutline size={24} className="shrink-0 text-foreground" />
              )}
              <h2
                className={`text-md select-none overflow-hidden whitespace-pre text-foreground [transition:transform_.3s_cubic-bezier(0.4,0,0.2,1),color_0s] ${
                  open ? "translate-x-0 opacity-100" : "translate-x-24"
                }`}
              >
                Toggle Theme
              </h2>
            </div>

            {loggedIn && (
              <div
                onClick={() => {
                  document.cookie =
                    "authToken=; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.ishansen.in;"
                  // navigate("/");
                  sessionStorage.clear()
                  location.reload()
                }}
                className={`cursor-pointer text-red-500 transition-[border-radius] hover:bg-red-500 hover:text-white ${
                  open ? "rounded-rounded delay-0" : "rounded-[50%] delay-300"
                } duration-400 flex items-center gap-3.5 p-2 ease-linear`}
              >
                <IoPowerOutline size={24} className="shrink-0" />

                <h2
                  className={`text-md select-none overflow-hidden whitespace-pre [transition:transform_.3s_cubic-bezier(0.4,0,0.2,1),color_0s] ${
                    open ? "translate-x-0 opacity-100" : "translate-x-24"
                  }`}
                >
                  Logout
                </h2>
              </div>
            )}

            <div
              className={`group flex items-center gap-3.5 rounded-md px-2 text-sm font-medium text-foreground`}
            >
              <div className="flex flex-row flex-nowrap">
                {user.name &&
                  user.name.split(" ").map(function (word, i) {
                    return (
                      <span key={i} className="inline-block text-lg">
                        {word[0]}
                      </span>
                    )
                  })}
              </div>
              <div
                className={`text-md flex flex-col overflow-hidden whitespace-pre [transition:transform_.3s_cubic-bezier(0.4,0,0.2,1),color_0s] ${
                  open ? "translate-x-0 opacity-100" : "translate-x-24"
                }`}
              >
                <h3 className="text-lg font-semibold leading-none">
                  {user.name}
                </h3>
                <p className="text-[10px]">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
