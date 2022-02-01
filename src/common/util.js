import axios from "axios";
import validator from "validator";
import * as url from "./url";
import passwordValidator from "password-validator";
import FileDownloadHelper from "@bbon/filedownload";

export const requestMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

export function asyncRequest(configs) {

    // 로딩 처리
    const setLoading = configs.setLoading || ((param) => {});
    setLoading(true);

    let url = configs.url;
    let method = configs.method || requestMethod.POST;
    let params = configs.data || {};
    let config = configs.config || {};

    const onError = configs.error || ((param) => {});

    let isFile = configs.isFile || false;
    if (isFile) {
        config["headers"] = {
            'Content-Type': 'multipart/form-data',
        };
    }

    // request 메소드에 따른 axios 함수 실행
    let proc;
    if (method === requestMethod.GET) {
        proc = axios.get(url, {
            params: params
        });
    } else if (method === requestMethod.POST) {
        proc = axios.post(url, params, config);
    } else if (method === requestMethod.PUT) {
        proc = axios.put(url, params, config);
    } else if (method === requestMethod.DELETE) {
        proc = axios.delete(url, {
            data: params
        });
    }

    proc.then((response) => {
        // 결과 코드에 따른 처리
        const code = response.data.success;

        if (code) {
            configs.success(response.data.response);
        } else {
            alert(response.data.error.message);
            onError(response);
            return false;
        }
    })
    .then(() => {
        // 로딩 처리
        setLoading(false);
    })
    .catch((err) => {
        const errData = err.response.data.error;
        const status = errData.status;
        const msg = errData.message;

        if (status === 404 || status === 405) {
            alert("존재하지 않는 요청입니다.");
        } else if (status === 403) {
            alert(msg);
        } else if (status === 500) {
            alert(msg);
            // alert("요청 작업을 처리하는 도중 오류가 발생하였습니다.");
        } else {
        }
        setLoading(false);
    });
}

export function fileDownload(fileDownloadUrl, fileName) {
    const requestConfig = {
        ...axios.defaults,
        responseType: 'blob',
    };

    axios.get(url.urlBase + fileDownloadUrl, requestConfig)
    .then((res) => {
        if (res) {
            const contentType = res.headers['content-type'] || 'application/octet-stream';
            const helper = new FileDownloadHelper();
            helper.download({
                data: res.data,
                filename: fileName,
                contentType,
            });
        }
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
    });
}

export function locationHref(history, url, param = false) {
    let paramStr = '';

    if (param) {
        paramStr = '?';
        for (let key in param) {
            paramStr += key + "=" + param[key] + "&";
        }
        paramStr = paramStr.replace(/&$/, '');
    }

    history.push(url);
    // location.href = url + paramStr;
}

// export function fileDownload(action, params = []) {
//     let downloadForm = document.createElement('form');
//     downloadForm.method = 'POST';
//     downloadForm.action = action;
//
//     for (let i = 0; i < params.length; i++) {
//         let inpuParameter = document.createElement('input');
//         inpuParameter.setAttribute("type", params[i].type);
//         inpuParameter.setAttribute("name", params[i].name);
//         inpuParameter.setAttribute("value", params[i].value);
//         downloadForm.appendChild(inpuParameter);
//     }
//
//     let inputCsrf = document.createElement('input');
//     inputCsrf.setAttribute("type", "hidden");
//     inputCsrf.setAttribute("name", "_token");
//     // inputCsrf.setAttribute("value", $('meta[name="csrf-token"]').attr('content'));
//     downloadForm.appendChild(inputCsrf);
//
//     document.body.appendChild(downloadForm);
//     downloadForm.submit();
//
//     document.body.removeChild(downloadForm);
// }

export function makePaginate(data, block = 10) {   
    const res = [];

    // // 페이지 블록 default -> 10
    // if (!data.block) data.block = 10;

    const total = data.totalElements;
    const current_page = data.number + 1;
    const last_page = data.totalPages;
    const per_page = data.size;
    
    if (total > per_page) {
        // 페이지 계산
        const currentBlock = Math.ceil(current_page / block);        // 현재 블록
        const startPage    = (Math.max(currentBlock, 1) - 1) * block + 1; // 시작 페이지
        const lastPage     = startPage + block - 1;                       // 마지막 페이지
        const lastRoop     = Math.min(lastPage, last_page);

        res.push({ label : 'f', href : current_page === 1 ? false : 1, active : false });                                                      // 처음 (first)
        res.push({ label : 'p', href : current_page === 1 ? false : Math.max(startPage - 1, 1), active : false });                             // 이전 (prev)
        for (let i=Math.max(startPage, 1); i<=lastRoop; i++) {
            res.push({ label : i, href : current_page == i ? false : i, active: current_page == i ? true : false});
        }
        res.push({ label : 'n', href : current_page === last_page ? false : Math.min(lastPage + 1, last_page), active : false });    // 다음 (next)
        res.push({ label : 'l', href : current_page === last_page ? false : last_page, active : false });                            // 마지막 (last)
    }

    return res;
}

export function stringShorten(str, length) {
    // 첫 번째 인자로 들어온 텍스트의 길이가 두 번째 인자로 들어온 길이보다 크다면
    // 두 번째 인자로 들어온 길이만큼 텍스트를 자르고 ... 을 붙인 텍스트를 리턴
    if (str.length > length) {
        return str.substr(0, length) + "...";
    }
    return str;
}

export function filterNumber(str, numberType = false) {
    let result = str.replace(/\D/g, '');
    return numberType ? Number(result) : result;
}

export function formatNumber(number) {
    if (! number) return 0;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function validatePassword(password) {
    let schema = new passwordValidator();
    schema
        .is().min(8)
        .is().max(16)
        .has().lowercase()      // 영 소문자
        .has().digits()         // 숫자
        .has().not().spaces()   // 빈칸 없음
        // .has().symbols();       //특수문자

    return schema.validate(password, {});
}

export function validateId(id) {
    return (
        validator.isLength(id, { min: 5, max: 20 })
        && ! validator.isNumeric(id)
        && validator.isAlphanumeric(id)
    );
}

export function validateLength(min, max, str) {
    return validator.isLength(str, { min: min, max: max })
}

export function floor(num, unit) {
    if (num) {
        if (unit) {
            return Math.floor(num) + " " + unit;
        }
        return Math.floor(num);
    }
    return '';
}

export function meter2Kilometer(meter) {
    if (meter) {
        return formatNumber((meter/1000).toFixed(2)) + " km";
    }
    return '';
}

export function second2TimeFormat(paramSec, korean=false) {
    function padding(num) {
        if (num < 10) {
            return "0" + num;
        }
        return num;
    }

    if (paramSec) {
        let hour = Math.floor(paramSec / 3600);
        let minute = Math.floor((paramSec % 3600) / 60);
        let second = Math.floor((paramSec % 3600) % 60);

        if (korean) {
            if (hour) {
                return `${hour}시간 ${minute}분`;
            } else {
                return `${minute}분 ${second}초`;
            }
        } else {
            return padding(hour) + ":" + padding(minute) + ":" + padding(second);
        }
    }
    return '';
}

export function getDateObj(dateStr = '') {
    if (dateStr === '') return new Date();
    let dateObj = new Date(dateStr);
    if (dateObj.toString() === 'Invalid Date') {
        let _strDate = dateStr.split('.')[0];
        dateObj = new Date(_strDate);
    }
    return dateObj;
}

export function formatDate(dateStr, timeInfo = false) {
    function padding(num) {
        if (num < 10) {
            return "0" + num;
        }
        return num;
    }

    if (! dateStr) return '';

    const dateObj = getDateObj(dateStr);
    let year = dateObj.getFullYear();
    let month = padding(dateObj.getMonth() + 1);
    let date = padding(dateObj.getDate());

    if (timeInfo) {
        let hour = padding(dateObj.getHours());
        let minute = padding(dateObj.getMinutes());
        let second = padding(dateObj.getSeconds());
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    } else {
        return year + "-" + month + "-" + date;
    }
}

// key: daumMapLevel, lat|lng:((거리(m)/픽셀)*브라우저폭)/[위도|경도] 1도당 거리(m)/2
export const levelToLatLng = {
    1: { 'lat': ((20/80)*1040)/114640/2, 'lon': ((20/80)*1920)/88000/2 },
    2: { 'lat': ((30/60)*1040)/114640/2, 'lon': ((30/60)*1920)/88000/2 },
    3: { 'lat': ((50/50)*1040)/114640/2, 'lon': ((50/50)*1920)/88000/2 },
    4: { 'lat': ((100/50)*1040)/114640/2, 'lon': ((100/50)*1920)/88000/2 },
    5: { 'lat': ((250/60)*1040)/114640/2, 'lon': ((250/60)*1920)/88000/2 },
    6: { 'lat': ((500/60)*1040)/114640/2, 'lon': ((500/60)*1920)/88000/2 },
    7: { 'lat': ((1000/60)*1040)/114640/2, 'lon': ((1000/60)*1920)/88000/2 },
    8: { 'lat': ((2000/60)*1040)/114640/2, 'lon': ((2000/60)*1920)/88000/2 },
    9: { 'lat': ((4000/60)*1040)/114640/2, 'lon': ((4000/60)*1920)/88000/2 },
    10: { 'lat': ((8000/60)*1040)/114640/2, 'lon': ((8000/60)*1920)/88000/2 },
    11: { 'lat': ((16000/60)*1040)/114640/2, 'lon': ((16000/60)*1920)/88000/2 },
    12: { 'lat': ((32000/60)*1040)/114640/2, 'lon': ((32000/60)*1920)/88000/2 },
    13: { 'lat': ((64000/60)*1040)/114640/2, 'lon': ((64000/60)*1920)/88000/2 },
    14: { 'lat': ((128000/60)*1040)/114640/2, 'lon': ((128000/60)*1920)/88000/2 },
}

export function where(objList, key, value) {
    for (let index in objList) {
        if (objList[index][key] === value) {
            return objList[index];
        }
    }
    return false;
}

export function whereIndexOf(objList, key, value) {
    for (let index in objList) {
        if (objList[index][key] === value) {
            return index;
        }
    }
    return -1;
}