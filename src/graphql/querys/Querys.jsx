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
export const COMMERCERS = gql`
  query Commerces ($latitud: Float!, $longitud: Float!, $radio: Int!, $id_category_product: Int) {
    CommercesIntoRadio (latitud: $latitud, longitud: $longitud, radio: $radio, id_category_product: $id_category_product) {
      id
      namecommerce
      lat
      lon
      url_art
      url_logo
      address
      skiperCatProductsCommerce{
        id
        name
        description
        skiperProductCommerce {
          id
          name
          url_img_product
          description
          price
          optionAddon {
            id
            name
            description
            extraPrice
          }
        }
      }
    }
  }
`
export const CALCULATERATE = gql`
  query CaculateRate ($idcountry: Int!, $idcity: Int!, $idcategoriaviaje: Int!, $date_init: DateTime!){
    CalcularTarifa(idcountry: $idcountry, idcity: $idcity, idcategoriaviaje: $idcategoriaviaje, date_init: $date_init){
      pricebase
      priceminute
      priceckilometer
      priceminimun
    }
  }
`

export const CATEGORY = gql`
  query {
    getAllSkiperSubCatCommerce{
      id
      name
      url_img
    }
  }
`

export const GETDRIVERNEARBY = gql`
  query GetDriverNearby ($lat: Float!, $lng: Float!, $inputdrive: [AgentDriveInput!]!) {
    ObtenerDriveCercano(lat: $lat, lng: $lng, inputdrive: $inputdrive)
  }
`

export const CATEGORYTRAVEL = gql`
  query {
    skipercattravels {
      id
      name
      url_img_category
      mode_drive
      url_img_drive
      btaxy
      bdelivery
      btransporte
    }
  }
`

export const GETTRAVELBYUSERID = gql`
  query GetTravelByUserId ($iduser: Int!) {
    getTravelByUserId(iduser: $iduser) {
      skiperagent {
        id
        state
        user {
          firstname
          lastname
          avatar
        }
        skiperVehicleAgent {
          skiperVehicle {
            id
            license_plate
            vehicleModel {
              name
            }
            vehicleYear {
              year
            }
            vehicleTrademark {
              name
            }
          }
        }
      }
    }
  }
`

export const GETFAVORITE = gql`
  query GetFavorite ($id_user: Int!) {
    getAllCommerceFavoriteByUserId(id_user: $id_user) {
      id
      skiperCommerce {
        address
        url_logo
        url_art
        namecommerce
      }
    }
  }
`
