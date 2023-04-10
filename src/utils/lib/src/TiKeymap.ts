/**
 * Copyright (c) 2022 - present TinyUI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import { TiBrowser } from './TiBrowser';

// 另，Angular官方键值调用方法：

/* 使用键值请参考：
https://blog.csdn.net/q1054261752/article/details/50359617
http://www.runoob.com/try/try.php?filename=tryjsref_event_key_keycode2
https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
事件顺序：onkeydown > onkeypress >onkeyup
早期标准：
keydown和keyup捕获具体物理按键，event.keyCode输出键值，可以区分主副键盘的具体按键；
keypress捕获按键经过处理后的字符，event.charCode输出ASCII字符编码，可以区分大小写字母，主副键盘相同符号取值相同。
event.which根据情况输出charCode（keypress时）或keyCode（keydown时）。
IE8只有keyCode属性，IE9起已支持which和charCode。
Chrome和IE等，在keypress时，keyCode也存放了charCode值。（是为了兼容只有keyCode属性的IE8）
FireFox，keypress只输出event.charCode，keydown只输出event.keycode；另一个值为0。
现今情况：
keyCode/charCode/which都已废弃，但keyCode依然是目前最好选择！（2018年4月，须兼容IE9）
未来情况：
keypress和keydown时，都可用event.key（"z"）和event.code("KeyZ")，是推荐标准，都是字符串可读性值。
IE9不支持event.code。
IE9的event.key是旧标准。小键盘符号支持很差：和大键盘取值不同，且keypress和keydown时取值不同。有时符号，有时符号名称。

综上：建议只使用keydow和keyup事件和event.keyCode键值，不使用keypress/which/charCode
很少有需求使用keypress，仅配合 event.charCode取出字符编码即可。
再配合'A'.charCodeAt(0)===event.charCode或者'A'===String.fromCharCode(event.charCode);
*/
/* HTML W3C标准键值查找类，已经屏蔽浏览器差异
 *
 * 参考文档：
 * https://www.w3.org/TR/uievents/
 *
 * https://www.w3.org/TR/uievents-code/
 *
 * https://www.w3.org/TR/uievents-key
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
 *
 * https://github.com/kabirbaidhya/keycode-js  这份代码采用了Mac命名方式，比如回车键叫Return
 *
 * https://github.com/wesbos/keycodes/blob/gh-pages/scripts.js
 *
 * http://blog.csdn.net/joeblackzqq/article/details/46442121
 *
 *
 * W3C规定了一些固定键值，其他键值可能随硬件（PC/Mac）、操作系统、浏览器而不同。
 *
 * 命名规范统一按照W3C名称，已涵盖标准101键盘，其他键盘暂未涵盖。
 *
 *  js中左右Ctrl、大小键盘Enter是同一键值，所以比windows编程环境的键值要少一些。
 *
 * 多余Mac键盘值已删除。
 *
 * 标点符号，因为Firefox与其他浏览器有三个不同，已做兼容性处理
 */

export class TiKeymap {
  /* 此部分为W3C规定的固定键值 start↓ */
  /**
   * Mac称作Delete 【注意： Backspace 8/Delete 46（windows用后向删除）是两个不同键值。】
   */
  public static readonly KEY_BACKSPACE: number = 8;
  /**
   * Table键
   */
  public static readonly KEY_TAB: number = 9;
  /**
   * 回车键，数字小键盘回车也是13。 Mac称作Return。【注意：108是Mac数字小键盘Enter】
   */
  public static readonly KEY_ENTER: number = 13;
  /**
   * 左右Shift
   */
  public static readonly KEY_SHIFT: number = 16;
  /**
   * 左右Ctrl
   */
  public static readonly KEY_CONTROL: number = 17;
  /**
   * 左右Alt    Mac称作Option
   */
  public static readonly KEY_ALT: number = 18;
  /**
   * W3C未规定固定或者不固定，是PC（非Mac）独有
   */
  public static readonly KEY_PAUSE_BREAK: number = 19;
  /**
   * 大小写锁定
   */
  public static readonly KEY_CAPS_LOCK: number = 20;
  /**
   * 左上角Esc
   */
  public static readonly KEY_ESCAPE: number = 27;
  public static readonly KEY_SPACE: number = 32;
  public static readonly KEY_PAGE_UP: number = 33;
  public static readonly KEY_PAGE_DOWN: number = 34;
  public static readonly KEY_END: number = 35;
  public static readonly KEY_HOME: number = 36;
  /**
   * 箭头方向键
   */
  public static readonly KEY_ARROW_LEFT: number = 37;
  public static readonly KEY_ARROW_UP: number = 38;
  public static readonly KEY_ARROW_RIGHT: number = 39;
  public static readonly KEY_ARROW_DOWN: number = 40;
  /**
   * W3C未规定固定或非固定，是PC（非Mac）独有
   */
  public static readonly KEY_PRINT_SCREEN: number = 44; // W3C未规定固定或非固定，是PC（非Mac）独有
  /**
   * W3C未规定固定或非固定，是PC（非Mac）独有
   */
  public static readonly KEY_INSERT: number = 45; // W3C未规定固定或非固定，是PC（非Mac）独有
  /**
   * 后向删除
   */
  public static readonly KEY_DELETE: number = 46;
  public static readonly KEY_0: number = 48;
  public static readonly KEY_1: number = 49;
  public static readonly KEY_2: number = 50;
  public static readonly KEY_3: number = 51;
  public static readonly KEY_4: number = 52;
  public static readonly KEY_5: number = 53;
  public static readonly KEY_6: number = 54;
  public static readonly KEY_7: number = 55;
  public static readonly KEY_8: number = 56;
  public static readonly KEY_9: number = 57;
  public static readonly KEY_A: number = 65;
  public static readonly KEY_B: number = 66;
  public static readonly KEY_C: number = 67;
  public static readonly KEY_D: number = 68;
  public static readonly KEY_E: number = 69;
  public static readonly KEY_F: number = 70;
  public static readonly KEY_G: number = 71;
  public static readonly KEY_H: number = 72;
  public static readonly KEY_I: number = 73;
  public static readonly KEY_J: number = 74;
  public static readonly KEY_K: number = 75;
  public static readonly KEY_L: number = 76;
  public static readonly KEY_M: number = 77;
  public static readonly KEY_N: number = 78;
  public static readonly KEY_O: number = 79;
  public static readonly KEY_P: number = 80;
  public static readonly KEY_Q: number = 81;
  public static readonly KEY_R: number = 82;
  public static readonly KEY_S: number = 83;
  public static readonly KEY_T: number = 84;
  public static readonly KEY_U: number = 85;
  public static readonly KEY_V: number = 86;
  public static readonly KEY_W: number = 87;
  public static readonly KEY_X: number = 88;
  public static readonly KEY_Y: number = 89;
  public static readonly KEY_Z: number = 90;
  /* 此部分为W3C规定的固定键值 end↑ */
  /**
   * "Windows Key Left/ Left Command⌘ (Mac)/ Chromebook Search key";
   */
  public static readonly KEY_META_LEFT: number = 91;
  /**
   * "Windows Key Right
   */
  public static readonly KEY_META_RIGHT: number = 92;
  /**
   *  "Windows Menu / Right Command⌘(Mac)";
   */
  public static readonly KEY_CONTEXT_MENU: number = 93;
  public static readonly KEY_NUMPAD_0: number = 96;
  public static readonly KEY_NUMPAD_1: number = 97;
  public static readonly KEY_NUMPAD_2: number = 98;
  public static readonly KEY_NUMPAD_3: number = 99;
  public static readonly KEY_NUMPAD_4: number = 100;
  public static readonly KEY_NUMPAD_5: number = 101;
  public static readonly KEY_NUMPAD_6: number = 102;
  public static readonly KEY_NUMPAD_7: number = 103;
  public static readonly KEY_NUMPAD_8: number = 104;
  public static readonly KEY_NUMPAD_9: number = 105;
  /**
   * 小键盘*
   */
  public static readonly KEY_NUMPAD_MULTIPLY: number = 106;
  /**
   * 小键盘+
   */
  public static readonly KEY_NUMPAD_ADD: number = 107;
  /**
   * Mac小键盘Enter。可能某些键盘除法符号。且这个键值可能在Firefox与其他浏览器不同。
   */
  public static readonly KEY_NUMPAD_ENTER: number = 108;
  /**
   * 小键盘-
   */
  public static readonly KEY_NUMPAD_SUBTRACT: number = 109;
  /**
   * 小键盘. (小数点)
   */
  public static readonly KEY_NUMPAD_DECIMAL: number = 110;
  /**
   * 小键盘/
   */
  public static readonly KEY_NUMPAD_DIVIDE: number = 111;
  public static readonly KEY_F1: number = 112;
  public static readonly KEY_F2: number = 113;
  public static readonly KEY_F3: number = 114;
  public static readonly KEY_F4: number = 115;
  public static readonly KEY_F5: number = 116;
  public static readonly KEY_F6: number = 117;
  public static readonly KEY_F7: number = 118;
  public static readonly KEY_F8: number = 119;
  public static readonly KEY_F9: number = 120;
  public static readonly KEY_F10: number = 121;
  public static readonly KEY_F11: number = 122;
  public static readonly KEY_F12: number = 123;
  public static readonly KEY_F13: number = 124;
  public static readonly KEY_F14: number = 125;
  public static readonly KEY_F15: number = 126;
  public static readonly KEY_F16: number = 127;
  public static readonly KEY_F17: number = 128;
  public static readonly KEY_F18: number = 129;
  public static readonly KEY_F19: number = 130;
  public static readonly KEY_F20: number = 131;
  public static readonly KEY_F21: number = 132;
  public static readonly KEY_F22: number = 133;
  public static readonly KEY_F23: number = 134;
  public static readonly KEY_F24: number = 135;
  /**
   * W3C未规定固定或不固定，是PC（非Mac）独有。  在Mac上这个键值给numpad_clear用了。
   */
  public static readonly KEY_NUM_LOCK: number = 144;
  /**
   * W3C未规定固定或不固定，是PC（非Mac）独有
   */
  public static readonly KEY_SCROLL_LOCK: number = 145;
  /* 下面是W3C符号美标键值，不固定。Firefox符号键值有3个与其他浏览器不同 */
  /**
   * ";" Firefox键值是59，使用时已经屏蔽差异
   */
  public static KEY_SEMICOLON: number = 186;
  /**
   * ":" Firefox键值是59，使用时已经屏蔽差异
   */
  public static KEY_COLON: number = TiKeymap.KEY_SEMICOLON;
  /**
   * "=" Firefox键值是61，使用时已经屏蔽差异
   */
  public static KEY_EQUALS_SIGN: number = 187;
  /**
   * "+" Firefox键值是61，使用时已经屏蔽差异
   */
  public static KEY_PLUS: number = TiKeymap.KEY_EQUALS_SIGN;
  /**
   * "-" Firefox键值是173，使用时已经屏蔽差异
   */
  public static KEY_MINUS: number = 189;
  /**
   * "_" Firefox键值是173，使用时已经屏蔽差异
   */
  public static KEY_UNDERSCORE: number = TiKeymap.KEY_MINUS;
  /**
   * ","
   */
  public static readonly KEY_COMMA: number = 188;
  /**
   * "<"
   */
  public static readonly KEY_LESS_THAN_SIGN: number = 188;
  /**
   * "."
   */
  public static readonly KEY_PERIOD: number = 190;
  /**
   * ">"
   */
  public static readonly KEY_GREATER_THAN_SIGN: number = 190;
  /**
   * "/"
   */
  public static readonly KEY_FORWARD_SLASH: number = 191;
  /**
   * "?"
   */
  public static readonly KEY_QUESTION_MARK: number = 191;
  /**
   * "`"
   */
  public static readonly KEY_BACKTICK: number = 192;
  /**
   * "~"
   */
  public static readonly KEY_TILDE: number = 192;
  /**
   * "["
   */
  public static readonly KEY_OPENING_SQUACE_BRACKET: number = 219;
  /**
   * "{"
   */
  public static readonly KEY_OPENING_CURLY_BRACE: number = 219;
  /**
   * "\"
   */
  public static readonly KEY_BACKSLASH: number = 220;
  /**
   * "|"
   */
  public static readonly KEY_PIPE: number = 220;
  /**
   * "]"
   */
  public static readonly KEY_CLOSING_SQUARE_BRACKET: number = 221;
  /**
   * "}"
   */
  public static readonly KEY_CLOSING_CURLY_BRACE: number = 221;
  /**
   * "'"
   */
  public static readonly KEY_SINGLE_QUOTE: number = 222;
  /**
   * """
   */
  public static readonly KEY_DOUBLE_QUOTE: number = 222;

  /* 鼠标键值，前三个为W3C固定，命名暂时按照程序员习惯。 */
  /**
   * 鼠标键值：primary button
   */
  public static readonly MOUSE_LEFT_BUTTON: number = 0; // primary button
  /**
   * 鼠标键值：auxiliary button  wheel button
   */
  public static readonly MOUSE_MIDDLE_BUTTON: number = 1; // auxiliary button  wheel button
  /**
   * 鼠标键值：secondary button
   */
  public static readonly MOUSE_RIGHT_BUTTON: number = 2; // secondary button
  /**
   * 鼠标键值：浏览器后退
   */
  public static readonly MOUSE_BACK_BUTTON: number = 3; // 浏览器后退
  /**
   * 鼠标键值：浏览器前进
   */
  public static readonly MOUSE_FORWARD_BUTTON: number = 4; // 浏览器前进
  /**
   * Typescript没有静态代码段，所以这样代替静态代码段
   */
  protected static staticCode: void = TiKeymap.initFirefox();
  /* Firefox符号键值有3个与其他浏览器不同
        Semicolon	";"	186 //Firefox 59
        Colon	":"	186 //Firefox 59
        Equals sign	"="	187 //Firefox 61
        Plus	"+"	187 //Firefox 61
        Minus	"-"	189  //Firefox 173
        Underscore	"_"	189 //Firefox 173
    */
  private static initFirefox(): void {
    if (TiBrowser.isFirefox()) {
      TiKeymap.KEY_SEMICOLON = 59; // ";"
      TiKeymap.KEY_COLON = TiKeymap.KEY_SEMICOLON; // ":"
      TiKeymap.KEY_EQUALS_SIGN = 61; // "="
      TiKeymap.KEY_PLUS = TiKeymap.KEY_EQUALS_SIGN; // "+"
      TiKeymap.KEY_MINUS = 173; // "-"
      TiKeymap.KEY_UNDERSCORE = TiKeymap.KEY_MINUS; // "_"
    }
  }
}
// 因为Typescript没有类的静态代码段。所以对类的static变量初始化，写在这里。
