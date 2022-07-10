<template>
    <div class="warp">
        <p class="title">Apple</p>
        <p class="description" v-if="isOpen">
            Hello World
        </p>
        <button class="open" @click="isOpen = true">open</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false
        }
    }
}
</script>