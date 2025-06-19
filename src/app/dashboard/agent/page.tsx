"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useSTTConfig } from "@/hooks/agents/useSTTConfig";
import { useSTTData } from "@/hooks/agents/useSTTData";

import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { STTSummaryPanel } from "./_component/ConfigurationSummaryItem";
import { STTConfigurationHeader } from "./_component/STTConfigurationHeader";
import { STTConfigurationPanel } from "./_component/STTConfigurationPanel";
import { STTLoadingState } from "./_component/STTLoadingState";

export default function AgentPage() {
  // Data fetching hook
  const { sttConfig, isLoading, error } = useSTTData();

  // Configuration management hook
  const {
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
  } = useSTTConfig({ sttConfig });

  // If STT config is available, load saved configuration
  useEffect(() => {
    if (sttConfig) {
      loadSavedConfig();
    }
  }, [sttConfig, loadSavedConfig]);

  // Show error toast when error occurs
  useEffect(() => {
    if (error) {
      toast.error("Failed to load STT configuration");
    }
  }, [error]);

  if (isLoading) {
    return <STTLoadingState />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader pageName={"Agent"} />

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <STTConfigurationHeader
            title="Agent Configuration"
            description="Configure your speech-to-text settings for optimal performance"
          />

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <STTConfigurationPanel
              providers={sttConfig?.providers || []}
              availableModels={availableModels}
              availableLanguages={availableLanguages}
              selectedConfig={selectedConfig}
              isSaving={isSaving}
              onProviderChange={handleProviderChange}
              onModelChange={handleModelChange}
              onLanguageChange={handleLanguageChange}
              onSave={handleSave}
              onReset={handleReset}
            />

            <STTSummaryPanel
              selectedConfig={selectedConfig}
              displayNames={displayNames}
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
