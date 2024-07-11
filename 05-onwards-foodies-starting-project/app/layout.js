import MainHeader from '@/components/main-header/main-header';
import './globals.css';

export const metadata = {//Metadata é um objeto que tem o título e a descrição da página, ele é um objeto que o next.js passa para a página
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
