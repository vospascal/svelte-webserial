<script>
    export let progress = 0;
    export let height = 0;
</script>

<style>
    .progress-bar {
        --height: 300px;
        background-color: #f5f5f5;
        border-radius: 3px;
        box-shadow: none;
        position: relative;
        width: 20px;
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 30px;
        height: calc(var(--height) - 40px);
    }

    .bar {
        --progress: 0%;
        width: 100%;
        position: absolute;
        bottom: 0;
        background-color: #2196f3;
        box-shadow: none;
        height: var(--progress);
    }
    .sr-only{
        display: none;
    }
</style>


<div class="progress-bar" style="--height: {height}px">
    <div class="bar" style="--progress: {progress}%">
        <span class="sr-only">{`${progress}%`}</span>
    </div>
</div>