import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Provider } from "@/types/stt";
import { Cloud } from "lucide-react";

interface ProviderSelectorProps {
  providers: Provider[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export const ProviderSelector = ({
  providers,
  value,
  onValueChange,
  disabled = false,
}: ProviderSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <Cloud className="h-4 w-4" />
        Provider
      </label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50">
          <SelectValue placeholder="Select a provider" />
        </SelectTrigger>
        <SelectContent>
          {providers.length > 0 ? (
            providers.map((provider) => (
              <SelectItem key={provider.value} value={provider.value}>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {provider.value}
                  </Badge>
                  {provider.name}
                </div>
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-providers" disabled>
              No providers available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
