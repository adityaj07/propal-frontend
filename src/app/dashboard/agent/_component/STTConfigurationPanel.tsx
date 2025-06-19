import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Language, Model, Provider, SelectedConfig } from "@/types/stt";
import { isConfigurationComplete } from "@/utils/sttUtilities";
import { Settings } from "lucide-react";
import { ConfigurationActions } from "./ConfigurationActions";
import { LanguageSelector } from "./LanguageSelector";
import { ModelSelector } from "./ModelSelector";
import { ProviderSelector } from "./ProviderSelector";

interface STTConfigurationPanelProps {
  providers: Provider[];
  availableModels: Model[];
  availableLanguages: Language[];
  selectedConfig: SelectedConfig;
  isSaving: boolean;
  onProviderChange: (providerId: string) => void;
  onModelChange: (modelId: string) => void;
  onLanguageChange: (languageId: string) => void;
  onSave: () => void;
  onReset: () => void;
}

export const STTConfigurationPanel = ({
  providers,
  availableModels,
  availableLanguages,
  selectedConfig,
  isSaving,
  onProviderChange,
  onModelChange,
  onLanguageChange,
  onSave,
  onReset,
}: STTConfigurationPanelProps) => {
  const isComplete = isConfigurationComplete(selectedConfig);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-main text-lg">
          <Settings className="h-5 w-5" />
          STT Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ProviderSelector
          providers={providers}
          value={selectedConfig.provider}
          onValueChange={onProviderChange}
        />

        <ModelSelector
          models={availableModels}
          value={selectedConfig.model}
          onValueChange={onModelChange}
          hasProvider={!!selectedConfig.provider}
        />

        <LanguageSelector
          languages={availableLanguages}
          value={selectedConfig.language}
          onValueChange={onLanguageChange}
          hasModel={!!selectedConfig.model}
        />

        <ConfigurationActions
          onSave={onSave}
          onReset={onReset}
          isSaving={isSaving}
          isConfigComplete={isComplete}
        />
      </CardContent>
    </Card>
  );
};
