<template>
    <div class="footer">
        <span>Written By {{this.name}}</span>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: 'Michelle Liao',
        }
    }
}
</script>

<style lang="scss">
    .footer{
        display: flex;
        justify-content: center;
        span{
            position: absolute;
            color: #bfbfbf;
            bottom: 20px;
            margin: auto;
        }
    }
</style>