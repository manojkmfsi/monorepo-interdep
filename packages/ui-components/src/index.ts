import { logger } from '@monoreps/logger';
import { capitalize } from '@monoreps/utils';

export interface ComponentProps {
  label: string;
  disabled?: boolean;
}

export class Button {
  private label: string;
  private disabled: boolean;

  constructor(props: ComponentProps) {
    this.label = props.label;
    this.disabled = props.disabled || false;
    logger.info(`Button created with label: ${this.label}`);
  }

  render(): string {
    return `<button disabled="${this.disabled}">${capitalize(this.label)}</button>`;
  }

  isDisabled(): boolean {
    return this.disabled;
  }
}

export class Input {
  private placeholder: string;

  constructor(placeholder: string) {
    this.placeholder = placeholder;
    logger.info(`Input created with placeholder: ${this.placeholder}`);
  }

  render(): string {
    return `<input placeholder="${this.placeholder}" />`;
  }

  getValue(): string {
    return this.placeholder;
  }
}
