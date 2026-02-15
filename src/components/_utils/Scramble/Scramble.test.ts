import scrambleText from './Scramble';

describe('scrambleText', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    // Mock requestAnimationFrame to just schedule the callback via setTimeout
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation((cb) => {
      return setTimeout(() => cb(performance.now()), 16) as unknown as number
    })
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  it('calls onUpdate with the final text', () => {
    const updates: string[] = []

    scrambleText('hello', 'world', (value) => {
      updates.push(value)
    }, 50) // short duration for test

    // Run all timers to simulate the animation frames
    jest.runAllTimers()

    // The last update should be the final string
    expect(updates[updates.length - 1]).toBe('world')
  })

  it('calls onUpdate multiple times', () => {
    const updates: string[] = []

    scrambleText('abc', 'xyz', (value) => {
      updates.push(value)
    }, 50)

    jest.runAllTimers()

    expect(updates.length).toBeGreaterThan(1)
    expect(updates[0]).not.toBe('xyz')
  })
})