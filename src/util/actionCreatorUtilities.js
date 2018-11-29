import { s3 } from './AWSS3Service'
import { message } from 'antd';
import moment from 'moment';
import {ACTION_TYPE, s3SandboxBucket} from "../constants";

export const API_TOOL = 'api/tool/'

export const handleSuccess = msg => {
    message.success(msg, 5);
};

export const handleError = msg => {
    message.error(msg, 5);
};

export const handleApiError = () => {
    message.error('Failed to load API. Will retry in 5 seconds.', 4);
};

export const createGroupedArray = (arr, chunkSize) => {
    var groups = [],
        i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
};

export const searchArray = (array, keyword) => {
    return array.filter(val => {
        return val.toLowerCase().indexOf(keyword.toLowerCase()) >= 0;
    });
};

export const searchMultiple = (array, keyword) => {
    keyword = keyword.toLowerCase();
    if (undefined === keyword || keyword === '') {
        return array;
    }
    return array.filter(val => {
        let flag;
        for (let prop in val) {
            if (val[prop]) {
                flag = false;
                flag =
                    val[prop]
                        .toString()
                        .toLowerCase()
                        .indexOf(keyword) > -1;
            }
            if (flag) {
                break;
            }
        }
        return flag;
    });
};

export const RIESelectDropdownFormat = params => {
    let dropdownOptions = params.data.map(item => {
        return {
            id: item[params.valueField].toString(),
            text: item[params.textField].toString(),
        };
    });

    return dropdownOptions;
};

export const AntSelectDropdownFormat = params => {
    let dropdownOptions = params.data.map(item => {
        return {
            key: item[params.valueField],
            value: item[params.valueField],
            label: item[params.textField],
        };
    });

    if(params.mode === 'multiple'){
        return  [{
            groupLabel:params.label,
            groupValue: [
                ...dropdownOptions
            ]
        }]
    }
    return dropdownOptions;
};

export const generateRandomNumber = () => {
    return Math.round(Math.random() * 99999);
};

export const camelCaseToRegularForm = word => {
    return word.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) {
        return str.toUpperCase();
    });
};

export const parseDate = date => {
    return !isNaN(Date.parse(date)) ? moment(date, 'YYYY-MM-DD HH:mm:ss') : null;
};

export const replaceAt = (string, index, replace) => {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

export function parseDateStringsToISO(item) {
    if (typeof item === "object" && item !== null) {
        for (var i = 0; i < item.length; i++) {
            if (typeof item[i].startDate === "number") {
                item[i].startDate = new Date(item[i].startDate).toISOString();
                if (Date.parse(item[i].endDate) > Date.now() || item[i].endDate === undefined || item[i].endDate === null) {
                    item[i].isActive = true;
                } else {
                    item[i].isActive = false;
                }
            }
            if (typeof item[i].endDate === "number") {
                item[i].endDate = new Date(item[i].endDate).toISOString()
                if (Date.parse(item[i].endDate) > Date.now() || item[i].endDate === undefined || item[i].endDate === null) {
                    item[i].isActive = true;
                } else {
                    item[i].isActive = false;
                }
            }
            if (typeof item[i].displayDate === "number") {
                item[i].displayDate = new Date(item[i].displayDate).toISOString();
                if (Date.parse(item[i].endDate) > Date.now() || item[i].endDate === undefined || item[i].endDate === null) {
                    item[i].isActive = true;
                } else {
                    item[i].isActive = false;
                }
            }
            if (typeof item[i].newUntilDate === "number") {
                item[i].newUntilDate = new Date(item[i].newUntilDate).toISOString();
                if (Date.parse(item[i].endDate) > Date.now() || item[i].endDate === undefined || item[i].endDate === null) {
                    item[i].isActive = true;
                } else {
                    item[i].isActive = false;
                }
            }
        }
    } else if (typeof item === "string" && item.length > 0) {
        item = new Date(item).toISOString();
    } else if (typeof item === "string" && !item.length) {
        item = null;
    }
    return item;
}

export function parseDropDownValues(data) {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (typeof data[key] === "object" && data[key] !== null) {
                data[key] = data[key].value;
            }
        }
    }
    return data;
}


//Filters//
export function filterActiveItems(allItems) {
    var activeItems = [];
    if (activeItems.length) {
        if (allItems[0] && allItems[0].hasOwnProperty('startDate')) {
            activeItems = allItems.filter(function (item) {
                return item.endDate > Date.now() || item.endDate === undefined || item.endDate === null
            })
        }
        else if (allItems[0] && allItems[0].hasOwnProperty('latestEndDate')) {
            activeItems = allItems.filter(function (item) {
                return Date.parse(item.latestEndDate) > Date.now() || item.latestEndDate === undefined || item.latestEndDate === null
            })
        }
        else if (allItems[0] && allItems[0].instances && allItems[0].instances[0].hasOwnProperty("startDate")) {
            activeItems = allItems.filter(function (item) {
                return item.endDate > Date.now() || item.endDate === undefined || item.endDate === null
            })
        }
    }

    return activeItems;
}


//HTTP Verbs///

export const httpInit = (verb, data) => {
    if (verb === "PUT") {
        return putInit(data);
    }
    if (verb === "POST") {
        return postInit(data);
    }
    if (verb === "DELETE") {
        return deleteInit(data);
    }
}

export const postInit = (data, headers, params) => {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
        mode: 'cors',
        cache: 'default',
        ...params
    }
};

export const postNoCorsInit = (data, headers, params) => {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(data),
        mode: 'no-cors',
        cache: 'default',
        ...params
    }
};

export const putInit = (data) => {
    return {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        mode: 'cors',
        cache: 'default'
    }
};

export const getInit = () => {
    return {
        method: 'GET',
        headers: {
            'Response-Type': 'json',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        mode: 'cors',
        cache: 'default'
    }
};

export const deleteInit = (data) => {
    return {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        mode: 'cors',
        cache: 'default'
    }
};


export const addOrEditAction = (params) => {

    let { data } = params;

    if (params.action === null) {
        console.log("ERROR: addOrEditSlot was not passed an action")
        return
    }
    return (dispatch, getState) => {
        let targetServer = getState().homeReducer.targetServer
        let urlString;
        data.id = params.data.id || params.data.id;
        params.hasStrings = params.hasStrings || false;
        if (params.action === ACTION_TYPE.createNew) {
            if(params.type === 'COLLECTIONS'){
                data.imageURL = data.imageURL || '';
                data.imageVersion = data.imageVersion || 0;
                data.sortOrder = parseInt(params.data.sortOrder);
                data.rewardImageVersion = data.rewardImageVersion || 1;
            }
            if (params.type === 'SETS') {
                data.imageURL = data.imageURL || '';
                data.imageVersion = data.imageVersion || 0;
                data.sortOrder = parseInt(params.data.sortOrder);
               // data.collectionCategoryID = data.collectionCategoryID;
                urlString = targetServer + API_TOOL + params.uri;
                delete data.category;
                delete data.collections;
                if (data.hasOwnProperty('categories')) {
                    data.categories = []
                }
            }
            else if (params.type === 'CATEGORIES') {
                if (data.hasOwnProperty('imageURLForNewCollectionSet')) {
                    data.imageURLForNewCollectionSet = JSON.stringify(data.imageURLForNewCollectionSet);
                }
                urlString = targetServer + API_TOOL + params.uri;
            }

            urlString = targetServer + API_TOOL + params.uri;
        }
        else {
            urlString = targetServer + API_TOOL + params.uri + '/' + data.id;
        }


        if (data.hasOwnProperty('displayDate')) {
            data.displayDate = parseDateStringsToISO(data.displayDate);
        }
        if (data.hasOwnProperty('startDate')) {
            data.startDate = parseDateStringsToISO(data.startDate);
        }
        if (data.hasOwnProperty('endDate')) {
            data.endDate = parseDateStringsToISO(data.endDate);
        }
        const myRequest = new Request(urlString, postInit({ [params.postInitProperty]: data }))

        dispatch(params.request)
        return fetch(myRequest)
            .then((response) => {
                return response.json()
            })
            .then(json => {
                let {data} = json;
                data = {
                    ...data,
                    urlString
                }
                params.onSuccess(dispatch, data)
            })
    }
}

export function deleteAction(params) {

    const { id } = params;

    return (dispatch, getState) => {
        let targetServer = getState().homeReducer.targetServer
        var urlString = targetServer + API_TOOL + params.uri + '/' + id
        var myRequest = new Request(urlString, deleteInit())

        dispatch(params.request())
        return fetch(myRequest)
            .then(response => {
                dispatch(params.fetch())
                return response.json();
            })
            .then(json => {
                const deleteType = getDeleteType(params.actionTypeSuccess);
                if(json.errorMessage){
                    handleError(json.errorMessage);
                }
                else{
                    handleSuccess(
                        `${deleteType} successfully deleted`,
                    );
                }
                return json.errorMessage ? alert(json.errorMessage) : dispatch(params.success(json, params.fetch, params.actionTypeSuccess))
            })
    }
}

export function deleteActionQueue (params) {

}

function getDeleteType (deleteType) {

    switch(deleteType) {
        case 'DELETE_REQUIREMENT_SUCCESS' : return 'requirement'
        case 'DELETE_CATEGORY_SUCCESS' : return 'category'
        case 'DELETE_COLLECTIBLE_SUCCESS' : return 'collectible'
        case 'DELETE_COLLECTION_SUCCESS' : return 'collection'
        case 'DELETE_SLOT_SUCCESS' : return 'slot'
        case 'DELETE_SET_SUCCESS' : return 'set'
        case 'DELETE_CAR_COLOR_SUCCESS': return 'color'
        default: return 'collection'
    }
}

export function fetchImages(params) {
    const { path } = params; // Endcoding removes the slash and causes issue //encodeURIComponent(albumName) + '/';
    //console.log('PATH ',path);
    return (dispatch, getState) => {
        dispatch(params.request());
        s3.listObjects({ Prefix: path }, function (err, data) {
            if (err) {
                console.log(err)
                throw err;
            }
            const href = this.request.httpRequest.endpoint.href;
            const bucketUrl = href + '' + s3SandboxBucket + '/';

            let images = data.Contents.map(photo => {
                const lastIndex = photo.Key.lastIndexOf('/') + 1;
                const imageName = photo.Key.substring(lastIndex);
                return {
                    url: bucketUrl + encodeURIComponent(photo.Key),
                    key: photo.Key,
                    imageName:imageName
                }
            });
            dispatch(params.receive(images))
        });
    }
}

export function fetchAction(params) {
    return (dispatch, getState) => {
        dispatch(params.request())
        var targetServer = getState().homeReducer.targetServer;
        return fetch(targetServer + API_TOOL + params.uri)
            .then(response => response.json())
            .then(json => {
                dispatch(params.receive(json))
            })
    }
}