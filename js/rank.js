import { moneyFormat } from './common.js'

export const getRankHtml = (data) => {
  return `<table class='table is-striped'>
            <thead>
              <tr>
                <th>排名</th>
                <th>姓名</th>
                <th>身價</th>
              </tr>
            </thead>
            <tbody>${getInfoHtml(data)}</tbody>
          </table>`
}

export const getTopRankHtml = (data) => {
  const html = (data.length === 0) ? "<tr><td colspan='3'>暫無富豪</td></tr>" : getInfoHtml(data, true)
  return `<table class='table'>
            <thead>
              <tr>
                <th>排名</th>
                <th>姓名</th>
              </tr>
            </thead>
            <tbody>${html}</tbody>
          </table>`
}

const getInfoHtml = (data, isTopRank = false) => {
  let info = ''
  if (data.length > 0) {
    for (const i of data) {
      let moneyfield = ''
      if (!isTopRank) {
        moneyfield = `<td>$${moneyFormat(i.money)}</td>`
      }
      info += `<tr class='${getClass(i.rank)}'>
                <td>${getRank(i.rank)}</td>
                <td style='position:relative;'>
                  <span>${i.players[0]}</span>
                  ${getMorePlayers(i.players.slice(1))}
                </td>
                ${moneyfield}
              </tr>`
    }
  }
  return info
}

const getMorePlayers = (players) => {
  if (players.length > 0) {
    return `<button class="accordion">
              <i class="fa-solid fa-angle-up"></i>
            </button>
            <div class='more'>${players.join('<br/>')}</div>`
  }
  return ''
}

const getRank = (rank) => {
  return rank == 1 ? "<i class='fas fa-medal medal'></i>" : rank;
}

const getClass = (rank) => {
  return rank == 1 ? "top1" : '';
}