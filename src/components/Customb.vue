<template>
    <div>
        <p>title</p>
        <label for="name">Name: </label>
        <input type="text" id="name" v-on="$listeners">
    </div>
</template>

<script>
export default {
    mounted() {
        console.log('$listener: ', this.$listeners)
        this.$emit('hello')
    }
}
</script>