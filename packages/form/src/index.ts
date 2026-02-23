import { Button, Input } from '@monoreps/ui-components';
import { ApiClient } from '@monoreps/api-client';
import { logger } from '@monoreps/logger';

export interface FormField {
  name: string;
  value: string;
}

export class Form {
  private fields: Map<string, string> = new Map();
  private submitButton: Button;
  private apiClient: ApiClient;

  constructor(apiUrl: string) {
    this.submitButton = new Button({ label: 'submit' });
    this.apiClient = new ApiClient(apiUrl);
    logger.info('Form initialized');
  }

  addField(name: string, placeholder: string): void {
    const input = new Input(placeholder);
    this.fields.set(name, input.getValue());
    logger.info(`Field added: ${name}`);
  }

  setFieldValue(name: string, value: string): void {
    this.fields.set(name, value);
    logger.info(`Field value set: ${name} = ${value}`);
  }

  async submit(): Promise<void> {
    const formData = Object.fromEntries(this.fields);
    logger.info(`Form submitted with data: ${JSON.stringify(formData)}`);
    
    await this.apiClient.post('/form', formData);
    logger.info('Form data sent to server');
  }

  getFields(): Record<string, string> {
    return Object.fromEntries(this.fields);
  }

  render(): string {
    let html = '<form>';
    for (const [name, value] of this.fields) {
      html += `<input name="${name}" value="${value}" />`;
    }
    html += this.submitButton.render();
    html += '</form>';
    return html;
  }
}
