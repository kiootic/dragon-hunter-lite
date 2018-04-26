declare module 'vex-js' {
  export const dialog: {
    alert(text: string): void;
    alert(options: Partial<Options>): void;
    confirm(options: Partial<Options>): void;
    prompt(options: Partial<Options>): void;
    open(options: Partial<Options>): void;
  };

  export interface Options extends BaseOptions {
    label: string;
    placeholder: string;
    value: string;
    callback: (result: any) => void;
  }

  export interface BaseOptions {
    content: string,
    unsafeContent: string,
    showCloseButton: boolean,
    escapeButtonCloses: boolean,
    overlayClosesOnClick: boolean,
    appendLocation: string,
    className: string,
    overlayClassName: string,
    contentClassName: string,
    closeClassName: string,
    closeAllOnPopState: boolean
  }

  export const defaultOptions: BaseOptions;

  export function registerPlugin(plugin: any): void;
}