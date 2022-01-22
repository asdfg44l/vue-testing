
<script>
export default {
    methods: {
        exportExcel() {
            const vm = this;
            const excel_header = [
                "代辦事項",
                "狀態",
                "創建時間"
            ]
            const attrs_to_show = [
                "title",
                "status",
                "create_date"
            ]
            const data_format = {
                create_date: function(row) {
                    return row.toLocaleString('zh-TW', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    })
                }
            }
        }
    }
}
</script>