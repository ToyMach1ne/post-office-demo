import { FooterContainer, FooterContent } from "./footer.styles";
import { useState, useEffect } from "react";
import FooterTop from "./footer-top.component";
import FooterBottom from "./footer-bottom.component";

const Footer = () => {
  const [showFullFooter, setShowFullFooter] = useState(false);

  useEffect(() => {
    // Get the elements you want to work with
    const body = document.body;

    // Function to check if the second part of the footer should be visible
    function checkScroll() {
        // console.log('window.scrollY', window.scrollY);

        setShowFullFooter(window.scrollY > 10);

        // if (window.scrollY > 10) {
        //   // I need to move top on top of bottom
        //   setShowFullFooter(true);
        //   // and move entire footer ??
        // } else {
        //   setShowFullFooter(false);
        // }
    }

    // Attach the checkScroll function to the window's scroll event
    window.addEventListener('scroll', checkScroll);

    return (() => {window.removeEventListener('scroll', checkScroll)})
  }, [])

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