<template>
    <div>
        <div class="marquee-layout d-flex">
            <div class="p-2 bg-info text-white"><i class="fas fa-exclamation-triangle"></i></div>
            <div
                class="marquee"
                v-marquee
                v-if="Mswitch"
            >
                <p
                    v-for="item in list"
                    :key="item.ID"
                    class="marquee-item"
                >
                    {{ item.title }}
                </p>
            </div>
        </div>
        
        <button
            class="btn btn-primary mt-1"
            @click.prevent="Mswitch = !Mswitch"
        >
            {{ Mswitch ? '暫停' : '啟動' }}
        </button>
    </div>
</template>

<script>
import { marquee } from "@/directive/marquee.js";
export default {
    directives: {
        marquee
    },
    props: {
        list: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            Mswitch: true
        }
    }
}
</script>