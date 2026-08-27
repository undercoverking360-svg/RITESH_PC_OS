export type PageTabId =
  | 'overview'
  | 'simulator'
  | 'ecosystem'
  | 'security'
  | 'bootflow'
  | 'downloads'
  | 'terminal';

export interface OSFeature {
  id: string;
  title: string;
  category: 'linux' | 'android' | 'windows' | 'security' | 'performance';
  icon: string;
  description: string;
  badge?: string;
  specs: string[];
  codeSnippet?: string;
  metrics?: { label: string; value: string };
}

export interface BootStep {
  step: number;
  time: string;
  name: string;
  description: string;
  status: 'POST' | 'UEFI' | 'KERNEL' | 'OVERLAY' | 'DESKTOP';
  technicalDetails: string;
}

export interface SystemRequirement {
  component: string;
  minimum: string;
  recommended: string;
  ultra: string;
}

export interface DownloadEdition {
  id: string;
  name: string;
  version: string;
  size: string;
  buildDate: string;
  kernel: string;
  desktop: string;
  sha256: string;
  directUrl: string;
  torrentUrl: string;
  features: string[];
  recommendedFor: string;
}

export interface TelemetryStats {
  cpuUsage: number;
  ramUsage: number;
  kernelVersion: string;
  uptime: string;
  networkSpeed: string;
  temp: number;
}
