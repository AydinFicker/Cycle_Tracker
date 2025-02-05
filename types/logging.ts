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
  type: "ovulationTest" | "water" | "pill";
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
}

export interface LoggingCategory {
  id: string;
  title: string;
  description?: string;
  backgroundColor: string;
  isGrid?: boolean;
  options: LoggingOption[];
}

export type LoggingData = {
  [key: string]: {
    selected: boolean;
    timestamp: Date;
    value?: any; // For additional data if needed
  };
};
