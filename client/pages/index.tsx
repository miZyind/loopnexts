// Node module
import React from 'react';
import getConfig from 'next/config';
import styled from 'styled-components';
import {
  Container,
  Grid,
  Transition,
  Dimmer,
  Loader,
  Header,
  Image,
  Step,
} from 'semantic-ui-react';
// Style
import 'semantic-ui-css/semantic.min.css';

const { appName, appVersion } = getConfig().publicRuntimeConfig;

interface IProps {
  className?: string;
}

interface IState {
  isLoading: boolean;
}

class Index extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  public componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: !this.state.isLoading });
    }, 1000);
  }

  public render() {
    return (
      <Container>
        <Transition visible={this.state.isLoading} duration={500} unmountOnHide>
          <Dimmer active>
            <Loader size='large' content='Loading...' active />
          </Dimmer>
        </Transition>
        <Grid
          padded
          centered
          stretched
          columns={1}
          textAlign='center'
          verticalAlign='middle'
          className={this.props.className}
        >
          <Grid.Column>
            <Header as='h1' icon textAlign='center'>
              <Image centered size='large' src='favicon.ico' />
              <Header.Content>{`${appName} v${appVersion}`}</Header.Content>
            </Header>
            <Step.Group ordered>
              <Step completed={true}>
                <Step.Content>
                  <Step.Title>Getting Started</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const StyledIndex = styled(Index)`
  height: 100vh;
`;

export default () => <StyledIndex />;
