import { useState } from "react"
import OpenSidebar from "./components/OpenSidebar"
import Sidebar from "./components/Sidebar"
import Todos from "./components/Todos/Todos"
import cn from "classnames"

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState(-3);

  return (
    <div className={cn("root", isOpen && "sidebar-open")}>
      <Sidebar isOpen list={list} setList={setList} />
      <Todos list={list} />
      <OpenSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default App
