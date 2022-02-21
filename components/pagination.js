
export default {
    template: `
    <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li class="page-item" :class="{disabled:!pagination.has_pre}" @click="switchPage(pagination.current_page-1)"><a class="page-link" href="#">Previous</a></li>
        <li class="page-item" v-for="page in pagination.total_pages"  @click="switchPage(page)"><a class="page-link" href="#">{{page}}</a></li>
        <li class="page-item" :class="{disabled:!pagination.has_next}" @click="switchPage(pagination.current_page+1)"><a class="page-link" href="#">Next</a></li>
        </ul>
    </nav>`,
    props:['pagination'],
    data() {
        return {
        }
    },
    methods: {
        switchPage(page) {
            this.$emit('switch-page', page)
        }
    }
}