<template>
    <div class="row">
        <div class="col-12">
            <card :title="table.title" class="capitalize">
                <div class="table-responsive">
                    <base-table :data="table.data" :columns="table.columns" thead-classes="text-primary"
                        @update="getTables">
                    </base-table>
                </div>
            </card>
        </div>
    </div>
</template>
<script>

import { BaseTable } from "@/components";
export default {
    name: "Tables",
    components: {
        BaseTable
    },
    methods: {
        getTables(ev) {
            this.table.title = `${this.$route.name} Tables`;
            this.axios.get(`/${this.$route.name}`)
                .then((response) => {
                    this.table.columns = Object.keys(response.data[0])

                    this.table.data = response.data;
                 
                    this.table.columns.push("action");
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        },
    },
    mounted() {

        this.getTables();
    },
    updated() {
    },
    computed: {
    },
    data() {
        return {
            table: {
                title: "",
                columns: [],
                data: []
            },
        };
    }
};
</script>

<style>
.capitalize {
    text-transform: capitalize;
}
</style>