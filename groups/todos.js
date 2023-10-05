import { group, check, sleep } from "k6"
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import http from "k6/http"
import generateHeader from "../utils/generateHeader.js"

export default function todos(token){
    describe('API_001 Testing API todos', function(){
        describe('FT_001 Mencoba memanggil semua data',function(){
            const res = http.get('https://dummyjson.com/auth/todos',generateHeader(token))
            expect(res.status, 'statusnya').to.equal(200)
            expect(res.json().total,'totalnya').to.equal(150)
        })
        sleep(1)
        describe('FT_002 Mencoba memanggil data berdasarkan id',function(){
            const res = http.get('https://dummyjson.com/auth/todos/1',generateHeader(token))
            expect(res.status,'statusnya').to.equal(200)
            expect(res.json().todo,'responsenya').to.exist
        })
        sleep(1)
        describe('FT_003 Mencoba memanggil data random',function(){
            const res = http.get('https://dummyjson.com/auth/todos/random',generateHeader(token))
            expect(res.status,'statusnya').to.equal(200)
            expect(res.json().todo,'responsenya').to.exist
        })
        sleep(1)
        describe('FT_004 Mencoba memanggil data menggunakan skip dan limit', function(){
            const res = http.get('https://dummyjson.com/auth/todos?limit=3&skip=10',generateHeader(token))
            expect(res.status,'statusnya').to.equal(200)
            expect(res.json().limit,'total data yang dipanggil').to.equal(3)
            expect(res.json().skip,'id yang diskip').to.equal(10)
        })
        sleep(1)
        describe('FT_005 Mencoba mengambil semua data berdasarkan user id', function(){
            const res = http.get('https://dummyjson.com/auth/todos/user/5',generateHeader(token))
            expect(res.status,'statusnya').to.equal(200)
            expect(res.json().total,'totalnya').to.equal(3)
        })
        sleep(1)
        describe('FT_006 Mencoba menambah data baru', function(){     
            const params = {
                todo:'testing',
                completed: false,
                userId: 5
            }
            const res = http.post('https://dummyjson.com/auth/todos/add',params,generateHeader(token))
            expect(res.status, 'statusnya').to.equal(200)
            expect(res.json().id, 'idnya').to.equal(151)
            expect(res.json().todo,'responsenya').to.exist
        })
        sleep(1)
        describe('FT_007 Mencoba update data', function(){
            const params = { todo:'new Todo' }
            const res = http.put('https://dummyjson.com/auth/todos/1',params,generateHeader(token))
            expect(res.status,'statusnya').to.equal(200)
            expect(res.json().todo,'todonya').to.equal('new Todo')
        })
        sleep(1)
        describe('FT_008 Mencoba delete data',function(){
            const res = http.del('https://dummyjson.com/auth/todos/1',null,generateHeader(token))
            expect(res.status,'statusnya').to.equal(200)
            expect(res.json().isDeleted,'isDeleted').to.equal(true)
        })
        sleep(1)
    })
}