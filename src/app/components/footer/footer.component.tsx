import { FooterContainer, FooterContent } from "./footer.styles";
import { useState, useEffect } from "react";
import FooterTop from "./footer-top.component";
import FooterBottom from "./footer-bottom.component";

const Footer = () => {
  const [showFullFooter, setShowFullFooter] = useState(false);

  useEffect(() => {
    // Function to check if the second part of the footer should be visible
    function checkScroll() {
        setShowFullFooter(window.scrollY > 10);
    }

    // Attach the checkScroll function to the window's scroll event
    window.addEventListener('scroll', checkScroll);

    return (() => {window.removeEventListener('scroll', checkScroll)})
  }, [setShowFullFooter])

  return (
    <FooterContainer>
      <FooterContent>
        { showFullFooter 
          ? (<><FooterTop /><FooterBottom /></>)
          : (<><FooterBottom /><FooterTop /></>)
        }
        
        
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer;