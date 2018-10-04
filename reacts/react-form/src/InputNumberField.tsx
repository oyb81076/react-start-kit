import FormControl from "@material-ui/core/FormControl";
import FormHelpText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import * as React from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { Field, WrappedFieldProps } from "redux-form";
export interface IInputNumberFieldProps {
  id?: string;
  name: string;
  defaultValue?: number;
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  thousandSeparator?: boolean;
  prefix?: string;
  suffix?: string;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
}
export default class InputNumberField extends React.Component<IInputNumberFieldProps> {
  public static defaultProps: Partial<IInputNumberFieldProps> = {};
  private onChange?: (v: any) => void;
  public render() {
    return <Field name={this.props.name} component={this.component} />;
  }
  private handleChange = ({ floatValue }: NumberFormatValues) => {
    if (this.onChange) { this.onChange(floatValue); }
  }
  private component = ({ input: { onChange, onBlur, ...input }, meta: { error, touched } }: WrappedFieldProps) => {
    const {
      required,
      placeholder,
      label,
      id,
      helpText,
      thousandSeparator,
      prefix,
      suffix,
      decimalScale,
      fixedDecimalScale,
    } = this.props;
    const isError = touched && Boolean(error);
    this.onChange = onChange;
    return (
      <FormControl error={isError} required={required}>
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
        <NumberFormat customInput={Input}
          {...input}
          thousandSeparator={thousandSeparator}
          prefix={prefix}
          suffix={suffix}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          placeholder={placeholder}
          onValueChange={this.handleChange}
        />
        {(isError || helpText) && (
          <FormHelpText>
            {isError ? error : helpText}
          </FormHelpText>
        )}
      </FormControl>
    );
  }
}
