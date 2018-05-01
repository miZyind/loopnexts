import 'styled-components';
declare module 'styled-components' {
  interface ThemedBaseStyledInterface<T> {
    <P>(component: React.ComponentType<P>): StyledFunction<P>;
  }
}
