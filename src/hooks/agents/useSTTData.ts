import { STTConfig, STTConfigRaw } from "@/types/stt";
import { useEffect, useState } from "react";

interface UseSTTDataReturn {
  sttConfig: STTConfig | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useSTTData = (): UseSTTDataReturn => {
  const [sttConfig, setSttConfig] = useState<STTConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSTTConfig = async (): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);

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
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load STT configuration";
      console.error("Error loading STT config:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSTTConfig();
  }, []);

  return {
    sttConfig,
    isLoading,
    error,
    refetch: fetchSTTConfig,
  };
};
