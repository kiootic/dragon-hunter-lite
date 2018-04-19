export interface ProgressReporter {
  (message: string | null, progress: number): void;
}
