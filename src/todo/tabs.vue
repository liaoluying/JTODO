<template>
    <div class="helper">
        <span class="left">{{unfinishedtodolength}} items left</span>
        <span class="tabs">
            <span v-for="state in states" :key="state"
            :class="[state, Filter === state ? 'actived' : '']"
            @click="togglefilter(state)">
                {{state}}
            </span>
        </span>
        <span class="clear" @click="clearcompleted">Clear Completed</span>
    </div>
</template>

<script>
export default {
    data(){
        return{
            states: ['all', 'active', 'completed']
        }
    },
    methods:{
        togglefilter(state){
            this.$emit('toggle',state)
        },
        clearcompleted(){
            this.$emit('clearallcompleted')
        }
    },

    computed:{
        unfinishedtodolength(){
            return this.todos.filter(todo=>!todo.completed).length
        }
    },

    props: {
        Filter:{
            type: String,
            required: true,
        },
        todos:{
            type: Array,
            required: true,
        }
    }
}
</script>

<style lang="scss">
.helper{
    font-weight: 300;
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    line-height: 30px;
    background-color: #fff;
    font-size: 14px;
    font-smoothing: antialiased;
    .left .clear .tabs{
        padding: 0px 10px;
        box-sizing: border-box
    }
    .left .clear{
        width: 150px;
    }
    .left{
        text-align: left;
    }
    .clear{
        text-align: right;
        cursor: pointer;
    }
    .tabs{
        width: 200px;
        display: flex;
        justify-content: space-around;
        * {
            display: inline-block;
            padding: 0 10px;
            cursor: pointer;
            border: 1px solid rgba(175,47,47,0);
            &.actived{
               border-color: rgba(8, 31, 133, 0.4);
               border-radius: 5px;
            }
        }
    }
}
    
</style>