export class EnvProperty {
  id?:string;
  projectName?: string;
  env: string;
  action: string;
  key?: string;
  value?: string;
  date?: string;
  conditions? : Array<KeyValPair>;   
  isEditing?: boolean;
}

export class KeyValPair {
  key:string;
  value:string;
}