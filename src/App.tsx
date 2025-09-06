import { useState } from "react"
import OpenSidebar from "./components/OpenSidebar"
import Sidebar from "./components/Sidebar"
import Todos from "./components/Todos/Todos"
import cn from "classnames"

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("root", isOpen && "sidebar-open")}>
      <Sidebar isOpen />
      <Todos />
      <OpenSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default App
