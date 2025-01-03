import { useEffect, useState } from "react";
import check_path from "../..";
import getTheme from "./static/getTheme";

import styled from 'styled-components';

export const Styled_Header = styled.header`
  display: flex;
  position: relative;
  flex-direction: row;
  width: 90vw;
  text-transform: uppercase;
  font-size: 30px;
  border-bottom: solid 1px var(--SecondaryColor);
  margin-bottom: 30px;
  transition: 0.3s;

  nav {
    display: flex;
    flex-direction: row;

    a {
      height: fit-content;
      position: relative;
      margin: 5px 0;
      padding-top: 5px;

      p {
        font-weight: 300;
        letter-spacing: 3px;
        padding: 0 5px;
        color: var(--SecondaryColor);
        margin: 0;
      }
    }

    a:hover > p {
      background: var(--SecondaryColorDecorate);
    }

    a.current-page:hover > p {
      background: var(--DecorateColor);
    }

    .current-page {
      p {
        background: var(--DecorateColor);
        color: var(--MainColor);
      }
    }

    :first-child {
      padding-left: 5px;
    }

    :nth-child(2) > p {
      margin-left: 10px;
    }

    :nth-child(2)::before {
      content: "";
      color: var(--SecondaryColor);
      margin-left: 5px;
      height: 70%;
      top: 15%;
      width: 1vw;
      border-left: solid 2px var(--SecondaryColor);
      left: 0;
      position: absolute;
    }
  }

  .page-name {
    position: absolute;
    cursor: default;
    left: 50%;
    margin: 0;
    top: 10px;
    transform: translateX(-50%);
  }

  span {
    position: absolute;
    right: 20%;
    bottom: 0;

    .input {
      visibility: hidden;
    }

    .label {
      background: var(--DecorateColor);
      height: 40px;
      width: 80px;
      position: absolute;
      border-radius: 20px;
      cursor: pointer;
    }

    .circle {
      width: 34px;
      height: 34px;
      background: var(--MainColor);
      position: absolute;
      top: 3px;
      left: 3px;
      border-radius: 50%;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      animation: toggleOff 0.3s linear forwards;
    }

    .input:checked + .label {
      background: var(--DecorateColor);
    }

    .input:checked + .label .circle {
      background: var(--MainColor);
      animation: toggleOn 0.3s linear forwards;
    }
  }
`;


const Header = ({ onChangeTheme }: { onChangeTheme: (newTheme: string) => void }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || getTheme());
    const [isChecked, setIsChecked] = useState(false)



    const checkLightMode = () => {

        if (isChecked){
            setIsChecked(false)
        } else {
            setIsChecked(true)
        }
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme)
        onChangeTheme(newTheme)

    }

    useEffect(() => {
        check_path()
        if (theme === "light"){setIsChecked(true)
        }
    }, [])


    return (
        <Styled_Header id="header">
            <nav><a href="/" className="home-link"><p>inicio</p></a><a href="/sobre-mim" className="aboutMe-link"><p>sobre</p></a></nav>
            <p className="page-name">Music Archive</p>
            <span className="changeThemeButton">
                <input className="input" onChange={checkLightMode} type="checkbox" name="darkmode" id="dark-mode" checked={isChecked} />
                <label htmlFor="dark-mode" className="label">
                    <span className="circle"></span>
                </label>
            </span>
        </Styled_Header>
    )
}

export default Header