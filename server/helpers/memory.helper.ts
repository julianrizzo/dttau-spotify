// Handles the read and write operations for local tokens IN MEMORY

import { write_file } from "./file.helper.ts";

let global_access_token: string;
let global_refresh_token: string;
let global_user_id: string;
let global_device_id: string;

function getAccessToken() {
    return global_access_token;
}

function setAccessToken(new_access_token: string, write_flag = true) {
    global_access_token = new_access_token;
    if(write_flag) {
        write_file('global_access_token', new_access_token);
    }
}

function getRefreshToken() {
    return global_refresh_token;
}

function setRefreshToken(new_refresh_token:string , write_flag = true) {
    global_refresh_token = new_refresh_token;
    if(write_flag) {
        write_file('global_refresh_token', new_refresh_token);
    }
}

function getUserID() {
    return global_user_id;
}

function setUserID(new_user_id: string, write_flag = true) {
    global_user_id = new_user_id;
    if(write_flag) {
        write_file('global_user_id', new_user_id);
    }
}

function getDeviceID() {
    return global_device_id;
}

function setDeviceID(new_device_id: string, write_flag = true) {
    global_device_id = new_device_id;
    if(write_flag) {
        write_file('global_device_id', new_device_id);
    }
}

export {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    getUserID,
    setUserID,
    getDeviceID,
    setDeviceID
}