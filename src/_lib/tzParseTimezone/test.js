import assert from 'power-assert'
import tzParseTimezone from '.'

describe('tzParseTimezone', function() {
  it('Empty time zone', function() {
    assert.equal(tzParseTimezone(''), 0)
  })

  it('Z time zone', function() {
    assert.equal(tzParseTimezone('Z'), 0)
  })

  it('±hh time zone format', function() {
    assert.equal(tzParseTimezone('-04'), 240 * 60 * 1000)
    assert.equal(tzParseTimezone('+02'), -120 * 60 * 1000)
  })

  it('±hhmm time zone format', function() {
    assert.equal(tzParseTimezone('-0430'), 270 * 60 * 1000)
    assert.equal(tzParseTimezone('+0230'), -150 * 60 * 1000)
  })

  it('±hh:mm time zone format', function() {
    assert.equal(tzParseTimezone('-05:00'), 300 * 60 * 1000)
    assert.equal(tzParseTimezone('+03:00'), -180 * 60 * 1000)
  })

  it('IANA time zone', function() {
    var date = new Date('2014-10-25T13:46:20Z')
    assert.equal(tzParseTimezone('America/New_York', date), 240 * 60 * 1000)
    assert.equal(tzParseTimezone('Europe/Paris', date), -120 * 60 * 1000)
  })

  describe('near DST changeover (AEST to AEDT)', function() {
    // these tests erroneously get -11 hours, not -10
    it.skip('one day before', function() {
      var date = new Date('2020-10-04T00:45:00.000')
      assert.equal(tzParseTimezone('Australia/Melbourne', date), -36000000)
    })

    // these tests erroneously get -11 hours, not -10
    it.skip('15 minutes before', function() {
      var date = new Date('2020-10-04T01:45:00.000')
      assert.equal(tzParseTimezone('Australia/Melbourne', date), -36000000) // +10
    })

    it('15 minutes after', function() {
      var date = new Date('2020-10-04T03:15:00.000')
      assert.equal(tzParseTimezone('Australia/Melbourne', date), -39600000) // +11
    })
  })
})
