
import { SurveyState } from "./types";

export const createInitialSurveyState = (): SurveyState => {
  return {
    title: "Untitled Survey",
    description: "",
    blocks: [],
    theme: {
      colors: {
        primary: "#4f46e5",
        background: "#ffffff",
        text: "#1f2937",
        buttonText: "#ffffff"
      },
      font: "Inter, system-ui, sans-serif",
      borderRadius: "0.5rem"
    },
    settings: {
      progressBar: true,
      showPageNumbers: true,
      allowGoBack: true
    }
  };
};
