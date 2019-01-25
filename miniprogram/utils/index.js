export function getStartEnd(time) {
  let start = new Date(time || Date.now())
  let end = new Date(time || Date.now())
  start.setDate(1)
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)
  start.setMilliseconds(0)
  end.setDate(1)
  end.setHours(0)
  end.setMinutes(0)
  end.setSeconds(0)
  end.setMilliseconds(0)
  end.setMonth(end.getMonth() + 1)
  return [start, end]
}