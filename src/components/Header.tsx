import { useEffect, useState } from "react";
import check_path from "../..";

const Header = ({ onChangeTheme }: { onChangeTheme: (newTheme: string) => void }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
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
        <header id="header">
            <nav><a href="/" className="home-link"><p>inicio</p></a><a href="/sobre-mim" className="aboutMe-link"><p>sobre</p></a></nav>
            <p className="page-name">Music Archive</p>
            <span className="changeThemeButton">
                <input className="input" onChange={checkLightMode} type="checkbox" name="darkmode" id="dark-mode" checked={isChecked} />
                <label htmlFor="dark-mode" className="label">
                    <span className="circle"></span>
                </label>
            </span>
        </header>
    )
}

export default Header