import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import { stringify } from 'querystring';
import * as decode from 'unescape';

axiosCookieJarSupport(axios);

const client = axios.create({
  baseURL: 'https://shindanmaker.com/',
  jar: true,
  withCredentials: true,
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

  const body = await client
    .post<string>(shindanId.toString(), stringify({ u: name ?? '' }))
    .then((res) => res.data);

  const result = between(body, '<div style="">', '</div>').replace(/<.*?>/g, '');

  if (!result) {
    throw new Error('failed to diagnose');
  }

  return decode(result.replace(/&#0/g, '&#'), 'all');
}
