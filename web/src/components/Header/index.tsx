import { NavLink } from 'react-router-dom';
import { HeaderContainer } from './styles';
import { Timer, Scroll } from 'phosphor-react';

export function Header() {
   return (
      <HeaderContainer>
         <nav>
            <NavLink to="/" title="Timer">
               <Timer size={22} />
            </NavLink>
            <NavLink to="history" title="Histórico">
               <Scroll size={22} />
            </NavLink>
         </nav>
      </HeaderContainer>
   );
}
