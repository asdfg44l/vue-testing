<template>
    <div>
        <template v-if="mode == 'text'">
            <label v-if="labelName" :for="id">{{ labelName }}: </label>
            <input
                :class="['form-control', ...className]"
                type="text"
                :name="name"
                :id="id"
                :value="value"
                :placeholder="placeholder"
                @input="updateValue"
            >
        </template>
        
        <template v-if="mode == 'radio'" class="d-flex align-items-center">
            <input
                :class="['m-0', 'me-1', ...className]"
                type="radio"
                :name="name"
                :id="id"
                :value="setValue"
                :checked="checked"
                @change="updateValue"
            >
            <label :for="id">
                <slot></slot>
            </label>
        </template>
        <select
            v-if="mode == 'select'"
            :class="['form-select', ...className]"
            :name="name"
            :id="id"
            @change="updateValue"
        >
            <slot></slot>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            require: true
        },
        name: {
            type: String
        },
        id: {
            type: String,
            require: true
        },
        setValue: {
            type: String || Number
        },
        value: {
            type: String || Number
        },
        className: {
            type: Array
        },
        placeholder: {
            type: String
        },
        labelName: {
            type: String
        },
        checked: {
            type: Boolean
        }
    },
    methods: {
        updateValue(e) {
            const value = e.target.value
            this.$emit('input', value)
        }
    }
}
</script>