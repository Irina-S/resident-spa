import axios from "axios";
import { SET_STREETS, SET_HOUSES, SET_FLATS, SET_RESIDENTS, SET_STREET, SET_HOUSE, SET_FLAT, SET_MODAL, SET_RESIDENT, SET_REQUEST_STATUS} from "./actionTypes";

const apiBaseUrl = "https://dispex.org/api/vtest";

/**
 * Установка полученного списка улиц в state
 * @param {*} value Массив улиц 
 * @returns 
 */
export function setStreets(value){
    return {
        type:SET_STREETS,
        value
    }
}

/**
 * Асинхронное полуяение списка улиц по идентификатору города
 * @param {*} id Идентификатор города
 * @returns 
 */
export function getStreets(id){
    return async (dispatch)=>{
        try{
            const response = await axios.get(`${apiBaseUrl+"/Request/streets"}`,{
                params:{
                    cityId:id
                }
            });
            const streets = response.data;
            //console.log(streets);
            dispatch(setStreets(streets));
        }
        catch(e){
            console.log(e);
        }

    }
}

/**
 * Установка полученного списка домов
 * @param {*} value Массив домов
 * @returns 
 */
export function setHouses(value){
    return {
        type:SET_HOUSES,
        value
    }
}

/**
 * Асинхронное полуяение списка домов по идентификатору улицы
 * @param {*} id Идентификатор улицы
 * @returns 
 */
export function getHouses(id){
    return async (dispatch)=>{
        try{
            const response = await axios.get(`${apiBaseUrl}/Request/houses/${id}`);
            const houses = response.data;
            dispatch(setHouses(houses));
        }
        catch(e){
            console.log(e);
        }

    }
}

/**
 * Установка списка квартир
 * @param {*} value Массив квартир
 * @returns 
 */
export function setFlats(value){
    return {
        type:SET_FLATS,
        value
    }
}

/**
 * Асинхронное получение списка квартир по идентификатору дома
 * @param {*} id Идентификатор дома 
 * @returns 
 */
export function getFlats(id){
    return async (dispatch)=>{
        try{
            const response = await axios.get(`${apiBaseUrl}/Request/house_flats/${id}`);
            const flats = response.data;
            dispatch(setFlats(flats));
        }
        catch(e){
            console.log(e);
        }

    }
}

/**
 * Установка полученного списка жильцов
 * @param {*} value Список жильцов
 * @returns 
 */
export function setResidents(value){
    return {
        type:SET_RESIDENTS,
        value
    }
}

/**
 * Асинхронное получение списка домов по идентификатору квартиры
 * @param {*} id Идентификатор квартиры 
 * @returns 
 */
export function getResidents(id){
    return async (dispatch)=>{
        try{
            const response = await axios.get(`${apiBaseUrl}/HousingStock/clients`,{
                params:{
                    addressId:id
                }
            });
            const residents = Array.isArray(response.data)?response.data:[];
            dispatch(setResidents(residents));
        }
        catch(e){
            console.log(e);
        }

    }    
}


/**
 * Установка, выбранной улицы
 * @param {*} value Объект данных улицы
 * @returns 
 */
export function setStreet(value){
    return {
        type:SET_STREET,
        value
    }
}

/**
 * Установка, выбранного дома
 * @param {*} value Объект данных дома
 * @returns 
 */
export function setHouse(value){
    return {
        type:SET_HOUSE,
        value
    }
}

/**
 * Установка, выбранной квартиры
 * @param {*} value Объект данных квартиры 
 * @returns 
 */
export function setFlat(value){
    return {
        type:SET_FLAT,
        value
    }
}

/**
 * Асинхронное добавление жильца в квартиру
 * @param {*} resident Объект данных жильца
 * @returns 
 */
export function addResident(resident){
    return async (dispatch)=>{
        try{
            axios.post(`${apiBaseUrl}/HousingStock/client`,{
                id:0,
                name:resident.name,
                phone:resident.phone,
                email:resident.email,
                bindId:resident.bindId
            }); 
            dispatch(getResidents(resident.bindId));
            dispatch(setRequestStatus(true));
        }
        catch(e){
            dispatch(setRequestStatus(false));
            console.log(e);
        }

    }    
}

/**
 * Асинхронное удаление жильца из квартиры
 * @param {*} resident Обхект данных жильца
 * @returns 
 */
export function deleteResident(resident){
    return async (dispatch)=>{
        try{
            axios.delete(`${apiBaseUrl}/HousingStock/bind_client/${resident.clientId}`);
            dispatch(getResidents(resident.addressId));
            dispatch(setRequestStatus(true));
        }
        catch(e){
            dispatch(setRequestStatus(false));
            console.log(e);
        }

    }    
}

/**
 * Асинхронное обновление данных о жильце
 * @param {*} resident Объект данных жильца
 * @returns 
 */
export function updateResident(resident){
    return async (dispatch)=>{
        try{
            axios.put(`https://dispex.org/api/vtest/HousingStock/bind_client`,{
                clientId:resident.clientId,
                addressId:resident.addressId,
                name:resident.name,
                phone:resident.phone,
                email:resident.email,
            });
            dispatch(getResidents(resident.addressId));
            dispatch(setRequestStatus(true));
        }
        catch(e){
            dispatch(setRequestStatus(false));
            console.log(e);
        }

    }
}

/**
 * Установка данных редактируемого жидьца
 * @param {*} value Объект данных жильца
 * @returns 
 */
export function setResident(value){
    return {
        type:SET_RESIDENT,
        value
    }  
}

/**
 * Установка данных о модальном окне добавления/редактирования жильца
 * @param {*} value Данные о модальном окне 
 * @returns 
 */
export function setModal(value){
    return {
        type:SET_MODAL,
        value
    }    
}

/**
 * Установка данных для модального окна, отображения статуса запроса
 * @param {*} value Объект данных модального окна 
 * @returns 
 */
export function setRequestStatus(value){
    return {
        type:SET_REQUEST_STATUS,
        value
    }      
}