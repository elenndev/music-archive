import styled from 'styled-components';

const Styled_Footer = styled.footer`
  width: 90vw;
  margin-top: 30px;
  border-top: solid 1px var(--SecondaryColor);
  display: flex;
  justify-content: center;

  p {
    margin: 0;
    font-size: 1rem;
  }

  a {
    height: 1rem;
    color: var(--SecondaryColor);
    display: flex;
    max-width: fit-content;
  }

  li:hover > a {
    font-weight: 600;
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;

    li.pageName {
      cursor: default;
    }

    li {
      padding: 5px 10px;
      width: fit-content;
    }
  }
`;


const Footer = () => {
    return (
        <Styled_Footer>
            <ul>
                <li className="pageName"><p>2024 Music Archive</p></li>
                <li><a href="#"><p>Email: elen.damares774@gmail.com</p></a></li>
                <li><a href="/sobre-mim" className="page-about-me"><p>Sobre</p></a></li>
                <li><a href="https://www.svgrepo.com" target="_blank">Vectors and icons by SVG Repo</a></li>
            </ul>
        </Styled_Footer>
    )
}

export default Footer