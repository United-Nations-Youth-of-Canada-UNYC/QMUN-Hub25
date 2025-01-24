import * as React from 'react';

interface Props {
}

interface State {
  latestVersion?: string;
}

export const CLIENT_VERSION = 'v3.0.0 BETA (UNYC-CustomDev)';

export function VersionLink(props: { 
  version: string 
}) {
  return <a href="https://github.com/United-Nations-Youth-of-Canada-UNYC/QMUN-Hub25">
    {props.version}
  </a>
}

const RELEASES_LATEST = 'https://api.github.com/repos/MaxwellBo/Muncoordinated-2/releases/latest';

export default class Footer extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  fetchLatestVersion = (): Promise<void> => {
    this.setState({ latestVersion: undefined });

    return fetch(RELEASES_LATEST).then(response =>
      response.json()
    ).then(json => 
      this.setState({ latestVersion: json.tag_name })
    );
  }

  componentDidMount() {
    const { fetchLatestVersion } = this;
    fetchLatestVersion();
  }

  render() {
    const { latestVersion } = this.state;

    return (
      <div style={{ position: 'inherit', bottom: 5, left: 5, background: 'clear' }}>
        <VersionLink version={latestVersion || CLIENT_VERSION} /> by <a href="https://github.com/mahangel">Angelique M.</a> &amp; <a href="https://github.com/MaxwellBo">Max Bo</a> &amp; <a href="https://www.facebook.com/UQUNSA/">UQUNSA</a>
      </div>
    );
  }
}
