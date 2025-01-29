export interface LoggingOption {
  id: string;
  label: string;
  icon: string; // Ionicons name
  backgroundColor?: string;
  textColor?: string;
  hasAddButton?: boolean;
}

export interface LoggingCategory {
  id: string;
  title: string;
  description?: string;
  backgroundColor: string;
  hasTutorial?: boolean;
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
