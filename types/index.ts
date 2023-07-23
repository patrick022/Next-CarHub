import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  btnType?: "button" | "submit";
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  textStyles?: string;
  rightIcon?: string;
  isDisabled?: boolean;
}

export interface CustomLinkProps {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  rightIcon?: string;
}

export interface SearchManufacturerProps {
  selected: string;
  setSelected: (selected: string) => void;
}

export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export type CarState = CarProps[] & { message?: string };

export interface FilterProps {
  manufacturer: string;
  year: number;
  fuel: string;
  limit: number;
  model: string;
  transmissionType: string;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps<T> {
  title: string;
  options: OptionProps[];
  setFilter: (selected: T) => void;
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
  setLimit: (limit: number) => void;
}

export interface SearchBarProps {
  setManuFacturer: (manufacturer: string) => void;
  setModel: (model: string) => void;
}
