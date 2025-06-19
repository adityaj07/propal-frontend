import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectedConfig } from "@/types/stt";
import { isConfigurationComplete } from "@/utils/sttUtilities";
import { Bot, CheckCircle, Cloud, Languages, Mic } from "lucide-react";

interface STTSummaryPanelProps {
  selectedConfig: SelectedConfig;
  displayNames: {
    provider: string;
    model: string;
    language: string;
  };
}

const ConfigurationSummaryItem = ({
  icon,
  title,
  description,
  displayName,
  value,
  badgeVariant,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  displayName: string;
  value: string;
  badgeVariant: "outline" | "secondary";
}) => (
  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg transition-all duration-200 hover:bg-muted">
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-semibold">{displayName}</p>
      <Badge variant={badgeVariant} className="text-xs">
        {value}
      </Badge>
    </div>
  </div>
);

const ConfigurationStatus = ({
  selectedConfig,
}: {
  selectedConfig: SelectedConfig;
}) => (
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <div
      className={`w-2 h-2 rounded-full transition-colors ${
        selectedConfig.provider ? "bg-green-500" : "bg-gray-300"
      }`}
    ></div>
    <span>Provider</span>
    <div
      className={`w-2 h-2 rounded-full transition-colors ${
        selectedConfig.model ? "bg-green-500" : "bg-gray-300"
      }`}
    ></div>
    <span>Model</span>
    <div
      className={`w-2 h-2 rounded-full transition-colors ${
        selectedConfig.language ? "bg-green-500" : "bg-gray-300"
      }`}
    ></div>
    <span>Language</span>
  </div>
);

export const STTSummaryPanel = ({
  selectedConfig,
  displayNames,
}: STTSummaryPanelProps) => {
  const isComplete = isConfigurationComplete(selectedConfig);

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-main text-lg">
          <CheckCircle className="h-5 w-5" />
          Configuration Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isComplete ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <ConfigurationSummaryItem
                icon={<Cloud className="h-5 w-5 text-primary" />}
                title="Provider"
                description="Cloud service provider"
                displayName={displayNames.provider}
                value={selectedConfig.provider}
                badgeVariant="outline"
              />

              <ConfigurationSummaryItem
                icon={<Mic className="h-5 w-5 text-primary" />}
                title="Model"
                description="Speech recognition model"
                displayName={displayNames.model}
                value={selectedConfig.model}
                badgeVariant="secondary"
              />

              <ConfigurationSummaryItem
                icon={<Languages className="h-5 w-5 text-primary" />}
                title="Language"
                description="Target language for transcription"
                displayName={displayNames.language}
                value={selectedConfig.language}
                badgeVariant="outline"
              />
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="font-medium text-green-800 dark:text-green-200">
                  Configuration Complete
                </p>
              </div>
              <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                Your STT agent is ready to use with the selected configuration.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Bot className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No Configuration Selected
            </h3>
            <p className="text-muted-foreground mb-4">
              Please select a provider, model, and language to see the
              configuration summary.
            </p>
            <ConfigurationStatus selectedConfig={selectedConfig} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
