import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import Layout from "../components/layout"
import SEO from "../components/seo"

function TestKeys(props) {
  const [keyPressed, setKeyPressed] = useState("")

  const handleKeyPress = e => {
    setKeyPressed(e.key)
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

      <div
        id="keyboard"
        style={{
          fontSize: `2em`,
        }}
      >
        {keyPressed}
      </div>
    </Layout>
  )
}

TestKeys.propTypes = {}

export default TestKeys
