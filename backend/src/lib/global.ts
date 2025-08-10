import { errorConstants } from '~/constants';

class Global {
  private static _globals: Map<unknown, Global> = new Map();

  private _value: unknown;

  private constructor(initialValue: unknown) {
    this.setValue(initialValue);
  }

  public static instanceofGlobal = (arg: unknown): arg is Global => {
    return arg instanceof Global;
  };

  public static getGlobal = (key: unknown, initialValue: unknown): Global => {
    const globals = Global._globals;

    if (!globals.has(key)) globals.set(key, new Global(initialValue));

    const global = globals.get(key);

    if (typeof global === 'undefined')
      throw new Error(errorConstants.MESSAGE.UNEXPECTED);

    return global;
  };

  public static executeOnce = <T>(key: unknown, fn: () => T): T | undefined => {
    const execute = Global.getGlobal(key, true);

    if (typeof execute.getValue() !== 'boolean')
      throw new Error(errorConstants.MESSAGE.UNEXPECTED);

    if (execute.getValue() === false) return;

    execute.setValue(false);

    return fn();
  };

  public setValue = (value: unknown): this => {
    this._value = value;

    return this;
  };

  public getValue = (): unknown => {
    return this._value;
  };
}

const instanceofGlobal = Global.instanceofGlobal;

const getGlobal = Global.getGlobal;

const executeOnce = Global.executeOnce;

export { executeOnce, getGlobal, instanceofGlobal };
