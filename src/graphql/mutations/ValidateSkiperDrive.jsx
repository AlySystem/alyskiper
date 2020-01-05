import { gql } from 'apollo-boost'

const ValidateSkiperDrive = gql`
mutation ValidateSkiperDrive($iddriver: Int!, $lat_initial: Float!, $lng_initial: Float!, $distance: Float!, $time: Float!, $idcurrency: Int!, $idcategoryTravel: Int!) {
    ValidateDriveAvailable (
        input: {
            iddriver: $iddriver
            idcategoryTravel: $idcategoryTravel
            lat_initial: $lat_initial
            lng_initial: $lng_initial
            distance: $distance
            time: $time
            idcurrency: $idcurrency
        }
    )
}
`
export default ValidateSkiperDrive