let elm = require('./Request_Locaters.json');

class Request_SSO_Integration {
  static ClickButton(buttonName) {
    return elm.Locaters.Button_xpath1 + buttonName + elm.Locaters.Button_xpath2;
  }

  static textBox(textboxLabel) {
    return elm.Locaters.TextBox_Xpath1 + textboxLabel + elm.Locaters.TextBox_Xpath2;
  }

  static QuestionRadioButton(value, questiontext) {
    return (
      elm.Locaters.QuestionRadioButton_Xpath1 +
      questiontext +
      elm.Locaters.QuestionRadioButton_Xpath2 +
      value +
      elm.Locaters.QuestionRadioButton_Xpath3
    );
  }

  static legendQuestionRadioButton(value, legendquestiontext) {
    return (
      elm.Locaters.LegendQuestionRadioButton_Xpath1 +
      legendquestiontext +
      elm.Locaters.LegendQuestionRadioButton_Xpath2 +
      value +
      elm.Locaters.LegendQuestionRadioButton_Xpath3
    );
  }

  static legendTextBox(LegendtextboxLabel) {
    return elm.Locaters.LegendTextBox_Xpath1 + LegendtextboxLabel + elm.Locaters.LegendTextBox_Xpath2;
  }

  static Checkbox(CheckboxText) {
    return elm.Locaters.CheckBox_Xpath1 + CheckboxText + elm.Locaters.CheckBox_Xpath2;
  }

  static infoHeadingValue(HeadingText) {
    return elm.Locaters.InfoHeadingValue_Xpath1 + HeadingText + elm.Locaters.InfoHeadingValue_Xpath2;
  }
}

export default Request_SSO_Integration;
