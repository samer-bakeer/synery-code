declare module 'react' {
  export interface FC<P = {}> {
    (props: P): JSX.Element | null;
  }

  export function useState<T>(initialState: T | (() => T)): [T, (newState: T) => void];
  
  export default {
    useState,
    FC
  };
}

declare module 'react/jsx-runtime' {
  export namespace JSX {
    interface Element {}
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare namespace JSX {
  interface Element {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}