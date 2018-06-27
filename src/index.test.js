import {
  exists,
  get,
  set,
  remove,
} from '.';

describe('object-property', () => {
  const foo = 'foo';
  const baz = 'baz';
  let object = {
    foo,
    bar: { baz },
    jae: null,
    baebae: undefined,
  };

  describe('#exists', () => {
    it('true for object property', () => {
      expect(exists('foo').in(object)).toBe(true);
    });
    it('true for numerical property', () => {
      expect(exists(1).in([0, 1, 2, 3])).toBe(true);
    });
    it('true for nested property', () => {
      expect(exists('bar', 'baz').in(object)).toBe(true);
    });
    it('false for missing property', () => {
      expect(exists('jaejae').in(object)).toBe(false);
    });
    it('false for undefined property', () => {
      expect(exists(undefined).in(object)).toBe(false);
    });
    it('false for null property', () => {
      expect(exists(null).in(object)).toBe(false);
    });
    it('true for property with null value', () => {
      expect(exists('jae').in(object)).toBe(true);
    });
    it('false for property with undefined value', () => {
      expect(exists('baebae').in(object)).toBe(false);
    });
    it('true for prototype property', () => {
      expect(exists('toUpperCase').in('foo')).toBe(true);
    });
    it('false for no arguments', () => {
      expect(exists().in(object)).toBe(false);
    });
    it('false for no arguments', () => {
      expect(exists().in()).toBe(false);
    });
  });

  describe('#get', () => {
    it('gets value for object property', () => {
      expect(get('foo').from(object)).toEqual('foo');
    });
    it('gets for numerical property', () => {
      expect(get(1).from([0, 1, 2, 3])).toEqual(1);
    });
    it('gets value for nested property', () => {
      expect(get('bar', 'baz').from(object)).toEqual('baz');
    });
    it('undefined for missing property', () => {
      expect(get('jaejae').from(object)).toBeUndefined();
    });
    it('undefined for undefined value', () => {
      expect(get(undefined).from(object)).toBeUndefined();
    });
    it('get null for property with null value', () => {
      expect(get('jae').from(object)).toBeNull();
    });
    it('get value for prototype property', () => {
      expect(get('toUpperCase').from('foo')).toBeInstanceOf(Function);
    });
    it('undefined for no arguments', () => {
      expect(get().from()).toBeUndefined();
    });
    it('undefined for one argument', () => {
      expect(get().from(object)).toBeUndefined();
    });
  });

  describe('#set', () => {
    const original = JSON.parse(JSON.stringify(object));

    beforeEach(() => {
      object = JSON.parse(JSON.stringify(original));
    });

    it('updates existing object property', () => {
      set('foo').in(object).to('jaebaebae');
      expect(object.foo).toEqual('jaebaebae');
    });
    it('updates nested property', () => {
      set('bar', 'baz').in(object).to('jaebaebae');
      expect(object.bar.baz).toEqual('jaebaebae');
    });

    it('creates new property if property does not exist', () => {
      set('jaebaebae', 'bae jadley').in(object).to('vijayjae');
      expect(object.jaebaebae['bae jadley']).toEqual('vijayjae');
    });
    it('creates new property in existing object property', () => {
      set('jaebaebae', 'bae').in(object).to('jaebaebaebae');
      expect(object.jaebaebae.bae).toEqual('jaebaebaebae');
    });
    it('does not update when missing replacement value', () => {
      set('jaebaebae').in(object);
      expect(object).toEqual(original);
    });
    it('does not update when only object argument', () => {
      set('foo');
      expect(object).toEqual(original);
    });
    it('does not update when no arguments', () => {
      set();
      expect(object).toEqual(original);
    });
  });

  describe('#remove', () => {
    const original = JSON.parse(JSON.stringify(object));

    beforeEach(() => {
      object = JSON.parse(JSON.stringify(original));
    });

    it('removes existing object property', () => {
      remove('foo').from(object);
      expect(object.foo).toBeUndefined();
    });
    it('removes nested property', () => {
      remove('bar', 'baz').from(object);
      expect(object.bar.baz).toBeUndefined();
    });
    it('does not remove non-existent property', () => {
      remove('jaebaebae', 'bae jadley').from(object);
      expect(object).toEqual(original);
    });
    it('does not remove when missing input value', () => {
      remove().from(object);
      expect(object).toEqual(original);
    });
    it('does not update when missing object argument', () => {
      remove('bar').from();
      expect(object).toEqual(original);
    });
    it('does not update when no arguments', () => {
      remove().from();
      expect(object).toEqual(original);
    });
  });
});
