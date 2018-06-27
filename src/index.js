const setOrDeleteProperties = ({
  object,
  properties,
  replacement,
}) => {
  let toUpdate = object;

  properties.forEach((property, index) => {
    if (toUpdate) {
      const replacementValueIsDefined = typeof replacement !== 'undefined';
      if (index < properties.length - 1) {
        const currentValue = toUpdate[property];
        if (replacementValueIsDefined && typeof currentValue === 'undefined') {
          toUpdate[property] = {};
        }
        toUpdate = toUpdate[property];
      } else if (replacementValueIsDefined) {
        toUpdate[property] = replacement;
      } else {
        delete toUpdate[property];
      }
    }
  });

  return object;
};

const find = ({ object, properties }) => {
  let copy = object;
  let value;

  properties.every((property) => {
    if (typeof copy !== 'undefined' && (copy[property] || property in copy)) {
      copy = copy[property];
      value = copy;
      return true;
    }
    value = undefined;
    return false;
  });

  return value;
};

const get = (...properties) => {
  const from = object => find({ object, properties });
  return { from };
};

const exists = (properties) => {
  const check = object => typeof get(properties).from(object) !== 'undefined';
  return { in: check };
};


const set = (...properties) => {
  const setObject = object => ({
    to: replacement => setOrDeleteProperties({ object, properties, replacement }),
  });
  return { in: setObject };
};

const remove = (...properties) => {
  const from = object => setOrDeleteProperties({ object, properties });
  return { from };
};

export {
  exists,
  get,
  set,
  remove,
};
