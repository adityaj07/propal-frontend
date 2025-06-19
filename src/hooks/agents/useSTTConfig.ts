import { Language, Model, SelectedConfig, STTConfig } from "@/types/stt";
import {
  clearSTTConfig,
  loadSTTConfig,
  saveSTTConfig,
} from "@/utils/sttLocalStorage";
import {
  findModelByValue,
  findProviderByValue,
  getDisplayNames,
} from "@/utils/sttUtilities";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

interface UseSTTConfigProps {
  sttConfig: STTConfig | null;
}

interface UseSTTConfigReturn {
  selectedConfig: SelectedConfig;
  availableModels: Model[];
  availableLanguages: Language[];
  isSaving: boolean;
  displayNames: {
    provider: string;
    model: string;
    language: string;
  };
  handleProviderChange: (providerId: string) => void;
  handleModelChange: (modelId: string) => void;
  handleLanguageChange: (languageId: string) => void;
  handleSave: () => Promise<void>;
  handleReset: () => void;
  loadSavedConfig: () => void;
}

const initialConfig: SelectedConfig = {
  provider: "",
  model: "",
  language: "",
};

export const useSTTConfig = ({
  sttConfig,
}: UseSTTConfigProps): UseSTTConfigReturn => {
  const [selectedConfig, setSelectedConfig] =
    useState<SelectedConfig>(initialConfig);
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const displayNames = useMemo(
    () =>
      getDisplayNames(
        sttConfig,
        selectedConfig,
        availableModels,
        availableLanguages
      ),
    [sttConfig, selectedConfig, availableModels, availableLanguages]
  );

  const handleProviderChange = useCallback(
    (providerId: string) => {
      const provider = findProviderByValue(
        sttConfig?.providers || [],
        providerId
      );

      if (provider) {
        setSelectedConfig({
          provider: providerId,
          model: "",
          language: "",
        });

        setAvailableModels(provider.models);
        setAvailableLanguages([]);
      }
    },
    [sttConfig?.providers]
  );

  const handleModelChange = useCallback(
    (modelId: string) => {
      const model = findModelByValue(availableModels, modelId);

      if (model) {
        setSelectedConfig((prev) => ({
          ...prev,
          model: modelId,
          language: "",
        }));

        setAvailableLanguages(model.languages);
      }
    },
    [availableModels]
  );

  const handleLanguageChange = useCallback((languageId: string) => {
    setSelectedConfig((prev) => ({
      ...prev,
      language: languageId,
    }));
  }, []);

  const handleSave = useCallback(async () => {
    if (
      !selectedConfig.provider ||
      !selectedConfig.model ||
      !selectedConfig.language
    ) {
      toast.error("Please select provider, model, and language");
      return;
    }

    setIsSaving(true);

    // we simulate a delay here for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      saveSTTConfig(selectedConfig);
      toast.success("Configuration saved successfully!");
    } catch (error) {
      console.error("Error saving config:", error);
      toast.error("Failed to save configuration");
    } finally {
      setIsSaving(false);
    }
  }, [selectedConfig]);

  const handleReset = useCallback(() => {
    setSelectedConfig(initialConfig);
    setAvailableModels([]);
    setAvailableLanguages([]);
    clearSTTConfig();
    toast.success("Configuration reset successfully!");
  }, []);

  const loadSavedConfig = useCallback(() => {
    if (!sttConfig) return;

    const savedConfig = loadSTTConfig();
    if (savedConfig) {
      setSelectedConfig(savedConfig);

      const provider = findProviderByValue(
        sttConfig.providers,
        savedConfig.provider
      );
      if (provider) {
        setAvailableModels(provider.models);
        const model = findModelByValue(provider.models, savedConfig.model);
        if (model) {
          setAvailableLanguages(model.languages);
        }
      }
    }
  }, [sttConfig]);

  return {
    selectedConfig,
    availableModels,
    availableLanguages,
    isSaving,
    displayNames,
    handleProviderChange,
    handleModelChange,
    handleLanguageChange,
    handleSave,
    handleReset,
    loadSavedConfig,
  };
};
