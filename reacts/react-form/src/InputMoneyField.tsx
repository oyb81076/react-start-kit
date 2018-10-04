import InputNumberField, { IInputNumberFieldProps } from "./InputNumberField";
export default class InputMoneyField extends InputNumberField {
  public static defaultProps: Partial<IInputNumberFieldProps> = {
    prefix: "¥ ",
    decimalScale: 2,
    fixedDecimalScale: true,
    thousandSeparator: true,
  };
}
