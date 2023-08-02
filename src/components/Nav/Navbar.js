import React, { useContext } from "react";
import { Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import TokenContext from '../Token/Token';
import {orderLink, priceLink} from '../http-common/baseURL';

const NavigationBar = (props) => {
    const token = useContext(TokenContext);
    //TODO 
    const isOrder = token?.roles.toLowerCase().indexOf(orderLink.toLowerCase()) !== -1 ;
    const isPrice = token?.roles.toLowerCase().indexOf(priceLink.toLowerCase()) !== -1 ;
    const isOrderMaker = token?.roles.toLowerCase().indexOf("order_maker".toLowerCase()) !== -1 ;
    const isPriceMaker = token?.roles.toLowerCase().indexOf("price_maker".toLowerCase()) !== -1 ;

    return (
        <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
        <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
            <Nav>
                {<NavLink eventKey="1" as={Link} to="/">Стиль-Пласт портал</NavLink>}
                {isOrder && (<NavLink eventKey="2" as={Link} to={orderLink}>Клиенты и заказы</NavLink>)}
                {isPrice && (<NavLink eventKey="3" as={Link} to={priceLink}>Продукция и цены</NavLink>)}
                <NavLink eventKey="4" as={Link} to="/login">Приветствую, {token?.username || "Имя пользователя"}</NavLink>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;