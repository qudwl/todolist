import styles from "./OpenSidebar.module.scss";
import { LuPanelLeftOpen, LuPanelLeftClose } from "react-icons/lu";
import type { OpenSidebarProps } from "./types";

const OpenSidebar: React.FC<OpenSidebarProps> = ({ isOpen, setIsOpen }) => {
    return (
        <button type="button" className={styles.openSidebar} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <LuPanelLeftClose size={30} title="Close" /> : <LuPanelLeftOpen size={30} title="Open" />}
        </button>
    );
}

export default OpenSidebar;