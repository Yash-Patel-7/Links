import { executeOnce, getGlobal, instanceofGlobal } from '~/lib';

describe('instanceofGlobal', () => {
  it('should return true for an instance of Global class', () => {
    const global = getGlobal('key', 0);
    expect(instanceofGlobal(global)).toBe(true);
  });

  it('should return false for a string', () => {
    expect(instanceofGlobal('string')).toBe(false);
  });

  it('should return false for an instance of Array class', () => {
    const arr = new Array<number>(1, 2, 3);
    expect(instanceofGlobal(arr)).toBe(false);
  });
});

describe('getGlobal', () => {
  it('should return the same instance for the same exact key', () => {
    const global1 = getGlobal(undefined, 9);
    const global2 = getGlobal(undefined, 7);
    expect(global1).toBe(global2);
  });

  it('should return a different instance for a different key', () => {
    const global1 = getGlobal(0, 9);
    const global2 = getGlobal(1, 7);
    expect(global1).not.toBe(global2);
  });

  it('should return a different instance for a primitive and object', () => {
    const global1 = getGlobal('string', [1, 2, 3]);
    const global2 = getGlobal(new String('string'), []);
    expect(global1).not.toBe(global2);
  });
});

describe('executeOnce', () => {
  it('should execute the function once', () => {
    let counter = 0;
    const increment = () => {
      counter++;
    };
    executeOnce('increment', increment);
    executeOnce('increment', increment);
    expect(counter).toBe(1);
  });

  it('should return the output of the function', () => {
    const value = { value: 9 };
    const getValue = () => {
      return value;
    };
    const result = executeOnce('getValue', getValue);
    expect(result).toBe(value);
  });
});

describe('global', () => {
  it('should return the initial value', () => {
    const initialValue = { value: 9 };
    let global = getGlobal('initialValue', initialValue);
    const newValue = { value: 9 };
    global = getGlobal('initialValue', newValue);
    expect(global.getValue()).toBe(initialValue);
  });

  it('should return the current value', () => {
    const initialValue = { value: 9 };
    const global = getGlobal('currentValue', initialValue);
    const currentValue = { value: 9 };
    global.setValue(currentValue);
    expect(global.getValue()).toBe(currentValue);
  });

  it('should set value of any type', () => {
    const initialValue = { value: 9 };
    const global = getGlobal('updatedValue', initialValue);
    const updatedValue = 'string';
    global.setValue(updatedValue);
    expect(global.getValue()).toBe(updatedValue);
  });
});
