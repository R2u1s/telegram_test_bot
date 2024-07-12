import { URL } from "./constants";

import { TResSuccess } from "../types/types";

// создаем функцию проверки ответа на `ok`

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = <T>(res:TResSuccess & T) => {
/*   if (res && res.success) { */
if (res) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = <T>(endpoint:string,options?:{}) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${URL}${endpoint}`,options)
    .then(checkResponse)
    .then(checkSuccess<T>);
};