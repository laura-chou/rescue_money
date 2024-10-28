import { moneyFormat, getPathName } from './common.js'
import { setStoreItem } from './store.js'

export const getLottoPiece = (lottoInfo) => {
  const data = lottoInfo.filter(lotto => lotto.isCatch && !lotto.isChoose)
  return data.length
}

export const getLottoChance = (lottoInfo) => {
  return lottoInfo.filter(lotto => lotto.isCatch && !lotto.isChoose)
}

export const getJockpotHtml = (bonus) => {
  return `<img style='width:90px' src='${getPathName()}images/win-money.png'/>
          <h1 style='margin-bottom:0'>恭喜獲得</h1>
          <h2 style='margin-bottom:0;color:red;'>$${moneyFormat(bonus)}</h2>`
}

export const setWalletMoney = (money) => {
  $('.wallet-money').text(`$${moneyFormat(money)}`);
  setStoreItem('wallet', money)
}

export const setLottoPiece = (lotto) => {
  $('.lotto-piece').text(`x${lotto}`);
}