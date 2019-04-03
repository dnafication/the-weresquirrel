import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "../components/journal.module.css"

import { tableFor, journalEvents, phi, uuidv4, round } from "../utils/utils"

import { dummyData, JOURNAL } from "../utils/data"

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
  // const [suggestion, setSuggestion] = useState(new Set())
  const [eventPhi, setEventPhi] = useState([])

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyPress)
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress)
  //   }
  // }, [])

  useEffect(() => {
    console.log("journal", journal)
    // suggestion
    // setSuggestion(journalEvents(journal))

    // calculate and push phi values for events
    let tempEventPhi = []
    journalEvents(journal).forEach(event => {
      let p = phi(tableFor(event, journal))
      tempEventPhi.push({ event, phi: p })
    })

    setEventPhi(
      tempEventPhi.sort(function(a, b) {
        return b.phi - a.phi
      })
    )
    return () => {}
  }, [journal])

  const { events, squirrel } = currentEntry // dont modify this variables directly

  const loadDummyData = () => {
    // setJournal(dummyData())
    setJournal(JOURNAL)
  }

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
        title="The Journal app"
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
          {5 < journal.length >= 1 && (
            <div style={{ flexBasis: 600, textAlign: "justify" }}>
              <h2 style={{ textAlign: "center" }}>Φ phi coefficient</h2>
              <p>
                To compute the measure of correlation between two Boolean
                variables, we can use the phi coefficient (ϕ).
              </p>
              <p>
                Correlation is a measure of dependence between statistical
                variables. A statistical variable is not quite the same as a
                programming variable. In statistics you typically have a set of
                measurements, and each variable is measured for every
                measurement. Correlation between variables is usually expressed
                as a value that ranges from -1 to 1. Zero correlation means the
                variables are not related. A correlation of one indicates that
                the two are perfectly related—if you know one, you also know the
                other. Negative one also means that the variables are perfectly
                related but that they are opposites—when one is true, the other
                is false.
              </p>
            </div>
          )}
          {journal.length >= 1 ? (
            journal.length < 5 ? (
              <p>Need more data to do the Φ (phi) calculations</p>
            ) : (
              eventPhi.map(({ event, phi }, i) => {
                // display only 8 items
                if (i < 8) {
                  return (
                    <div key={event} className={styles.eventPhi}>
                      <p>{event}</p>
                      <span>{isNaN(phi) ? "..." : round(phi, 2)}</span>
                    </div>
                  )
                }
              })
            )
          ) : (
            <p>Enter events and submit entries to see the Φ values.</p>
          )}
        </div>

        <div className={styles.tableContainer}>
          {journal.length > 0 && (
            <table style={{ overflowX: `auto` }}>
              <thead>
                <tr>
                  <th>Events</th>
                  <th>Squirrel?</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {journal.map((entry, i) => (
                  <tr key={i}>
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
      <button
        onClick={loadDummyData}
        style={{
          float: `right`,
          lineHeight: `2px`,
        }}
      >
        load dummy data
      </button>
    </Layout>
  )
}

export default Journal
