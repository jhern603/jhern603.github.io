import { defineCommand } from '../types';

export default defineCommand({
  name: 'clear',
  description: 'clear the screen',
  aliases: ['cls'],
  run: ({ clear }) => clear(),
});
