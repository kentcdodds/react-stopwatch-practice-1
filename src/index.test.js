import React from 'react'
import {mount} from 'enzyme'
import {mountToJson} from 'enzyme-to-json'
import StopWatch from './index'

jest.useFakeTimers()

test('initial state', () => {
  expect(mountToJson(mount(<StopWatch buttonStyles={{fontSize: '2em'}} />))).toMatchSnapshot()
})

test('full interaction', () => {
  const wrapper = mount(<StopWatch buttonStyles={{fontSize: '2em'}} />)
  const toggle = getToggle(wrapper)
  // initial state
  expect(toggle.text()).toBe('Start')
  expect(getMillisecondsInt(wrapper)).toBe(0)

  const fastForward = 10
  clickToggle(wrapper)
  jest.runTimersToTime(fastForward)

  expect(toggle.text()).toBe('Stop')
  const currentMs = getMillisecondsInt(wrapper)
  expect(currentMs > 0).toBe(true)

  clickToggle(wrapper)
  expect(toggle.text()).toBe('Start')

  clickClear(wrapper)
  expect(toggle.text()).toBe('Start')
  expect(getMillisecondsInt(wrapper)).toBe(0)
})

function clickToggle(wrapper) {
  getToggle(wrapper).simulate('click')
}

function clickClear(wrapper) {
  wrapper.find('[data-test="clear"]').simulate('click')
}

function getToggle(wrapper) {
  return wrapper.find('[data-test="toggle"]')
}

function getMilliseconds(wrapper) {
  return wrapper.find('[data-test="ms"]')
}

function getMillisecondsInt(wrapper) {
  const text = getMilliseconds(wrapper).text()
  return Number(text.substring(0, text.length - 2))
}
