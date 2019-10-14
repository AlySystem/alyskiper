import { gql } from 'apollo-boost'

export const SIGNIN = gql`
  mutation SignIn($input: signInDto! ) {
    signin (input: $input) {
      data {
        token
        firstname
        lastname
        username
        email
        phone_number  
      }
      error {
        message
        status
        ok
      }
    }
  }
`
