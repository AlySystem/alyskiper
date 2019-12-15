import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useLazyQuery } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import publicIP from "react-native-public-ip";
// Impoer actions
import { DETAILSTRAVEL } from "../../store/actionTypes";
// Import theme
import { Theme } from "../../constants/Theme";
// Import querys
import { CALCULATETARIFF } from "../../graphql/querys/Querys";
// Import components
import Loader from "../loader/Loader";
// Import hooks
import { useLocation } from "../../hooks/useLocation";

const PriceService = props => {
  const dispatch = useDispatch();
  const { steps } = useSelector(state => state.direction);
  const [price, setPrice] = useState("");
  const [symbol, setSymbol] = useState("");
  const [lastPrice, setLastPrice] = useState("");
  const { location } = useLocation();
  const [CalculateTariff, { loading, data, error }] = useLazyQuery(
    CALCULATETARIFF
  );
  useEffect(() => {
    const calculateRate = async () => {
      if (location.latitude) {
        const { latitude, longitude } = location;
        publicIP().then(ipAddress => {
          CalculateTariff({
            variables: {
              ip: ipAddress.toString(),
              idcategoriaviaje: props.categoryId,
              lat: latitude,
              lng: longitude
            }
          });
        });
      }
    };
    calculateRate();
  }, [location]);
  useEffect(() => {
    if (
      loading === false &&
      data &&
      data.CalculateTariff.priceckilometer !== lastPrice
    ) {
      setLastPrice(data.CalculateTariff.priceckilometer);
      const { duration, distance } = steps;
      const durationMin = duration.value / 60;
      const distanceKm = distance.value / 1000;
      const {
        pricebase,
        priceminute,
        priceckilometer,
        priceminimun,
        symbol
      } = data.CalculateTariff;
      const minutes = durationMin * priceminute;
      const km = distanceKm * priceckilometer;
      const total = minutes + km + pricebase;
      setSymbol(symbol);
      /**
       * Si el total es menor al pecio minimo
       * siempre cobraremos el precio minimo
       */
      if (total < priceminimun) {
        dispatch({
          type: DETAILSTRAVEL,
          payload: {
            priceTravel: {
              priceTravel: priceminimun,
              priceBase: pricebase,
              pricecKilometer: km,
              priceMinimun: priceminimun,
              priceMinute: minutes
            }
          }
        });
        /**Seteamos el precios */
        // setPrice(`${symbol} ${priceminimun}`)
        setPrice(priceminimun);
      } else {
        dispatch({
          type: DETAILSTRAVEL,
          payload: {
            priceTravel: total,
            priceBase: pricebase,
            pricecKilometer: km,
            priceMinimun: priceminimun,
            priceMinute: minutes
          }
        });
        setPrice(total);
      }
    }
  }, [loading, data]);
  if (error) {
    props.error(error);
    return <View />;
  }
  if (loading && !data) return <Loader size="small" />;
  return (
    <Text
      allowFontScaling={false}
      style={{
        fontFamily: "Lato-Bold",
        color: Theme.COLORS.colorParagraph,
        fontSize: 18
      }}
    >
      {`${symbol} ${Math.ceil(price)}`}
    </Text>
  );
};
export default PriceService;
