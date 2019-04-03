function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals)
}

// create the table for a specific event
// from the events
function tableFor(event, journal) {
  let table = [0, 0, 0, 0]
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i],
      index = 0
    if (entry.events.includes(event)) index += 1
    if (entry.squirrel) index += 2
    table[index] += 1
  }
  return table
}

// distinct events
function journalEvents(journal) {
  let events = []
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event)
      }
    }
  }
  return events
}

// Calculate phi
function phi([n00, n01, n10, n11]) {
  return (
    (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10))
  )
}

// taken from stack overflow 😂
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export { tableFor, journalEvents, phi, uuidv4, round }
