import type { ReactNode } from "react";

export type SelectKey = string | number;

export interface SelectOption {
  id: SelectKey;
  textValue: string;
  label: ReactNode;
  description?: ReactNode;
  isDisabled?: boolean;
}

export type SelectValue = SelectKey | null;
