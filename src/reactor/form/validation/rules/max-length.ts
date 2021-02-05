import { trans } from './../../../localization';
import { InputRule, RuleResponse } from './input-rule';

export default {
    rule: 'maxLength',
    evaluate: function (value, props): RuleResponse {
        const minLength = props.minLength;
        return {
            hasError: String(value).length > minLength,
            errorMessage: trans('validation.maxLength', minLength),
        } as RuleResponse;
    }
} as InputRule;