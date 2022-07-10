<script>
export default {
    name: 'Basic',
    props: {
        tag: {
            type: String,
            require: true
        },
        text: String,
        textList: Array
    },
    render: function(h) {
        return h(
            this.tag,
            { class: 'functional-basic' },
            [ this.text, 
              this.textList?.length > 0 &&
              this.textList.map(item => (h('p', [item])))       
            ]
        )
    }
}
</script>