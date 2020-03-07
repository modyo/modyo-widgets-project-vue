export default {
  clean(_value) {
    let stringValue;
    if (typeof _value !== 'string') {
      stringValue = _value.toString();
    } else {
      stringValue = _value;
    }
    return stringValue.replace(/^0+|[^0-9kK]+/g, '').toUpperCase().substring(0, 9);
  },

  format(_value, _default) {
    const value = this.clean(_value);

    if (!value) {
      return _default;
    }

    if (value.length <= 1) {
      return value;
    }

    let result = `${value.slice(-4, -1)}-${value.substr(value.length - 1)}`;
    for (let i = 4; i < value.length; i += 3) {
      result = `${value.slice(-3 - i, -i)}.${result}`;
    }
    return result;
  },

  validate(rut) {
    if (typeof (rut) !== 'string') {
      return false;
    }
    const cRut = rut.replace(/[.-]/g, '');
    const cDv = cRut.charAt(cRut.length - 1).toUpperCase();
    let nRut = parseInt(cRut.substr(0, cRut.length - 1), 10);
    if (Number.isNaN(nRut)) {
      return false;
    }
    let sum = 0;
    let factor = 2;
    nRut = nRut.toString();
    for (let i = nRut.length - 1; i >= 0; i -= 1) {
      sum += nRut.charAt(i) * factor;
      factor = (factor + 1) % 8 || 2;
    }
    let computedDv = 0;

    switch (sum % 11) {
      case 1:
        computedDv = 'k';
        break;
      case 0:
        computedDv = 0;
        break;
      default:
        computedDv = 11 - (sum % 11);
        break;
    }

    return computedDv.toString().toUpperCase() === cDv.toString().toUpperCase();
  },
};
