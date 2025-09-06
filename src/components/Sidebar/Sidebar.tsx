import styles from "./Sidebar.module.scss";
import cn from "classnames"
import type { SidebarProps } from "./types";

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    return (
        <div className={cn(styles.sidebar, isOpen && styles.isOpen)}></div>);
}

export default Sidebar;