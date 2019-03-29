import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO
      title="Home"
      keywords={[
        `gatsby`,
        `application`,
        `react`,
        `datastructures`,
        `eloquentjavascript`,
      ]}
    />
    <p>
      Every now and then, usually between 8 p.m. and 10 p.m., Jacques finds
      himself transforming into a small furry rodent with a bushy tail.
    </p>

    <p>
      <div
        style={{
          maxWidth: `300px`,
          width: `300px`,
          float: `left`,
          marginRight: `1.45em`,
          marginBottom: `1.45rem`,
        }}
      >
        <Image />
      </div>
      On one hand, Jacques is quite glad that he doesn’t have classic
      lycanthropy. Turning into a squirrel does cause fewer problems than
      turning into a wolf. Instead of having to worry about accidentally eating
      the neighbor (that would be awkward), he worries about being eaten by the
      neighbor’s cat. After two occasions where he woke up on a precariously
      thin branch in the crown of an oak, naked and disoriented, he has taken to
      locking the doors and windows of his room at night and putting a few
      walnuts on the floor to keep himself busy.
    </p>

    <p>
      That takes care of the cat and tree problems. But Jacques would prefer to
      get rid of his condition entirely. The irregular occurrences of the
      transformation make him suspect that they might be triggered by something.
      For a while, he believed that it happened only on days when he had been
      near oak trees. But avoiding oak trees did not stop the problem.
    </p>

    <p>
      Switching to a more scientific approach, Jacques has started keeping a
      daily log of everything he does on a given day and whether he changed
      form. With this data he hopes to narrow down the conditions that trigger
      the transformations.
    </p>

    <p>
      The first thing he needs is a data structure to store this information.{" "}
      <a
        style={{
          textDecoration: `none`,
          color: `#b3008b`,
        }}
        href="https://eloquentjavascript.net/04_data.html#h_NvjtahQLlw"
      >
        Read more here.
      </a>{" "}
      We will build him a journal which allows him to track his activities and
      correlate that data to identify the cause.
    </p>
    <Link to="/journal" style={{ textDecoration: `none`, color: `#b3008b` }}>
      Lets go to the app
    </Link>
  </Layout>
)

export default IndexPage
