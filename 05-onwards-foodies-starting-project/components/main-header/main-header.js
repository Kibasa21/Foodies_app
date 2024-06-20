import Link from "next/link";

import logoImg from "@/assets/logo.png" //Esse @ serve para indicar que a pasta é a pasta src, que é a pasta raiz do projeto
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";

export default function MainHeader() {
    return (
        <>
            <MainHeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    <Image src={logoImg} alt="A plate with food on it." priority />{/* O src do Image não precisa do .src porque o Next.js já faz isso automaticamente */}
                    NextLevel Food {/*O priority faz com que a imagem seja carregada primeiro que o resto da página, o que é bom para imagens que são importantes para o layout da página, inibindo o lazyloading inerente ao Image*/}
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <Link href="/meals">Browse Meals</Link>
                        </li>
                        <li>
                            <Link href="/community">Foodies Community</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}