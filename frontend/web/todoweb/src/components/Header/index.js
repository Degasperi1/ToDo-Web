import React, {useEffect, useState} from 'react';
import * as S from './styles';
import {Link, Redirect} from 'react-router-dom';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';
import isConnected from '../../utils/isConnected';

function Header({clickNotification}) {

  const [lateCount, setLateCount] = useState();
  const [redirect, setRedirect] = useState(false);
  
  async function lateVerify() {
    await api.get(`/task/filter/late/${isConnected}`)
      .then(response => {
        setLateCount(response.data.length)
      })
  }

  async function Logout(){
    await localStorage.removeItem('@todo/macaddress');
    window.location.reload();
  }

  useEffect(() => {
    lateVerify()
  })

  return (
    <S.Container>
      { redirect && <Redirect to="/qrcode"/> }
      <S.LeftSide>
        <img src={logo} alt="Logo" />
      </S.LeftSide>
      <S.RightSide>
        <Link to="/">INÍCIO</Link>
        <span className="dividir"/>
        <Link to="/task">NOVA TAREFA</Link>
        <span className="dividir"/>
        { !isConnected ?
        <Link to="/qrcode">SINCRONIZAR CELULAR</Link>
        :
        <button type="button" onClick={Logout} >SAIR</button>
        }
        {
          lateCount &&
          <>
            <span className="dividir"/>
            <button onClick={clickNotification}>
              <img src={bell} alt="Notificação"/>
              <span>{lateCount}</span>
            </button>
          </>
        }
      </S.RightSide>
    </S.Container>
  )
}

export default Header;
