<style>
    :global(.overlay) {
        position: absolute;
        top: 0;
        left: 0;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }

    .overlay--content--container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        box-sizing: border-box;
        height: 100%;
        transform: scale(0.8);
        pointer-events: none;
    }
    .overlay--content--box {
        display: flex;
        flex-direction: column;
        flex-grow: 0;
        flex-shrink: 0;
        box-sizing: border-box;
        max-width: 100%;
        max-height: 100%;
        pointer-events: auto;
        overflow-y: auto;
        background: #fff;
        min-width: 400px;
        min-height: 400px;
    }
</style>

<script>
    import {getContext} from "svelte";
    let connected = getContext('WSC-connected');
</script>

{#if !$connected}
<div class="overlay">
    <div class="overlay--content--container">
        <div class="overlay--content--box" style="justify-content: space-around;">
            <h3 style="text-align: center;">
                Your arduino is not conected! <br><br>
                Please connect to your arduino,<br>
                When connected this message wil disappear.<br> <br>
                Drive save and have fun!
            </h3>
        </div>
    </div>
</div>
{/if}