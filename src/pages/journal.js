import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import JournalForm from "../components/journal-form"

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
  const [currentEntry, setCurrentEntry] = useState({})
  const [journal, setJournal] = useState([])

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
        <JournalForm />
      </div>

      <Link style={{ textDecoration: `none`, color: `#b3008b` }} to="/">
        Go back to the homepage
      </Link>
    </Layout>
  )
}

export default Journal
