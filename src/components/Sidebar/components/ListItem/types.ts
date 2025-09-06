import type { IconType } from "react-icons";

export interface ListItemProps {
  selected: boolean;
  name: string;
  icon?: IconType;
  onClick: () => void;
}
