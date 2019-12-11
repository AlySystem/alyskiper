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
      id
      lat_initial
      lng_initial
      users {
        id
        firstname
        lastname
      }
      skiperagent {
        id
        state
        skiperVehicleAgent {
          id
          skiperVehicle {
            license_plate
            vehicleTrademark {
              name
            }
            vehicleModel {
              name
            }
            
          }
        }
        user {
          id
          firstname
          lastname
          avatar
        }
      }
      skiperTravelsTracing {
        id
        travelstatus {
          id
          name
        }
      }
      distance
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
export const GETALLADDRESS = gql`
  query getAllAddress ($id: Int!) {
    getUsersAddressByUser (iduser: $id) {
      id
      placeid
      lat
      lng
      address
      point_references
      apt_house_number
      catplaceuser {
        id
        name
        url_img
      }
    }
  }
`

export const SEARCHCITY = gql`
  query searchCityByCountryId ($id: Int!) {
    searchCityByCountryId (id: $id) {
      id
      name
    }
  }
`

export const INVOICE = gql`
  query Invoice ($idservice: Int!){
    getInvoinceByIdservice(idservice: $idservice){
      id,
      invoice{
        id
        iduser
        anyagent
        numfac 
        country{
          id
          name
        }      
      },
      anyservice{
        id
        total
        address_initial
        address_final
        duration
        distance
      }
    }
  }
`
