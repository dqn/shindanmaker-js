import * as rp from 'request-promise';
import * as decode from 'unescape';

const client = rp.defaults({
  baseUrl: 'https://shindanmaker.com/',
  jar: true,
});

let isInitialized = false;

export async function diagnose(shindanId: number | string, name?: string): Promise<string> {
  if (!name && !isInitialized) {
    // Access a meaningless page to set the default name
    await client.get('0');
    isInitialized = true;
  }

  const body = await client.post(shindanId.toString(), {
    formData: { u: name || '' },
  });

  const matches = body.match(/quote: '(.+)?',$/m);

  if (!matches) {
    throw new Error('failed to diagnose');
  }

  console.log(matches[1]);

  return decode(matches[1].replace(/&#0/g, '&#'), 'all');
}
