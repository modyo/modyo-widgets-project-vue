/* eslint-disable no-param-reassign */
/**
Get the params from an url
Usage:
If url is: http://somesite.com/seach?query=yyy&myParam=xxxx
to get the myParam value:
getURLParams("myParam")
*/
export default function (sParam) {
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split('&');
  for (let i = 0; i < sURLVariables.length; i += 1) {
    const sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1];
    }
  }
  return false;
}
