// Node module
import React from 'react';
import { withNamespaces, WithNamespaces } from 'react-i18next';

class I18nextDetector extends React.Component<WithNamespaces> {
  public render() {
    const { children, tReady } = this.props;
    return tReady ? children : null;
  }
}

export default withNamespaces()(I18nextDetector);
