import 'styled-components';
declare module 'styled-components' {
  type ThemedStyledComponentFactories<T> = {
    [TTag in keyof JSX.IntrinsicElements]: ThemedStyledFunction<JSX.IntrinsicElements[TTag], T>;
  };
  // Helper type operators
  type WithOptionalTheme<P extends { theme?: T; }, T> = Pick<P, Exclude<keyof P, "theme">> & { theme?: T; };
  interface ThemedBaseStyledInterface<T> extends ThemedStyledComponentFactories<T> {
    <P>(component: React.ComponentType<P>): T extends undefined ? StyledFunction<P> : ThemedStyledFunction<P, T, WithOptionalTheme<P, T>>;
  }
}
