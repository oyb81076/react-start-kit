import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel, { FormControlLabelProps } from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/LockOutlined";
import * as React from "react";
import { ClassKey, styles } from "./styles";
interface IState {
  username: string;
  password: string;
  rememberMe: boolean;
}
interface IProps {
  classes: Record<ClassKey, string>;
}
class SignIn extends React.Component<IProps, IState> {
  public state = {
    username: "",
    password: "",
    rememberMe: true,
  };
  public render() {
    const { classes } = this.props;
    const { username, password, rememberMe } = this.state;
    return (
      <>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">用户名</InputLabel>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={this.handleChangeUsername}
                  />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={this.handleChangePassword}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                checked={rememberMe}
                onChange={this.handleChangeRememberMe}
                label="自动登陆"
              />
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                登陆
            </Button>
            </form>
          </Paper>
        </main>
      </>
    );
  }
  private handleChangeUsername: JSX.IntrinsicElements["input"]["onChange"] = (e) => {
    this.setState({ username: e.target.value });
  }
  private handleChangePassword: JSX.IntrinsicElements["input"]["onChange"] = (e) => {
    this.setState({ password: e.target.value });
  }
  private handleChangeRememberMe: FormControlLabelProps["onChange"] = (_, checked) => {
    this.setState({ rememberMe: checked });
  }
}
export default withStyles(styles)(SignIn);
