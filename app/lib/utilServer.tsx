import { JSDOM } from 'jsdom';

// Simple sleep function to use React's suspense and transition
export function sleep(ms: number):Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function sanitizeHtml (html: string):string {
  const dom = new JSDOM('');

  const sanitizedElement = dom.window.document.createElement('div')
  sanitizedElement.innerHTML = `<div id='sanitize_div'>${html}</div>`

  const tagToSanitizeList = ['style', 'script', 'iframe']

  Array
    .from(sanitizedElement.querySelectorAll(tagToSanitizeList.join(',')))
    .forEach((toRemove) => toRemove.remove())

  const sanitizedHtml = sanitizedElement.querySelector('#sanitize_div')?.innerHTML ?? ''

  return sanitizedHtml
}
