/* eslint-disable no-console */

import { HIDE_DEBUG_ARY, SHOW_CONSOLE_LOG } from '@/constants';

export const consoleLog = (
  var1: unknown,
  var2: unknown = 'DEF_VAR_2',
  var3: unknown = 'DEF_VAR_3',
  var4: unknown = 'DEF_VAR_4',
  var5: unknown = 'DEF_VAR_5'
) => {
  if (SHOW_CONSOLE_LOG) {
    const newVar1 = typeof var1 === 'string' ? `🤔🙏🚀 ${var1}` : var1;
    if (typeof var1 === 'string') {
      if (HIDE_DEBUG_ARY.some((item) => var1.includes(item))) {
        // console.log('H💖 🔥 💪 👌 👍 💔 😅');
        console.log('H');
        return;
      }
    }

    if (var5 !== 'DEF_VAR_5') {
      console.log(newVar1, var2, var3, var4, var5);
    } else if (var4 !== 'DEF_VAR_4') {
      console.log(newVar1, var2, var3, var4);
    } else if (var3 !== 'DEF_VAR_3') {
      console.log(newVar1, var2, var3);
    } else if (var2 !== 'DEF_VAR_2') {
      console.log(newVar1, var2);
    } else {
      console.log(newVar1);
    }
  }
};
