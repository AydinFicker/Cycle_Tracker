export interface TestResult {
  id: string;
  label: string;
}

export interface TestType {
  id: string;
  label: string;
  results: TestResult[];
}

export interface ModalConfig {
  type: "ovulationTest" | "water" | "pill" | "weight";
  options?: {
    [key: string]: TestType;
  };
}

export interface LoggingOption {
  id: string;
  label: string;
  icon: string; // Ionicons name
  backgroundColor?: string;
  textColor?: string;
  hasAddButton?: boolean;
  hidden?: boolean; // For options that are only selected through modals
  modalConfig?: ModalConfig;
  hasCustomComponent?: boolean; // Flag for options that use custom components like Water/Weight
}

export interface LoggingCategory {
  id: string;
  title: string;
  description?: string;
  backgroundColor: string;
  isGrid?: boolean;
  isStandalone?: boolean; // Flag for categories that should be rendered separately
  options: LoggingOption[];
}

export type LoggingData = {
  [key: string]: {
    selected: boolean;
    timestamp: Date;
    details?: {
      waterAmount?: number;
      weight?: number | null;
      unit?: "lbs" | "kg";
      testTypeId?: string;
      resultId?: string;
      [key: string]: any;
    };
  };
};
