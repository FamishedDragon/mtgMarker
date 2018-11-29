export const REQUEST_SWITCH_SERVER = 'REQUEST_SWITCH_SERVER';
export const SWITCH_SERVER_SUCCESS = 'SWITCH_SERVER_SUCCESS';
export const CLEAR_STORE = 'CLEAR_STORE';

const serverList = {
    content: 'http://content.fueled.ciegames.com:8060/bluesteel/',
    contentMaster: 'http://content.fueled.ciegames.com:8070/bluesteel/',
    contentRelease: 'http://content.fueled.ciegames.com:8050/bluesteel/',
    sandboxA: 'http://sandbox.fueled.ciegames.com:8070/bluesteel_a/',
    sandboxB: 'http://sandbox.fueled.ciegames.com:8060/bluesteel_b/',
    sandboxC: 'http://sandbox.fueled.ciegames.com:6003/bluesteel_c/',
    sandboxD: 'http://sandbox.fueled.ciegames.com:6004/bluesteel_d/',
    sandboxE: 'http://sandbox.fueled.ciegames.com:6005/bluesteel_e/',
    sandboxF: 'http://sandbox.fueled.ciegames.com:6006/bluesteel_f/',
    sandboxG: 'http://sandbox.fueled.ciegames.com:6007/bluesteel_g/',
    sandboxH: 'http://sandbox.fueled.ciegames.com:6008/bluesteel_h/',
    sandboxI: 'http://sandbox.fueled.ciegames.com:6009/bluesteel_i/',
    sandboxJ: 'http://sandbox.fueled.ciegames.com:6010/bluesteel_j/',
    sandboxAmber: 'http://sandbox-amber.fueled.ciegames.com:8080/bluesteel_amber/',
    vagrant: 'http://192.168.33.6:8080/bluesteel_vagrant/',
    sandboxPublic: 'http://sandbox-public.fueled.ciegames.com:8080/bluesteel_public/',
};

export function requestSwitchServer(serverName, serverHeader) {
    return dispatch => {
        dispatch(clearStore());
        return dispatch(switchServer(serverName, serverHeader));
    };
}

export function switchServer(serverName, serverHeader) {
    var targetServer = serverList[serverName];
    return {
        type: REQUEST_SWITCH_SERVER,
        targetServer: targetServer,
        serverHeader: serverHeader,
    };
}

export function clearStore() {
    return {
        type: CLEAR_STORE,
    };
}
