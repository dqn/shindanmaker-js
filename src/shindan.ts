import * as rp from 'request-promise';
import * as decode from 'unescape';

const client = rp.defaults({
  baseUrl: 'https://shindanmaker.com/',
  jar: true,
});

let isInitialized = false;

function between(str: string, a: string, b: string): string {
  return str.split(a).pop()?.split(b)?.shift() ?? '';
}

export async function diagnose(shindanId: number | string, name?: string): Promise<string> {
  if (!name && !isInitialized) {
    // Access a meaningless page to set the default name
    await client.get('0');
    isInitialized = true;
  }

  const body: string = await client.post(shindanId.toString(), {
    formData: { u: name ?? '' },
  });

  const result = between(body, '<div style="">', '</div>').replace(/<.*?>/g, '');

  if (!result) {
    throw new Error('failed to diagnose');
  }

  return decode(result.replace(/&#0/g, '&#'), 'all');
}
