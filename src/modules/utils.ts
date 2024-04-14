export function classNames(...classes: (boolean | string | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Basado en: https://stackoverflow.com/a/54265129
type AnyFn = (...args: any[])=> any;
export function debounceAsync<TCALLBACK extends AnyFn>(
  callback: TCALLBACK,
  wait: number,
) {
  let timerId: NodeJS.Timeout;

  return (...args: Parameters<TCALLBACK>) => {
    clearTimeout(timerId);

    return new Promise((resolve: (value: Awaited<ReturnType<TCALLBACK>>)=> any) => {
      timerId = setTimeout(
        () => resolve(callback(...args)),
        wait,
      );
    } );
  };
}

export type Themeable = {
  className?: string;
};
