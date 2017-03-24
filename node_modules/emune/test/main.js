var chai = require('chai')
var expect = chai.expect
var emune = require('../main')

describe('emune', function () {
  it('accepts an array of keys', function () {
    expect(emune(['foo', 'bar'])).to.deep.equal({
      foo: 'foo',
      bar: 'bar'
    })
  })

  it('accepts an Object', function () {
    expect(
      emune({foo: null, bar: null})
    ).to.deep.equal({
      foo: 'foo',
      bar: 'bar'
    })
  })

  it('discards Object values', function () {
    expect(
      emune({foo: 31, bar: 22})
    ).to.deep.equal({
      foo: 'foo',
      bar: 'bar'
    })
  })

  it('returns an empty Object if no keys are provided', function () {
    [
      emune(),
      emune(undefined),
      emune(null)
    ].forEach(function (result) {
      expect(result).to.deep.equal({})
    })
  })

  it('returns an empty Object if provided type is not an Object or Array', function () {
    [
      emune(Boolean(1)),
      emune('foo'),
      emune(26)
    ].forEach(function (result) {
      expect(result).to.deep.equal({})
    })
  })
})
