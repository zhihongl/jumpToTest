// function run() {
//   require('mocha/bin/_mocha');
// }

// module.exports = { run };


const Mocha = require('mocha');
const path = require('path');
const glob = require('glob');

function run() {
  const mocha = new Mocha({
    ui: 'bdd',
    color: true,
    timeout: 10000
  });

  const testsRoot = path.resolve(__dirname, 'suite');

  glob('extension.test.ts', { cwd: testsRoot }, (err, files) => {
    if (err) {
      return console.error(err);
    }

    files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

    mocha.run(failures => {
      if (failures > 0) {
        console.error(`${failures} tests failed`);
        process.exit(1);
      } else {
        process.exit(0);
      }
    });
  });
}

module.exports = { run };
