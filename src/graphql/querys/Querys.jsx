import { gql } from 'apollo-boost'

export const COUNTRIES = gql`
  query {
    countries {
      id
      name
      phonecode
      flag
    }
  }
`
