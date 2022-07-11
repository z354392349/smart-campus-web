import { getDict } from '@/utils/dictionary'
export default {
  data() {
    return {
      page: 1,
      total: 10,
      pageSize: 10,
      tableData: [],
      searchInfo: {}
    }
  },
  methods: {
    filterDict(value, type) {
      const rowLabel = this[type + 'Options'] && this[type + 'Options'].filter((item) => item.value === value)
      return rowLabel && rowLabel[0] && rowLabel[0].label
    },
    async getDict(type) {
      const dicts = await getDict(type)
      this[type + 'Options'] = dicts
      return dicts
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getTableData()
    },
    async getTableData(page = this.page, pageSize = this.pageSize) {
      const table = await this.listApi({ page, pageSize, ...this.searchInfo })
      if (table.code === 0) {
        this.tableData = table.data.list
        this.total = table.data.total
        this.page = table.data.page
        this.pageSize = table.data.pageSize
      }
    },
    deleteTableData(name, api, params) {
      this.$confirm(`此操作将永久删除${name}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await api(params)
          if (res.code === 0) {
            this.$message.success('删除成功')
            this.getTableData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
