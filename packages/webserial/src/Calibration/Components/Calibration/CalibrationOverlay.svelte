<style>
    :global(.calibrationoverlay) {
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

    .calibrationoverlay--content--container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        box-sizing: border-box;
        height: 100%;
        pointer-events: none;
    }
    .calibrationoverlay--content--box {

        max-width: 100%;
        max-height: 100%;
        pointer-events: auto;
        overflow-y: auto;
        background: #fff;
        min-width: 760px;
    }
</style>

<script>
    export let show;
</script>

{#if show}
<div class="calibrationoverlay">
    <div class="calibrationoverlay--content--container">
        <div class="calibrationoverlay--content--box" >
            <slot />
        </div>
    </div>
</div>
{/if}