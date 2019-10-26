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
  query Commerces ($latitud: Float!, $longitud: Float!, $radio: Int!) {
    CommercesIntoRadio (latitud: $latitud, longitud: $longitud, radio: $radio) {
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
