import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import JournalForm from "../components/journal-form"

import styles from "../components/journal-form.module.css"

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

const Journal = () => {
  const [inputText, setInputText] = useState("")
  const [checked, setChecked] = useState(false)
  const [events, setEvents] = useState([])
  const [rabbit, setRabbit] = useState(false)
  const [journal, setJournal] = useState([])
  const [suggestion, setSuggestion] = useState(new Set())

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyPress)
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress)
  //   }
  // }, [])

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      let newEvents = [...events]
      newEvents.push(inputText)
      console.log(newEvents)
      console.log(inputText)
      setEvents(newEvents)
      setInputText("")
    }
  }

  return (
    <Layout>
      <SEO
        title="The Journal"
        keywords={[
          `gatsby`,
          `application`,
          `react`,
          `datastructures`,
          `eloquentjavascript`,
        ]}
      />

      <div>
        <div className={styles.container}>
          <div className={styles.events}>
            <input
              autoFocus
              placeholder="Enter event"
              type="text"
              onChange={e => setInputText(e.target.value)}
              value={inputText}
              onKeyUp={handleKeyPress}
            />
          </div>
          <div className={styles.submit}>
            {events && (
              <ul>
                {events.map((event, i) => (
                  <li key={i}>{event}</li>
                ))}
              </ul>
            )}

            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <span className={styles.slider}>Did I turn?</span>
            </label>

            <button>Submit Entry</button>
          </div>
          <div />
        </div>
      </div>

      <Link style={{ textDecoration: `none`, color: `#b3008b` }} to="/">
        Go back to the homepage
      </Link>
    </Layout>
  )
}

export default Journal
