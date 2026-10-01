import type { ReactNode } from "react";

export type ComboBoxKey = string | number;

export interface ComboBoxOption {
  id: ComboBoxKey;
  textValue: string;
  label: ReactNode;
  description?: ReactNode;
  isDisabled?: boolean;
}

export type ComboBoxValue = ComboBoxKey | null;
