"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  AlertCircle,
  Bot,
  CheckCircle,
  Cloud,
  Languages,
  Mic,
  RotateCcw,
  Save,
  Settings,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Language {
  name: string;
  value: string;
}

interface Model {
  name: string;
  value: string;
  languages: Language[];
}

interface Provider {
  name: string;
  value: string;
  models: Model[];
}

interface STTConfigRaw {
  stt: Provider[];
}

interface STTConfig {
  providers: Provider[];
}

interface SelectedConfig {
  provider: string;
  model: string;
  language: string;
}

export default function AgentPage() {
  const [sttConfig, setSttConfig] = useState<STTConfig | null>(null);
  const [selectedConfig, setSelectedConfig] = useState<SelectedConfig>({
    provider: "",
    model: "",
    language: "",
  });
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setError(null);
        const response = await fetch("/stt.json");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch STT configuration: ${response.status}`
          );
        }
        const rawConfig: STTConfigRaw = await response.json();

        if (!rawConfig || !rawConfig.stt || !Array.isArray(rawConfig.stt)) {
          throw new Error("Invalid STT configuration format");
        }

        const transformedConfig: STTConfig = {
          providers: rawConfig.stt,
        };

        setSttConfig(transformedConfig);

        // Load saved config from localStorage
        const savedConfig = localStorage.getItem("sttConfig");
        if (savedConfig) {
          try {
            const parsed = JSON.parse(savedConfig);
            setSelectedConfig(parsed);

            // Set available models and languages based on saved config
            const provider = transformedConfig.providers.find(
              (p) => p.value === parsed.provider
            );
            if (provider) {
              setAvailableModels(provider.models);
              const model = provider.models.find(
                (m) => m.value === parsed.model
              );
              if (model) {
                setAvailableLanguages(model.languages);
              }
            }
          } catch (parseError) {
            console.error("Error parsing saved config:", parseError);
            localStorage.removeItem("sttConfig");
          }
        }
      } catch (error) {
        console.error("Error loading STT config:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load STT configuration"
        );
        toast.error("Failed to load STT configuration");
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Handle provider selection
  const handleProviderChange = (providerId: string) => {
    const provider = sttConfig?.providers.find((p) => p.value === providerId);
    if (provider) {
      setSelectedConfig({
        provider: providerId,
        model: "",
        language: "",
      });
      setAvailableModels(provider.models);
      setAvailableLanguages([]);
    }
  };

  // Handle model selection
  const handleModelChange = (modelId: string) => {
    const model = availableModels.find((m) => m.value === modelId);
    if (model) {
      setSelectedConfig((prev) => ({
        ...prev,
        model: modelId,
        language: "",
      }));
      setAvailableLanguages(model.languages);
    }
  };

  // Handle language selection
  const handleLanguageChange = (languageId: string) => {
    setSelectedConfig((prev) => ({
      ...prev,
      language: languageId,
    }));
  };

  // Save configuration to localStorage
  const handleSaveConfig = () => {
    if (
      !selectedConfig.provider ||
      !selectedConfig.model ||
      !selectedConfig.language
    ) {
      toast.error("Please select provider, model, and language");
      return;
    }

    setIsSaving(true);

    // Simulate saving delay for better UX
    setTimeout(() => {
      localStorage.setItem("sttConfig", JSON.stringify(selectedConfig));
      setIsSaving(false);
      toast.success("Configuration saved successfully!");
    }, 800);
  };

  // Reset configuration
  const handleResetConfig = () => {
    setSelectedConfig({
      provider: "",
      model: "",
      language: "",
    });
    setAvailableModels([]);
    setAvailableLanguages([]);
    localStorage.removeItem("sttConfig");
    toast.success("Configuration reset successfully!");
  };

  // Get display names for selected items
  const getProviderDisplayName = () => {
    return (
      sttConfig?.providers.find((p) => p.value === selectedConfig.provider)
        ?.name || ""
    );
  };

  const getModelDisplayName = () => {
    return (
      availableModels.find((m) => m.value === selectedConfig.model)?.name || ""
    );
  };

  const getLanguageDisplayName = () => {
    return (
      availableLanguages.find((l) => l.value === selectedConfig.language)
        ?.name || ""
    );
  };

  if (isLoading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Agent</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Agent</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="mb-4 mt-4">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-5xl font-bold font-main">
                Agent Configuration
              </h1>
            </div>
            <p className="text-muted-foreground">
              Configure your speech-to-text settings for optimal performance
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Configuration Panel */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-main text-lg">
                  <Settings className="h-5 w-5" />
                  STT Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Provider Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Cloud className="h-4 w-4" />
                    Provider
                  </label>
                  <Select
                    value={selectedConfig.provider}
                    onValueChange={handleProviderChange}
                  >
                    <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50">
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {sttConfig?.providers?.map((provider) => (
                        <SelectItem key={provider.value} value={provider.value}>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {provider.value}
                            </Badge>
                            {provider.name}
                          </div>
                        </SelectItem>
                      )) || (
                        <SelectItem value="no-providers" disabled>
                          No providers available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Model Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    Model
                  </label>
                  <Select
                    value={selectedConfig.model}
                    onValueChange={handleModelChange}
                    disabled={!selectedConfig.provider}
                  >
                    <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50 disabled:opacity-50">
                      <SelectValue
                        placeholder={
                          selectedConfig.provider
                            ? "Select a model"
                            : "Select provider first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {model.value}
                            </Badge>
                            {model.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Language
                  </label>
                  <Select
                    value={selectedConfig.language}
                    onValueChange={handleLanguageChange}
                    disabled={!selectedConfig.model}
                  >
                    <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50 disabled:opacity-50">
                      <SelectValue
                        placeholder={
                          selectedConfig.model
                            ? "Select a language"
                            : "Select model first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {availableLanguages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {language.value}
                            </Badge>
                            {language.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSaveConfig}
                    disabled={
                      !selectedConfig.provider ||
                      !selectedConfig.model ||
                      !selectedConfig.language ||
                      isSaving
                    }
                    className="flex-1 transition-all duration-200"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Config
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleResetConfig}
                    disabled={isSaving}
                    className="transition-all duration-200 hover:border-destructive hover:text-destructive"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Summary Card */}
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-main text-lg">
                  <CheckCircle className="h-5 w-5" />
                  Configuration Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedConfig.provider &&
                selectedConfig.model &&
                selectedConfig.language ? (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg transition-all duration-200 hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <Cloud className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Provider</p>
                            <p className="text-sm text-muted-foreground">
                              Cloud service provider
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {getProviderDisplayName()}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {selectedConfig.provider}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg transition-all duration-200 hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <Mic className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Model</p>
                            <p className="text-sm text-muted-foreground">
                              Speech recognition model
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {getModelDisplayName()}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {selectedConfig.model}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg transition-all duration-200 hover:bg-muted">
                        <div className="flex items-center gap-3">
                          <Languages className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Language</p>
                            <p className="text-sm text-muted-foreground">
                              Target language for transcription
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {getLanguageDisplayName()}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {selectedConfig.language}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <p className="font-medium text-green-800 dark:text-green-200">
                          Configuration Complete
                        </p>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                        Your STT agent is ready to use with the selected
                        configuration.
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div
                        className={`w-2 h-2 rounded-full transition-colors ${
                          selectedConfig.provider
                            ? "bg-green-500"
                            : "bg-gray-300"
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
                          selectedConfig.language
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      ></div>
                      <span>Language</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
