import assert from 'power-assert'
import zonedTimeToUtc from '.'

describe('zonedTimeToUtc', function() {
  it('returns the UTC time of the date in the time zone for a date input and IANA tz', function() {
    var result = zonedTimeToUtc(
      new Date(2014, 5, 25, 10, 0, 0, 123),
      'America/Los_Angeles'
    )
    assert.deepEqual(result.toISOString(), '2014-06-25T17:00:00.123Z')
  })

  it('returns the UTC time of the date in the time zone for a string and IANA tz', function() {
    var result = zonedTimeToUtc(
      '2014-06-25T10:00:00.123',
      'America/Los_Angeles'
    )
    assert.deepEqual(result.toISOString(), '2014-06-25T17:00:00.123Z')
  })

  it('returns the UTC time of the date near DST changeover with IANA tz', function() {
    var result = zonedTimeToUtc(
      '2020-10-03T17:00:00.000',
      'Australia/Melbourne'
    )
    assert.deepEqual(result.toISOString(), '2020-10-03T07:00:00.000Z')
  })

  it('returns the UTC time of the date for a UTC input', function() {
    var result = zonedTimeToUtc(new Date(2014, 5, 25, 10, 0, 0, 123), 'UTC')
    assert.deepEqual(result.toISOString(), '2014-06-25T10:00:00.123Z')
  })

  it('returns the UTC time of the date in the time zone for a date input and tz offset', function() {
    var result = zonedTimeToUtc(new Date(2014, 5, 25, 10, 0, 0, 123), '+0400')
    assert.deepEqual(result.toISOString(), '2014-06-25T06:00:00.123Z')
  })

  it('returns the UTC time of the date in the time zone for a string and tz offset', function() {
    var result = zonedTimeToUtc('2014-06-25T10:00:00.123', '-02:00')
    assert.deepEqual(result.toISOString(), '2014-06-25T12:00:00.123Z')
  })

  it('returns the UTC time of the date for the Z tz', function() {
    var result = zonedTimeToUtc(new Date(2014, 5, 25, 10, 0, 0, 123), 'Z')
    assert.deepEqual(result.toISOString(), '2014-06-25T10:00:00.123Z')
  })

  describe('near DST changeover (AEST to AEDT)', function() {
    it('zoned time one day before', function() {
      var result = zonedTimeToUtc(
        new Date('2020-10-03T17:00:00.000'),
        'Australia/Melbourne' // +10 hours
      )

      assert.deepEqual(result.toISOString(), '2020-10-03T07:00:00.000Z')
    })

    it('zoned time 15 minutes before', function() {
      var result = zonedTimeToUtc(
        new Date('2020-10-04T01:45:00.000'),
        'Australia/Melbourne' // +10 hours
      )

      assert.deepEqual(result.toISOString(), '2020-10-03T15:45:00.000Z')
    })

    it('zoned time 15 minutes after', function() {
      var result = zonedTimeToUtc(
        new Date('2020-10-04T02:15:00.000'),
        'Australia/Melbourne' // +11 hours
      )

      assert.deepEqual(result.toISOString(), '2020-10-03T16:15:00.000Z')
    })
  })
})
