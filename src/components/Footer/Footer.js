import styled from "styled-components";

const FooterHolder = styled.footer`
  height: 300px;
  background-color: #252525;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
  color: white;
`;

const Section = styled.section`
  height: 50%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const Footer = () => {
  return (
    <FooterHolder>
      <Section>
        <h2>We need you!</h2>
        <p>Consider registering if you haven't done that yet!</p>
      </Section>
      <Section>
        <p>Made by Pau</p>
      </Section>
    </FooterHolder>
  );
};

export default Footer;
