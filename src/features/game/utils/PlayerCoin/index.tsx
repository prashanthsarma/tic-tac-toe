import React, { ReactElement } from 'react';
import { ReactComponent as CoinX } from './../../../../resources/svgs/coinx.svg'
import { ReactComponent as CoinO } from './../../../../resources/svgs/coino.svg'

const coinMap: { [key in number]: ReactElement } = {
    1: <CoinX />,
    2: <CoinO />
}

interface IPlayerCoinProps {
    player: number
}


export const PlayerCoin: React.FC<IPlayerCoinProps> = (props) => {

    const { player } = props;
    let playerCoin = coinMap[player]
    if (playerCoin == null && player > 0) {
        playerCoin = (<svg viewBox="0,0,10,10">
            <text x="0" y="10" fontSize="14">{String.fromCharCode(62 + player)}</text>
        </svg>)
    }
    return playerCoin;
}