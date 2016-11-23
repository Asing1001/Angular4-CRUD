export interface EnvProperty {
  env: string;
  action: string;
  key?: string;
  value?: string;
  date?: string;
  condition? : string;   
  isEditing?: boolean;
}
