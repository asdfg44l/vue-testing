<template>
    <div class="custom-card">
        <img :src="imgUrl" class="card-img-top" :alt="alt">
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        imgUrl: {
            type: String,
            require: true
        },
        alt: {
            type: String,
            require: true
        }
    }
}
</script>