import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import { Array } from 'core-js';

//type check (這裡以後可以改用 TS)
const isArray = (arr) => {
    return arr.constructor === Array
}

//workbook 物件
export function Workbook() {

    this.SheetNames = [];
    this.Sheets = {};
    this.blob;

    //自定義 workbook optional object
    this.wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'binary'
    }

    //jsonDataList to sheet
    this.jsonDataList_to_sheet = function ({ jsonDataList, attrs_to_show, excel_header = attrs_to_show, data_format = {} }) {
        // 取出 jsonDataList中需要的資料, 以及套用資料格式 
        try {
            if( !isArray(jsonDataList) ) throw new Error('json 資料必須為 Array')
            if( jsonDataList.length === 0 ) throw new Error('資料不得為空')

            var result = jsonDataList.map(item => {
                return attrs_to_show.map(attr => {
                    if(Object.prototype.hasOwnProperty.call(data_format, attr)) return data_format[attr](item[attr])
                    return item[attr]
                })
            })
            result = [excel_header, ...result]
        } catch(e) {
            console.log(e)
            return
        }
        
        // aoa to sheet
        return XLSX.utils.aoa_to_sheet(result)
        // return ''
    }

    //塞入 Sheet
    this.appendSheet = function(config_to_generate_excel, name = `sheet${this.SheetNames.length + 1}`) {
        const sheet = this.jsonDataList_to_sheet(config_to_generate_excel)
        this.SheetNames = [...this.SheetNames, name]
        this.Sheets[name] = sheet
    };

    //生成 Blob
    this.toBlob = function(option = this.wopts) {
        // string to ArrayBuffer
        function s2ab(str) {
            var buf = new ArrayBuffer(str.length)
            var view = new Uint8Array(buf)

            for(let i=0; i<str.length; i++) {
                view[i] = str.charCodeAt(i) & '0xFF'
            }

            return buf
        }

        var wbout = XLSX.write(this, option)
        var blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })

        this.blob = blob;
    }

    this.saveAs = function(filename) {
        saveAs(this.blob, `${filename}.xlsx`)
    }
}

//excel blob to json
export function excel_to_json(file, sheet_name) {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = function() {
        const result = fileReader.result
        
        const sheets = XLSX.read(result).Sheets
        
        return XLSX.utils.sheet_to_json(sheets[sheet_name])
    }
}

