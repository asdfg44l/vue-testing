<template>
    <div class="container mx-auto py-3">
        <div class="mb-3">
            <label for="cipherText">加密資料: </label>
            <input type="text" name="text" id="cipherText">
        </div>
        <p>{{ testid }}</p>
        <p>{{ dogeName }}</p>

        <button type="button" class="btn btn-primary btn-sm" @click.prevent="getCrypto">取得密文</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cipherText: ""
        }
    },
    computed: {
        testid() {
            return this.$store.state.testid
        },
        dogeName() {
            return this.$store.state.name
        }
    },
    methods: {
        getCrypto() {
            this.$store.commit('TESTID', 'GOGOGO')
            this.$store.commit('NAME', 'MOCHI')
        }
    }
}
</script>