import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mic } from "lucide-react";
import { Model } from "@/types/stt";

interface ModelSelectorProps {
  models: Model[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  hasProvider: boolean;
}

export const ModelSelector = ({
  models,
  value,
  onValueChange,
  disabled = false,
  hasProvider,
}: ModelSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <Mic className="h-4 w-4" />
        Model
      </label>
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled || !hasProvider}
      >
        <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50 disabled:opacity-50">
          <SelectValue
            placeholder={
              hasProvider ? "Select a model" : "Select provider first"
            }
          />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
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
  );
};
