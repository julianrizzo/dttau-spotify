import { setAccessToken, setRefreshToken, setUserID, setDeviceID } from './memory.helper.ts';
import { read_file } from './file.helper.ts';

// Saves the token files into memory to be accessed while the app is running
function initialiseApp() {
    setAccessToken(read_file('global_access_token'), false);
    setRefreshToken(read_file('global_refresh_token'), false);
    setUserID(read_file('global_user_id'), false);
    setDeviceID(read_file('global_device_id'), false);
};

export {
    initialiseApp
}