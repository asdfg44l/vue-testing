<script>
import websocket from './websocket.vue'
import delay from 'delay'
export default {
    mixins: [websocket],
    data() {
        return {
            EXCHANGE_NAME: 'binance', //去撈哪個交易所
            WS_API_LIST: {            //可用的API接口
                binance: [
                    {
                        name: "binance1",
                        httpURL: "https://api.yshyqxx.com",
                        wsURL: "wss://stream.yshyqxx.com",
                        connect: false,
                    },
                    {
                        name: "binance2",
                        httpURL: "https://api.binance.com",
                        wsURL: "wss://stream.binance.com:9443",
                        connect: false,
                    },
                    {
                        name: "royalq",
                        httpURL: "https://binance.royalqs.com/bianceapi/coin",
                        wsURL: "wss://binance.royalqs.com/bianceapi/wstream",
                        connect: false,
                    }
                ]
            },
            SYMBOL_LIST: []
        }
    },
    computed: {},
    methods: {
        async initAPI(symbols) {
            this.SYMBOL_LIST = symbols || null

            await this.initAvaliablePort()
            //取得可用接口並連線
            try {
                const host = this.getAvaliablePort().wsURL
                const streamName = symbols.reduce((prev, current) => {
                    return `${prev}/${current.symbol.toLowerCase()}@miniTicker`
                }, '').substr(1)

                this.wsURL = `${host}/stream?streams=${streamName}`
                
                //建立連線
                this.initWebSocket()

                this.AUTO_RECONNECT = false //關閉重連
            }
            catch(e) { console.error(e) }
        },
        //初始化可用的API接口
        initAvaliablePort() {
            return new Promise((resolve, reject) => {
                const ExchangeList = this.WS_API_LIST[this.EXCHANGE_NAME] || []
                // optimizable
                ExchangeList.forEach(async(item, index) => {
                    const host = item.httpURL
                    const path = '/api/v3/ticker/price?symbol=BTCUSDT'
                    try {
                        const res = await this.axios.get(host + path, { timeout: 1000 })
                        if(res.status == 200) {
                            ExchangeList[index].connect = true
                            return resolve(true)
                        }
                        ExchangeList[index].connect = false
                    }
                    catch(e) {
                        ExchangeList[index].connect = false
                        return reject(e)
                    }
                });
            })
        },
        //取得可用接口
        getAvaliablePort() {
            const ExchangeList = this.WS_API_LIST[this.EXCHANGE_NAME]
            const avaliablePort = ExchangeList.find(item => item.connect)

            if(!avaliablePort) {
                this.AUTO_RECONNECT = false //關閉重連
                throw new Error(`${this.EXCHANGE_NAME}交易所沒有可用的WebSocket接口`)
            }

            return avaliablePort
        },
        //override websocket mixin
        async websocketonerror() {
            console.log('ws 關閉連線')
            //3秒後斷線重連
            console.log('嘗試重新連線')
            await delay(3000)
            this.AUTO_RECONNECT = true
            this.ws ? this.ws.close() : this.ws = null // close or clear
            this.initAPI(this.SYMBOL_LIST) //reconnect
        }
    }
}
</script>