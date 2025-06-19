import {
  Provider,
  Model,
  Language,
  SelectedConfig,
  STTConfig,
  STTDisplayNames,
} from "../types/stt";

export const findProviderByValue = (
  providers: Provider[],
  value: string
): Provider | undefined => {
  return providers.find((p) => p.value === value);
};

export const findModelByValue = (
  models: Model[],
  value: string
): Model | undefined => {
  return models.find((m) => m.value === value);
};

export const findLanguageByValue = (
  languages: Language[],
  value: string
): Language | undefined => {
  return languages.find((l) => l.value === value);
};

export const getDisplayNames = (
  config: STTConfig | null,
  selectedConfig: SelectedConfig,
  availableModels: Model[],
  availableLanguages: Language[]
): STTDisplayNames => {
  const provider = config?.providers.find(
    (p) => p.value === selectedConfig.provider
  );
  const model = availableModels.find((m) => m.value === selectedConfig.model);
  const language = availableLanguages.find(
    (l) => l.value === selectedConfig.language
  );

  return {
    provider: provider?.name || "",
    model: model?.name || "",
    language: language?.name || "",
  };
};

export const isConfigurationComplete = (config: SelectedConfig): boolean => {
  return !!(config.provider && config.model && config.language);
};
