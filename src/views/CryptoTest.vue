<template>
    <div class="container mx-auto py-3">
        <div>
            <div class="mb-3">
                <label for="cipherText">加密資料: </label>
                <input type="text" name="text" id="cipherText">
            </div>
            <p>{{ testid }}</p>
            <p>{{ dogeName }}</p>

            <button type="button" class="btn btn-primary btn-sm" @click.prevent="getCrypto">取得密文</button>
        </div>
        <!-- computed setter -->
        <!-- <div>
            <div class="mb-3">
                <label for="screenWidth">螢幕寬度: </label>
                <input type="text" name="screenWidth" id="screenWidth" v-model="screenWidth">
            </div>
        </div> -->
        <!-- v-for object -->
        <!-- <template v-for="(value, key) in adminUser">
            <p :key="key">{{ key }}: {{ value }}</p>
        </template> -->

        <!-- $listeners -->
        <!-- <customb @focus="getListener"></customb> -->

        <!-- $nextTick -->
        <div>
            <p>messages: {{ msgObj.list }}</p>
            <p>scrollHeight: {{ msgObj.scrollHeight }}</p>
            <div class="messages" ref="messages">
                <p v-for="item in msgObj.list" :key="item">{{ item }}</p>
            </div>
            <input
                type="text"
                name="message"
                v-model="msgObj.input"
                @keydown.enter="addToMessages"
            >
        </div>
        <Basic 
            tag="div"
            text="hello"
            :text-list="['hi','this is a Basic Functional Component']"
        />
    </div>
</template>

<script>
// import Customb from "@/components/Customb.vue";

export default {
    components: {
        // Customb
        Basic: () => import('../components/Functional/Basic.vue')
    },
    data() {
        return {
            cipherText: "",
            innerWidth: 1024,
            adminUser: {
                name: 'mochi',
                age: 13,
                description: 'hello okok'
            },
            msgObj: {
                input: '',
                list: [],
                scrollHeight: 0
            }
        }
    },
    computed: {
        testid() {
            return this.$store.state.testid
        },
        dogeName() {
            return this.$store.state.name
        },
        screenWidth: {
            get() {
                return this.innerWidth
            },
            set(value) {
                this.innerWidth = value
            }
        }
    },
    methods: {
        getCrypto() {
            // console.log(typeof window.sessionStorage.getItem('vuex'))
            this.$store.commit('TESTID', 'GOGOGO')
            this.$store.commit('NAME', 'MOCHI')
        },
        getListener() {
            console.log('hello')
        },
        addToMessages() {
            const userInput = this.msgObj.input
            this.msgObj.list.push(userInput)
            this.msgObj.input = ''

            //scroll to bottom
            const el = this.$refs['messages']
            this.$nextTick(() => {
                el.scrollTop = el.scrollHeight
            })
        }
    },
    mounted() {
        // console.log('$listener: ', this.$listeners)
    }
}
</script>

<style lang="scss" scoped>
    .messages {
        width: 400px;
        height: 80px;
        margin: 1rem 0;
        border: 1px solid black;
        overflow-y: scroll;
    }
</style>