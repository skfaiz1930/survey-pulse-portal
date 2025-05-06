
export type SurveyBlockType = 
  | 'text'
  | 'multiple_choice'
  | 'checkbox'
  | 'dropdown'
  | 'date'
  | 'rating'
  | 'image';

export interface SurveyBlockSettings {
  required: boolean;
  label: string;
  description?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export interface SurveyBlock {
  id: string;
  type: SurveyBlockType;
  settings: SurveyBlockSettings;
  content: string[] | null;
}

export interface SurveyTheme {
  colors: {
    primary: string;
    background: string;
    text: string;
    buttonText: string;
  };
  font: string;
  borderRadius: string;
}

export interface SurveyState {
  id?: string;
  title: string;
  description?: string;
  blocks: SurveyBlock[];
  theme: SurveyTheme;
  settings: {
    progressBar: boolean;
    showPageNumbers: boolean;
    allowGoBack: boolean;
  };
}
