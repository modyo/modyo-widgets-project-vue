export default function (originalValue) {
  let newValue = originalValue.replace(/^\s+|\s+$/g, ''); // trim
  newValue = newValue.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeeiiiiooooouuuunc------';
  for (let i = 0, l = from.length; i < l; i += 1) {
    newValue = newValue.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  newValue = newValue.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return newValue;
}
