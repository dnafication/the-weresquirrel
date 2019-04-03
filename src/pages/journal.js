import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "../components/journal.module.css"

import { tableFor, journalEvents, phi, uuidv4, round } from "../utils/utils"

//trim function
if (typeof String.prototype.trim === "undefined") {
  String.prototype.trim = function() {
    return String(this).replace(/^\s+|\s+$/g, "")
  }
}

const Journal = () => {
  const [inputText, setInputText] = useState("")
  const [currentEntry, setCurrentEntry] = useState({
    id: null,
    events: [],
    squirrel: false,
  })
  const [journal, setJournal] = useState([])
  const [suggestion, setSuggestion] = useState(new Set())
  const [eventPhi, setEventPhi] = useState([])

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyPress)
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress)
  //   }
  // }, [])

  useEffect(() => {
    console.log("hi there")
    console.log("journal", journal)
    // get suggestion
    setSuggestion(journalEvents(journal))

    // calculate and push phi values for events
    let tempEventPhi = []
    journalEvents(journal).forEach(event => {
      let p = phi(tableFor(event, journal))
      tempEventPhi.push({ event, phi: p })
    })

    setEventPhi(tempEventPhi)

    return () => {
      console.log("ho there")
    }
  }, [journal])

  const { events, squirrel } = currentEntry // dont modify this variables directly

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      setCurrentEntry({
        events: [...currentEntry.events, inputText.trim()],
        squirrel: currentEntry.squirrel,
      })
      setInputText("")
    }
  }

  const didITurn = value => {
    setCurrentEntry({
      ...currentEntry,
      squirrel: value,
    })
  }

  const submitEntry = () => {
    if (currentEntry.events.length > 0) {
      setJournal([...journal, { ...currentEntry, id: uuidv4() }])
      //reset the form
      setCurrentEntry({ events: [], squirrel: false })
    } else alert("at least single event is expected!")
  }

  const removeEntry = id => {
    setJournal(journal.filter(entry => entry.id !== id))
  }

  const removeEvent = event => {
    setCurrentEntry({
      events: currentEntry.events.filter(i => i !== event),
      squirrel: currentEntry.squirrel,
    })
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

      <div className={styles.container}>
        <div className={styles.events}>
          <div>
            <input
              autoFocus
              placeholder="Enter event"
              type="text"
              onChange={e => setInputText(e.target.value)}
              value={inputText}
              onKeyUp={handleKeyPress}
            />
          </div>
          <div>
            {events.length > 0 && (
              <ul>
                {events.map((event, i) => (
                  <li key={i}>
                    {event}
                    <button
                      className={styles.smallButton}
                      onClick={() => removeEvent(event)}
                    >
                      x
                    </button>{" "}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.submit}>
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: `2px` }}>Did I turn into a squirrel?</p>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={squirrel}
                onChange={() => didITurn(!squirrel)}
              />
              <span className={styles.slider} />
            </label>
          </div>
          <div>
            <button onClick={submitEntry}>Submit Entry</button>
          </div>
        </div>
        <div className={styles.phiContainer}>
          {journal.length >= 1
            ? journal.length < 5
              ? "You need to populate more data to start viewing the phi calculations"
              : eventPhi.map(({ event, phi }) => (
                  <div key={event}>
                    {event}{" "}
                    {isNaN(phi)
                      ? "Cant calculate at this point"
                      : round(phi, 2)}
                  </div>
                ))
            : "Submit entries to begin."}
        </div>

        <div className={styles.tableContainer}>
          {journal.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Events</th>
                  <th>Squirrel?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {journal.map(entry => (
                  <tr key={entry.id}>
                    <td>{JSON.stringify(entry.events)}</td>
                    <td>{JSON.stringify(entry.squirrel)}</td>
                    <td>
                      <button
                        className={styles.smallButton}
                        onClick={() => removeEntry(entry.id)}
                      >
                        x
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Link style={{ textDecoration: `none`, color: `#b3008b` }} to="/">
        <span role="img" aria-label="arrow left">
          ️⬅
        </span>{" "}
        Back to the homepage
      </Link>
    </Layout>
  )
}

export default Journal
