import type { ListItemProps } from "./types";
import styles from "./ListItem.module.scss";
import cn from "classnames"

const ListItem: React.FC<ListItemProps> = ({ name, selected, icon, onClick }) => {
    const Icon = icon && icon;
    return (
        <li>
            <button className={cn(styles.listItem, selected && styles.selected)} type="button" onClick={onClick}>
                {Icon && <Icon />}
                {name}
            </button>
        </li>
    );
}

export default ListItem;