<template>
    <div class="loader" v-if="flag">
    <div class="loader-inner">
        <div class="loader-line-wrap">
            <div class="loader-line"></div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:"Movie" 
}
</script>

<style>
.loader {
    /* background: rgba(256,256,256,0.8); */
    background: #ffffff;
    bottom: 0;
    left: 0;
    overflow: hidden;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 99999;
}

.loader-inner {
    bottom: 0;
    height: 60px;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
}

.loader-line-wrap {
    animation: 
        spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite
    ;
    box-sizing: border-box;
    height: 50px;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    transform-origin: 50% 100%;
    width: 100px;
}
.loader-line {
    border: 4px solid transparent;
    border-radius: 100%;
    box-sizing: border-box;
    height: 100px;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;
}
.loader-line-wrap:nth-child(1) { animation-delay: -50ms; }

.loader-line-wrap:nth-child(1) .loader-line {
    border-color: #cccccc;
    height: 90px;
    width: 90px;
    top: 7px;
}

@keyframes spin {
    0%, 15% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>