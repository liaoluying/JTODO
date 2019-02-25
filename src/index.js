import  Vue from 'vue'
import app from './app.vue'
import "./assets/styles/global.css"


const root = document.createElement('div')
document.body.appendChild(root)

new Vue ({
    render: createElement => createElement(app)
}).$mount(root)