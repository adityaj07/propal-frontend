export interface Language {
  name: string;
  value: string;
}

export interface Model {
  name: string;
  value: string;
  languages: Language[];
}

export interface Provider {
  name: string;
  value: string;
  models: Model[];
}

export interface STTConfigRaw {
  stt: Provider[];
}

export interface STTConfig {
  providers: Provider[];
}

export interface SelectedConfig {
  provider: string;
  model: string;
  language: string;
}

export interface STTDisplayNames {
  provider: string;
  model: string;
  language: string;
}
