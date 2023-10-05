import { group, sleep } from 'k6'
import http from 'k6/http'
import thresholds from './config/thresholds.js'
import smoke_test_scenario from './config/smoke_test_scenario.js'
import average_load_test_scenario from './config/average_load_test_scenario.js'
import getAuthToken from './utils/getAuthToken.js'
import todos from './groups/todos.js'
import products from './groups/products.js'

const scenarioList = {
    smoke:smoke_test_scenario,
    average:average_load_test_scenario,
}

export const options = {
    thresholds,
    scenarios:{
        current_scenario: scenarioList[__ENV.SCENARIO] || smoke_test_scenario
    }
}

export function setup(){
    return getAuthToken()
}

export default function (token){
    todos(token)
    products(token)
    sleep(1)
}