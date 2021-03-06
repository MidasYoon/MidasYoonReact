export const urlBase = "http://localhost:8080";

export const memberPath = {
    page:   '/member/',
    ajax:   '/member/ajax/',
    inPage: '/member_in/',
    inAjax: '/member_in/ajax/',
}

// 공지사항 게시판
export const boardPath = {
    page:      '/board',
    inPage:    '/board_in',
    adminPage: '/board_ad',
    ajax:      urlBase + '/api/board',
    inAjax:    urlBase + '/api/board_in',
    adminAjax: urlBase + '/api/board_ad',
}

// 여행 사진
export const travelPath = {
    page:      '/travel',
    ajax:      urlBase + '/api/travel',
}

// 라이딩,트래킹 코스
export const trackCoursePath = {
    page:      '/travel',
    inPage:    '/travel_in',
    adminPage: '/travel_ad',
    ajax:      urlBase + '/api/travel',
    inAjax:    urlBase + '/api/travel_in',
    adminAjax: urlBase + '/api/travel_ad',
}

export const progPath = {
    page:      '/prog/',
    ajax:      '/prog/ajax/',
    inPage:    '/prog_in/',
    inAjax:    '/prog_in/ajax/',
    adminPage: '/prog_ad/',
    adminAjax: '/prog_ad/ajax/',
}

export const transportPath = {
    bus: {
        page:      '/transport/bus/',
        ajax:      '/transport/bus/ajax/',
        adminPage: '/transport_ad/bus/',
        adminAjax: '/transport_ad/bus/ajax/',
    },
    train: {
        page:      '/transport/train/',
        ajax:      '/transport/train/ajax/',
        adminPage: '/transport_ad/train/',
        adminAjax: '/transport_ad/train/ajax/',
    },
}

export const gpxPath = {
    ajax: '/gpx/ajax/'
}

export const laboratoryPath = {
    page:      '/lab/',
    ajax:      '/lab/ajax/',
    adminPage: '/lab_ad/',
    adminAjax: '/lab_ad/ajax/',
}
