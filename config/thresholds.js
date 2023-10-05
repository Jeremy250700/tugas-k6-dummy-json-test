const thresholds = {
    http_req_duration: ['avg<300','p(95)<500'],
    http_req_failed: ['rate<0.3']
}

export default thresholds