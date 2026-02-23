import { Form } from '@monoreps/form';
import { logger } from '@monoreps/logger';
import { formatDate } from '@monoreps/utils';

export class Application {
  private forms: Map<string, Form> = new Map();

  constructor() {
    logger.info(`Application started at ${formatDate(new Date())}`);
  }

  registerForm(name: string, apiUrl: string): Form {
    const form = new Form(apiUrl);
    this.forms.set(name, form);
    logger.info(`Form registered: ${name}`);
    return form;
  }

  async initializeForms(): Promise<void> {
    logger.info('Initializing forms...');
    
    // Create a login form
    const loginForm = this.registerForm('login', 'http://localhost:3000/api');
    loginForm.addField('email', 'Email Address');
    loginForm.addField('password', 'Password');
    
    // Create a registration form
    const regForm = this.registerForm('register', 'http://localhost:3000/api');
    regForm.addField('username', 'Username');
    regForm.addField('email', 'Email');
    regForm.addField('password', 'Password');

    logger.info('Forms initialized successfully');
  }

  async submitForm(formName: string): Promise<void> {
    const form = this.forms.get(formName);
    if (!form) {
      logger.error(`Form not found: ${formName}`);
      return;
    }
    
    logger.info(`Submitting form: ${formName}`);
    await form.submit();
    logger.info(`Form submitted: ${formName}`);
  }

  getFormCount(): number {
    return this.forms.size;
  }
}

async function main() {
  const app = new Application();
  await app.initializeForms();
  
  logger.info(`Total forms: ${app.getFormCount()}`);
  await app.submitForm('login');
  
  logger.info('Application finished');
}

// Run if this is the main module
if (require.main === module || process.argv[1] === __filename) {
  main().catch(err => {
    logger.error(`Application error: ${err.message}`);
    process.exit(1);
  });
}

export { main };
