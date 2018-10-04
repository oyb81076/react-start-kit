import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import * as React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import InputMoneyField from "../src/InputMoneyField";
import InputNumberField from "../src/InputNumberField";
import InputTextField from "../src/InputTextField";
interface IFormData {
  text: string;
  digit: number;
  money: number;
}
const enhancer = reduxForm<IFormData>({
  form: "redux-form",
  initialValues: { text: "init text value", digit: 3, money: 9999 },
  onSubmit(values) {
    console.log(values);
  },
});
class FormExample extends React.Component<InjectedFormProps<IFormData, {}>> {
  public render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <h1>Form</h1>
        <FormGroup row={true}>
          <InputTextField label="text" name="text" />
          <InputTextField label="text" name="text" />
          <InputTextField label="text" name="text" />
        </FormGroup>
        <FormGroup row={true}>
          <InputNumberField label="digit" name="digit" />
          <InputMoneyField label="money" name="money" />
        </FormGroup>
        <div>
          <Button type="submit" variant="contained" >Submit</Button>
        </div>
      </form>
    );
  }
}
export default enhancer(FormExample);
