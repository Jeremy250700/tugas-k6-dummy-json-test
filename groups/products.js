import { group, check, sleep } from "k6"
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import http from "k6/http"
import generateHeader from "../utils/generateHeader.js"

export default function products(token){
    describe('API_002 Testing API products', function(){
        describe('FT_001 mencoba memanggil semua data', function(){
            const res = http.get('https://dummyjson.com/auth/products',generateHeader(token))
            expect(res.status, 'statusnya').to.equal(200)
            expect(res.json().total,'totalnya').to.equal(100)
            
        })
        sleep(1)
        describe('FT_002 mencoba memanggil data berdasarkan id', function(){
        const res = http.get('https://dummyjson.com/auth/products/1',generateHeader(token))
        expect(res.status, 'statusnya').to.equal(200)
        expect(res.json().title,'responsenya').to.exist
        })
        sleep(1)
        describe('FT_003 mencoba memanggil data menggunakan search', function(){
            const res = http.get('https://dummyjson.com/auth/products/search?q=phone',generateHeader(token))
            expect(res.status, 'statusnya').to.equal(200)
            expect(res.json().total,'totalnya').to.equal(4)
        })
        sleep(1)
        describe('FT_004 mencoba memanggil data menggunakan limit dan skip', function(){
            const res = http.get('https://dummyjson.com/auth/products?limit=10&skip=10&select=title,price',generateHeader(token))
/*             const productLength = res.json().products.length
            for (let i = 0; i<productLength; i++){
                expect(res.json().products[i].title,'responsenya').to.exist
                expect(res.json().products[i].price,'responsenya').to.exist
            } */
            /* expect(res.json().products[0].title,'responsenya').to.exist
            expect(res.json().products[0].price,'responsenya').to.exist */
            expect(res.status, 'statusnya').to.equal(200)
            expect(res.json().skip,'totalnya').to.equal(10)
            expect(res.json().limit,'totalnya').to.equal(10)
        })
        sleep(1)
        describe('FT_005 mencoba memanggil semua kategori products', function(){
            const res = http.get('https://dummyjson.com/auth/products/categories',generateHeader(token))
            expect(res.status, 'statusnya').to.equal(200)
        })
        sleep(1)
        describe('FT_006 mencoba memanggil semua data berdasarkan kategori products', function(){
            const res = http.get('https://dummyjson.com/auth/products/category/smartphones',generateHeader(token))
/*             const productLength = res.json().products.length
            for (let i = 0; i<productLength; i++){
                expect(res.json().products[i].category,'kategorinya').to.equal('smartphones')
            } */
            /* expect(res.json().products[0].category,'kategorinya').to.equal('smartphones') */
            expect(res.status, 'statusnya').to.equal(200)
            expect(res.json().total,'totalnya').to.equal(5)
        })
        sleep(1)
        describe('FT_007 Mencoba menambah data baru', function(){     
            const params = {
                title:'BMW Pencil',
            }
            const res = http.post('https://dummyjson.com/auth/products/add',params,generateHeader(token))
            expect(res.status, 'statusnya').to.equal(200)
            expect(res.json().id, 'idnya').to.equal(101)
            expect(res.json().title,'responsenya').to.exist
        })
        sleep(1)
        describe('FT_008 Mencoba update data', function(){     
            const params = {
                title:'iPhone Galaxy +1',
            }
            const res = http.put('https://dummyjson.com/auth/products/1',params,generateHeader(token))
            expect(res.status, 'statusnya').to.equal(200)
            expect(res.json().title,'titlenya').to.equal('iPhone Galaxy +1')
        })
        sleep(1)
        describe('FT_009 Mencoba delete data', function(){     
            const res = http.del('https://dummyjson.com/auth/products/1',null,generateHeader(token))
            expect(res.status, 'statusnya').to.equal(200)
            expect(res.json().isDeleted,'isDeleted').to.equal(true)
        })
        sleep(1)
    })
}