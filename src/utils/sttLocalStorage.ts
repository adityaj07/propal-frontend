import { SelectedConfig } from "../types/stt";

const STT_CONFIG_KEY = "sttConfig";

export const saveSTTConfig = (config: SelectedConfig): void => {
  localStorage.setItem(STT_CONFIG_KEY, JSON.stringify(config));
};

export const loadSTTConfig = (): SelectedConfig | null => {
  try {
    const saved = localStorage.getItem(STT_CONFIG_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Error parsing saved STT config:", error);
    localStorage.removeItem(STT_CONFIG_KEY);
    return null;
  }
};

export const clearSTTConfig = (): void => {
  localStorage.removeItem(STT_CONFIG_KEY);
};
