//'use client';//O use client é uma diretiva que indica que o arquivo só deve ser executado no lado do cliente, ou seja, no navegador, e não no servidor, o que é útil para arquivos que dependem de recursos do navegador, como o window, por exemplo

import Link from "next/link";

import logoImg from "@/assets/logo.png" //Esse @ serve para indicar que a pasta é a pasta src, que é a pasta raiz do projeto
import classes from "./main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";

export default function MainHeader() {
    //const path = usePathname();//O usePathname é um hook que retorna o pathname da URL atual, que é útil para saber qual é a URL atual e fazer algo com base nela

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
                            <NavLink href="/meals">Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}