// Node module
import React from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

type FullGridProps = {
  className?: string;
  children?: React.ReactNode;
};

const FullGrid = ({ className, children }: FullGridProps) => (
  <Grid
    relaxed
    centered
    stretched
    columns={1}
    textAlign='center'
    children={children}
    className={className}
    verticalAlign='middle'
  />
);

export default styled(FullGrid) `
  &&&& {
    height: 100vh;
  }
`;
