import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import classNames from "classnames";
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IDashboardStyleProps, styles } from "./styles";
interface IOuterProps {
  href: string;
  text?: string;
  exact?: boolean;
  Icon: React.ComponentType<SvgIconProps>;
}
type IProps = RouteComponentProps<any> & IOuterProps & IDashboardStyleProps;

class MenuLink extends React.Component<IProps, { active: boolean }> {
  public state = {
    active: this.props.exact
      ? this.props.location.pathname === this.props.href
      : this.props.location.pathname.startsWith(this.props.href),
  };
  public componentWillReceiveProps({ exact, href, location: { pathname } }: IProps) {
    this.setState({ active: exact ? pathname === href : pathname.startsWith(href) });
  }
  public render() {
    const {
      classes: { menuLinkColorPrimary, menuLink, menuLinkActive },
      href, text, Icon,
    } = this.props;
    // tslint:disable-next-line:no-console
    console.log(this.props.location.pathname, href);
    return (
      <ListItem
        button
        className={classNames(menuLink, { [menuLinkActive]: this.state.active })}
        href={href}
        component="a"
        onClick={this.handleClick}
      >
        <ListItemIcon>
          <Icon
            color={this.state.active ? "primary" : "inherit"}
            classes={{ colorPrimary: menuLinkColorPrimary }} />
        </ListItemIcon>
        <ListItemText classes={{ primary: menuLinkColorPrimary }} primary={text || href} />
      </ListItem>
    );
  }
  private handleClick: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!this.state.active) {
      this.props.history.push(this.props.href);
    }
  }
}
export default styles(withRouter(MenuLink));
