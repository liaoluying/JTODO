<template>
    <div>
        <section class='real-app'>
            <input type="text" class="add-input" autofocus='autofocus'
            placeholder="接下来要做什么？" @keyup.enter="addtodo">
            <Item :todo='todo' v-for="todo in filteredtodos" :key="todo.id" @del='deletetodo'></Item>
            <Tabs :Filter="Filter" :todos='todos' @toggle='Togglefilter'
             @clearallcompleted='clearallcompleted'></Tabs>
        </section>
    </div>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
var id = 0 
export default {
    data(){
        return{
            todos: [],
            Filter: 'all',
        }
    },
    methods:{
        addtodo(e){
            this.todos.unshift({
                id: id++,
                content: e.target.value.trim(),
                completed: false,
            })
            e.target.value = '';
        },
        deletetodo(id){
            this.todos.splice(this.todos.findIndex(todo => todo.id==id),1)
        },
        Togglefilter(state){
            this.Filter = state
        },
        clearallcompleted(){
            this.todos = this.todos.filter(todo => !todo.completed)
        }
    },
    components:{
        Item,
        Tabs
    },
    computed:{
        filteredtodos(){
            if(this.Filter === 'all'){
                return this.todos
            }
            const completed = this.Filter === 'completed'
            return this.todos.filter(todo=>completed === todo.completed)
        }
    }
}
</script>

<style lang="scss">
    .real-app{
        width: 600px;
        margin: 0 auto;
        box-shadow: 0 0 5px #666;
        .add-input{
            position: relative;
            margin: 0;
            width: 100%;
            font-size: 24px;
            font-family: inherit;
            font-weight: inherit; 
            line-height: 1.4em;
            border: none;
            outline: none; 
            color: inherit; 
            box-sizing: border-box;
            font-smoothing: antialiased;
            padding: 16px 16px 16px 36px;
            border: none;
            box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
        }
    }    
</style>
