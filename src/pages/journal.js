import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "../components/journal.module.css"

import { tableFor, journalEvents, phi } from "../utils/utils"

//trim function
if (typeof String.prototype.trim === "undefined") {
  String.prototype.trim = function() {
    return String(this).replace(/^\s+|\s+$/g, "")
  }
}

const Journal = () => {
  const [inputText, setInputText] = useState("")
  const [currentEntry, setCurrentEntry] = useState({
    events: [],
    rabbit: false,
  })
  const [journal, setJournal] = useState([])
  const [suggestion, setSuggestion] = useState(new Set())

  // useEffect(() => {
  //   document.addEventListener("keydown", handleKeyPress)
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress)
  //   }
  // }, [])

  useEffect(() => {
    console.log("hi here")
    console.log("journal", journal)
    return () => {
      console.log("ho there")
    }
  }, [journal])

  const { events, rabbit } = currentEntry // dont modify this variables directly

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      setCurrentEntry({
        events: [...currentEntry.events, inputText.trim()],
        rabbit: currentEntry.rabbit,
      })
      setInputText("")
    }
  }

  const didITurn = value => {
    setCurrentEntry({
      ...currentEntry,
      rabbit: value,
    })
  }

  const submitEntry = () => {
    setJournal([...journal, currentEntry])
    //reset the form
    setCurrentEntry({ events: [], rabbit: false })
  }

  const removeEvent = event => {
    setCurrentEntry({
      events: currentEntry.events.filter(i => i !== event),
      rabbit: currentEntry.rabbit,
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
                      className={styles.removeEvent}
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
            <p style={{ marginBottom: `2px` }}>Did I turn in to a rabbit?</p>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={rabbit}
                onChange={() => didITurn(!rabbit)}
              />
              <span className={styles.slider} />
            </label>
          </div>
          <div>
            <button onClick={submitEntry}>Submit Entry</button>
          </div>
        </div>
        <div className={styles.phiContainer}>
          Watch this space for phi calcuations.
        </div>
        <div className={styles.tableContainer}>
          And watch this space for table data
        </div>
      </div>

      <Link style={{ textDecoration: `none`, color: `#b3008b` }} to="/">
        ⬅️ Back to the homepage
      </Link>
    </Layout>
  )
}

export default Journal
