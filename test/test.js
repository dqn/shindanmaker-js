const shindan = require('./../index');

const shindanId = 953698;

async function test(name, expect) {
  const res = await shindan.executeShindan(shindanId, name);
  console.log(expect.test(res));
}

async function main() {
  await test(undefined, /名無しの[A-Z]/);
  await test('', /名無しの[A-Z]/);
  await test(null, /名無しの[A-Z]/);
  await test('abc', /abc/);
  await test('123', /123/);
  await test('あいう', /あいう/);
  await test('漢字', /漢字/);
  await test('<a>b&c"d\'e', /<a>b&c"d'e/);
}

if (require.main === module) {
  main(process.argv);
}
