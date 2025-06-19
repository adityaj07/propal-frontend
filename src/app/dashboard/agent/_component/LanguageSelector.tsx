import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Languages } from "lucide-react";
import { Language } from "@/types/stt";

interface LanguageSelectorProps {
  languages: Language[];
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  hasModel: boolean;
}

export const LanguageSelector = ({
  languages,
  value,
  onValueChange,
  disabled = false,
  hasModel,
}: LanguageSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center gap-2">
        <Languages className="h-4 w-4" />
        Language
      </label>
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled || !hasModel}
      >
        <SelectTrigger className="w-full transition-all duration-200 hover:border-primary/50 disabled:opacity-50">
          <SelectValue
            placeholder={hasModel ? "Select a language" : "Select model first"}
          />
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
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
  );
};
