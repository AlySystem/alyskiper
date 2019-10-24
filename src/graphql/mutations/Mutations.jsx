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
        phone_number,
        avatar
        country {
          name
          id
          iso
        }
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
        username
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
      status
    }
  }
`

export const SIGNOUT = gql`
  mutation SignOut($id: Int!) {
    logout(id: $id)
  }
`

export const UPDATEUSER = gql`
  mutation UpdateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      firstname
      lastname
      user
      email
      avatar
      id
      phone
      country {
        name
        id
        iso
      }
    }
  }
`
