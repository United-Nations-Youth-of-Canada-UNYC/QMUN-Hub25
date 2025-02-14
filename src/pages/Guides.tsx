import * as React from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Statistic,
  Sidebar,
  Visibility,
  Popup
} from 'semantic-ui-react';
import Loading from '../components/Loading';


interface GuidesHeadingProps {
  mobile: boolean;
}

const REPO_LINK = 'https://github.com/MaxwellBo/Muncoordinated-2';

/* eslint-disable react/no-multi-comp */
/* Heads up! GuidesHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 <Header
   as="h2"
   content="Download your background guide"
   inverted
   style={{
     fontSize: mobile ? '1.5em' : '1.7em',
     fontWeight: 'normal',
     marginTop: mobile ? '0.5em' : '1.5em',
   }}
 />
 */
 const GuidesHeading = ({ mobile }: GuidesHeadingProps) => (
  <Container text style={{backgroundColor: '#f2f0ef'}}>
    <Header
      as="h1"
      content="Background Guides QMUN 2025"
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'bold',
        color: 'rgb(39,96,82)',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <br />
    <Button style={{backgroundColor: 'rgb(39,96,82)'}}
      as="a" 
      primary size="huge" 
      href="/BGG 2025_merged.pdf" 
      target="_blank" download>
      Click to download your Background Guide
    </Button>
    <br />
  </Container>
);


interface DesktopContainerProps {
  children?: React.ReactNode;
}

interface DesktopContainerState {
  fixed: boolean;
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

class DesktopContainer extends React.Component<DesktopContainerProps, DesktopContainerState> {
  constructor(props: DesktopContainerProps) {
    super(props);

    this.state = {
      fixed: false
    };
  }

  hideFixedMenu = () => {
    this.setState({ fixed: false });
  }

  showFixedMenu = () => {
    this.setState({ fixed: true });
  }

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    // Semantic-UI-React/src/addons/Responsive/Responsive.js
    return (
      // @ts-ignore
      <>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign="center" style={{ minHeight: 700, padding: '0em 0em',  backgroundColor: '#f2f0ef' }} vertical>
            <Menu
              fixed={fixed ? 'top' : undefined}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
              style={{backgroundColor: 'rgb(39,96,82)'}}
            >
              <Container>
                <Menu.Item as="a" href="/">Home</Menu.Item>
                <Menu.Item as="a" href="/committees/-MEZXMLXacUeaJyXM4zR">QMUN Hub</Menu.Item>
                <Menu.Item as="a" href="/guides" active>Background Guides</Menu.Item>
                <Menu.Item as="a" href="/handbook">Delegate Handbook</Menu.Item>
              </Container>
            </Menu>
            <GuidesHeading mobile={false} />
          </Segment>
        </Visibility>

        {children}
      </>
    );
  }
}

interface MobileContainerProps {
  children?: React.ReactNode;
}

interface MobileContainerState {
  sidebarOpened: boolean;
}

class MobileContainer extends React.Component<MobileContainerProps, MobileContainerState> {
  constructor(props: MobileContainerProps) {
    super(props);

    this.state = {
      sidebarOpened: false
    };
  }

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;

    if (sidebarOpened) {
      this.setState({ sidebarOpened: false });
    }
  }

  handleToggle = () => {
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  }

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <>
        <Sidebar.Pushable style={{backgroundColor: '#f2f0ef'}}>
          <Sidebar as={Menu} animation="uncover" inverted vertical visible={sidebarOpened} style={{backgroundColor: 'rgb(39,96,82)'}}>
            <Menu.Item as="a" >Home</Menu.Item>
            <Menu.Item as="a" href="/committees/-MEZXMLXacUeaJyXM4zR">Hub A</Menu.Item>
            <Menu.Item as="a" href="#">Hub B</Menu.Item>
            <Menu.Item as="a" href="/guides" active>Background Guides</Menu.Item>
            <Menu.Item as="a" href="/handbook">Delegate Handbook</Menu.Item>

          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh'}}>
            <Segment inverted textAlign="center" style={{ minHeight: 350, padding: '1em 0em' }} vertical>
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar"/>
                  </Menu.Item>
                </Menu>
              </Container>
              <GuidesHeading mobile={true} />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    );
  }
}

interface ResponsiveContainerProps {
  children?: React.ReactNode;
}

const ResponsiveContainer = ({ children }: ResponsiveContainerProps) => (
  <React.Fragment>
    <DesktopContainer>{children}</DesktopContainer>
    {/* <MobileContainer>{children}</MobileContainer> */}
  </React.Fragment>
);

export default class Guides extends React.Component<{}, {
  committeeNo?: number,
  delegateNo?: number
}> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  renderStatistics() {
    return (
      <Statistic.Group textAlign="center">
        <Statistic>
          <Statistic.Value>{this.state.committeeNo || <Loading small />}</Statistic.Value>
          <Statistic.Label>Committees created</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{this.state.delegateNo || <Loading small />}</Statistic.Value>
          <Statistic.Label>Delegates participating</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    );
  }

  render() {
      return (
        <ResponsiveContainer>
          <Segment inverted vertical style={{ padding: '3em 0em', backgroundColor: 'rgb(39,96,82)' }}>
            <Container>
              <Grid divided inverted stackable>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Header inverted as="h4" content="About" />
                    <List link inverted>
                      <List.Item as="a" href={REPO_LINK}>Source</List.Item>
                      <List.Item
                        as="a"
                        href="https://github.com/MaxwellBo/Muncoordinated-2/blob/master/LICENSE"
                      >
                        License
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header inverted as="h4" content="Contact Us" />
                    <List link inverted>
                      <List.Item as="a" href="mailto:unyc.contact@gmail.com">unyc.contact@gmail.com</List.Item>
                      <List.Item as="a" href="https://www.instagram.com/un.yc/?hl=en">Instagram @un.yc</List.Item>
                      <List.Item as="a" href="https://www.linkedin.com/company/united-nations-youth-of-canada-unyc/posts/?feedView=all">LinkedIn UNYC</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={7}>
                    <Header as="h4" inverted>Info</Header>
                    <p>
                      Made by{' '}
                      <a href="https://github.com/mahangel" className="madeByLink">
                      Angelique Mah</a>
                      , adapted from Muncoordinated by{' '}
                      <a href="https://github.com/MaxwellBo" className="madeByLink">
                        Max Bo
                      </a>
                    </p>
                    <p>Copyright © 2025</p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Segment>
        </ResponsiveContainer>
      );
    }
  }