import { defineCommand } from '../types';
import { error } from '../lines';

export default defineCommand({
  name: 'sudo',
  description: 'run as root',
  hidden: true,
  run: () => error('Nice try. This incident will be reported.'),
});
