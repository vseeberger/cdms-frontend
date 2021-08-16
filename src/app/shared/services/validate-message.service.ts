import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import _ from 'lodash';

_.templateSettings.interpolate = /{([\s\S]+?)}/g;

const ERRORS = [
    {name: 'required', message: 'Campo obrigatório.'},
    {name: 'cnpj', message: 'Por favor, insira um CNPJ válido.'},
    {name: 'cpf', message: 'Por favor, insira um CPF válido.'},
    {name: 'mask', message: 'Campo inválido.'},
    {name: 'email', message: 'E-mail inválido.'},
    {name: 'maxlength', message: _.template('O valor máximo para este campo é de {requiredLength} caracteres.')},
    {name: 'max', message: _.template('O valor máximo para este campo é de {max}.')}

];

@Injectable({
    providedIn: 'root'
})
export class ValidateMessageService {

    message(control: AbstractControl): string {
        if (!control) {
            return null;
        }
        if (!control.invalid) {
            return null;
        }
        const first = this.getFirst(control, ERRORS);
        if (!!first) {
            return first;
        }
        if (control.hasError('genMsg')) {
            return control.getError('genMsg');
        }
        const keys = _.keys(control.errors);
        const defaultMsg = 'Campo inválido.';
        return `${defaultMsg} ${keys}`;
    }

    private getFirst(control: AbstractControl, list: any[]) {
        for (let index = 0; index < list.length; index++) {
            const element = list[index];
            if (control.hasError(element.name)) {
                return this.render(element.message, control.getError(element.name));
            }
        }
        return null;
    }

    private render(message: any, params: any) {
        if (!message) {
            return `'Campo inválido.'`;
        }
        if (typeof message === 'string') {
            return message;
        } else if (typeof message === 'function') {
            return message(params);
        } else {
            return message;
        }
    }
}
