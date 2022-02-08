<script>
import { mapMutations, mapGetters } from 'vuex'


export default {
    data() {
        return {
            ws: null,
            wsURL: "",
            AUTO_RECONNECT: false,
        }
    },
    computed: {
        ...mapGetters(['getWsNotify', 'getCurrentName'])
    },
    methods: {
        ...mapMutations(['setWsNotify']),
        //init websocket
        initWebSocket() {
            this.ws = new WebSocket(this.wsURL) //建立連線
            this.ws.onopen = this.websocketonopen
            this.ws.onerror = this.websocketonerror
            this.ws.onmessage = this.websocketonmessage
            this.ws.onclose = this.websocketclose
            this.ws.send = this.websocketsend
        },
        websocketonopen() {
            console.log('ws 連線成功!!')
        },
        websocketonerror(e) {
            console.error('ws 連線失敗', e)
        },
        websocketonmessage(e) {
            // 取得資料
            let _data = e.data
            // 將收到的資料存到 vuex中共用
            this.setWsNotify({
                data: JSON.parse(_data)
            })
            console.log('ws 取得資料', _data)
        },
        websocketsend(data) {
            // 前端丟資料給後端
            console.log('send data:', data)
            this.ws.send(JSON.stringify(data))
        },
        websocketclose() {
            console.log('ws 關閉連線')
        }
    },
    destroyed() {
        if(this.ws) this.ws.close()
    }
}
</script>