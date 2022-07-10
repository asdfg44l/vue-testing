import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

//type check (這裡以後可以改用 TS)
const _isArray = (arr) => {
    return arr.constructor === Array
}
// 取出 jsonDataList中需要的資料, 以及套用資料格式, 並生成二維陣列
//[[...header], [...content], [...content]...]
const _jsonList_to_aoa = ({ jsonDataList, attrs_to_show, excel_header = attrs_to_show, data_format = {} }) => {
    if(!_isArray(jsonDataList)) throw new Error('json 資料必須為 Array')
    if(!_isArray(attrs_to_show)) throw new Error('呈現屬性必須為 Array')
    if(jsonDataList.length === 0) throw new Error('資料不得為空')
    if(attrs_to_show.length === 0) throw new Error('呈現屬性不得為空')

    var result = jsonDataList.map(data => {
        return attrs_to_show.map(attr => {
            if(Object.prototype.hasOwnProperty.call(data_format, attr)) return data_format[attr](data[attr])
            return data[attr]
        })
    })

    return [excel_header, ...result]
}

//如果要有特殊的 style就選用 workbook物件
//沒有的話就存取為 csv即可
//workbook 物件 (jsonList to excel)
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
    this.jsonDataList_to_sheet = function (jsonConfig) {
         
        try {
            var result = _jsonList_to_aoa(jsonConfig)
        }
        catch(e) {
            console.log(e)
            return
        }
        
        // aoa to sheet
        return XLSX.utils.aoa_to_sheet(result)
    }

    //塞入 Sheet
    this.appendSheet = function(config_to_generate_excel, name = `sheet${this.SheetNames.length + 1}`) {
        this.Sheets[name] = this.jsonDataList_to_sheet(config_to_generate_excel)
        this.SheetNames = [...this.SheetNames, name]
    };

    //生成 Blob
    this.toBlob = function(option = this.wopts) {
        // string to ArrayBuffer
        function s2ab(str) {
            var buf = new ArrayBuffer(str.length)
            var view = new Uint8Array(buf)

            for(let i=0; i<str.length; i++) {
                view[i] = str.charCodeAt(i) & 0xFF
            }

            return buf
        }

        var wbout = XLSX.write(this, option) //sheet to string
        var blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' }) //string to ArrayBuffer

        this.blob = blob;
    }
    //save bolb
    this.saveAs = function(filename) {
        if(!filename) throw new Error("檔案名稱不得為空")
        saveAs(this.blob, `${filename}.xlsx`)
    }
}

//jsonList to csv
export function JsonListToCSV() {

    this._CSV = '';
    this.blob;

    this.append_CSV = function(jsonConfig) {
        try {
            var result = _jsonList_to_aoa(jsonConfig)
        }
        catch(event) {
            console.log(event)
            return
        }
        //format
        result.forEach(d => {
            this._CSV += d.join(',') + '\n'
        })
    }

    this.toBlob = function() {
        //取得BOM頭以正常閱讀, https://stackoverflow.com/questions/42462764/javascript-export-csv-encoding-utf-8-issue
        const BOM = "\ufeff"

        this.blob = new Blob([ BOM + this._CSV ], { type: 'text/csv' })
    }

    //save csv
    this.saveAs = function(filename) {
        if(!filename) throw new Error("檔案名稱不得為空")
        saveAs(this.blob, `${filename}.csv`)
        // let link = document.createElement('a');
        // link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(this._CSV));
        // link.setAttribute('download', `${filename}.csv`);
        // link.click();
    }
}


//excel blob to json
export function excel_to_json(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()

        fileReader.onload = function() {
            const result = fileReader.result

            //ArrayBuffer to JSON
            const sheets = XLSX.read(result).Sheets
            
            var jsonDataList = []
            for(let name in sheets) {
                jsonDataList.push(...XLSX.utils.sheet_to_json(sheets[name]))
            }

            return resolve(jsonDataList)
        }

        fileReader.onerror = function(event) {
            return reject(event)
        }

        fileReader.readAsArrayBuffer(file);
    })
    
}

