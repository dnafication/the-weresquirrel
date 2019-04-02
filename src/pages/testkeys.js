import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import SEO from "../components/seo"

function TestKeys(props) {
  const [keyPressed, setKeyPressed] = useState({ key: null })

  const handleKeyPress = e => {
    console.log(e)
    setKeyPressed(e)
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

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
      <p
        style={{
          textAlign: "center",
        }}
      >
        press keys on your keyboard to find out the key code
      </p>

      <div
        id="keyboard"
        style={{
          fontSize: `2em`,
          textAlign: "center",
          paddingTop: `25%`,
          margin: `auto`,
          height: `10em`,
        }}
      >
        {keyPressed.key && (
          <>
            {keyPressed.key}
            <br />
            <span
              style={{
                fontSize: `0.5em`,
                fontFamily: `monospace`,
                display: `inline`,
              }}
            >
              code: {keyPressed.keyCode}
            </span>
          </>
        )}
      </div>
    </Layout>
  )
}

TestKeys.propTypes = {}

export default TestKeys
