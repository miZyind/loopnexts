// Node module
import React from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

const FullGrid = ({ className, children }: any) => (
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
