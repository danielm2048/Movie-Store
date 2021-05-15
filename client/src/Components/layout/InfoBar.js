import React from "react";

import { InfoBarContainer, StyledInfoBarItem, VL } from "../../style/styledLayout";
import { PhoneCall, Pricetags, CreditCard, Car } from "@styled-icons/evaicons-solid";

const InfoBarItem = ({ icon, header, desc }) => (
  <StyledInfoBarItem>
    {icon}
    <h3 style={{ fontWeight: "bold" }}>{header}</h3>
    <br />
    <p>{desc}</p>
  </StyledInfoBarItem>
);

const InfoBar = () => (
  <InfoBarContainer>
    <InfoBarItem
      icon={<Car />}
      header="Fast Shipping"
      desc="Your order will be recieved in 3-7 business days!"
    />
    <VL />
    <InfoBarItem
      icon={<PhoneCall size="42" />}
      header="Customer Service"
      desc="Our great phone and online support is here for you 24/7 :)"
    />
    <VL />
    <InfoBarItem
      icon={<Pricetags />}
      header="Fair Prices"
      desc="If you find a better price tell us and we'll match it."
    />
    <VL />
    <InfoBarItem
      icon={<CreditCard />}
      header="Secure Payment"
      desc="Your purchases here are safe and secure!"
    />
  </InfoBarContainer>
);

export default InfoBar;