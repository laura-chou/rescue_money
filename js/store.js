import { randNumberWithMin } from "./common.js";

const domain = "https://game-api.up.railway.app";
const rescueMoneyUrl = `${domain}/rescue-money`;
const jackpotUrl = `${domain}/jackpot`;

export const getTimer = () => {
  let time = getStoreItem("time");
  if (time != undefined) {
    return parseInt(time);
  }
  return 30;
};

export const getWalletMoney = () => {
  let money = getStoreItem("wallet");
  if (money != undefined) {
    return parseInt(money);
  }
  return 0;
};

export const getClockInfo = () => {
  let info = getStoreItem("clock");
  if (info != undefined) {
    return JSON.parse(info);
  }
  const defaultInfo = { fallTime: randNumberWithMin(10, getTimer()-1), isCatch: false, isFall: false };
  setStoreItem("clock", JSON.stringify(defaultInfo));
  return defaultInfo;
};

export const getLottoInfo = () => {
  let info = getStoreItem("lotto");
  if (info != undefined) {
    return JSON.parse(info);
  }
  const defaultInfo = [{ id: 1, fallTime: randNumberWithMin(10, getTimer()-1), isCatch: false, isFall: false, isChoose: false }];
  setStoreItem("lotto", JSON.stringify(defaultInfo));
  return defaultInfo;
};

export const getProcess = () => {
  let process = getStoreItem("process");
  if (process != undefined) {
    return parseInt(process);
  }
  process = 1;
  setStoreItem("process", process);
  return process;
};

export const setStoreItem = (key, value) => {
  sessionStorage.setItem(key, value);
};

export const getStoreItem = (key) => {
  return sessionStorage.getItem(key);
};

export const removeStorage = (process) => {
  switch (process) {
    case 2:
      sessionStorage.removeItem("time");
      sessionStorage.removeItem("lotto");
      sessionStorage.removeItem("clock");
      break;
    default:
      sessionStorage.removeItem("process");
      sessionStorage.removeItem("time");
      sessionStorage.removeItem("lotto");
      sessionStorage.removeItem("clock");
      sessionStorage.removeItem("wallet");
      sessionStorage.removeItem("connect");
      break;
  }
};

export const getJackpot = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: jackpotUrl,
      method: "GET",
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        resolve(0);
      }
    });
  });
};

export const updateJackpot = (isWin) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${jackpotUrl}/update`,
      method: "PATCH",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ win: isWin }),
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        resolve(0);
      }
    });
  });
};

export const insertPlayer = (player, money) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${rescueMoneyUrl}/create`,
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ player: player, money: money }),
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        resolve(null);
      }
    });
  });
};

export const getAllPlayers = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: rescueMoneyUrl,
      method: "GET",
      dataType: "json",
      success: function (response) {
        resolve(response.data);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        resolve(null)
      }
    });
  });
};

export const getTopFivePlayers = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${rescueMoneyUrl}/top5`,
      method: "GET",
      dataType: "json",
      success: function (response) {
        resolve(response.data);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        resolve(null);
      }
    });
  });
};

export const connectServer = () => {
  setStoreItem("connect", false);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: domain,
      method: "GET",
      success: function () {
        setStoreItem("connect", true)
        resolve(true);
      },
      error: function () {
        resolve(false);
      }
    });
  });
};
