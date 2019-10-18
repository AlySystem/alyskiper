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

export const SIGNUP = gql`
  mutation SignUp($input: UserInput! ) {
    signup (input: $input) {
      data {
        firstname
        lastname
      }
      error {
        message
        status
        ok
      }
    }
  }
`

export const SENDCODE = gql`
  mutation SendCode($sendcode: twilioDto! ) {
    send_code(sendcode: $sendcode) {
      ok
    }
  }
`

export const VERIFYCODE = gql`
  mutation VerifyCode($verifycode: twilioDto!) {
    verify_code(verifycode: $verifycode) {
      ok
      message
    }
  }
`
