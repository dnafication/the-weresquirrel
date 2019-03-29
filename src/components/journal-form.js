import React from "react"
import PropTypes from "prop-types"
import styles from "./journal-form.module.css"

function JournalForm(props) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.events}>
          <input type="text" />
          <button onClick="">Add Event</button>
        </div>
        <div className={styles.submit}>
          <ul>
            <li>went to bar</li>
          </ul>
          <button>Submit Entry</button>
        </div>
        <div />
      </div>
    </>
  )
}

JournalForm.propTypes = {}

export default JournalForm
