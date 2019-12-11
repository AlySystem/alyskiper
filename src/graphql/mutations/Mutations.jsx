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
        city {
          id
          name
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
      message
      status
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
      city {
        id
        name
      }
    }
  }
`
export const RESET = gql`
  mutation Reset($phone_number: String!){
    reset_password (phone_number: $phone_number) {
      error {
        message
        ok
        status
      }
      data {
        id
      }
    }
  }
`

export const EDITPASSWORD = gql`
  mutation EditPassword($input: UserUpdatePassword!) {
    editPassword (input: $input) {
      message
      ok
      status 
    }
  }
`

export const ADDFAVORITE = gql`
  mutation AddFavorite($input: CommerceFavoriteInput) {
    registerCommerceFavorite (input: $input) {
      ok
    }
  }
`

export const REMOVEFAVORITE = gql`
  mutation RemoveFavorite($id: Int!) {
    removeCommerceFavorite (id: $id) {
      ok
    }
  }
`

export const GENERATETRAVEL = gql`
  mutation GenerateTravel($inputviaje: SkiperTravelsInput!) {
    GenerateTravel (inputviaje: $inputviaje) {
      id
      total
    }
  }
`

export const TRAVELTRACING = gql`
  mutation TravelTracing($input: SkiperTravelsTracingInput!) {
    registerTravelsTracing(input: $input) {
      id
      travelstatus {
        id
      }
    }
  }
`

export const GETDRIVERNEARBY = gql`
  mutation GetDriverNearby ($lat: Float!, $lng: Float!, $inputdrive: [AgentDriveInput!]!) {
    ObtenerDriveCercano(lat: $lat, lng: $lng, inputdrive: $inputdrive)
  }
`
export const REGISTERUSERADDRESS = gql`
  mutation RegisterAddress ($input: UsersAddressInput!) {
    registerUsersAddress(input: $input) {
      id
      placeid
      lat
      lng
      address
      point_references
      apt_house_number
    }
  }
`

export const SKIPERATING = gql`
  mutation SkiperRating ($input: SkiperRatingInput) {
    RegisterSkiperRating(input: $input)
  }
`
