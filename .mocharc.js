module.exports = {
  spec: 'test/suites/**/*.test.js',
  timeout: 10000,
  reporter: 'spec',
  require: ['test/helpers/setup.js'],
}